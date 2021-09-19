export class WebWorkerMessage{
    constructor(context, payload){
        this.context = context;
        this.payload = payload;
    }
    context;
    payload;
}

export class WebWorkerResponse{
    constructor(type, data){
        this.type = type;
        this.data = data;
    }
    data;
    type;
}