<template>
	<div class="image-folder">
      <div class="image-folder-row" v-for="(subFolder, subFolderName) in folder" :key="subFolderName">
          <div class="image-folder-folder" v-if="isFolder(subFolderName)">
              <div class="image-folder-folder-collapse" @click="toggle(subFolderName)">
                <p>{{subFolderName}}</p>
                <i class="fa fa-chevron-up" v-if="!open[subFolderName]"></i>
                <i class="fa fa-chevron-down"  v-if="open[subFolderName]"></i>
              </div>
              <image-folder :folder="subFolder" :name="name" v-if="open[subFolderName]"></image-folder>
          </div>
          <div class="image-folder-file" v-if="!isFolder(subFolderName)">
            <image-display :id="subFolder" :name="name" :format="ext(subFolderName)"></image-display>
            <p>{{subFolderName}}</p>
          </div>
      </div>
    </div>
</template>

<script lang="ts">
	import Vue from 'vue';
    import ImageDisplay from './ImageDisplay.vue';

	export default Vue.extend({
		name: "ImageFolder",
		components: {
            ImageDisplay
		},
		data(): any {
			return {
                open: {}
			};
		},
		mounted() {
		},
		props: {
            folder: Object,
            name: String,
		},
		methods: {
            ext(name: string): string{
                return name.split(".")[1];
            },
            isFolder(val: string): boolean{
                return val.indexOf('.') === -1;
            },
            toggle(folderName: string){
                Vue.set(this.open, folderName, !this.open[folderName]);
            }
		},
        computed:{
            subFolders(){

            }
        }
	});
</script>

<style lang="scss">
.image-folder{
    display: flex;
    flex-direction: column;
    .image-folder-row{
        display: flex;
        padding-left: 10px;
        .image-folder-folder{
            .image-folder-folder-collapse{
                display: flex;
                height: 30px;
            }
        }
        .image-folder-file{

        }
    }
    .image-display{
        height: 30px;
        width: 30px;
    }
}
</style>
