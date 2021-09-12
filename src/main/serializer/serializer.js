function serialize(obj){
    return objToString(obj);
}

function deserialize(str){
    //fake stream because node streams are fucking pepega
    var stream = new function(val){
        // clean string by removing comments
        this.str = val.replace(/#[\S ]{0,}[\r]?\n/g, '');
        this.index = 0;
        this.read = function(amount){
            if(amount == 1){
                var slice = this.str[this.index];
                this.index++;
                return slice;
            } else{
                var slice = this.str.substring(this.index, this.index + amount);
                this.index += amount;
                return slice;
            }
        }
    }(str);
    return parse(stream);
}

// turn the eu object into recursive lists of key value pairs
// multiple keys on the same object will use the form "name:[index]" i.e. culture_group:0, culture_group:1 etc

function parse(readable){
    return parseObject(readable);
}

function objToString(obj, depth){
    if(!depth){ depth = 0;}
    var objKeys = Object.keys(obj);
    var output = '';
    if(depth != 0){
        output += "{\n";
    }
    for(var i = 0; objKeys.length; i++){
        var key = objKeys[i];
        var val = obj[key];

        if(key.includes(":")){
            key = key.substring(0, key.indexOf(":"));
        }
        output += key + " = ";
        if(typeof(val) == Object){
            output += objToString(val, depth + 1);
        } else{
            output += val.toString() + "\n";
        }
    }
    if(depth != 0){
        output += "}\n";
    }
    return output;
}

function parseObject(stream){
    var kvPairs = [];
    var obj = {};
    let propSide = true;
    let propBuffer = '';
    let valueBuffer = '';
    let inQuotes = false;
    let index = 0;
    while(true){
        var char = stream.read(1);
        if(!char){
            break;
        }
        if(char == '}'){
            break;
        }
        // read until we hit an equals
        if(char != '=' && propSide){
            propBuffer += char;
            continue;
        }
        // change propSide
        if(char == '='){
            propSide = false;
            skipUntilNot(stream, [' ']);
            continue;
        }
        if(!propSide && char == '"'){
            inQuotes = !inQuotes;
            continue;
        }
        // We want to end parsing this value either when:
        // - we hit a space and we aren't inside quotes
        // - we hit a newline
        if(!propSide && ((char == ' ' && !inQuotes) || char == '\n')){
            propSide = true;
            var key = propBuffer.trim();
            if(key){
                var pair = [key, valueBuffer.trim()];
                kvPairs.push(pair);
            }
            valueBuffer = '';
            propBuffer = '';
            continue;
        }
        if(!propSide && char == '{'){
            var key = propBuffer.trim();
            if(key){
                var pair = [key, parseObject(stream)];
                kvPairs.push(pair);
            }
            propBuffer = '';
            valueBuffer = '';
            continue;
        }
        if(!propSide){
            valueBuffer += char;
            continue;
        }
    }
    // turn our kvPairs into an obj with repeated keys indexed;
    for(var j = 0; j < kvPairs.length; j++){
        var pair = kvPairs[j];
        var key = pair[0];
        if(!key){
            continue;
        }
        var val = pair[1];
        // check if obj already has this key, or an indexed version
        var objectKeys = Object.keys(obj);
        var existingKeys = objectKeys.filter(x => x == key || x.startsWith(key + ":"));
        if(existingKeys.length == 1){
            // non-indexed key, need to remove and replace with indexed
            var otherval = obj[key];
            delete obj[key];
            obj[key + ":0"] = otherval;
            obj[key + ":1"] = val;
        } else if(existingKeys.length > 1){
            obj[key + ":" + existingKeys.length] = val;
        } else{
            obj[key] = val;
        }
    }
    return obj;
}

function skipUntilNot(stream, chars){
    while(true){
        var char = stream.read(1);
        if(chars.indexOf(char) > -1){
            return;
        }
        if(!char){
            return;
        }
    }
}

export {
    serialize,
    deserialize
}