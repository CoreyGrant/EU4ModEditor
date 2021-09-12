import {saveOptions, loadOptions} from '../../ipc/options';
import {getProjectSummaries} from '../../ipc/project';

export default {
    state :() =>({
        projectNames: [],
        options: {
            eu4Path: '',
            prettyPrint: 'no'
        },
        importingBaseGame: false
    }),
    mutations: {
        setOptions(state, payload){
            state.options = payload.options;
        },
        setProjectNames(state, payload){
            state.projectNames = payload.projectNames;
        },
        setImportingBaseGame(state, payload){
            state.importingBaseGame = payload.importingBaseGame;
        }
    },
    actions: {
        loadOptions(context, payload){
            loadOptions(options => {
                console.log(options);
                context.commit('setOptions', {options});
            })
        },
        saveOptions(context, payload){
            saveOptions(payload.options, () => {});
        },
        loadProjectNames(context){
            getProjectSummaries((projectNames) => 
                context.commit("setProjectNames", {projectNames})
            );
        }
    }
}