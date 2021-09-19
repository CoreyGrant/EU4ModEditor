<template>
  <div class="advisor">
    <data-form-editor 
      :form="advisorForm" :path="['common', 'advisorTypes']"></data-form-editor>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import DataFormEditor from '../../../components/DataFormEditor.vue';
import {advisorForm} from '../../../forms/advisors';

export default Vue.extend({
  name: 'Advisor',
  components: {
    DataFormEditor,
  },
  data(): any{
    return {

    }
  },
  computed: {
    advisorForm(): any{
      return advisorForm;
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
