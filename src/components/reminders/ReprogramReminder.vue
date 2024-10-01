<template>
  <CustomDialog title="Reprogramar Recordatorio" class="!w-[17rem]"
                :disabled="reminder.status===EReminderStatus.canceled">
    <template #button>
      <Button severity="contrast"
              v-tooltip.top="'Reprogramar Recordatorio'">
        <Icon icon="mdi:reload" class="text-xl "/>
      </Button>
    </template>
    <form @submit.prevent="(event:any)=>onConfirmSubmit(event, '¿Desea repogramar este recordatorio?',
    ()=>reprogramReminder(reminder.id))" id="reprogramReminder"
          class="grid grid-cols-6 gap-x-4 gap-y-8 pt-8">
      <FloatLabel class="col-span-3">
        <Calendar id="day" v-model="reminder.day" class="w-full" showIcon showButtonBar iconDisplay="input"
                  dateFormat="dd-mm" :invalid="$vReprogramReminder.day.$error"/>
        <label for="day">Fecha</label>
      </FloatLabel>
      <FloatLabel class="col-span-3">
        <Calendar id="time" v-model="reminder.time" :invalid="$vReprogramReminder.time.$error" class="w-full"
                  showIcon iconDisplay="input"
                  time-only/>
        <label for="time">Hora</label>
      </FloatLabel>
      <div class="col-span-6 flex items-center justify-center space-x-4">
        <span>¿Actualizar la fecha?</span>
        <ToggleButton v-model="moveDateOnReprogram" onLabel="Sí" offLabel="No"/>
      </div>
      <div class="col-span-6 flex justify-end">
        <Button type="submit" severity="contrast"
                class="bg-soft hover:bg-opacity-80 text-gray-200 w-1/2"
                raised label="Reprogramar"/>
      </div>
      <input type="submit" value="" class="hidden">

    </form>
  </CustomDialog>
</template>
<script setup lang="ts">

import {EReminderStatus, IReminder} from "@/interfaces/ModelInterfaces.ts";
import useConfirmService from "@/services/ConfirmService.ts";
import {useSetReminder} from "@/services/reminders";
import {onMounted} from "vue";

interface IProps {
  oldReminder: IReminder
}

const props = defineProps<IProps>();
const {onConfirmSubmit} = useConfirmService()
const emit = defineEmits(["reminderReprogrammed"])

const {reminder, moveDateOnReprogram, $vReprogramReminder, reprogramReminder} =
    useSetReminder(emit as any)

const initData = () => {
  reminder.value = {
    ...props.oldReminder,
    time: new Date(props.oldReminder.time),
    day: new Date(props.oldReminder.day),
  }
}

onMounted(() => {
  initData();
})
</script>