<template>
  <div class="grid grid-cols-12 w-full gap-2 px-2 h-full">
    <div class="w-full rounded-lg h-[2.05rem] shadow-lg col-span-4 bg-primary text-gray-50 font-semibold flex space-x-1
    justify-center items-center p-1"
         v-for="field in fields" :key="field.key">
      <Icon :icon="field.icon" class="text-xl"/>
      <span class="text-sm">{{ eval?eval[field.key] : 'N/D' }}</span>
      <sup>{{ field.unit }}</sup>
    </div>
    <div class="col-span-12 h-36 rounded-lg bg-white  p-1 text-base line-clamp-6 leading-5 font-sans">
     {{eval?.note||'N/D'}}
    </div>

  </div>
</template>

<script setup lang="ts">
import {IEval} from "@/interfaces/ModelInterfaces.ts";

const fields = [
  {label: "Estatura", key: "height", unit: "cm", icon: "guidance:guest-height-limit"},
  {label: "Peso", key: "weight", unit: "kg", icon: "hugeicons:weight-scale"},
  {label: "IMC", key: "imc", unit: "", icon: "pajamas:tachometer"},
]

interface IProps {
  eval?: IEval
}

defineProps<IProps>()
</script>
