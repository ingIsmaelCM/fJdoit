<template>
  <div class="size-full relative">
    <Button  rounded class="!absolute bg-primary  bottom-2 right-2" @click="downloadPlan">
      <Icon icon="ic:outline-download"
            class="text-xl text-gray-50"/>
    </Button>
    <Button  rounded class="!absolute bg-primary  bottom-12 right-2" @click="downloadPlan">
      <Icon icon="logos:whatsapp-icon"
            class="text-xl text-gray-50"/>
    </Button>
    <div class="main-body p-2  " id="planMenu">

      <div class="flex justify-between space-x-4 mb-2 ">
        <div class="h-10 w-1/6 mr-2 flex flex-col justify-center">
          <span class="text-sm ellipsis">{{ patient?.lastname }}, {{ patient?.name?.at(0) }}.</span>
          <span>{{ `${patient?.evals?.at(0)?.weight || 'N/D'}kg | ${getOld(String(patient?.dob))}` }}</span>
        </div>
        <div class="meal-type h-10 w-1/4">Desayuno</div>
        <div class="meal-type h-10 w-1/4">Almuerzo</div>
        <div class="meal-type h-10 w-1/4">Cena</div>
      </div>
      <div class="grid grid-cols-10 gap-2 h-[calc(100%-3.5rem)]">
        <div class="col-span-10 flex h-full justify-between space-x-4" v-for="planD in planData">
          <div class="flex items-center justify-center bg-gray-200 w-1/6 mr-2 border-none">
            <div class="day-name h-12 w-full">{{ planD[0] }}</div>
          </div>
          <div
              class="h-full w-1/4 bg-gray-200 space-y-0 flex flex-col justify-center p-1  text-sm lowercase overflow-hidden  "
              v-for="plan in planD.slice(1)">
          <span class="ellipsis" v-for="food in plan">
            {{ food }}
          </span>
          </div>

        </div>

      </div>

    </div>
  </div>

</template>

<script setup lang="ts">
import "@/style/menu-plan.css";
import {onMounted, Ref, ref} from "vue";
import {useRoute} from "vue-router";
import {useGetPlans} from "@/services/plans";
import {EPlanDay, EPlanType} from "@/interfaces/ModelInterfaces.ts";
import moment from "moment-timezone";
import html2canvas from "html2canvas";

const {plans, query, getPlans} = useGetPlans();

const planData = ref([]);
const patient: Ref<any> = ref({})
const route = useRoute();

const getData = async (patientId: string, types?: string[]) => {
  query.replaceFilter("patientId", patientId).limit(100)
      .replaceFilter("day", Object.values(EPlanDay)
          .filter((d: any) => d !== EPlanDay.D && d !== EPlanDay.S), "in", "and")
  query.include("patient.eval,patient.evals,nutrient,planfoods.food.nutrient")
  await getPlans();
  const data = Object.values(EPlanDay)
      .filter((d: any) => d !== EPlanDay.D && d !== EPlanDay.S).map((day: string) => {
        return [day.toUpperCase(), ...Object.values(EPlanType).filter((t: string) =>
            ![EPlanType.Merienda1, EPlanType.Merienda2].includes(<any>t)).map((type: string) => {
          const filtered = plans.value.find((p: any) => p.day === day && p.type === type)
          return filtered ?
              filtered.planfoods.reduce((acc: string[], fp: any) => {
                const meal = `${Number((fp.portion * 100).toFixed(2)) + "g de " + fp.food.name}`
                acc.push(meal);
                return acc;
              }, []) : []
        })]
      })
  return {data, patient: plans.value?.at(0)?.patient};

}

function getOld(dob: string): string {
  if (!dob) return "N/D"
  return moment().diff(moment(dob, 'YYYY-MM-DD'), 'years') + " años";
}

const generatePlanImage = async () => {
  const planMenu = document.querySelector(`#planMenu`);
  planMenu?.classList.add("ready-fix");
  const canvas = await html2canvas(planMenu, {
    allowTaint: true,
    useCORS: true,
    scale: window.devicePixelRatio,
    foreignObjectRendering: true
  });
  const dataUrl = canvas.toDataURL('image/jpeg');
  return new Promise((resolve: any, reject:any)=>{
    fetch(dataUrl)
        .then(res => res.blob())
        .then(async (blob: Blob) => {
          const file = new File([blob], "File name", {type: "image/jpeg"});
          planMenu?.classList.remove("ready-fix");
          resolve(file)
        }).catch((error:any)=>reject(error));
  })
}

const downloadPlan=async()=>{
  const file=await generatePlanImage();
  console.log(file)
  const url = URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = url;
  link.download = patient.value.fullname;
  link.click();
}
onMounted(async () => {
  const patientId = route.params.id;
  const data = await getData(patientId);
  planData.value = data.data;
  patient.value = data.patient

})
</script>
