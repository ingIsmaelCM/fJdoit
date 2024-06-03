<template>
  <el-table :data="plans" height="100%" show-summary>
    <el-table-column prop="type" label="Tipo" :width="100">
      <template #default="{row}">
        <div class="py-1.5">{{ row.type }}</div>
      </template>
    </el-table-column>
    <el-table-column :width="70" prop="proteins" label="Prot."/>
    <el-table-column :width="70" prop="carbohidrates" label="Carb."/>
    <el-table-column :width="70" prop="calories" label="kCal."/>
    <el-table-column :width="70" prop="fat" label="Grasa"/>
    <el-table-column :width="80" fixed="right" >
      <template #default="{ row }">
        <div class="flex justify-end items-center space-x-2 ">
          <el-popconfirm width="215" title="¿Generar Menú en PDF?" @confirm="()=>exportPdf(row)">
            <template #reference>
              <button class="  !bg-transparent   !border-none" circle title="PDF">
                <Icon icon="vscode-icons:file-type-pdf2"
                      class="text-2xl text-primary"/>
              </button>
            </template>
          </el-popconfirm>
          <el-popconfirm width="250" title="¿Enviar menú por WhatsApp?">
            <template #reference>
              <button class="  !bg-transparent   !border-none" circle title="WhatsApp">
                <Icon icon="logos:whatsapp-icon"
                      class="text-2xl text-primary"/>
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

const {exportPdf}=useExportPlan();
</script>