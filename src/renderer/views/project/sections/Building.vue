<template>
  <div class="advisor">
    <data-form-editor :form="buildingForm" :value="building"></data-form-editor>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import DataFormEditor from '../../../components/DataFormEditor.vue';
import {buildingForm} from '../../../forms/building';

export default Vue.extend({
  name: 'Building',
  components: {
    DataFormEditor,
  },
  data(): any{
    return {

    }
  },
  computed: {
    buildingForm(): any{
      return buildingForm;
    },
    building(): any{
      return this.$store.state.project.common.building.find((x: any) => x.id == this.id)
    },
    value(): []{
      return this.building.data;
    },
    name():string{
      return this.building.name;
    },
    id(): string{
      return this.$route.params.id;
    }
  },
  methods: {
  },
  mounted(): void{
  },
})
</script>

<style>
</style>
