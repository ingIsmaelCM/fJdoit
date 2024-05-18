import {createApp} from 'vue'
import "@/style/app.css"
import App from './App.vue'
import PrimeVue from "primevue/config";
import router from "@/routes";
import init from "./boot/init";
import wind from "@/style/wind";
import es from "@/assets/es";
import Ripple from "primevue/ripple";
import {Icon} from "@iconify/vue";
import ElementPlus from "element-plus";
import component from "./boot/components";
import primevue from "./boot/primevue";
import {createPinia} from "pinia";
import {i18n} from '@/helpers/i18n'

const app = createApp(App);
app.use(createPinia());
primevue(app);
component(app);
app.directive("ripple", Ripple);

app.use(PrimeVue, {
    unstyled: false,
    pt: wind,
    locale: es,
    ripple: true,
});

app.component("Icon", Icon);
app.use(router);
app.use(i18n)
app.use(ElementPlus);

init(app);

app.mount("#app");

