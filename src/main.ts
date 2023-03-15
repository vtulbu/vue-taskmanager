import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'
import PrimeVue from 'primevue/config'

import App from './App.vue'
import router from './router'

import 'normalize.css'

const app = createApp(App)

const head = createHead({
  link: [
    {
      id: 'theme-link',
      rel: 'stylesheet',
      href: '/themes/light.css'
    }
  ]
})

app.use(createPinia())
app.use(router)
app.use(head)
app.use(PrimeVue, { ripple: true })

app.mount('#app')
