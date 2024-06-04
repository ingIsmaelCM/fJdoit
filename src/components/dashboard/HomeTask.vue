

<template>
  <div class="flex flex-col space-y-2 p-1.5 border shadow-lg rounded-lg h-[19.7rem]">
    <h1 class="p-1 text-lg font-[400]">Últimas Tareas</h1>
    <div class="flex items-center justify-between space-x-2 !my-2" v-for="(task, index) in tasks" :key="task.id">
      <div class=" rounded-lg shadow-lg p-1 w-8 mr-2" :class="index%2===0?'bg-primary text-gray-50':'text-primary bg-white'">
        <Icon :icon="task.type==='Recurrente'?'fluent-mdl2:recurring-task':'material-symbols:task-alt-rounded'" class="text-2xl "/>
      </div>
      <div class="flex flex-col justify-center w-full">
        <h1 class="font-bold text-sm text-primary ellipsis w-44" v-tooltip="task.description">{{ task.title }}</h1>
        <h1 class="font-normal text-xs ellipsis">{{ task.date }}</h1>
      </div>
    </div>
    <div class="flex items-center justify-between space-x-2 !my-2" v-for="skeleton in 5-tasks.length" :key="skeleton">
      <div class="w-12">
        <Skeleton width="2rem" height="2rem"/>
      </div>
      <div class="flex flex-col justify-center space-y-1 w-full">
        <Skeleton height="1.2rem" width="6.5rem"/>
        <Skeleton height="1rem" width="10.5rem"/>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
  import {ref} from "vue";

  const tasks=ref([
    {
      id: 1,
      title: "Concertar cita con Juan",
      description: "Llamar al paciente Juan para su cita semanal",
      type: "Recurrente",
      date:"2024-06-05 13:45:00"
    },
    {
      id: 2,
      title: "Programar dieta de María",
      description: "Programar la dieta de matería luego de una consulta",
      type: "Única",
      date:"2024-06-05 13:45:00"
    },
    {
      id: 3,
      title: "Realizar evaluación mensual a Esteban",
      description: "Realizar consulta y registrar la evaluación mensual de Esteban",
      type: "Única",
      date:"2024-06-05 13:45:00"
    },
    {
      id: 4,
      title: "Cita con Cristina",
      description: "Cita no programada con cristina",
      type: "Recurrente",
      date:"2024-06-12 16:30:00"
    }
  ])
</script>