import {App} from "vue";

import {Router} from "vue-router";
import {useGlobalStore} from "@/stores/globalStore.ts";
import useUserStore from "@/stores/userStore.ts";
import VCalendar from "v-calendar";
import utils from "@/helpers/utils.ts";

const init = (app: App<Element>) => {
    app.config.globalProperties.$global = useGlobalStore();
    app.config.globalProperties.$auth = useUserStore();
    app.config.globalProperties.$noImage =
        "https://res.cloudinary.com/atriontechsd/image/upload/v1671711748/lorem-ipsum-dolor-sit-ame0-16717117462.jpg";
    app.config.globalProperties.$avatar =
        "https://res.cloudinary.com/atriontechsd/image/upload/v1707161313/turn/image1707161310718.png";
    app.config.globalProperties.$utils = utils;
    app.config.globalProperties.$debounce = (fn: Function, wait: number) => utils.debounce(fn, wait);
    app.use(VCalendar, {});
};

declare module "vue" {
    interface ComponentCustomProperties {
        $router: Router;
        $global: any;
        $auth: any;
        $noImage: string;
        $avatar: string;
        $utils: typeof utils;
        $debounce: Function;
    }
}
export default init;
