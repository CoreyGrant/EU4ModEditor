<template>
  <div class="advisor">
    <data-form-editor :form="advisorForm" :value="advisor" :base-game-value="baseAdvisor"></data-form-editor>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import DataFormEditor from '../../../components/DataFormEditor.vue';
import {advisorForm} from '../../../forms/advisors';
import {advisorType} from '../../../forms/shared/isInBase';

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
    advisor(): any{
      return this.$store.state.project.common.advisorTypes.find((x: any) => x.id == this.id)
    },
    baseAdvisor():any{
      return this.$store.state.baseGame.common.advisorTypes.find((x:any) => advisorType(this.advisor, x));
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
