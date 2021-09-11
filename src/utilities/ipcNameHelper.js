function getName(action, endpoint){
    return {
        name: action + ":" + endpoint,
        reply: action + ":" + endpoint + ":" + "reply",
    };
}

export {getName}