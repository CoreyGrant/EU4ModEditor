import {importProject, loadProject, saveProject} from '../../ipc/project';
import Vue from 'vue';

export default {
    state :() =>({
    }),
    mutations: {
        clearProject(state, payload){
            Object.keys(state).forEach(s => Vue.delete(state, s));
        },
        setProject(state, payload){
            Object.keys(payload.project).forEach(s => Vue.set(state, s, payload.project[s]));
            if(payload.done){
                payload.done();
            }
        },
    },
    actions: {
        saveProject(context, payload){
            // send to backend
            // scary, will bork project if wrong
            saveProject(context.state, () => {});
        },
        importProject(context, payload){
            importProject({name: payload.name, path: payload.path}, (project) => 
                context.commit("setProject", {project, done: payload.done})
            );
        },
        loadProject(context, payload){
            var name = payload.name;
            context.dispatch('loadLocalState', {name});
            loadProject(name, (project) => {
                context.commit("setProject", {project});
            });
        }
    }
}