<template>
  <div class="import-project">
    <div>
      <data-form-editor 
        :form="importProjectForm"
        :value="value"
        :standalone="true"
        @save="save"
        @discard="discard"></data-form-editor>
    </div>
    <div class="terminal">
        <p v-for="(line, i) in last10Updates" :key="i">
            <span v-if="line.type == 'error'" class="error">{{line.message}}</span>
            <span v-if="line.type == 'log'" class="log">{{line.message}}</span>
        </p>
    </div>
    <div>

    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { importProjectForm } from '../../forms/importProject';
import DataFormEditor from '../../components/DataFormEditor.vue';
import {projectStore, events} from '../../store/app/store.js';

export default Vue.extend({
  name: 'ImportProject',
  components:{
    DataFormEditor
  },
  data: function(): any{
    return {
      value: {},
      updates: [],
      complete: false,
      //baseGameVersionsId: ''
    }
  },
  mounted():void{
    
  },
  computed:{
    importProjectForm(): any{
      return importProjectForm;
    },
    last10Updates(): []{
          return this.updates.slice(-10)
      },
  },
  methods:{
    save(ip:any, done: any){
      this.complete = false;
      var payload = Object.assign({}, ip, {update: (s:string) => this.updates.push(s)})
      projectStore.importProject(payload)
        .then((payload:any) => {
          this.complete = true;
          this.value = {};
          done();
          this.$router.push("/project/" + payload.id);
        });
    },
    discard(){
      this.value = {};
    }
  },
  watch:{
  }
})
</script>

<style lang="scss">
.terminal{
    font-size: 10px;
    width: 100%;
    height: 600px;
    .log{
    }
    .error{
        color: red;
    }
}
</style>
