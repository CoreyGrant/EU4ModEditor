<template>
  <div class="base-game-versions">
      <h3>Versions</h3>
      <ul>
          <li v-for="v in baseGameVersions" :key="v"><p>{{v}}</p></li>
      </ul>
      <p>You can import your main EU4 game in order to use many additional features for mod development</p>
      <p>Multiple versions can be uploaded. You will need to manually change your version of EU4, then type in the version you are on</p>
      <p>Each project can use different versions of EU4 as their base</p>
      <data-form-editor 
        :form="importBaseGameForm"
        :value="value"
        :standalone="true"
        @save="save"
        @discard="discard"></data-form-editor>
      <div class="terminal">
        <p v-for="(line, i) in last10Updates" :key="i">
            <span v-if="line.type == 'error'" class="error">{{line.message}}</span>
            <span v-if="line.type == 'log'" class="log">{{line.message}}</span>
        </p>
      </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import DataFormEditor from '../components/DataFormEditor.vue';
import {importBaseGameForm} from '../forms/importBaseGame';

export default Vue.extend({
  name: 'BaseGameVersions',
  components:{
      DataFormEditor
  },
  mounted(): void{
  },
  data(): any{
    return {
        value: {},
      updates: []
    }
  },
  methods: {
      save(ip:any, done: any){
          console.log(ip);
        var payload = Object.assign({}, ip, {update: (s:string) => this.updates.push(s)})
        this.$store.dispatch("importBaseGame", payload).then(done);
        this.value = {};
    },
    discard(){
      this.value = {};
    }
  },
  computed: {
      last10Updates(): []{
          return this.updates.slice(-10)
      },
      importBaseGameForm(): any{
          return importBaseGameForm;
      },
      baseGameVersions(): string[]{
          return this.$store.state.app.baseGameVersions;
      }
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
