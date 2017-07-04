import Vue from 'vue'
import Router from 'vue-router'
import map from '../components/map/map.vue'
import list1 from '../components/list1/list1.vue'
import addLines from '../components/map/addLines.vue'
import mdDemo from '../components/markdown/markdown.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'map',
      component: map
    },
    {
      path: '/list1',
      name: 'list1',
      component: list1
    },
    {
      path: '/addLines',
      name: 'addLines',
      component: addLines
    },
    {
      path: '/markdown',
      name: 'markdown',
      component: mdDemo
    }
  ]
})

