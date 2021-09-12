import Vue from "vue";

export default {
    state :() =>({

    }),
    mutations: {
        discardLocalState(state, payload, rootState){
            var id = payload.id;
            var name = payload.name;
            if(id){
              Vue.delete(state, id);
            } else{
              Object.keys(state).forEach(s => Vue.delete(state, s));
            }
            localStorage.setItem(
                name + '-localState',
                JSON.stringify(state));
          },
          clearProject(state, payload){
            Object.keys(state).forEach(s => Vue.delete(state, s));
          },
          setLocalState(state, payload){
            var localState = payload.localState;
            var name = payload.name;
            Vue.set(state, localState.id, localState);
            localStorage.setItem(
                name + '-localState',
                JSON.stringify(state));
          },
          loadLocalState(state, payload){
            Object.keys(state).forEach(s => Vue.delete(state, s));
            Object.keys(payload.localState).forEach(s => Vue.set(state, s, payload.localState[s]));
          },
          saveLocalState(state, payload, rootState){
            var id = payload.id;
            var name = payload.name;
            var replace = (id) => {
              var item = state[id];
              for(var key in state.project){
                if(key == 'export'){continue;}
                var obj = rootState.project[key];
      
                if(typeof obj !== "object" ){continue;}
      
                for(var subKey in obj){
                  var arr = obj[subKey];
      
                  if(!arr.length){continue;}
                  console.log(key, subKey, arr);
                  var possible = arr.find(x => x.id === id);
                  if(possible){
                    arr.splice(arr.indexOf(possible), 1, item);
                    Vue.delete(state,id);
                  }
                }
              }
            }
            if(id){
              replace(id);
            } else{
              for(var key in state){
                replace(key);
              }
            }
            localStorage.setItem(name + '-localState', JSON.stringify(state));
          },
    },
    actions: {
        loadLocalState(context, payload){
            var localState = JSON.parse(
                localStorage.getItem(payload.name + '-localState') || "{}"
            );
            context.commit('loadLocalState', {localState});
        },
        saveLocalState(context, payload){
            context.commit('saveLocalState', payload);
            context.dispatch('saveProject');
        },
    }
}