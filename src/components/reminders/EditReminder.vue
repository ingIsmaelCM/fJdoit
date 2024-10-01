<template>
  <CustomDialog title="Actualizar Datos del Recordatorio" @show="()=>initData()"
                class="!w-[500px]">
    <template #button>
      <Button severity="contrast" title="Actualizar paciente">
        <Icon icon="carbon:edit" class="text-2xl"/>
      </Button>
    </template>
    <div class="p-2 w-full">
      <form @submit.prevent="(evt:any)=>onConfirmSubmit(evt, '¿Actualizar datos del registro?', updateReminder)"
            class="grid grid-cols-12 gap-y-8 gap-x-4 pt-8 relative" id="formCreateReminder">
        <FloatLabel class="col-span-12 ">
          <InputText id="title" v-model="reminder.title" class="w-full dark:bg-gray-700"
                     :invalid="$vReminder.title.$error"/>
          <label for="title"><sup class="text-red-400">*</sup>Título del recordatorio</label>
        </FloatLabel>

        <FloatLabel class="col-span-12 row-span-2">
                  <Textarea v-model="reminder.description" rows="3" cols="65" maxlength="250"
                            :invalid="$vReminder.description.$error"
                            :auto-resize="false" id="description" class="resize-none w-full dark:bg-gray-700"/>
          <label for="description">Descripción</label>
        </FloatLabel>
        <FloatLabel class="col-span-12">
          <Chips id="tags" v-model="reminder.tags" separator=" " :max="3" :allow-duplicate="false"/>
          <label for="tags">Etiquetas</label>
        </FloatLabel>
        <FloatLabel class="col-span-3">
          <Calendar id="day" v-model="reminder.day" class="w-full" showIcon showButtonBar iconDisplay="input"
                    dateFormat="dd-mm" :invalid="$vReminder.day.$error"/>
          <label for="day">Fecha</label>
        </FloatLabel>
        <FloatLabel class="col-span-3">
          <Calendar id="time" v-model="reminder.time" :invalid="$vReminder.time.$error" class="w-full"
                    showIcon iconDisplay="input"
                    time-only/>
          <label for="time">Hora</label>
        </FloatLabel>
        <FloatLabel class="col-span-6">
          <Dropdown v-model="reminder.patientId" :options="patients" filter
                    optionValue="id" id="patientId"
                    optionLabel="fullname" @filter="(evt:any)=>utils.debounce(()=>onSearchPatient(evt),500)(evt)"
                    class="!w-full dark:bg-gray-700 hide-arrow" panelClass="dark:bg-gray-800" :autoFilterFocus="true">
          </Dropdown>
          <label for="patientId">Paciente</label>
        </FloatLabel>
        <div class="col-span-12 flex justify-end">
          <Button type="submit" severity="contrast"
                  class="bg-soft hover:bg-opacity-80 text-gray-200 w-1/4"
                  raised label="Actualizar"/>
        </div>
        <input type="submit" value="" class="hidden">
      </form>
    </div>
  </CustomDialog>
</template>

<script setup lang="ts">

import {IReminder} from "@/interfaces/ModelInterfaces.ts";
import utils from "@/helpers/utils.ts";
import useConfirmService from "@/services/ConfirmService.ts";
import {useSetReminder} from "@/services/reminders";
import {useGetPatients} from "@/services/patients";

interface IProps {
  oldReminder: IReminder
}

const props = defineProps<IProps>()

const {onConfirmSubmit} = useConfirmService()
const emit = defineEmits(["reminderUpdated"])
const {reminder, $vReminder, updateReminder} = useSetReminder(emit as any);
const {patients, query: patQuery, getPatients} = useGetPatients();

const onSearchPatient = async ({value}: { value: string }) => {
  patQuery.search(value);
  await getPatients();
}
const initData = () => {
  getPatients().then();
  reminder.value = {
    ...props.oldReminder,
    time: new Date(props.oldReminder.time),
    day: new Date(props.oldReminder.day),
  }
}
</script>