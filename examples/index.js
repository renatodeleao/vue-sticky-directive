import "@babel/polyfill";

import Vue from "vue";
import App from "./App.vue";

var app = new Vue({
  el: '#app',
  template: "<App/>",
  components: { App }
});