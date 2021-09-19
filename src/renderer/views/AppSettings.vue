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
import {events, appStore} from '../store/app/store.js';

export default Vue.extend({
  name: 'AppSettings',
  components:{
    DataFormEditor
  },
  mounted(): void{
    this.loadedEventId = events.appSettingsLoaded
      .register(() => this.settings = appStore.getSettings());
    this.savedEventId = events.appSettingsSaved
      .register(() => this.settings = appStore.getSettings());
  },
  destroyed(){
    events.appSettingsSaved.deregister(this.savedEventId);
    events.appSettingsLoaded.deregister(this.loadedEventId);
  },
  data(): any{
    return {
      loadedEventId: '',
      savedEventId: '',
      settings: appStore.getSettings()
    }
  },
  computed: {
    optionsForm():any[]{
        return optionsForm;
    },
  },
  methods: {
      save(settings:any, done: any){
          appStore.saveSettings(settings)
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
