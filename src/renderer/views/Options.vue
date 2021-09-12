<template>
  <div class="application-options">
      <h2>Options</h2>
      <data-form-editor :form="optionsForm" :value="options" :local-state="localState" @save="save" @discard="discard"></data-form-editor>
      <div v-if="importingBaseGame">Importing the base game...</div>
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
      this.localState = JSON.parse(JSON.stringify(this.options));
  },
  data(): any{
    return {
        localState: { eu4Path: '', prettyPrint: ''}
    }
  },
  computed: {
    options(): any{
      return this.$store.state.app.options;
    },
    optionsForm():any[]{
        return optionsForm;
    },
    importingBaseGame():boolean{
        return this.$store.state.app.importingBaseGame;
    }
  },
  methods: {
      save(newLocalState:any){
          console.log(newLocalState);
          if(this.options.eu4Path !== newLocalState.eu4Path && newLocalState.eu4Path.length){
              this.$store.dispatch('importBaseGame', {path: newLocalState.eu4Path})
          }
          this.localState = newLocalState;
          this.$store.dispatch('saveOptions', {options: JSON.parse(JSON.stringify(newLocalState))});
      },
      discard(){
          this.localState = JSON.parse(JSON.stringify(this.options));
      }
  },
  watch: {
      $route(){
          console.log("route change");
          this.localState = JSON.parse(JSON.stringify(this.options));
      },
      options(){
          console.log("options change");
          this.localState = JSON.parse(JSON.stringify(this.options));
      }
  }
})
</script>

<style lang="scss">
    
</style>
