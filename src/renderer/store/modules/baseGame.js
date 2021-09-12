import {importBaseGame, loadBaseGame} from '../../ipc/baseGame';
import {imageFolders} from '../../data/folders';
import Vue from 'vue';

export default {
    state :() =>({
        
    }),
    mutations: {
        // clearProject(state, payload){
        //     Object.keys(state).forEach(s => Vue.delete(state, s));
        // },
        setBaseGame(state, payload, rootState){
            Object.keys(payload.baseGame).forEach(s => Vue.set(state, s, payload.baseGame[s]));
        },
    },
    actions: {
        importBaseGame(context, payload){
            context.commit('setImportingBaseGame', {importingBaseGame: true});
            importBaseGame({path: payload.path}, (baseGame) => {
                context.commit("setBaseGame", {baseGame});
                context.commit("setImportingBaseGame", {importingBaseGame: false} );
                // var modifierIcons = imageFolders[modifierIcons];
                // context.state.images
                //     .filter(x => x.fullPath.indexOf(modifierIcons.path) > -1)
                //     .forEach(x => {
                //         context.dispatch('loadImage', {
                //             format: modifierIcons.format,
                //             id: x.id
                //         });
                //     })
            });
        },
        loadBaseGame(context, payload){
            loadBaseGame((baseGame) => {
                context.commit("setBaseGame", {baseGame});
                // var modifierIcons = imageFolders["modifierIcons"];
                // var modifierImages = context.rootState.baseGame.images
                // .filter(x => x.fullPath.indexOf(modifierIcons.path) > -1);
                // modifierImages
                //     .forEach(x => {
                //         context.dispatch('loadImage', {
                //             format: modifierIcons.format,
                //             id: x.id
                //         });
                //     })
            });
        }
    }
}