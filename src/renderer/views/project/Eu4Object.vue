<template>
  <div class="eu4-object">
    
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { loadProject } from '../../ipc/project';
import {Project} from '../../../models/project';
import FolderContainer from '../../components/FolderContainer.vue';

export default Vue.extend({
  name: 'Eu4Object',
  components: {
    FolderContainer,
  },
  data(): any{
    return {
    }
  },
  mounted(): void{
  },
})
</script>

<style>
</style>
