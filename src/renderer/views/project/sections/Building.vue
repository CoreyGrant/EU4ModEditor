<template>
  <div class="advisor">
    <data-form-editor :form="buildingForm" :path="['common', 'buildings']"></data-form-editor>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import DataFormEditor from '../../../components/DataFormEditor.vue';
//import {buildingForm} from '../../../forms/building';

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
      return //buildingForm;
    },
    id(): string{
      return this.$route.params.objectId;
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
