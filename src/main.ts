import { createApp } from 'vue'
import App from './App.vue'
import VueDraggableResizable from "vue-draggable-resizable-vue3";





import './assets/main.less'

const app = createApp(App).use(VueDraggableResizable).mount('#app')