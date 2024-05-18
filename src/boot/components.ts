import { App } from "vue";
import { Hotkey } from "@simolation/vue-hotkey";
import TableWrapper from "@/components/commons/TableWrapper.vue";
import CustomDialog from "@/components/commons/CustomDialog.vue";
import CustomModal from "@/components/commons/CustomModal.vue";
import TourComponent from "@/components/commons/TourComponent.vue"


const component = (app: App<Element>) => {
  app.component("TableWrapper", TableWrapper);
  app.component("CustomDialog", CustomDialog);
  app.component("CustomModal", CustomModal);
  app.component("TourComponent", TourComponent);
  app.component("Hotkey", Hotkey);
};

export default component;
