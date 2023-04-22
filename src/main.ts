import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueFire, VueFireFirestoreOptionsAPI, VueFireAuth } from 'vuefire'
import { createHead } from '@vueuse/head'
import vue3GoogleLogin from 'vue3-google-login'

import firebaseConfig from "./helpers/firebaseConfig"

import App from './App.vue'
import router from './router'
import { browserLocalPersistence, getAuth, setPersistence } from 'firebase/auth'

const app = createApp(App)

const head= createHead()

app
  .use(head)
  .use(VueFire, {
    firebaseApp: firebaseConfig,
    modules: [
      VueFireFirestoreOptionsAPI(),
      VueFireAuth()
    ]
  })
  .use(vue3GoogleLogin, {
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  })
  .use(createPinia())

  
setPersistence(getAuth(), browserLocalPersistence)

app.use(router)
app.mount('#app')
