<template>
	<div class="image-display">
        <img :src="'data:image/png;base64,' + imageData" v-if="type=='img' && imageData"/>
        <canvas v-if="type == 'canvas'" ref="imageCanvas"></canvas>
    </div>
</template>

<script lang="ts">
	import Vue from 'vue';
    import {displayImageCanvasDds} from '../imageCanvas';

	export default Vue.extend({
		name: "ImageDisplay",
		components: {
		},
		data(): any {
            return {
                loading: false,
                failed: false,
                type: ''
            };
		},
		mounted() {
            this.loadImage();
            this.load();
		},
		props: {
            format: String,
            id: String,
            name: String, // project name
		},
        computed:{
            imageData(): string{
                return (this.$store.state.image[this.name] || {})[this.id];
            }
        },
		methods: {
            loadImage(){
                if(!this.imageData){
                    this.$store.dispatch('loadImage', {
                        name: this.name,
                        id: this.id,
                        format: this.format
                    }); 
                }
            },
            load(): void{
                if(!this.imageData){
                    return;
                }
                switch(this.format){
                    case 'tga':
                        this.type = 'img';
                        break;
                    case 'dds':
                        this.type = 'canvas';
                        break;
                }
                if(this.type == 'canvas'){
                    // set up the canvas for the file type
                    if(this.format == 'dds'){
                        var canvas = this.$refs.imageCanvas;
                        if(!canvas){
                            Vue.nextTick(() => this.load());
                        } else {
                            displayImageCanvasDds(canvas, this.imageData);
                        }
                    }
                }
            }
		},
        watch: {
            imageData(newVal){
                this.load();
            },
            id(){
                this.loadImage();
            }
        }
	});
</script>

<style lang="scss">
</style>
