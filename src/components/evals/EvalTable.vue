<template>
  <TableWrapper :key="key" title="Historial de Consultas" :data="evals" :query="query" :formatter="evalFormatter"
                :method="getEvals" :cell-class-name="fillRow" :has-trash="true">
    <template #addButton>
      <CreateEval @updateEval="updateEval"/>
    </template>
    <template #after>
      <el-table-column :width="110" fixed="right" label="Acciones">
        <template #default="{ row }">
          <div class="flex justify-end items-center space-x-2 ">
            <template v-if="!row.deletedAt">
              <CustomDialog title="Detalle de la consulta" :key="row.id">
                <template #button>
                  <button class=" !bg-transparent !border-none" circle title="Detalles">
                    <Icon icon="carbon:touch-1" class="text-xl"/>
                  </button>
                </template>
                <EvalCard :eval="row" />
              </CustomDialog>
              <EditEval :prev-eval="row" @updateEval="updateEval" />
              <el-popconfirm width="300" title="¿Desea eliminar este registro?" @confirm="()=>deleteEval(row.id)">
                <template #reference>
                  <button class="  !bg-transparent   !border-none" circle title="Eliminar">
                    <Icon icon="carbon:trash-can" class="text-lg text-red-400"/>
                  </button>
                </template>
              </el-popconfirm>

            </template>
            <el-popconfirm width="300" title="¿Desea restaurar este registro?" @confirm="()=>restoreEval(row.id)"
                           v-else>
              <template #reference>
                <button class="  !bg-transparent   !border-none py-1" circle title="Restaurar">
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
import CustomDialog from "@/components/commons/CustomDialog.vue";
import EvalCard from "@/components/evals/EvalCard.vue";

const {key, deleteEval, restoreEval} = useUnsetEval();
const {evals, query, evalFormatter, getEvals} = useGetEvals();

const updateEval = () => {
  key.value++
}

const ranges = [
  {min: 0, max: 18.49, status: "Bajo Peso", value: "low", textColor: "!text-yellow-300"},
  {min: 18.5, max: 24.99, status: "Normal", value: "normal", textColor: "text-teal-500"},
  {min: 25.0, max: 29.99, status: "Sobre peso", value: "high", textColor: "!text-yellow-500"},
  {min: 30.0, max: Infinity, status: "Obesidad", value: "veryHigh", textColor: "!text-red-700"},
]

const getStatus = (value: number) => {
  return ranges.find((range: any) => range.min <= value && value <= range.max)
}
const fillRow = ({row, columnIndex}: any) => {
  return columnIndex == 3 ? getStatus(row.imc)?.textColor : ''
}
</script>