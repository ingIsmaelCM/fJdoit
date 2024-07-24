<template>
  <div class="main-body " id="planMenu">
    <div class="h-10 w-full flex justify-between items-center bg-dark text-gray-200 px-2">
      <h1 class="font-bold uppercase w-3/5">Distribución Nutricional</h1>
      <span
          class="ellipsis">{{
          `${patient.fullname}  | ${patient?.evals?.at(0)?.weight || 'N/D'}kg | ${getOld(String(patient?.dob))}`
        }}</span>
    </div>
    <div class="h-[calc(100%-2.5rem)] w-full flex items-center justify-around ">
      <Chart type="doughnut" :data="data" :options="chartOptions" :plugins="[datalabel]" class="!w-[63%]"/>
      <div class="w-[35%]   shadow-xl flex flex-col space-y-4 py-4 ">
        <div class="flex justify-between">
          <h1 class="font-bold uppercase text-center w-full text-lg mb-2">
            Promedio Diario (L-V)
          </h1>
        </div>
        <div class="flex justify-between items-center w-full bg-primary text-gray-200 " v-for="prom in promedio"
             :key="prom.label">
          <h1 class="px-2 ">{{ prom.label }}</h1>
          <span
              class="px-2 py-1 bg-secondary w-32 text-right">
            {{ prom.prom + ` ${prom.label == 'Calorías' ? 'kCal' : 'gr.'}` }}
          </span>

        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {IPatientView} from "@/interfaces/ModelInterfaces.ts";
import moment from "moment-timezone";
import {computed} from "vue";
import datalabel from "chartjs-plugin-datalabels";

interface IProps {
  patient: IPatientView,
  planData: any[],
}

const props = defineProps<IProps>();

function getOld(dob: string): string {
  if (!dob) return "N/D"
  return moment().diff(moment(dob, 'YYYY-MM-DD'), 'years') + " años";
}

let dataset = props.planData.reduce((acc: number[], plan: Record<string, any>) =>
    (
        [
          acc.at(0)! + Number(plan.nutrients.proteins),
          acc.at(1)! + Number(plan.nutrients.fat),
          acc.at(2)! + Number(plan.nutrients.carbohidrates),
          acc.at(3)! + Number(plan.nutrients.calories),
        ]
    ), [0, 0, 0, 0]);
if (props.planData.length === 0) {
  dataset = [1, 1, 1, 1]
}
const labels = ["Proteínas", "Grasas", "Carbohidratos", "Calorías"];
const promedio = Object.values(dataset).map((dSet: number, index: number) => {
  return {
    prom: Number((dSet / props.planData.length).toFixed(2)),
    label: labels[index]
  }
});
const data = computed(() => {
  let dataset = props.planData.reduce((acc: number[], plan: Record<string, any>) => {
    Object.keys(acc).forEach((key: string) => {
      acc[key] += plan.nutrients[key]
    })
    return acc
  }, {proteins: 0, fat: 0, carbohidrates: 0, calories: 0});
  if (props.planData.length === 0) {
    dataset = {proteins: 1, fat: 1, carbohidrates: 1, calories: 1}
  }
  return {
    labels: labels,
    datasets: [
      {
        data: Object.values(dataset).map((n: number) => n.toFixed(2)),
        backgroundColor: ["#0D2E3AFF", "#0484ac", "#067889", "#5494ac"],
        hoverBackgroundColor: ["rgba(5,27,33,0.75)", "rgba(13,46,58,0.75)", "rgba(6,120,137,0.75)", "rgba(84,148,172,0.75)"]
      }
    ]
  }
})

const chartOptions = computed(() => ({
  tooltips: {
    enabled: false
  },
  plugins: {
    legend: {
      display: true,
    },
    datalabels: {
      color: '#fff',
      textAlign: 'center',
      align:"end",
      font: {
        lineHeight: 1,

      },
      formatter: function (value, ctx) {
        const label = data.value.labels[ctx.dataIndex];
        return `${value} \n ${label == 'Calorías' ? 'kCal' : 'gr.'}`
      }
    }
  }
}));

</script>