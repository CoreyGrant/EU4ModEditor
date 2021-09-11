<template>
  <div class="file">
    <div class="file-filename">
      <display-input v-model="file.name"></display-input>
    </div>
    <div class="file-filepath">
      <display-input v-model="file.fullPath"></display-input>
    </div>
    <div class="file-body" v-if="file.name && file.type == 0">
      <data-file-editor v-model="file.data"></data-file-editor>
    </div>
    <div class="file-body" v-if="file.name && file.type == 2">
      <img v-if="image" :src="'data:image/png;base64,' + image"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Project, findFileInProject, ProjectFile } from '../../models/project';
import {loadProject} from '../ipc/project';
import {loadImage} from '../ipc/image';
import DataFileEditor from '../components/DataFileEditor.vue';
import DisplayInput from '../components/DisplayInput.vue';

type FileData = {file: ProjectFile};

export default Vue.extend({
  name: 'File',
  components:{
    DataFileEditor,
    DisplayInput,
  },
  data(): any{
    return {
      file: new ProjectFile(),
      image: '',
    }
  },
  mounted(): void{
    loadProject(this.$route.params["projectName"], (project: Project) => {
      var filePath = decodeURI(this.$route.params["path"]);
      this.file = findFileInProject(project, filePath);
      console.log(filePath, this.file);
      if(this.file && this.file.type == 2){
        loadImage(this.file.id, this.$route.params["projectName"], (image: string)=>{
          this.image = image;
        });
      }
    });
  },
  computed:{
  },
  watch:{
    $route(to, from){
      loadProject(to.params["projectName"], (project: Project) => {
      var filePath = decodeURI(to.params["path"]);
      this.file = findFileInProject(project, filePath);
      if(this.file && this.file.type == 2){
        loadImage(this.file.id, to.params["projectName"], (image: string)=>{
          this.image = image;
        });
      }
    });
    }
  }
})
</script>

<style lang="scss">
.file{
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 100%;
}
.file-filepath{
  p{
    font-size: 8pt;
  }
}
.file-filename{
  p{
    font-size: 13pt;
  }
}
</style>
