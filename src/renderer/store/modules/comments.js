import Vue from 'vue';

export default {
    state :() =>({
    }),
    mutations: {
        clearComments(state, payload){
            Object.keys(state).forEach(s => Vue.delete(state, s));
        },
        setComments(state, payload){
            Object.keys(payload.comments).forEach(s => Vue.set(state, s, ));
        },
    },
    actions: {
        
    }
}