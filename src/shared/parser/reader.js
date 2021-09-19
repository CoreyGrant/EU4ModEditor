function Reader(str){
    this.str = str;
    this.index = 0;
    this.length = this.str.length;
    this.read = function(){
        return this.str[this.index++];
    }
    this.remaining = function(){
        return this.index < this.length;
    }
}

module.exports = {
    Reader
}