<template>
  <el-table :data="plans" height="100%" show-summary :show-overflow-tooltip="true">
    <el-table-column prop="type" label="Tipo" :width="90">
      <template #default="{row}">
        <div class="py-1.5">{{ row.type }}</div>
      </template>
    </el-table-column>
    <el-table-column :width="72" prop="proteins" label="Prot."/>
    <el-table-column :width="72" prop="carbohidrates" label="Carb."/>
    <el-table-column :width="72" prop="calories" label="kCal."/>
    <el-table-column :width="72" prop="fat" label="Grasa"/>
    <el-table-column :width="72" fixed="right">
      <template #header>
        <div class="flex justify-end items-center space-x-2 " v-if="plans.length">
              <button class="  !bg-transparent   !border-none" circle title="PDF"
                      @click="$router.push({name:'plans_pdf', params:{id: plans.at(0).patientId} })">
                <Icon icon="vscode-icons:file-type-pdf2"
                      class="text-xl text-primary"/>
              </button>
          <el-popconfirm width="250" title="¿Enviar menú por WhatsApp?">
            <template #reference>
              <button class="  !bg-transparent   !border-none" circle title="WhatsApp">
                <Icon icon="logos:whatsapp-icon"
                      class="text-xl text-primary"/>
              </button>
            </template>
          </el-popconfirm>
        </div>
      </template>
      <template #default="{ row }">
        <div class="flex justify-end items-center space-x-2 ">
          <el-popconfirm width="215" title="¿Generar Menú en PDF?" :key="'p'+row.id"
                         @confirm="()=>exportPdf(row.patientId, [row.type])">
            <template #reference>
              <button class="  !bg-transparent   !border-none" circle title="PDF">
                <Icon icon="vscode-icons:file-type-pdf2"
                      class="text-xl text-primary"/>
              </button>
            </template>
          </el-popconfirm>
          <el-popconfirm width="250" title="¿Enviar menú por WhatsApp?" :key="'w'+row.id">
            <template #reference>
              <button class="  !bg-transparent   !border-none" circle title="WhatsApp">
                <Icon icon="logos:whatsapp-icon"
                      class="text-xl text-primary"/>
              </button>
            </template>
          </el-popconfirm>
        </div>
      </template>
    </el-table-column>
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