<template>
	<div class="display-input" :class="borderClass">
        <div class="display-input-display" v-if="!editing">
            <p>{{value}}</p>
            <i class="fa fa-edit" @click="startEditing"></i>
        </div>
        <div class="display-input-input" v-if="editing">
            <div class="d-flex flex-col">
                <textarea :type="type || 'text'" class="form-control" v-model="editingValue" v-if="isInput"></textarea>
                <select-list v-model="editingValue" v-if="isSelectList" :type="type"></select-list>
                <p class="strike-hint" v-if="value !== editingValue">{{value}}</p>
            </div>
            <div>
            <i class="fa fa-save" @click="saveEdit()" :disabled="!editingValue || editingValue === value"></i>
            <i class="fa fa-undo" @click="undoEdit()"></i>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
	import Vue from 'vue';
    import SelectList from './SelectList.vue';

	export default Vue.extend({
		name: "DisplayInput",
		components: {
            SelectList
		},
		data(): any {
			return {
                editingValue: '',
                editing: false,
			};
		},
		mounted() {
		},
		props: {
            value: String,
            type: String,
            border: Boolean
		},
        computed:{
          isInput(): boolean{
              return !this.isSelectList;
          },
          isSelectList(): boolean{
              return this.type == "monarchPower";
          },
          borderClass(): string{
              return this.border ? "display-input-border" : "";
          }  
        },
		methods: {
            startEditing(){
                this.editingValue = this.value;
                this.editing = true;
            },
            saveEdit(){
                this.$emit("input", this.editingValue);
                this.editing = false;
                this.editingValue = '';
            },
            undoEdit(){
                this.editing = false;
                this.editingValue = '';
            }
		}
	});
</script>

<style lang="scss">
.display-input{
    max-height: 200px;
    padding: 3px 8px;
}
.display-input-border{
    border: 2px double rgb(165, 121, 66);
}
.display-input-display{
    display: flex;
    justify-content: space-between;
}
.display-input-input{
    display: flex;
    justify-content: space-between;
    textarea{
        width: 400px;
        height: 80px;
        resize: none;
    }
}
.strike-hint{
    color: grey;
    text-decoration: line-through;
}
i.fa{
    cursor: pointer;
    margin-left: 8px;
    margin-top: 3px;
}
</style>
