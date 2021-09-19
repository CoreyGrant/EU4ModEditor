import {importProject, loadProject, updateProjectObject} from '../../webworkers/workers';
import Vue from 'vue';

export default {
    state :() =>({
    }),
    mutations: {
        clearProject(state, payload){
            Object.keys(state).forEach(s => Vue.delete(state, s));
        },
        setProject(state, {files}){
            Object.keys(files).forEach(s => Vue.set(state, s, files[s]));
        },
        updateObject(state, {path, objectId, files}){
            // payload is { path : [], id, data}
            var obj = state
            for(var p of path){
                obj = obj[p];
            }
            obj[objectId] = files;
        }
    },
    actions: {
        updateProjectObject(context, {path, objectId, projectId, files}){
            
            return updateProjectObject({path, objectId, projectId, files})
                .then(() => context.commit('updateObject', {path, objectId, files}));
            // send to backend
            // scary, will bork project if wrong
            // saveProject(context.state, () => {});
        },
        importProject(context, {name, path, projectPath, flat, version, update}){
            return importProject(
                {name, path, projectPath, flat, version}, 
                update
            ).then(({id, files, comments, projectSettings, exports, images}) => {
                context.commit("setProject", {files});
                context.commit("setComments", {comments});
                context.commit("setImages", {images});
                context.commit("setExports", {exports});
                context.commit("setProjectSettings", {projectSettings});
                if(projectSettings.baseGameVersion){
                    return context.dispatch("loadBaseGame", {version: projectSettings.baseGameVersion})
                        .then(x => ({id}));
                }
                return {id};
            });
        },
        loadProject(context, payload){
            return loadProject(payload)
                .then(({id, files, comments, projectSettings, exports, images}) => {
                    context.commit("setProject", {files});
                    context.commit("setComments", {comments});
                    context.commit("setImages", {images});
                    context.commit("setExports", {exports});
                    context.commit("setProjectSettings", {projectSettings});
                    if(projectSettings.baseGameVersion){
                        context.dispatch("loadBaseGame", {version: projectSettings.baseGameVersion});
                    }
                });
        }
    }
}