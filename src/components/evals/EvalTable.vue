<template>
  <TableWrapper :key="key" title="Historial de Consultas" :data="evals" :query="query" :formatter="evalFormatter"
                :method="getEvals" :cell-class-name="fillRow">
    <template #addButton>
      <CreateEval @updateEval="updateEval"/>
    </template>
    <template #after>
      <el-table-column :width="110" fixed="right" label="Acciones">
        <template #default="{ row }">
          <div class="flex justify-end items-center space-x-2 ">
            <template v-if="!row.deletedAt">
              <button class=" !bg-transparent !border-none" circle title="Detalles"
                      @click="$router.push({name:'patients_show',params:{id: row.id}})">
                <Icon icon="carbon:touch-1" class="text-xl"/>
              </button>
              <EditEval :prev-eval="row" @updateEval="updateEval"/>
              <el-popconfirm width="300" title="¿Desea eliminar este registro?">
                <template #reference>
                  <button class="  !bg-transparent   !border-none" circle title="Eliminar">
                    <Icon icon="carbon:trash-can" class="text-lg"/>
                  </button>
                </template>
              </el-popconfirm>

            </template>
            <el-popconfirm width="300" title="¿Desea restaurar este registro?"
                           v-else>
              <template #reference>
                <button class="  !bg-transparent   !border-none" circle title="Restaurar">
                  <Icon icon="material-symbols:settings-backup-restore-rounded"
                        class="text-lg"/>
                </button>
              </template>
            </el-popconfirm>


          </div>
        </template>
      </el-table-column>
    </template>
  </TableWrapper>
</template>

<script setup lang="ts">

import {useGetEvals, useUnsetEval} from "@/services/evals";
import CreateEval from "@/components/evals/CreateEval.vue";
import EditEval from "@/components/evals/EditEval.vue";

const {key, deleteEval, restoreEval} = useUnsetEval();
const {evals, query, evalFormatter, getEvals} = useGetEvals();

const updateEval=()=>{
  key.value++
}

const ranges=[
  {min: 0, max: 18.49, status: "Bajo Peso", value: "low", textColor: "!text-yellow-300"},
  {min: 18.5, max: 24.99, status: "Normal", value: "normal", textColor: ""},
  {min: 25.0, max: 29.99, status: "Sobre peso", value: "high", textColor: "!text-yellow-500"},
  {min: 30.0, max: Infinity, status: "Obesidad", value: "veryHigh", textColor: "!text-red-700"},
]

const getStatus=(value: number)=>{
  return ranges.find((range: any)=>range.min<value && value<range.max)
}
const fillRow=({row, columnIndex}:any)=>{

  return columnIndex==2? getStatus(row.imc)?.textColor:''
}
</script>