<template>
  <div class="advisor-history">
    <data-form-editor 
      :form="advisorHistoryForm"
      :path="['history', 'advisors']"></data-form-editor>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import DataFormEditor from '../../../components/DataFormEditor.vue';
import {advisorHistoryForm} from '../../../forms/advisors';

export default Vue.extend({
  name: 'AdvisorHistory',
  components: {
    DataFormEditor,
  },
  data(): any{
    return {
    }
  },
  mounted(): void{
  },
  computed: {
    advisorHistoryForm(): any[]{
      return advisorHistoryForm;
    },
    id(): string{
      return this.$route.params.objectId;
    }
  },
  methods: {
  },
})
</script>

<style>
</style>
