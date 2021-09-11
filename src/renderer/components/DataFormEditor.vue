<template>
	<div class="data-editor">
        <form>
            <div class="data-editor-question" v-for="question in form" :key="question.label">
                <label>{{question.label}}</label>
                <p class="hint" v-if="question.hint">{{question.hint}}</p>
                <input :value="question.get(tempValue)" @input="inputChange(question, $event)" :type="question.type" class="form-control" v-if="question.type == 'text' || question.type == 'number'" />
                <select :value="question.get(tempValue)" v-if="question.type == 'select'" @change="selectChange(question, $event)">
                    <option v-for="item in getSelectList(question.options)" :key="item" :value="item">{{item}}</option>
                </select>
                <bonus-input v-if="question.type == 'bonus'"></bonus-input>
                <date-input v-if="question.type == 'date'" @change="valueChange(question, $event)" :value="question.get(tempValue)"></date-input>
                <folder-select v-if="question.type == 'folder'" @change="valueChange(question, $event)" :value="question.get(tempValue)"></folder-select>
                <p class="old-value" v-if="question.get(value) !== question.get(tempValue)">{{question.get(value)}}</p>
            </div>
            <div class="data-editor-buttons">
                <button @click="saveForm" type="button">Save</button>
                <button @click="discardForm" type="button">Discard</button>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
	import Vue from 'vue';
    import masks from '../forms/shared/masks';
    import validators from '../forms/shared/validators';
    import selectLists from '../forms/shared/selectLists.json';
    import BonusInput from './BonusInput.vue';
    import DateInput from './DateInput.vue';
    import FolderSelect from './FolderSelect.vue';
    
    // Displays a list of displayInputs recursively for the supplied object
    // As well as allowing a new property to be added at any level
	export default Vue.extend({
		name: "DataFormEditor",
		components: {
            BonusInput,
            DateInput,
            FolderSelect,
		},
		data(): any {
            return {
                errors: {},
                tempValue: {path: ''}
            }
		},
		created() {
            this.load();
        },
		props: {
            form: Array,
            value: Object,
            localState: Object
		},
        computed:{
            id():string{
                return this.$route.params.id;
            },
            hasChanges(): boolean{
                return !!this.getLocalState;
            },
            getLocalState(): any{
                return this.localState || this.$store.state.localState[this.id]
            }
        },
		methods: {
            getSelectList(key: any): string[]{
                if(typeof key === "string"){
                    return (<any>selectLists)[key];
                }
                return key(this.$store.state);
            },
            validate(value: any, question: any){
                var valids = question.validators;
                for(var i = 0; i < valids.length; i++){
                    var validator = valids[i];
                    var errorMessage = (<any>validators)[validator](value);
                    if(errorMessage){
                        Vue.set(this.errors, question.name, errorMessage.replace(/\{0\}/, value));
                    }
                }
            },
            mask(mask: any, value: any){
                return (<any>masks)[mask](value);
            },
            valueChange(question: any, value: any){
                if(question.mask){
                    value = this.mask(question.mask, value);
                }
                question.set(this.tempValue, value);
                if(!this.localState){
                    Vue.nextTick(() => {
                        this.tempValue.path = this.$route.path;
                        this.$store.commit('setLocalState', {localState: JSON.parse(JSON.stringify(this.tempValue))});
                });
                }
            },
            inputChange(question: any, event: any){
                this.valueChange(question, event.target.value);
            },
            selectChange(question: any, event: any){
                this.valueChange(question, event.target.value);
            },
            load(){
                this.tempValue = this.hasChanges
                    ? JSON.parse(JSON.stringify(this.getLocalState))
                    : JSON.parse(JSON.stringify(this.value));
            },
            saveForm(){
                this.localState 
                    ? this.$emit('change', this.localState)
                    : this.$store.dispatch('saveLocalState', {id: this.id})
            },
            discardForm(){
                this.localState
                    ? this.$emit('change', this.localState)
                    : this.$store.commit('discardLocalState', {id: this.id});
                this.load();
            }
		},
        watch: {
        }
	});
</script>

<style lang="scss">
</style>
