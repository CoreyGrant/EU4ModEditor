import { loadSettings, loadProjectList, saveSettings } from "../../webworkers/workers";

export default {
    state :() =>({
        projects: window.eu4modeditor.default.projectList,
        settings: window.eu4modeditor.default.appSettings,
        projectSettings: {
            baseGameVersion: null,
            name: '',
        },
        baseGameVersions: window.eu4modeditor.default.baseGameVersions
    }),
    mutations: {
        setSettings(state, payload){
            state.options = payload.appSettings;
        },
        // called from importing/loading project
        setProjectSettings(state, payload){
            state.projectSettings = payload.projectSettings;
        },
        setProjects(state, payload){
            state.projects = payload.projects;
        },
        // called when importing a base game
        setBaseGameVersions(state, payload){
            state.baseGameVersions = payload.baseGameVersions;
        }
    },
    actions: {
        loadSettings(context, payload){
            return loadSettings(payload)
                .then((appSettings) => context.commit('setSettings', {appSettings}));
        },
        saveSettings(context, payload){
            context.commit("setSettings", {projectSettings: payload})
            return saveSettings(payload);
        },
        loadProjects(context, payload){
            return loadProjectList(payload)
            .then((projects) => context.commit('setProjects', {projects}));
        },
    }
}