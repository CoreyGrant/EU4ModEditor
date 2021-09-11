<template>
  <div class="import-project">
    <div>
    <label for="project-name">Project name</label>
    <input id="project-name" class="form-control" type="text" v-model="projectName"/>
    </div>
    <div>
    <label>Mod folder</label>
    <p class="hint">Usually has the mod id as the name, and contains the common/events/map folders.</p>
    <folder-select @change="folderSelectChange"></folder-select>
    </div>
    <button type="button" @click="importProject" v-bind:disabled="!projectName || !projectPath">Import</button>
    <p class="error" v-if="error">Something went wrong</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { importProject } from '../../ipc/project';
import FolderSelect from '../../components/FolderSelect.vue';

export default Vue.extend({
  name: 'ImportProject',
  components:{
    FolderSelect
  },
  data: function(): any{
    return {
      projectName: '',
      projectPath: '',
      error: false,
    }
  },
  methods:{
    folderSelectChange(path: string): void{
      this.projectPath = path;
    },
    importProject(): void{
      const name = this.projectName;
      this.$store.dispatch("importProject", {name, path: this.projectPath, done: () => this.$router.push(`/project/${name}`)});
    }
  },
  watch:{
    projectName(newVal, oldVal){
      this.projectName = newVal.replace(/\s/g, '_');
    }
  }
})
</script>

<style>
</style>
