<template>
  <nav class="side-navigation">
    <h2>EU4 Mod Editor</h2>
    <div v-if="title">
      <h3>{{title}}</h3>
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
        return this.$store.state.app 
          && this.$store.state.app.projectSettings
          && this.$store.state.app.projectSettings.name;
      },
  },
  methods:{
    navigateHome():void{
      if(this.$route.name !== "home"){
        this.$router.push("/home");
      }
    }
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
