

<template>
  <CustomDialog title="Detalles del recordatorio">
    <template #button>
      <button class=" !bg-transparent !border-none" circle title="Detalles">
        <Icon icon="carbon:touch-1" class="text-xl"/>
      </button>
    </template>
    
    <div class="w-full rounded-lg shadow-lg flex-col  space-y-4 p-3">
      <div class="flex">
        <h1 class="w-24 font-bold">Asunto:</h1>
        <h2>{{reminder.title}}</h2>
      </div>
      <div class="flex items-center ">
        <h1 class="w-24 font-bold">Paciente:</h1>
        <h2>{{reminder.patient?.fullname||'Ninguno'}}</h2>
      </div>
      <div class="flex">
        <h1 class="w-24 font-bold">Fecha:</h1>
        <h2>{{moment(reminder.dueAt).format('DD/MM/Y h:m A')}}</h2>
      </div>
      <div class="flex flex-col h-32 ">
        <h1 class="w-24 font-bold">Descripción:</h1>
        <p class="line-clamp-5">{{reminder.description}}</p>
      </div>
      <div class="flex justify-end ">
        <template v-if="reminder.tags">
          <code>{{ (reminder.tags).join(" ") }}</code>
        </template>

      </div>
    </div>
  </CustomDialog>
</template>

<script setup lang="ts">

import {IReminder} from "@/interfaces/ModelInterfaces.ts";
import moment from "moment";

interface  IProps{
  reminder: IReminder
}
defineProps<IProps>()

</script>