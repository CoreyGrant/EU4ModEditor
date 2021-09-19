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
import router from './router/index';


//Vue.use(Vuex)

export default Vue.extend({
  name: 'Eu4ModEditor',
  router,
  components:{
    Navigation,
    SideNavigation
  },
  mounted(){

  },
  methods: {

  },
  watch:{
  }

})
</script>

<style lang="scss">

</style>
