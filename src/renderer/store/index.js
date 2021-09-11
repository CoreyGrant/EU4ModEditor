import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'

import modules from './modules'
import {getProjectSummaries, importProject, loadProject, saveProject} from '../ipc/project';
import {saveOptions, loadOptions} from '../ipc/options';

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production',
  state: {
    project: {
    },
    projectNames: [],
    localState: {},
    options: {
      eu4Path: '',
      prettyPrint: 'no'
    },
    optionsLoaded: false
  },
  mutations: {
    discardLocalState(state, payload){
      var id = payload.id;
      if(id){
        Vue.delete(state.localState, id);
      } else{
        state.localState = {};
      }
      localStorage.setItem(state.project.name + '-localState', JSON.stringify(state.localState));
    },
    clearProject(state, payload){
      state.project = {};
      state.localState = {};
    },
    setLocalState(state, payload){
      var localState = payload.localState;
      Vue.set(state.localState, localState.id, localState);
      localStorage.setItem(state.project.name + '-localState', JSON.stringify(state.localState));
    },
    loadLocalState(state, payload){
      state.localState = payload.localState;
    },
    setProject(state, payload){
      state.project = payload.project;
      if(payload.done){
        payload.done();
      }
    },
    setOptions(state, payload){
      state.options = payload.options;
      state.optionsLoaded = true;
    },
    setProjectNames(state, payload){
      state.projectNames = payload.projectNames;
    },
    saveLocalState(state, payload){
      var id = payload.id;
      var replace = (id) => {
        var item = state.localState[id];
        for(var key in state.project){
          if(key == 'export'){continue;}
          var obj = state.project[key];

          if(typeof obj !== "object" ){continue;}

          for(var subKey in obj){
            var arr = obj[subKey];

            if(!arr.length){continue;}
            console.log(key, subKey, arr);
            var possible = arr.find(x => x.id === id);
            if(possible){
              arr.splice(arr.indexOf(possible), 1, item);
              Vue.delete(state.localState,id);
            }
          }
        }
      }
      if(id){
        replace(id);
      } else{
        for(var key in state.localState){
          replace(key);
        }
      }
      localStorage.setItem(state.project.name + '-localState', JSON.stringify(state.localState));
    },
    updateProjectObject(state, payload){
      var projectPath = payload.projectPath;
      var objectPath = payload.objectPath;
      var id = payload.id;
      var key = payload.key;
      var value = payload.value;
      var type = payload.type;
      var obj = state.project;
      // project path is the list of keys down to the object list
      // i.e. ["common", "advisorTypes"]
      for(var i = 0; i < projectPath.length; i++){
        obj = obj[projectPath[i]];
      }
      // obj should now be a list of objects, find ours by the id
      obj = obj.find(x => x.id == id);
      // objectPath is the list of keys on the object down to object containing the one
      // we want to update
      for(var i = 0; i < objectPath.length; i++){
        obj = obj[objectPath[i]];
      }
      if(type == "add"){
        Vue.set(obj, key, value);
      } else if(type == "update"){
        payload.oldValue = obj[key];
        obj[key] = value;
      } else if(type == "delete"){
        payload.oldValue = obj[key];
        delete obj[key];
      }
      
      state.changes.push(payload);
    }
  },
  actions: {
    loadLocalState(context, payload){
      var localState = JSON.parse(localStorage.getItem(
        payload.name + '-localState') || {});
      context.commit('loadLocalState', {localState});
    },
    saveLocalState(context, payload){
      context.commit('saveLocalState', payload);
      context.dispatch('saveProject');
    },
    saveProject(context, payload){
      // send to backend
      // scary, will bork project if wrong
      saveProject(context.state.project, () => {});
    },
    loadOptions(context, payload){
      loadOptions(options => {
        context.commit('setOptions', {options});
      })
    },
    saveOptions(context, payload){
      saveOptions(payload.options, () => {});
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
    },
    loadProjectNames(context){
      getProjectSummaries((projectNames) => 
        context.commit("setProjectNames", {projectNames})
      );
    }
  }
  // TODO: Enable when deploy
  // plugins: [createPersistedState()]
})
