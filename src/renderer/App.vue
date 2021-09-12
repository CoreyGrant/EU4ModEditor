<template>
  <div id="app" class="container-fluid">
    <side-navigation></side-navigation>
    <div class="app-content">
      <navigation></navigation>
      
      <RouterView />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex';
import Navigation from './views/shared/Navigation.vue'
import SideNavigation from './views/shared/SideNavigation.vue'
import store from './store/index';
import router from './router/index';


Vue.use(Vuex)

export default Vue.extend({
  name: 'Eu4ModEditor',
  store,
  router,
  components:{
    Navigation,
    SideNavigation
  },
  mounted(){
    this.$store.dispatch("loadOptions");
    this.$store.dispatch("loadProjectNames");
  },
  methods(){

  },
  watch:{
    $route(to, from){
      if(from.params.name && !to.params.name && Object.keys(this.$store.state.localState).length){
        this.$router.push(`/project/${from.params.name}/changes?redirect=${encodeURI(to.path)}`);
      }
      if(to.params.name && to.params.name !== from.params.name){
        this.$store.dispatch("loadProject", {name: to.params.name});
      }
      if(from.params.name && !to.params.name){
        this.$store.commit('clearProject');
      }
      if(to.params.name == 'home'){
        this.$store.dispatch("loadProjectNames");
      }
    }
  }

})
</script>

<style lang="scss">

</style>
