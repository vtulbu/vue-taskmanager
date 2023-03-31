import { createApp } from 'vue'
import { createPinia } from 'pinia'
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
import ProgressSpinner from 'primevue/progressspinner'
import OverlayPanel from 'primevue/overlaypanel'
import Checkbox from 'primevue/checkbox'

import 'normalize.css'
import 'primeicons/primeicons.css'
import 'primevue/resources/primevue.min.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
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
app.component('ProgressSpinnerPrime', ProgressSpinner)
app.component('OverlayPanelPrime', OverlayPanel)
app.component('CheckboxPrime', Checkbox)

app.mount('#app')
