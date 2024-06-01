<template>
  <TableWrapper title="Registro de pacientes" :data="patients" :query="query" :formatter="patientFormatter" :key="key"
                :method="getPatients" :has-trash="true">
    <template #after>
      <el-table-column :width="110" fixed="right" label="Acciones">
        <template #default="{ row }">
          <div class="flex justify-end items-center space-x-2 ">
            <template v-if="!row.deletedAt">
              <button class="  !bg-transparent !border-none" circle title="Detalles"
                      @click="$router.push({name:'patients_show',params:{id: row.id}})">
                <Icon icon="carbon:touch-1" class="text-xl"/>
              </button>
              <EditPatient @patientUpdated="getPatients" :prev-patient="row"/>
              <el-popconfirm width="300" title="¿Desea eliminar este registro?" @confirm="()=>deletePatient(row.id)">
                <template #reference>
                  <button class="  !bg-transparent   !border-none" circle title="Eliminar">
                    <Icon icon="carbon:trash-can" class="text-lg"/>
                  </button>
                </template>
              </el-popconfirm>

            </template>
            <el-popconfirm width="300" title="¿Desea restaurar este registro?" @confirm="()=>restorePatient(row.id)"
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

import {useGetPatients, useUnsetPatient} from "@/services/patients";
import EditPatient from "@/components/patients/EditPatient.vue";

const {patients, query, patientFormatter, getPatients} = useGetPatients();
const {key, deletePatient, restorePatient} = useUnsetPatient();
</script>