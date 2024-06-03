<template>
  <CustomModal title="Exportar PDF" class="!max-w-full !w-[8.6in] p-1" @show="()=>getData(row)">
    <template #button>
      <button class="  !bg-transparent   !border-none" circle title="PDF">
        <Icon icon="vscode-icons:file-type-pdf2"
              class="text-2xl text-primary"/>
      </button>
    </template>
    <div class="flex w-full flex-col items-end space-y-2">
      <div class="w-full p-1">
        <table style="width: 100%" id="exportPDF">
          <tr>
            <th style="width: 20%"></th>
            <th style="width: 50%; color: red">Detalles</th>
            <th style="width:30%"> Observaciones</th>
          </tr>
          <tr v-for="day in Object.values(EPlanDay)">
            <td class="day-header">
              <div> {{ day }}</div>
            </td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
      <button class="w-24" @click="exportPdf">
        Exportar
      </button>
    </div>
  </CustomModal>
</template>

<style scoped>


.day-header {
  padding: 5px 0;
  color: #eee;
  height: 2rem;
  font-weight: bold;
  font-size: 1.2rem;
}

.day-header div {
  background: #0484ac;
  padding: 15px 0;
  text-align: center;
}

</style>

<script setup lang="ts">
import {useExportPlan} from "@/services/plans";
import {ref} from "vue";
import {EPlanDay} from "@/interfaces/ModelInterfaces.ts";

interface IProps {
  row: any
}

const plans = ref()
defineProps<IProps>()

const {exportPdf, getData} = useExportPlan();


</script>