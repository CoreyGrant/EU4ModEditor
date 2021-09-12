<template>
  <div class="advisors">
    <div class="tab-headers">
      <div class="tab-header" :class="{'active': tab === 0}" @click="tab = 0"><h4>Advisors ({{advisorTypes.length}})</h4></div>
      <div class="tab-header" :class="{'active': tab === 1}" @click="tab = 1"><h4>History advisors ({{historyAdvisors.length}})</h4></div>
    </div>
    <div class="advisor-types" v-if="tab === 0">
        <datatable :data="advisorTypes" :columns="advisorTypeColumns" :page-size="10" sort="Name"></datatable>
    </div>
    <div class="history-advisors" v-if="tab === 1">
        <datatable :data="historyAdvisors" :columns="historyAdvisorColumns" :page-size="10" sort="Name"></datatable>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Datatable from '../../../components/Datatable.vue';
import {advisorType, advisorHistory, deep} from '../../../forms/shared/isInBase';

export default Vue.extend({
  name: 'Advisors',
  components: {
    Datatable,
  },
  data(): any{
    return {
        tab: 0
    }
  },
  mounted(): void{
  },
  computed: {
      projectName(): string{
          return this.$route.params.name;
      },
      advisorTypeColumns(): any[]{
          return [{
              title: "Name",
              display: (at: any) => at.name,
              link: (at: any) => '/project/' + this.projectName + '/edit/advisor/' + at.id,
          },{
              title: "Monarch Power",
              display: (at: any) => at.data.monarch_power,
          },{
              title: "",
              display: (at: any) => {
                  var keyMatch = this.$store.state.baseGame.common.advisorTypes.find((x: any) => advisorType(x, at));
                  if(!keyMatch){
                      return "new";
                  }
                  var deepMatch = deep(keyMatch, at);
                  if(deepMatch){
                      return "identical";
                  } else{
                      return "overriding";
                  }
              }
          }];
      },
      historyAdvisorColumns(): any[]{
          return [{
              title: "Id",
              display: (at: any) => at.data.id,
          },{
              title: "Name",
              display: (at: any) => at.data.name,
              link: (at: any) => '/project/' + this.projectName + '/edit/advisorhistory/' + at.id,
          },{
              title: "Type",
              display: (at: any) => at.data.type,
          },{
              title: "",
              display: (at: any) => {
                  var keyMatch = this.$store.state.baseGame.history.advisors.find((x: any) => advisorHistory(x, at));
                  if(!keyMatch){
                      return "new";
                  }
                  var deepMatch = this.$store.state.baseGame.history.advisors.find((x: any) => deep(x, at));
                  if(deepMatch){
                      return "identical";
                  } else{
                      return "overriding";
                  }
              }
          }];
      },
      advisorTypes(): []{
          return (this.$store.state.project && this.$store.state.project.common.advisorTypes) || [];
      },
      historyAdvisors():[]{
          return (this.$store.state.project && this.$store.state.project.history.advisors) || [];
      }

  }
})
</script>

<style lang="scss">
    .advisors{
        .tab-headers{
            display: flex;
            height: 40px;
            .tab-header{
                border: 4px double rgb(165, 121, 66);
                border-collapse: collapse;
                cursor: pointer;
                width: 50%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                &.active{
                    h4{
                    font-weight: bolder !important;
                    }
                }
            }
        }
        display: flex;
        flex-direction: column;
        .advisor-types{
            width: 100%;
            margin: 10px;
        }
        .history-advisors{
            width: 100%;
            margin: 10px;
        }
    }
</style>
