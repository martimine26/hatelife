import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _81ca8e6c = () => interopDefault(import('../pages/changeEvent.vue' /* webpackChunkName: "pages/changeEvent" */))
const _04bf0a36 = () => interopDefault(import('../pages/eventCreate.vue' /* webpackChunkName: "pages/eventCreate" */))
const _28bec4a6 = () => interopDefault(import('../pages/eventFeedbackUc.vue' /* webpackChunkName: "pages/eventFeedbackUc" */))
const _eab7b1c6 = () => interopDefault(import('../pages/eventFeedbackUchitel.vue' /* webpackChunkName: "pages/eventFeedbackUchitel" */))
const _5deb26cb = () => interopDefault(import('../pages/id.vue' /* webpackChunkName: "pages/id" */))
const _4bebf1e9 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _16a84b2e = () => interopDefault(import('../pages/main.vue' /* webpackChunkName: "pages/main" */))
const _1cbae075 = () => interopDefault(import('../pages/myevents.vue' /* webpackChunkName: "pages/myevents" */))
const _08381bae = () => interopDefault(import('../pages/profile.vue' /* webpackChunkName: "pages/profile" */))
const _fb77625c = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/changeEvent",
    component: _81ca8e6c,
    name: "changeEvent"
  }, {
    path: "/eventCreate",
    component: _04bf0a36,
    name: "eventCreate"
  }, {
    path: "/eventFeedbackUc",
    component: _28bec4a6,
    name: "eventFeedbackUc"
  }, {
    path: "/eventFeedbackUchitel",
    component: _eab7b1c6,
    name: "eventFeedbackUchitel"
  }, {
    path: "/id",
    component: _5deb26cb,
    name: "id"
  }, {
    path: "/login",
    component: _4bebf1e9,
    name: "login"
  }, {
    path: "/main",
    component: _16a84b2e,
    name: "main"
  }, {
    path: "/myevents",
    component: _1cbae075,
    name: "myevents"
  }, {
    path: "/profile",
    component: _08381bae,
    name: "profile"
  }, {
    path: "/",
    component: _fb77625c,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
