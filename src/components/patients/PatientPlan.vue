<template>
  <div class="flex justify-between items-center p-2">
    <h1 class="text-gray-700 font-bold">Planes registrados</h1>
    <div class="flex justify-end items-center space-x-2 " v-if="plans.length">
      <button class="  !bg-transparent   !border-none" circle title="Exportar"
              @click="$router.push({name:'plans_pdf', params:{id: plans.at(0).patientId} })">
        <Icon icon="entypo:export"
              class="text-xl text-primary"/>
      </button>
    </div>
  </div>
  <el-table :data="plans" height="100%" show-summary :show-overflow-tooltip="true">
    <el-table-column prop="type" label="Tipo" >
      <template #default="{row}">
        <div class="py-1.5">{{ row.type }}</div>
      </template>
    </el-table-column>
    <el-table-column :width="72" prop="proteins" label="Prot."/>
    <el-table-column :width="72" prop="carbohidrates" label="Carb."/>
    <el-table-column :width="72" prop="calories" label="kCal."/>
    <el-table-column :width="72" prop="fat" label="Grasa"/>
  </el-table>
</template>

<script setup lang="ts">
import {useExportPlan} from "@/services/plans";

interface IProps {
  plans: any[]
}



defineProps<IProps>()

const {exportPdf} = useExportPlan();
</script>