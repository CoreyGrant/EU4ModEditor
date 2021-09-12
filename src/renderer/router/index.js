import Vue from 'vue'
//import store from '../store/index'
import Router from 'vue-router'
import Project from '../views/project/Project.vue'
import ExportProject from '../views/project/ExportProject.vue'
import ProjectChanges from '../views/project/ProjectChanges.vue'
import ProjectImages from '../views/project/ProjectImages.vue'
import Advisors from '../views/project/sections/Advisors.vue'
import Advisor from '../views/project/sections/Advisor.vue'
import AdvisorHistory from '../views/project/sections/AdvisorHistory.vue'
import Home from '../views/Home.vue'
import Options from '../views/Options.vue'
import AddProject from '../views/project/AddProject.vue';

Vue.use(Router)

const router = new Router({
  type: "hash",
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      meta: {
        title: 'Home',
        icon: 'fa-home',
      },
      name: "home",
      component: Home,
    },
    {
      path: '/options',
      meta: {
        title: 'Options',
        icon: 'fa-home',
      },
      name: "options",
      component: Options,
    },
    {
      path: '/project/:name',
      meta: {
        title: 'Project',
        icon: 'fa-info-circle',
      },
      name: "project",
      component: Project,
    },
    {
      path: '/project/:name/changes',
      meta: {
        title: 'Project',
        icon: 'fa-info-circle',
      },
      name: "projectChanges",
      component: ProjectChanges,
    },
    {
      path: '/project/:name/edit/advisors',
      meta: {
        title: 'EditProject',
        icon: 'fa-info-circle',
      },
      name: "advisors",
      component: Advisors,
    },
    {
      path: '/project/:name/edit/advisor/:id',
      meta: {
        title: 'EditProject',
        icon: 'fa-info-circle',
      },
      name: "advisor",
      component: Advisor,
    },
    {
      path: '/project/:name/edit/advisorhistory/:id',
      meta: {
        title: 'EditProject',
        icon: 'fa-info-circle',
      },
      name: "advisorHistory",
      component: AdvisorHistory,
    },
    {
      path: '/project/:name/export',
      meta: {
        title: 'ExportProject',
        icon: 'fa-info-circle',
      },
      name: "exportProject",
      component: ExportProject,
    },
    {
      path: '/project/:name/images',
      meta: {
        title: 'ProjectImages',
        icon: 'fa-info-circle',
      },
      name: "projectImages",
      component: ProjectImages,
    },
    {
      path: '/addproject',
      meta: {
        title: 'AddProject',
        icon: 'fa-add',
      },
      name: "addProject",
      component: AddProject,
    },
    {
      path: '*',
      redirect: '/home',
    },
  ],
})

// router.beforeEach((to, from) => {
//   if(to.params.name && to.params.name !== from.params.name){
//     store.dispatch('loadProject', {name: to.params.name});
//   }
// })

// dynamically set application title to current view
router.afterEach((to) => {
  let title =
    to.path === '/home'
      ? process.env.PRODUCT_NAME
      : `${to.meta.title} - ${process.env.PRODUCT_NAME}`

  if (!title) {
    title = 'Home'
  }

  document.title = title
})

export default router
