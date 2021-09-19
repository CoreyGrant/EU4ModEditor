<template>
	<div class="chance-input">
      <textarea class="form-control" style="width: 100%;" rows="8" :value="tempValue" @input="change($event.target.value)"></textarea>
    </div>
</template>

<script lang="ts">
	import Vue from 'vue';

	export default Vue.extend({
		name: "ChanceInput",
		components: {
		},
		data(): any {
			return {
				tempValue: ''
			};
		},
		mounted() {

		},
		props: {
            value: Object
		},
		methods: {
			load(){
				this.tempValue = JSON.stringify(this.value, null, 2);
			},
			change(val:string){
				this.tempValue = val;
				var jsonVal;
				try{
					jsonVal = JSON.parse(val);
				}catch{}
				if(jsonVal){
					this.$emit('change', jsonVal);
				}
			}
		},
		watch:{
			$route(){
				this.load();
			},
			value(){
				this.load();
			}
		}
	});
</script>

<style lang="scss">
</style>
