<template>
	<div class="data-editor">
        <div class="base-status" v-if="baseGame">
            <p v-if="baseGameStatus == 'overriding'">Overriding</p>
            <p v-if="baseGameStatus == 'identical'">Identical</p>
            <p v-if="baseGameStatus == 'new'">New</p>
        </div>
        <form @submit="saveForm">
            <div class="data-editor-question" v-for="question in form" :key="question.label">
                <label>{{question.label}}</label>
                <p class="hint" v-if="question.hint">{{question.hint}}</p>
                <input :value="questionGet(question, tempValue)" @input="inputChange(question, $event)" :type="question.type" class="form-control" v-if="question.type == 'text' || question.type == 'number'" />
                <select :value="questionGet(question, tempValue)" v-if="question.type == 'select'" @change="selectChange(question, $event)">
                    <option v-for="item in getSelectList(question.options)" :key="item" :value="item">{{item}}</option>
                </select>
                <modifier-input v-if="question.type == 'modifier'" @change="valueChange(question, $event)" :value="questionGet(question, tempValue)" :type="question.options"></modifier-input>
                <json-input v-if="question.type == 'json'" @change="valueChange(question, $event)" :value="questionGet(question, tempValue)" :errors="errors" :question="question" @error="jsonInputError(question, $event)"></json-input>
                <date-input v-if="question.type == 'date'" @change="valueChange(question, $event)" :value="questionGet(question, tempValue)"></date-input>
                <folder-select v-if="question.type == 'folder'" @change="valueChange(question, $event)" :value="questionGet(question, tempValue)"></folder-select>
                <div class="data-editor-question-different" v-if="!standalone">
                    <p class="old-value" v-if="!areEqual(questionGet(question, oldVal), questionGet(question, tempValue))">Was: {{questionGet(question, oldVal)}}</p>
                    <p class="base-value" v-if="baseGame && !areEqual(questionGet(question, baseGame), questionGet(question, tempValue))">Base game: {{questionGet(question, baseGame)}}</p>
                </div>
                <div class="data-editor-question-error" v-if="errors[question.label]">
                    <p>{{errors[question.label]}}</p>
                </div>
            </div>
            <div class="data-editor-buttons">
                <button @click="saveForm" type="button" :disabled="!formValid || saving" class="btn btn-save">{{saving ? "Saving..." : "Save"}}</button>
                <button class="btn btn-discard" @click="discardForm" type="button">Discard</button>
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
    import JsonInput from './JsonInput.vue';
    import FolderSelect from './FolderSelect.vue';
    import {deep, single} from '../forms/shared/isInBase';
    import _ from 'lodash';
    import {projectStore, objectStore, events, baseGameStore, appStore, baseGameObjectStore, state} from '../store/app/store.js';

    // Cen be used directly using the state store (localState),
    // Or with a supplied localState object
	export default Vue.extend({
		name: "DataFormEditor",
		components: {
            ModifierInput,
            DateInput,
            FolderSelect,
            JsonInput,
		},
		data(): any {
            return {
                errors: {},
                tempValue: {},
                baseGameStatus: '',
                saving: false,
                baseGame: {},
                integratedValue: {}
            }
		},
		created() {
            this.load();
        },
		props: {
            form: Array,
            standalone: Boolean,
            path: Array,
            value: Object,
		},
        computed:{
            objectId():string{
                return this.$route.params.objectId;
            },
            projectId(): string{
                return this.$route.params.projectId;
            },
            oldVal(): any{
                return this.standalone ? this.value : this.integratedValue;
            },
            formValid(): boolean{
                return !Object.keys(this.errors).length;
            },
        },
		methods: {
            loadIntegratedValue(){
                this.integratedValue = objectStore.getObject(this.projectId, this.path[0], this.path[1], this.objectId);
            },
            loadBaseGame(){
                if(this.standalone){return null}
                var version = projectStore.getProjectSettings(this.projectId).baseGameVersion;
                var comparison = this.getPath(single, this.path);
                this.baseGame = baseGameObjectStore.getObjectByComparison(version, this.path[0], this.path[1], (bgObj: any) => comparison(bgObj, this.integratedValue));
            },
            jsonInputError(question: any, message: string){
                if(message == null){
                    Vue.delete(this.errors, question.name);
                } else{
                    Vue.set(this.errors, question.name, message);
                }
            },
            getPath(obj: any, path: string[]){
                var objCopy = obj;
                for(var p of path){
                    objCopy = objCopy[p];
                }
                return objCopy;
            },
            questionGet(question: any, val: any){
                // don't like this but initial load throws errors because of null
                // full error checking every time is just a pain
                try{
                    return question.get(val);
                } catch{}
            },
            areEqual(o1: any, o2: any){
                if(typeof o1 === 'object' && typeof o2 === 'object'){
                    return _.isEqual(o1, o2);
                } else{
                    return o1 === o2;
                }
            },
            getSelectList(key: any): string[]{
                if(typeof key === "string"){
                    return (<any>selectLists)[key];
                }
                return key(state);
            },
            validate(value: any, question: any): boolean{
                if(question.type === "json"){
                    return !!this.errors[question.name]; // handles its own validation
                }
                var errorFound = false;
                if(!question.optional && 
                    (value === undefined || value === "" || value === null)){
                    Vue.set(this.errors, question.label, "A value is required");
                    return true;
                }
                var valids = question.validators || [];
                for(var i = 0; i < valids.length; i++){
                    var validator = valids[i];
                    var errorMessage = (<any>validators)[validator](value);
                    if(errorMessage){
                        errorFound = true;
                        Vue.set(this.errors, question.label, errorMessage.replace(/\{0\}/, value));
                    }
                }
                if(!errorFound){
                    Vue.delete(this.errors, question.label);
                }
                return errorFound;
            },
            mask(mask: any, value: any){
                return (<any>masks)[mask](value);
            },
            valueChange(question: any, value: any){
                if(question.mask){
                    value = this.mask(question.mask, value);
                }
                this.validate(value, question);
                question.set(this.tempValue, value);
            },
            inputChange(question: any, event: any){
                this.valueChange(question, event.target.value);
            },
            selectChange(question: any, event: any){
                this.valueChange(question, event.target.value);
            },
            load(){
                
                // only for integrated version
                if(!this.standalone){
                    this.loadIntegratedValue();
                    this.loadBaseGame();
                    var match = !!this.baseGame;
                    if(!match){
                        this.baseGameStatus = 'new'
                    }
                    if(deep(match, this.tempValue)){
                        this.baseGameStatus = 'identical';
                    } else {
                        this.baseGameStatus = 'overriding';
                    }
                }
                this.tempValue = JSON.parse(JSON.stringify(this.oldVal));
            },
            validateForm(){
                var formValid = true;
                this.errors = {};
                for(var question of this.form){
                    var errorFound = this.validate(question.get(this.tempValue), question);
                    if(errorFound){
                        formValid = false;
                    }
                }
                return formValid;
            },
            saveForm(event: any){
                event.preventDefault();
                if(!this.validateForm()){
                    return;
                }
                if(this.standalone){
                    this.saving = true;
                    this.$emit('save', this.tempValue, () => this.saving = false);
                } else {
                    this.saving = true;
                    this.$store.dispatch('updateProjectObject', {
                        path: this.path,
                        objectId: this.objectId,
                        projectId: this.projectId,
                        files: this.tempValue,
                    }).then(() => this.saving = false);
                }
                this.load();
            },
            discardForm(){
                this.standalone
                    && this.$emit('discard', this.tempValue)
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
