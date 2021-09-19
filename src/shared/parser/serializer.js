const tabSize = 4;
var spaces = '';
for(var i = 0; i < tabSize; i++){spaces += ' '; }
const newLine = "\r\n";
const repeatKeyRegex = /:[0-9]{1,}$/

function Writer(str = null){
    this.str = str || '';
    function tab(str, depth){
        var o = '';
        for(var j = 0; j< depth; j++){
            o += spaces;
        }
        return o + str;
    }
    this.writeLine = function(line, depth){
        this.str += tab(line, depth) + newLine;
    }
    this.toString = function(){
        return this.str;
    }
};

// comments will always be a block above the object/kv
function writePreComment(comments, writer, depth){
    var splitComments = comments.split('\r\n').map(x => '#' + x);
    for(var com of splitComments){
        writer.writeLine(com, depth);
    }
}

function serialize(obj, comments){
    var writer = new Writer();
    _serialize(obj, comments, writer, 0);
    return writer.toString();
}

function _serialize(obj, comments, writer, depth){
    for(var key in obj){
        var val = obj[key];
        var printKey = key.split(":")[0];
        var selfPost;
        var comment = comments[key];
        if(comment){
            var selfComment = comment[":comment"];
            if(selfComment){
                var selfPre = selfComment[":pre"];
                selfPost = selfComment[":post"];
                if(selfPre && selfPre.length){
                    writePreComment(selfPre, writer, depth);
                }
            }
        }
        if(Array.isArray(val)){
            
            var startLine = printKey + " = {" + (
                selfPost 
                    ? ('#' + selfPost) 
                    : "");
            writer.writeLine(startLine, depth);
            for(var v of val){
                var vPost;
                if(comment) {
                    var vComment = comment[v];
                    if(vComment){
                        var vPre = vComment[":pre"];
                        vPost = vComment[":post"];
                        if(vPre && vPre.length){
                            writePreComment(vPre, writer, depth + 1);
                        }
                    }
                }
                var line = vPost ? v + " #" + vPost : v;
                writer.writeLine(line, depth + 1);
            }
            writer.writeLine("}", depth);
            
        } else if(typeof val === 'object'){
            var startLine = printKey + " = {" + (
                selfPost 
                    ? (' #' + selfPost) 
                    : "");
            writer.writeLine(startLine, depth);
            _serialize(val, comment || {}, writer, depth + 1);
            writer.writeLine("}", depth);
        } else {
            var valPost;
            if(comment) {
                var valPre = comment[":pre"];
                valPost = comment[":post"];
                if(valPre && valPre.length){
                    writePreComment(valPre, writer, depth);
                }
            }
            var v = `${printKey} = ${val}`;
            var line = valPost ? v + " #" + valPost : v;
            writer.writeLine(line, depth);
        }
    }
}

module.exports = {
    serialize
}