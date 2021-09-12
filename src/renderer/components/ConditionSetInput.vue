<template>
	<div class="condition-set-input">
      
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
			};
		},
		mounted() {
		},
		props: {
            type: String,// effect/trigger
            internal: String, // country/province
		},
		methods: {
		}
	});
</script>

<style lang="scss">
</style>
