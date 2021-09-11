<template>
  <div class="advisor-history">
    <data-form-editor :form="advisorHistoryForm" :value="value"></data-form-editor>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import DataFormEditor from '../../../components/DataFormEditor.vue';
import {advisorHistoryForm} from '../../../forms/advisors';

export default Vue.extend({
  name: 'Section',
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
    value(): []{
      return this.$store.state.project.history.advisors.find((x: any) => x.id == this.id);
    },
    id(): string{
      return this.$route.params.id;
    }
  },
  methods: {
  },
})
</script>

<style>
</style>
