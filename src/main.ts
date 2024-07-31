import './assets/styles.css';
import './assets/animations.css';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'; 

import { createApp } from 'vue';
import App from './App.vue';

createApp(App).use(VueSweetalert2).mount('#app');
