<template>
  <div class="project">
    <div class="project-loading" v-if="loading">
      <p>Project loading...</p>
    </div>
    <div class="project-body" v-if="!loading">
      <h2>{{name}}</h2>
      <router-link :to="exportLink">Export</router-link>
      <router-link :to="imagesLink">Images</router-link>
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
      loading: false,
    }
  },
  mounted(): void{
    this.load();
  },
  methods:{
    load(){
      console.log(this.$store.state.project.id, this.projectId);
      if(this.$store.state.project.id !== this.projectId){
        this.loading = true;
        this.$store.dispatch("loadProject", {id: this.projectId})
          .then(() => this.loading = false);
      }
    }
  },
  computed:{
    name(): string{
      return this.$store.state.app.projectSettings.name
    },
    project(): any{
      return this.$store.state.project;
    },
    projectId(): string{
      return this.$route.params.projectId;
    },
    exportLink(): string{
      return `/project/${this.projectId}/export`
    },
    imagesLink(): string{
      return `/project/${this.projectId}/images`
    },
    advisorLink():string{
      return `/project/${this.projectId}/edit/advisors`;
    },
  },
  watch:{
    $route(){
      this.load();
    }
  }
})
</script>

<style>
.project-body{
  display: flex;
  flex-direction: column;
}
</style>
