<template>
  <div class="application-settings">
      <h2>Settings</h2>
      <data-form-editor 
        :form="optionsForm" 
        :value="settings" 
        :standalone="true"
        @save="save" 
        @discard="discard"></data-form-editor>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import DataFormEditor from '../components/DataFormEditor.vue'
import {optionsForm} from '../forms/options';

export default Vue.extend({
  name: 'AppSettings',
  components:{
    DataFormEditor
  },
  mounted(): void{
  },
  data(): any{
    return {
    }
  },
  computed: {
    settings(): any{
      return this.$store.state.app.settings;
    },
    optionsForm():any[]{
        return optionsForm;
    },
  },
  methods: {
      save(newLocalState:any, done: any){
          this.$store.dispatch('saveSettings', {settings: JSON.parse(JSON.stringify(newLocalState))})
            .then(done);
      },
      discard(){
      }
  },
  watch: {
  }
})
</script>

<style lang="scss">
    
</style>
