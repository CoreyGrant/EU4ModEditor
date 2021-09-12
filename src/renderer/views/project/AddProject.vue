<template>
  <div class="import-project">
    <div>
      <data-form-editor 
        :form="importProjectForm"
        :value="value"
        :local-state="localState"
        @save="save"
        @discard="discard"></data-form-editor>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { importProjectForm } from '../../forms/importProject';
import DataFormEditor from '../../components/DataFormEditor.vue';

export default Vue.extend({
  name: 'ImportProject',
  components:{
    DataFormEditor
  },
  data: function(): any{
    return {
      value: {},
      localState: {},
    }
  },
  computed:{
    importProjectForm(): any{
      return importProjectForm;
    }
  },
  methods:{
    save(ip:any){
      this.$store.dispatch("importProject", {name: ip.projectName, path: ip.projectPath});
      this.localState = {};
      this.value = {};
    },
    discard(){
      this.localState = {};
      this.value = {};
    }
  },
  watch:{
  }
})
</script>

<style>
</style>
