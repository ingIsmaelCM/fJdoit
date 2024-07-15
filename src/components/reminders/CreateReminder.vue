<template>
  <div class="p-2 w-2/3">
    <form @submit.prevent="(evt:any)=>onConfirmSubmit(evt, '¿Registrar recordatorio?', createReminder)"
          class="grid grid-cols-12 gap-y-8 gap-x-4 pt-8 relative" id="formCreateReminder">
      <div class="absolute top-0 right-2">
        <TourComponent name="createReminderTour" hint="Registro de recordatorio"
                       :steps="Object.values(createReminderTour)"/>
      </div>
      <FloatLabel class="col-span-8 ">
        <InputText id="title" v-model="reminder.title" class="w-full dark:bg-gray-700"
                   :invalid="$vReminder.title.$error"/>
        <label for="title"><sup class="text-red-400">*</sup>Título del recordatorio</label>
      </FloatLabel>
      <FloatLabel class="col-span-4">
        <Dropdown id="type" v-model="reminder.type" :required="true" :options="Object.values(EReminderType)"
                  checkmark :invalid="$vReminder.type.$error" inputClass="  !w-full dark:bg-gray-700"
                  class="!w-full dark:bg-gray-700 hide-arrow"
                  panelClass="dark:bg-gray-700"
        />
        <label for="type"><sup class="text-red-400">*</sup>Tipo/Recurrencia</label>
      </FloatLabel>

      <FloatLabel class="col-span-12 row-span-2">
                  <Textarea v-model="reminder.description" rows="2" cols="65" maxlength="250"
                            :invalid="$vReminder.description.$error"
                            :auto-resize="false" id="description" class="resize-none w-full dark:bg-gray-700"/>
        <label for="description">Descripción</label>
      </FloatLabel>
      <FloatLabel class="col-span-3">
        <Calendar id="day" v-model="reminder.day" class="w-full" showIcon showButtonBar iconDisplay="input"
                  dateFormat="dd-mm"/>
        <label for="day">Fecha</label>
      </FloatLabel>
      <FloatLabel class="col-span-3">
        <Calendar id="time" v-model="reminder.time" class="w-full" showIcon iconDisplay="input"
                  time-only/>
        <label for="time">Hora</label>
      </FloatLabel>
      <FloatLabel class="col-span-3">
        <Dropdown id="dayName" v-model="reminder.dayName" :options="days" optionLabel="name" optionValue="index"
                  checkmark inputClass="  !w-full dark:bg-gray-700" show-clear
                  class="!w-full dark:bg-gray-700 hide-arrow"
                  panelClass="dark:bg-gray-700"
        />
        <label for="dayName">Día</label>
      </FloatLabel>
      <Button type="submit" severity="contrast"
              class="bg-soft hover:bg-opacity-80 text-gray-200 col-span-3"
              raised label="Registrar"/>
      <input type="submit" value="" class="hidden">
    </form>
  </div>
</template>

<script setup lang="ts">

import {useSetReminder} from "@/services/reminders";
import useConfirmService from "@/services/ConfirmService.ts";
import {EReminderType} from "@/interfaces/ModelInterfaces.ts";
import {createReminderTour} from "@/hints/tours/reminderTour.ts";

const {onConfirmSubmit} = useConfirmService()
const {reminder, days, $vReminder, createReminder} = useSetReminder();

</script>