import { get } from "httpie";
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

get("https://github.com")
  .then((response) => console.log(response));

createApp(App).mount('#app')
