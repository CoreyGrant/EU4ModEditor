import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'

import modules from './modules'


Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production',
  state: {
  },
  mutations: {
    
    // updateProjectObject(state, payload){
    //   var projectPath = payload.projectPath;
    //   var objectPath = payload.objectPath;
    //   var id = payload.id;
    //   var key = payload.key;
    //   var value = payload.value;
    //   var type = payload.type;
    //   var obj = state.project;
    //   // project path is the list of keys down to the object list
    //   // i.e. ["common", "advisorTypes"]
    //   for(var i = 0; i < projectPath.length; i++){
    //     obj = obj[projectPath[i]];
    //   }
    //   // obj should now be a list of objects, find ours by the id
    //   obj = obj.find(x => x.id == id);
    //   // objectPath is the list of keys on the object down to object containing the one
    //   // we want to update
    //   for(var i = 0; i < objectPath.length; i++){
    //     obj = obj[objectPath[i]];
    //   }
    //   if(type == "add"){
    //     Vue.set(obj, key, value);
    //   } else if(type == "update"){
    //     payload.oldValue = obj[key];
    //     obj[key] = value;
    //   } else if(type == "delete"){
    //     payload.oldValue = obj[key];
    //     delete obj[key];
    //   }
      
    //   state.changes.push(payload);
    // }
  },
  actions: {
    
    
  }
  // TODO: Enable when deploy
  // plugins: [createPersistedState()]
})
