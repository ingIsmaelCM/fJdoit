<template>
  <div class="w-full h-full flex flex-col  justify-center items-center space-y-2 rounded-lg p-2 shadow-lg   ">
    <h1 class="text-left font-semibold text-lg w-full">Distribución promedio de los nutrientes</h1>
    <Chart type="doughnut" :data="data" :options="chartOptions" :plugins="[datalabel]"  :height="900"/>
  </div>
</template>

<script setup lang="ts">
import {computed,} from "vue";
import datalabel from "chartjs-plugin-datalabels"

interface IProps {
  plans: any[]
}

const props = defineProps<IProps>()

const data = computed(() => {
  let dataset = props.plans.reduce((acc: number[], plan: Record<string, any>) =>
      (
          [
            acc.at(0)! + Number(plan.proteins),
            acc.at(1)! + Number(plan.fat),
            acc.at(2)! + Number(plan.carbohidrates),
          ]
      ), [0, 0, 0]);
  if(props.plans.length===0){
    dataset=[1,1,1]
  }
  return {
    labels: ["Prot.", "Grasa", "Carb."],
    datasets: [
      {
        data: dataset.map((n:number)=>n.toFixed(2)),
        backgroundColor: ["#0484ac", "#067889", "#5494ac"],
        hoverBackgroundColor: ["rgba(4,132,172,0.75)", "rgba(6,120,137,0.75)", "rgba(84,148,172,0.75)"]
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
      display: false,
    },
    datalabels: {
      color: '#fff',
      textAlign: 'center',
      font: {
        lineHeight: 1.6,

      },
      formatter: function (value, ctx) {
        return `${data.value.labels[ctx.dataIndex]} \n ${value}g`
      }
    }
  }
}));


</script>