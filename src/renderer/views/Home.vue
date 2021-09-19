<template>
  <div class="home">
      <p>Welcome to the EU4 Mod Editor</p>
      <div>
        <router-link to="/baseGameVersions/">Add a version of the base game</router-link>
      </div>
      <div>
        <router-link to="/addproject/">Add a new project</router-link>
      </div>
      <p>Existing projects</p>
      <ul>
        <li v-for="project in lastAccessedProjects" :key="project.id">
          <router-link :to="'/project/' + project.id">{{project.name}}</router-link>
        </li>
      </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Home',
  mounted(): void{
  },
  data(): any{
    return {
    }
  },
  computed: {
    projects(): []{
      return this.$store.state.app.projects;
    },
    lastAccessedProjects(): any[]{
      var projCopy =  [...this.projects];
      projCopy.sort((x: any, y: any) => x.lastAccessed > y.lastAccessed ? 1 : -1);
      return projCopy;
    }
  }
})
</script>

<style>
.home{
  display: flex;
  flex-direction: column;
}

</style>
