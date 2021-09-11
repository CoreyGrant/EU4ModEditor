<template>
  <nav class="side-navigation">
    <h2>EU4 Mod Editor</h2>
    <div v-if="title">
      <h3>{{title}}</h3>
    </div>
    <div v-if="hasChanges">
      <router-link :to="changesLink"><i class="fa fa-danger"></i> Changes</router-link>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
// Shows the current project folder structure
export default Vue.extend({
  name: 'SideNavigation',
  components: {
  },
  created(): void{
  },
  data(): any{
    return {
    }
  },
  computed: {
      title(): string{
        return this.$route.params.name;
      },
      hasChanges():boolean{
        return Object.keys(this.$store.state.localState).length > 0;
      },
      changesLink(): string{
        return `/project/${this.$route.params.name}/changes`;
      }
  },
  methods:{
  },
  watch:{
  }
})
</script>

<style lang="scss">
.side-navigation{
    display: column;
    overflow-y: auto;
    .side-navigation-title{
        height: 40px;
        width: 100%;
    }
}
</style>
