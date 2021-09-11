<template>
  <div class="project">
    <div class="loading" v-if="!project"></div>
    <div class="project-body" v-if="project">
      <h2>{{project.name}}</h2>
      <p>Path: {{project.baseFilePath}}</p>
      <router-link :to="exportLink">Export settings</router-link>
      <ul>
        <li><router-link :to="advisorLink">Advisors</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Project',
  components: {
  },
  data(): any{
    return {
    }
  },
  mounted(): void{
  },
  computed:{
    project(): any{
      return this.$store.state.project;
    },
    exportLink(): string{
      return `/project/${this.project.name}/export`
    },
    advisorLink():string{
      return `/project/${this.project.name}/edit/advisors`;
    },
  }
})
</script>

<style>
</style>
