var { Reader } = require("./reader");
class TokenType{
    static identifier = 0;
    static seperator = 1;
    static partBreak = 2; //space/tab
    static fullBreak = 3; // newline/return
    static preComment = 4; // comment before the property
    static postComment = 5; // comment inline after the property
    static open = 6;
    static close = 7;
};

var tokenMap = {
    0: "identifier",
    1: "seperator",
    2: "partBreak",
    3: "fullBreak",
    4: "preComment",
    5: "postComment",
    6: "open",
    7: "close",
}

class Token{
    constructor(type){
        this.type = type;
        this.typeName = tokenMap[type];
    }
    type;
}
class ValueToken extends Token{
    constructor(type, value){
        super(type);
        this.value = value.trim();
    }
    value;
}
class Identifier extends ValueToken{constructor(value){super(TokenType.identifier, value)}}
class Seperator extends Token{constructor(){super(TokenType.seperator)}}
class PartBreak extends Token{constructor(){super(TokenType.partBreak)}}
class FullBreak extends Token{constructor(){super(TokenType.fullBreak)}}
class PreComment extends ValueToken{constructor(value){super(TokenType.preComment, value)}}
class PostComment extends ValueToken{constructor(value){super(TokenType.postComment, value)}}
class Open extends Token{constructor(){super(TokenType.open)}}
class Close extends Token{constructor(){super(TokenType.close)}}

function getTokens(str){
    var reader = new Reader(str);
    var tokenQueue = [];
    function fromLast(amount = 0){
        var length = tokenQueue.length;
        var index = length - (1 + amount);
        var token = tokenQueue[index];
        return token;
    }
    function commentIsPre(){
        // look for the last newline
        // if we find an identifier or seperator before it it's a post
        // otherwise its a pre
        var token = fromLast();
        var index = 0;
        while(token){
            if(token.type == TokenType.seperator
                || token.type == TokenType.identifier){
                    return false;
            }
            if(token.type == TokenType.fullBreak){
                return true;
            }
            token = fromLast(index++);  
        }
        // didn't find a newline or a sep, must be first comment so its a pre, return true
        return true;
    }   
    var buffer = '';
    var inComment = false;
    var inQuotes = false;
    while(reader.remaining()){
        var char = reader.read();
        if(inComment){
            buffer += char;
            if(char === '\n'){
                // check to see if it a pre or post comment, i.e. if there is a
                // value/identifier/seperator token before the last newline
                var isPre = commentIsPre();
                tokenQueue.push(isPre
                    ? new PreComment(buffer)
                    : new PostComment(buffer));
                buffer = '';
                inComment = false;
            } else{
                continue;
            }
        }
        switch(char){
            case '\n':
            case '\r':
                // If we are in quotes, just add to the buffer
                if(inQuotes){
                    buffer += char;
                    break;
                }
                // if the buffer has data, add the identifier first
                if(buffer.length){
                    tokenQueue.push(new Identifier(buffer));
                    buffer = '';
                }
                var prev = fromLast(0);
                // If the last value in the buffer is a fullBreak, do nothing
                if(prev && prev.type == TokenType.fullBreak){
                    break;
                }
                // If the last value in the buffer is a partBreak, replace it
                if(prev && prev.type == TokenType.partBreak){
                    tokenQueue[tokenQueue.length - 1] = new FullBreak();
                    break;
                }
                tokenQueue.push(new FullBreak());
                break;
            case '\t':
            case ' ':
                // If we are in quotes, just add to the buffer
                if(inQuotes){
                    buffer += char;
                    break;
                }
                // if the buffer has data, add the identifier first
                if(buffer.length){
                    tokenQueue.push(new Identifier(buffer));
                    buffer = '';
                }
                // if the prev token is a part break or full break don't add
                var prev = fromLast(0);
                if(prev.type == TokenType.partBreak 
                    || prev.type == TokenType.fullBreak){
                    break;
                }
                tokenQueue.push(new PartBreak());
                break;
            case '{':
                // If we are in quotes, just add to the buffer
                if(inQuotes){
                    buffer += char;
                    break;
                }
                tokenQueue.push(new Open());
                break;
            case '}':
                // If we are in quotes, just add to the buffer
                if(inQuotes){
                    buffer += char;
                    break;
                }
                if(buffer.length){
                    tokenQueue.push(new Identifier(buffer));
                    buffer = '';
                }
                tokenQueue.push(new Close());
                break;
            case '=':
                // If we are in quotes, just add to the buffer
                if(inQuotes){
                    buffer += char;
                    break;
                }
                // if there is anything in the buffer, write it
                if(buffer.length){
                    tokenQueue.push(new Identifier(buffer));
                    buffer = '';
                }
                tokenQueue.push(new Seperator());
                break;
            case '#':
                // If we are in quotes, just add to the buffer
                if(inQuotes){
                    buffer += char;
                    break;
                }
                // if the buffer already has a value, we need to write the identifier
                if(buffer.length){
                    tokenQueue.push(new Identifier(buffer));
                    buffer = '';
                }
                inComment = true;
                break;
            case '"':
                inQuotes = !inQuotes;
                // deliberate fallthrough, quotes need to be also treated as an other character
            default:
                buffer += char;
                break;
        }
    }
    return tokenQueue;
}

module.exports = {
    getTokens,
    TokenType
}