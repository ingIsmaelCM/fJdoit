<template>
  <AutoComplete id="name" class="w-52 dark:bg-gray-700" v-model="patientId" inputClass="  !w-full dark:bg-gray-700"
                :suggestions="patients" @item-select="patientSelected" optionLabel="fullname"
                @complete="(evt:any)=>utils.debounce(()=>onSearchPatient(),500)(evt)"
                placeholder="Buscar Pacientes" size="small"/>
</template>
<script setup lang="ts">
import {useGetPatients} from "@/services/patients";
import {ref} from "vue";
import {useRouter} from "vue-router";
import utils from "@/helpers/utils.ts";

const {patients, query: patQuery, getPatients} = useGetPatients();
const patientId = ref();
const router = useRouter();

const onSearchPatient = async () => {
  if (patientId.value) {
    patQuery.search(patientId.value);
    await getPatients();
  }
}

const patientSelected = ({value: {id}}: { value: Record<string, any> }) => {
  router.push({name: "patients_show", params: {id: id}})
}
</script>