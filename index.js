import { createApp } from 'vue'
import * as VueRouter from 'vue-router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './src/Page/App.vue'
import Demo from './src/Page/Demo.vue'
import LayerTest from './src/Page/LayerTest.vue'

var app = createApp(App)
app.use(ElementPlus)
app.use(
  VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
      { path: '/', component: Demo },
      { path: '/Demo', component: Demo },
      { path: '/LayerTest', component: LayerTest },
      { path: '/:catchAll(.*)', component: NotFound },
    ],
  }),
)
app.mount('#app')
