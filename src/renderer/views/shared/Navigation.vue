<template>
  <nav class="navigation">
      <ul class="nav-breadcrumb">
        <li @click="navigate(b.path)" v-for="b in breadcrumb" :key="b.name">
          <h5>{{b.name}}</h5>
        </li>
      </ul>
      <ul class="navigation-options">
          <li><i class="fa fa-cog" @click="navigate('/options')"></i></li>
      </ul>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Navigation',
  mounted(): void{
      this.breadcrumb = this.buildBreadcrumb();
  },
  data(): any{
    return {
        breadcrumb: []
    }
  },
  computed: {
      homeLink(): any{
          return {
              name: "Home",
              path: "/"
          };
      },
      projectLink(): any{
        return {
            name: this.$route.params.name || "",
            path: "/project/" + this.$route.params.name
        };
      },
      advisorsLink(): any{
          return {
            name: "Advisors",
            path: "/project/" + this.$route.params.name + "/edit/advisors"
          };
      }
  },
  methods:{
    navigate(path: string): void{
        this.$router.push(path);
    },
    buildBreadcrumb(): any[]{
      // Home -> 
      // Project -> Home
      // AddProject -> Home
      // Advisors -> Home / Project
      // Changes -> Home / Project
      // Export -> Home / Project
      // Advisor -> Home / Project / Advisors
      // Advisor History -> Home / Project / Advisors
      switch(this.$route.name){
        case "home":
          return [];
        case "project":
          return [this.homeLink];
        case "projectChanges":
          return [this.homeLink, this.projectLink];
        case "advisors":
            return [this.homeLink, this.projectLink];
        case "advisor":
            return [this.homeLink, this.projectLink, this.advisorsLink];
        case "advisorHistory":
            return [this.homeLink, this.projectLink, this.advisorsLink];
        case "exportProject":
            return [this.homeLink, this.projectLink];
        case "addProject":
            return [this.homeLink];
        case "options":
            return [this.homeLink];
        default:
          return [];
      }
    }
  },
  watch:{
      $route(){
          this.breadcrumb = this.buildBreadcrumb();
      }
  }
})
</script>

<style lang="scss">
nav.navigation{
    
    margin-left: -20px;
    margin-top: -20px;
    margin-right: -20px;
    margin-bottom: 20px;
    height: 72px;
    display: flex;
    justify-content: space-between;
    .nav-breadcrumb{
        display: flex;
        flex-direction: row;
        li{
            padding: 10px;
            border: 4px double rgb(165, 121, 66);
            border-collapse: collapse;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 100px;
        }
    }
    .navigation-options{
        display: flex;
        flex-direction: row;
        li{
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 100px;
        }
    }
}
</style>
