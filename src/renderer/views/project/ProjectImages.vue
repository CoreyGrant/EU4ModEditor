<template>
  <div class="project-images">
    <image-folder :folder="folderState" :name="name"></image-folder>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ImageFolder from '../../components/ImageFolder.vue';

export default Vue.extend({
  name: 'ProjectImages',
  components: {
      ImageFolder
  },
  data(): any{
    return {
        folderState: {}
    }
  },
  mounted(): void{
      this.load();
  },
  computed:{
    images(): any{
      return this.$store.state.project.images;
    },
    name(): string{
        return this.$route.params.name;
    }
  },
  methods: {
      load(){
          this.folderState = this.createFolders(this.images);
      },
      createFolders(images: any[]){
          var folders:any = {};
          /*
          {
              gfx: {
                  interface:{
                      ideas_EU4:{
                          "modifierfile.dds":
                      }
                  }
              }
          }
          */
          for(var image of images){
            var pathParts = image.localPath.split('\\').filter((x:any) => x);
            var temp = folders;
            for(var pathPart of pathParts){
                if(pathPart.indexOf(".") > -1){
                    // file, final part
                    temp[pathPart] = image.id;
                } else {
                    if(!temp[pathPart]){
                        temp[pathPart] = {};
                    }
                    temp = temp[pathPart];
                }
            }
          }
          return folders;
      }
  }
})
</script>

<style lang="scss">
.project-images{
overflow-y: auto;
}
</style>
