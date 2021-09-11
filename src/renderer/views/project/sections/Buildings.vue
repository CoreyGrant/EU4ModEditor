<template>
  <div class="buildings">
    <datatable :data="buildings" :columns="buildingColumns" :page-size="10" sort="Name"></datatable>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Datatable from '../../../components/Datatable.vue';

export default Vue.extend({
  name: 'Buildings',
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
      buildingColumns(): any[]{
          return [{
              title: "Name",
              display: (bu: any) => bu.name,
              link: (bu: any) => '/project/' + this.projectName + '/edit/building/' + bu.id,
          }];
      },
      buildings():[]{
          return (this.$store.state.project && this.$store.state.project.common.buildings) || [];
      }

  }
})
</script>

<style lang="scss">
   
</style>
