<template>
  <div class="export-project">
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ExportProject',
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
    export():[]{
      return this.$store.state.project.export;
    }
  }
})
</script>

<style>
</style>
