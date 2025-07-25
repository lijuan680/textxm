import './styles/reset.scss'
import 'element-plus/es/components/message/style/css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-persistedstate-plugin'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const store = createPinia()
store.use(createPersistedState())
app.use(store)
app.use(router)

app.mount('#app')
