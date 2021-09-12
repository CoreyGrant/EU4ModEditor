<template>
	<div class="data-editor">
        <div class="base-status" v-if="baseGameValue">
            <p v-if="baseGameStatus == 'overriding'">Overriding</p>
            <p v-if="baseGameStatus == 'identical'">Identical</p>
            <p v-if="baseGameStatus == 'new'">New</p>
        </div>
        <form>
            <div class="data-editor-question" v-for="question in form" :key="question.label">
                <label>{{question.label}}</label>
                <p class="hint" v-if="question.hint">{{question.hint}}</p>
                <input :value="question.get(tempValue)" @input="inputChange(question, $event)" :type="question.type" class="form-control" v-if="question.type == 'text' || question.type == 'number'" />
                <select :value="question.get(tempValue)" v-if="question.type == 'select'" @change="selectChange(question, $event)">
                    <option v-for="item in getSelectList(question.options)" :key="item" :value="item">{{item}}</option>
                </select>
                <modifier-input v-if="question.type == 'modifier'" @change="valueChange(question, $event)" :value="question.get(tempValue)"></modifier-input>
                <ai-will-do-input v-if="question.type == 'aiwilldo'" @change="valueChange(question, $event)" :value="question.get(tempValue)"></ai-will-do-input>
                <date-input v-if="question.type == 'date'" @change="valueChange(question, $event)" :value="question.get(tempValue)"></date-input>
                <folder-select v-if="question.type == 'folder'" @change="valueChange(question, $event)" :value="question.get(tempValue)"></folder-select>
                <div class="data-editor-question-different">
                    <p class="old-value" v-if="question.get(value) !== question.get(tempValue)">Was: {{question.get(value)}}</p>
                    <p class="base-value" v-if="baseGameValue && question.get(baseGameValue) !== question.get(tempValue)">Base game: {{question.get(baseGameValue)}}</p>
                </div>
                
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
    import ModifierInput from './ModifierInput.vue';
    import DateInput from './DateInput.vue';
    import FolderSelect from './FolderSelect.vue';
    import {deep} from '../forms/shared/isInBase';

    // Cen be used directly using the state store (localState),
    // Or with a supplied localState object
	export default Vue.extend({
		name: "DataFormEditor",
		components: {
            ModifierInput,
            DateInput,
            FolderSelect,
		},
		data(): any {
            return {
                errors: {},
                tempValue: {path: ''},
                baseGameStatus: '',
            }
		},
		created() {
            this.load();
        },
		props: {
            form: Array,
            value: Object,
            localState: Object,
            baseGameValue: Object,
		},
        computed:{
            id():string{
                return this.$route.params.id;
            },
            name(): string{
                return this.$route.params.name;
            },
            getLocalState(): any{
                return this.localState || (
                    this.$store.state.localState[this.id]
                        ? JSON.parse(JSON.stringify(this.$store.state.localState[this.id]))
                        : undefined);
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
                        this.$store.commit('setLocalState', {name: this.name, localState: JSON.parse(JSON.stringify(this.tempValue))});
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
                Vue.nextTick(() => {
                    this.tempValue = this.getLocalState
                        ? this.getLocalState
                        : JSON.parse(JSON.stringify(this.value));
                    // only for integrated version
                    if(!this.localState){
                        var match = !!this.baseGameValue;
                        if(!match){
                            this.baseGameStatus = 'new'
                        }
                        if(deep(match, this.tempValue)){
                            this.baseGameStatus = 'identical';
                        } else {
                            this.baseGameStatus = 'overriding';
                        }
                    }
                });
            },
            saveForm(){
                this.localState 
                    ? this.$emit('save', this.tempValue)
                    : this.$store.dispatch('saveLocalState', {name: this.name, id: this.id});
                this.load();
            },
            discardForm(){
                this.localState
                    ? this.$emit('discard', this.tempValue)
                    : this.$store.commit('discardLocalState', {name: this.name, id: this.id});
                this.load();
            }
		},
        watch: {
            $route: {
                deep: true,
                handler: function() {this.load();}
            }
        }
	});
</script>

<style lang="scss">
</style>
