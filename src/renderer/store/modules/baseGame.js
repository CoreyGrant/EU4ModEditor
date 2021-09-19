import { importBaseGame, loadBaseGame } from '../../webworkers/workers';
import Vue from 'vue';

export default {
    state :() =>({
        
    }),
    mutations: {
        // clearProject(state, payload){
        //     Object.keys(state).forEach(s => Vue.delete(state, s));
        // },
        setBaseGame(state, payload, rootState){
            Object.keys(payload)
                .forEach(s => Vue.set(state, s, payload[s]));
        },
    },
    actions: {
        loadBaseGame(context, payload){
            return loadBaseGame(payload)
                .then(({files, comments, exports, images}) => {
                context.commit("setBaseGame", {files, comments, exports, images});
            });
        },
        importBaseGame(context, payload){
            var importPayload = {version: payload.version, path: payload.path};
            return importBaseGame(importPayload, payload.update)
                .then((baseGameVersions) => {
                context.commit("setBaseGameVersions", {baseGameVersions});
            });
        }
    }
}