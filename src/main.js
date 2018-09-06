import Vue from 'vue'
import App from './App.vue'

//import VueFire from 'vuefire'
import firebase from 'firebase'
import router from './router'

//research later:
Vue.config.productionTip = false

// research later:
let app;

var fbConfig = {
  apiKey: "AIzaSyBKkqPd__BF-jKHnmdsGJN_mRE2jRyyhmk",
  authDomain: "geocities-url-maker.firebaseapp.com",
  databaseURL: "https://geocities-url-maker.firebaseio.com",
  projectId: "geocities-url-maker",
  storageBucket: "geocities-url-maker.appspot.com",
  messagingSenderId: "186313490702",
}

var firebaseApp = firebase.initializeApp(fbConfig)

window.firebase=firebase;

/* eslint-disable no-new */
firebase.auth().onAuthStateChanged((user)=>{
  if(!app){
    app= new Vue({
      el: '#app',
      router,
      components: { App },
      template: '<App/>'
    });
  }
});