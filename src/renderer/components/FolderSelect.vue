<template>
<div>
	<div class="folder-select" @click="selectFolder">
		<p v-if="fullFolderPath">{{fullFolderPath}}</p>
		<p v-if="!fullFolderPath">Click to select folder...</p>
	</div>
	<input v-show="false" type="file" @change="folderSelectChange" webkitdirectory directory multiple ref="folderFiles"/>
</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	export default Vue.extend({
		components: {
		},
		data(): any {
			return {
				fullFolderPath: ''
			};
		},
		mounted() {
			this.fullFolderPath = this.value;
		},
		props: {
			value: String
		},
		methods: {
			folderSelectChange() {
        var file = this.$refs.folderFiles.files[0];
				var modFolder: string = file.webkitRelativePath.split('/')[0];
        var fullFolderPath = file.path.split(modFolder)[0] + modFolder;
				this.$emit('change', fullFolderPath);
				this.fullFolderPath = fullFolderPath;
			},
			selectFolder(){
				this.$refs.folderFiles.click();
			}
		},
		watch: {
			value(){
				this.fullFolderPath = this.value;
			}
		}
	});
</script>

<style>
.folder-select{
	height: 50px;
	display: flex;
	width: 100%;
	justify-content: center;
	align-items: center;
	cursor: pointer;
}
</style>
