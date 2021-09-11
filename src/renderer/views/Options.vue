<template>
  <div class="application-options">
      <h2>Options</h2>
      <data-form-editor :form="optionsForm" :value="options" :local-state="localState" @save="save" @discard="discard"></data-form-editor>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import DataFormEditor from '../components/DataFormEditor.vue'
import {optionsForm} from '../forms/options';

export default Vue.extend({
  name: 'Options',
  components:{
    DataFormEditor
  },
  mounted(): void{
      this.localState = this.options;
  },
  data(): any{
    return {
        localState: {}
    }
  },
  computed: {
    options(): any{
      return this.$store.state.options;
    },
    optionsForm():any[]{
        return optionsForm;
    }
  },
  methods: {
      eu4PathChange(path: string){
          this.optionsChange(Object.assign({}, this.options, { eu4Path: path}));
      },
      optionsChange(options: any){
          this.$store.commit('setOptions', {options})
      },
      saveOptions(){
          
      },
      save(){
          this.$store.dispatch('saveOptions', {options: this.localState});
      },
      discard(){
          this.localState = this.options;
      }
  }
})
</script>

<style lang="scss">
    
</style>
