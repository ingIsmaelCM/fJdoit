<template>
  <CustomDialog title="Registro de consulta" @show="initData" @hide="$emit('updateEval')">
    <template #button>
      <Button type="button" severity="contrast" rounded
              class="text-primary hover:text-soft"
              raised>
        <template #icon>
          <Icon icon="ic:twotone-playlist-add" class="text-2xl "/>
        </template>
      </Button>
    </template>

    <form class="w-full p-4 pt-8 grid grid-cols-12 gap-x-4 gap-y-8"
          @submit.prevent="(evt:any)=>onConfirmSubmit(evt, '¿Registrar consulta?', createEval)">
      <FloatLabel class="col-span-6">
        <Dropdown v-model="evaluation.patientId" :options="patients" filter :invalid="$vEval.patientId.$error"
                  optionValue="id"
                  optionLabel="fullname" @filter="(evt:any)=>$debounce(()=>onSearchPatient(evt),500)(evt)"
                  class="!w-full dark:bg-gray-700 hide-arrow" panelClass="dark:bg-gray-800" :autoFilterFocus="true">
        </Dropdown>
        <label for="proteins">Paciente</label>
      </FloatLabel>
      <FloatLabel class="col-span-3">
        <InputNumber inputClass="!w-full dark:bg-gray-700" class="!w-full" id="weight"
                     :invalid="$vEval.weight.$error"
                     v-model="evaluation.weight" :min="1" :max="250" :allowEmpty="false" locale="en-US"
                     mode="decimal" :min-fraction-digits="2" :max-fraction-digits="2"/>
        <label for="weight">Peso (kg)</label>
      </FloatLabel>
      <FloatLabel class="col-span-3">
        <InputNumber inputClass="!w-full dark:bg-gray-700" class="!w-full" id="height"
                     :invalid="$vEval.height.$error"
                     v-model="evaluation.height" :min="1" :max="250" :allowEmpty="false" locale="en-US"
                     mode="decimal" :min-fraction-digits="2" :max-fraction-digits="2"/>
        <label for="height">Estatura (cm)</label>
      </FloatLabel>
      <FloatLabel class="col-span-12">
                  <Textarea v-model="evaluation.note" rows="6" cols="65" maxlength="250"
                            :auto-resize="false" id="note`" class="resize-none w-full dark:bg-gray-700"/>
        <label for="note`">Detalle de la consulta</label>
      </FloatLabel>
      <div class="col-span-12 flex justify-end">
        <Button type="submit" severity="contrast" label="Registrar"
                class=" bg-primary text-gray-100 hover:text-soft">
        </Button>
        <input type="submit" value="" class="hidden">
      </div>
    </form>
  </CustomDialog>
</template>
<script setup lang="ts">

import {useGetPatients} from "@/services/patients";
import {useSetEval} from "@/services/evals";
import useConfirmService from "@/services/ConfirmService.ts";

const {patients, query: patQuery, getPatients} = useGetPatients();
const emit=defineEmits(["updateEval"])
const {evaluation, $vEval, createEval} = useSetEval(emit);
const {onConfirmSubmit} = useConfirmService();

const onSearchPatient = async ({value}: { value: string }) => {
  patQuery.search(value);
  await getPatients();
}

const initData = async () => {
  await getPatients();
}
</script>
