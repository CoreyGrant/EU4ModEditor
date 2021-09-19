import Vue from 'vue'
//import store from '../store/index'
import Router from 'vue-router'
import Project from '../views/project/Project.vue'
import ExportProject from '../views/project/ExportProject.vue'
import ProjectImages from '../views/project/ProjectImages.vue'
import Advisors from '../views/project/sections/Advisors.vue'
import Advisor from '../views/project/sections/Advisor.vue'
import AdvisorHistory from '../views/project/sections/AdvisorHistory.vue'
import Home from '../views/Home.vue'
import AppSettings from '../views/AppSettings.vue'
import AddProject from '../views/project/AddProject.vue';
import BaseGameVersions from '../views/BaseGameVersions.vue';

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
      path: '/appSettings',
      meta: {
        title: 'App Settings',
        icon: 'fa-home',
      },
      name: "appSettings",
      component: AppSettings,
    },
    {
      path: '/project/:projectId',
      meta: {
        title: 'Project',
        icon: 'fa-info-circle',
      },
      name: "project",
      component: Project,
    },
    {
      path: '/project/:projectId/edit/advisors',
      meta: {
        title: 'EditProject',
        icon: 'fa-info-circle',
      },
      name: "advisors",
      component: Advisors,
    },
    {
      path: '/project/:projectId/edit/advisor/:objectId',
      meta: {
        title: 'EditProject',
        icon: 'fa-info-circle',
      },
      name: "advisor",
      component: Advisor,
    },
    {
      path: '/project/:projectId/edit/advisorhistory/:objectId',
      meta: {
        title: 'EditProject',
        icon: 'fa-info-circle',
      },
      name: "advisorHistory",
      component: AdvisorHistory,
    },
    {
      path: '/project/:projectId/export',
      meta: {
        title: 'ExportProject',
        icon: 'fa-info-circle',
      },
      name: "exportProject",
      component: ExportProject,
    },
    {
      path: '/project/:projectId/images',
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
      path: '/baseGameVersions',
      meta: {
        title: 'BaseGameVersions',
        icon: 'fa-add',
      },
      name: "baseGameVersions",
      component: BaseGameVersions,
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
