import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import store, {key} from "./store";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import "virtual:windi.css";


createApp(App)
    .use(router)
    .use(ArcoVue)
    .use(store, key)
    .mount("#app");
