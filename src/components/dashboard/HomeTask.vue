<template>
  <div class="flex flex-col space-y-2 p-1.5 border shadow-lg rounded-lg h-[19.7rem]">
    <h1 class="p-1 text-lg font-[400]">Últimas Tareas</h1>
    <div class="flex items-center justify-between space-x-2 !my-2" v-for="(reminder, index) in reminders"
         :key="reminder.id">
      <div class=" rounded-lg shadow-lg p-1 w-8 mr-2"
           :class="index%2===0?'bg-primary text-gray-50':'text-primary bg-white'">
        <Icon
            icon="material-symbols:task-alt-rounded"
            class="text-2xl "/>
      </div>
      <div class="flex flex-col justify-center w-full">
        <h1 class="font-bold text-sm text-primary ellipsis w-44" v-tooltip="reminder.description">{{
            reminder.title
          }}</h1>
        <h1 class="font-normal text-xs ellipsis">{{ moment(reminder.dueAt).format("D/M/Y h:m A") }}</h1>
      </div>
    </div>
    <div class="flex items-center justify-between space-x-2 !my-2" v-for="skeleton in 5-reminders.length"
         :key="skeleton">
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
import {useGetReminder} from "@/services/reminders";
import {onMounted} from "vue";
import {EReminderStatus} from "@/interfaces/ModelInterfaces.ts";
import moment from "moment-timezone";

const {query, reminders, getReminders} = useGetReminder();

onMounted(() => {
  query.limit(5).order("dueAt").replaceFilter("status", EReminderStatus.pending, "eq", "and");
  getReminders()
})

</script>