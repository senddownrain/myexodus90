import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueLocalStorage from 'vue-localstorage'
import firebaseConfig from './config/firebase'
import firebase from 'firebase'
import 'firebase/firestore'

Vue.use(VueLocalStorage)

const moment = require('moment')
require('moment/locale/ru')

Vue.use(require('vue-moment'), {
    moment
})

Vue.config.productionTip = false

const firebaseApp =  firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()

Vue.$db = db

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created(){
  },
}).$mount('#app')
