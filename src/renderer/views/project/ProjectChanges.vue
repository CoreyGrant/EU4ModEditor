<template>
  <div class="project-changes">
      <datatable :columns="columns" :data="localStateArray"></datatable>
      <button @click="discardChanges()">Discard changes</button>
      <button @click="saveChanges()">Save changes</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Datatable from '../../components/Datatable.vue';

export default Vue.extend({
  name: 'ProjectChanges',
  components: {
    Datatable,
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
    localState(): string{
      return this.$store.state.localState;
    },
    localStateArray():any[]{
        var keys = Object.keys(this.localState);
        return keys.map(x => ({
            id: x,
            path: this.localState[x].path
        }))
    },
    columns(): any[]{
        return [{
            title: "Link",
            display: (a: any) => a.path,
            link: (a: any) => a.path
        }];
    }
  },
  methods: {
      discardChanges(){
          this.$store.commit("discardLocalState", {});
      },
      saveChanges(){
          this.$store.dispatch("saveLocalState", {})
      }
  }
})
</script>

<style>
</style>
