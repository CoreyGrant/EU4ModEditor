var {TokenType} = require("./lexer");

function parseTokens(tokenList){
    tokenList = tokenList.filter(x => x.type !== TokenType.partBreak && x.type !== TokenType.fullBreak);
    // reverse the tokenList so we can just pop from it
    var tokenQueue = tokenList.reverse();
    var [output, comments] = parseQueue(tokenQueue);
    return [output, comments];
}

function parseQueue(tokenQueue){
    var output = {};
    var comments = {};
    var keyStack = [];
    var preComments = [];
    var sep = false;
    var isArr = false;
    var localSet = set.bind(null, output, comments, keyStack);
    function findPostComment(){
        var tok = tokenQueue[tokenQueue.length - 1];
        if(tok && tok.type == TokenType.postComment){
            return tok.value;
        }
        return;
    }
    function isArray(){
        // returns true if object close, false if sep
        for(var i = 0; i < tokenQueue.length; i++){
            var tok = tokenQueue[tokenQueue.length - (1 + i)];
            if(tok.type == TokenType.close){return true;}
            if(tok.type == TokenType.seperator){return false;}
        }
    }
    while(tokenQueue.length){
        var token = tokenQueue.pop();
        switch(token.type){
            case TokenType.open:
                isArr = isArray();
                // create and set the empty object ready for subsequent setting,
                // with comments
                localSet(isArr ? [] : {}, {":comment": getCommentValue(preComments, findPostComment())}, false);
                preComments = [];
                sep = false;
                break;
            case TokenType.close:
                keyStack.pop();
                isArr = false;
                break;
            case TokenType.identifier:
                if(isArr){
                    localSet(token.value, getCommentValue(preComments, findPostComment()), false);
                    preComments = [];
                    break;
                }
                if(!sep){
                    keyStack.push(token.value);
                } else {
                    // identifier with sep true, its a value
                    localSet(token.value, getCommentValue(preComments, findPostComment()));
                    preComments = [];
                    sep = false;
                }
                break;
            case TokenType.seperator:
                sep = true;
                break;
            case TokenType.preComment:
                preComments.push(token.value);
                break;
            case TokenType.postComment:
                // ignore, handled by a lookhead in the relvant places
                break;
        }
    }
    return [output, comments];
}

function getCommentValue(pre, post){
    var obj = {};
    if(pre && pre.length){
        obj[":pre"] = pre.join("\r\n");
    }
    if(post && post.length){
        obj[":post"] = post;
    }
    return obj;
}

function set(output, comments, keyStack, // all bound
    value, commentValue, popKey = true){
    var obj = output;
    var comment = comments;
    
    for(var i = 0; i < keyStack.length - 1; i++){
        var k = keyStack[i];
        obj = obj[k];
        comment = comment[k];
    }
    var key = popKey 
        ? keyStack.pop() 
        : keyStack[keyStack.length - 1];
    if(Array.isArray(obj[key])){
        obj[key].push(value);
        comment[key][value] = commentValue;
    } else{
        var matchingKeys = Object.keys(obj).filter(x => x === key);
        if(matchingKeys.length){
            key = key + ":" + matchingKeys.length;
        }
        obj[key] = value;
        comment[key] = commentValue;
    }
}

module.exports = {
    parseTokens
}