<template>
    <select :value="value" class="form-control" @change="change">
        <option v-for="item in selectList" :key="item" :value="item">{{item}}</option>
    </select>
</template>

<script lang="ts">
	import Vue from 'vue';
    import selectListData from '../forms/shared/selectLists.json';
    
    type selectListType = "monarchPower";

	export default Vue.extend({
		name: "SelectList",
		components: {
		},
		data(): any {
			return {
			};
		},
		mounted() {
		},
		props: {
            value: String,
            type: String
		},
        computed:{
            selectList(): string[]{
                var type: selectListType = this.type;
                return selectListData[type];
            }
        },
		methods: {
            change(event: any): void{
                this.$emit('input', event.target.value);
            }
		}
	});
</script>

<style lang="scss">
</style>
