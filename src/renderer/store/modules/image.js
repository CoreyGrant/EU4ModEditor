import {loadImage} from '../../ipc/image';
import Vue from 'vue';

export default {
    state :() =>({
    }),
    mutations: {
        setImage(state, payload){
            var id = payload.id;
            var data = payload.data;
            var name = payload.name;
            if(!state[name]){
                Vue.set(state, name, {});
            } 
            Vue.set(state[name], id, data);
        },
    },
    actions: {
        loadImage(context, payload){
            var name = payload.name;
            var id = payload.id;
            var format = payload.format;
            var done = payload.done;
            loadImage(id, name, format, (data) => {
                context.commit("setImage", {data, id, name});
                done && done();
            });
        },
    }
}