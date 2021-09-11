<template>
  <div>
      <router-link to="/addproject/">Add a new project</router-link>
      <p>Existing projects</p>
      <ul>
        <li v-for="project in projects" :key="project">
          <router-link :to="'/project/' + project">{{project}}</router-link>
        </li>
      </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Home',
  mounted(): void{
    this.$store.dispatch('loadProjectNames');
  },
  data(): any{
    return {
    }
  },
  computed: {
    projects(): []{
      return this.$store.state.projectNames;
    }
  }
})
</script>

<style>
</style>
