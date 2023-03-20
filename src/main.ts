import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'
import PrimeVue from 'primevue/config'

import App from './App.vue'
import router from './router'

import Divider from 'primevue/divider'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Sidebar from 'primevue/sidebar'
import InputSwitch from 'primevue/inputswitch'
import InputText from 'primevue/inputtext'
import AutoComplete from 'primevue/autocomplete'
import Textarea from 'primevue/textarea'
import Dropdown from 'primevue/dropdown'

import 'normalize.css'
import 'primeicons/primeicons.css'
import '../public/themes/prime.css'

const app = createApp(App)

const head = createHead({
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap'
    }
  ]
})

app.use(createPinia())
app.use(router)
app.use(head)
app.use(PrimeVue, { ripple: true })
app.component('DividerPrime', Divider)
app.component('ButtonPrime', Button)
app.component('DialogPrime', Dialog)
app.component('SidebarPrime', Sidebar)
app.component('InputSwitchPrime', InputSwitch)
app.component('InputTextPrime', InputText)
app.component('AutoCompletePrime', AutoComplete)
app.component('TextareaPrime', Textarea)
app.component('DropdownPrime', Dropdown)

app.mount('#app')
