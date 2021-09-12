<template>
  <div>
      <p>Welcome to the EU4 Mod Editor</p>
      <p v-if="!hasEu4Path">No EU4 path selected. Go to options to load the EU4 data files.</p>
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
    this.$store.dispatch("loadBaseGame");
  },
  data(): any{
    return {
    }
  },
  computed: {
    projects(): []{
      return this.$store.state.app.projectNames;
    },
    hasEu4Path(): boolean{
      return this.$store.state.app.options.eu4Path;
    }
  }
})
</script>

<style>
</style>
