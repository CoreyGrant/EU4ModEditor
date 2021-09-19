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
import {appStore, events} from '../store/app/store.js';

export default Vue.extend({
  name: 'Home',
  mounted(): void{
    events.projectListLoaded
      .register(() => this.projectList = appStore.getProjectList());
  },
  data(): any{
    return {
      projectList: appStore.getProjectList(),
    }
  },
  computed: {
    lastAccessedProjects(): any[]{
      var projCopy =  [...this.projectList];
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
