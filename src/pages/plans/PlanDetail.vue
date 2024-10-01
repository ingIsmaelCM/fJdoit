<template>
  <div class="size-full relative">
    <Button rounded class="!absolute bg-primary z-20  bottom-2 right-2" @click="downloadPlan">
      <Icon icon="ic:outline-download"
            class="text-xl text-gray-50"/>
    </Button>
    <Button rounded class="!absolute bg-primary z-20  bottom-12 right-2" @click="sendPlanWhatsapp">
      <Icon icon="logos:whatsapp-icon"
            class="text-xl text-gray-50"/>
    </Button>
    <ContextMenu global  :model="items" >
      <template #itemicon="{item}">
        <Icon :icon="item.icon" class="text-lg mr-2" />
      </template>
    </ContextMenu>
    <component :is="currentComponent"  :patient="patient" :plan-data="planData" />
  </div>

</template>

<script setup lang="ts">
import "@/style/menu-plan.css";
import {onMounted, Ref, ref, shallowRef} from "vue";
import {useRoute} from "vue-router";

import PlanMenu from "@/components/plans/PlanMenu.vue";
import PlanNotes from "@/components/plans/PlanNotes.vue";
import PlanChart from "@/components/plans/PlanChart.vue"
import {usePlanDetail} from "@/services/plans";

const route = useRoute();
const {planData, patient, currentCaption, getData, downloadPlan, sendPlanWhatsapp} = usePlanDetail()


const currentComponent:Ref<object>=shallowRef(PlanMenu)

const items = ref([
  {
    label: 'Menú',
    icon: 'mdi:restaurant-menu',
    command: () => {
      currentComponent.value=PlanMenu;
      currentCaption.value="Plan Nutricional";

    }
  },
  {
    label: 'Notas',
    icon: 'mdi:speaker-notes',
    command: () => {
      currentComponent.value=PlanNotes
      currentCaption.value="Notas/Observaciones"
    }
  },
  {
    label: 'Gráfica',
    icon: 'mdi:chart-arc',
    command: () => {
      currentComponent.value=PlanChart
      currentCaption.value="Distribución de nutrientes";
    }
  }
])

onMounted(async () => {
  const patientId = route.params.id;
  const data = await getData(patientId as any);
  planData.value = data.data as any;
  patient.value = data.patient
})
</script>
