<template>
	<div class="condition-set-input">
      <textarea class="form-control" style="width: 100%;" rows="8" :value="tempValue" @input="change($event.target.value)"></textarea>
    </div>
</template>

<script lang="ts">
	import Vue from 'vue';
    /*
    All creating and editing of condition sets
    Each condition set is made up of multiple conditions,
    and multiple condition sets
    */
	export default Vue.extend({
		name: "ConditionSetInput",
		components: {
		},
		data(): any {
			return {
				tempValue: ''
			};
		},
		mounted() {
			this.load();
		},
		props: {
			value: Object,
            type: String,// effect/trigger
            internal: String, // country/province
		},
		methods: {
			load(){
				this.tempValue = JSON.stringify(this.value, null, 2);
			},
			change(val:string){
				this.tempValue = val;
				this.$emit('change', val);
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
