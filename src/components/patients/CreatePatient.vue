<template>
  <form class="col-span-5 grid grid-cols-12 gap-x-4 gap-y-8 p-4"
        @submit.prevent="(evt:any)=>onConfirmSubmit(evt, '¿Registrar datos del paciente?', createPatient)">
    <h1 class="col-span-12 text-primary opacity-80 font-bold text-lg">Datos del Paciente</h1>
    <FloatLabel class="col-span-6 ">
      <InputText id="name" v-model="patient.name" class="w-full dark:bg-gray-700" :invalid="$vPatient.name.$error"/>
      <label for="name"><sup class="text-red-400">*</sup>Nombre</label>
    </FloatLabel>
    <FloatLabel class="col-span-6 ">
      <InputText id="lastname" v-model="patient.lastname" class="w-full dark:bg-gray-700"
                 :invalid="$vPatient.lastname.$error"/>
      <label for="lastname"><sup class="text-red-400">*</sup>Apellidos</label>
    </FloatLabel>
    <div class="col-span-6 flex shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 ring-offset-0
    rounded-md overflow-hidden outline-none focus:ring-primary-500 -pl-2 dark:focus:ring-primary-400 border border-gray-300">
      <Dropdown id="country" filter :options="countries" option-value="isoCode" inputClass="!w-7 !pl-1.5"
                v-model="countryCode" optionLabel="name" :tabindex="-1"
                class="!w-7 dark:bg-gray-700 hide-arrow !border-none !ring-0 !px-0 !shadow-none !rounded-none"
                panelClass="dark:bg-gray-800">
        <template #option="{option}">
          <span class="fi" :class="`fi-${option.isoCode.toLowerCase()}`"></span>
        </template>
        <template #value="{value}">
          <span class="fi" :class="`fi-${value.toLowerCase()}`"></span>
        </template>
      </Dropdown>
      <InputMask :mask="mask" id="phone" v-model="patient.phone" placeholder="Teléfono"
                 class="w-full !ring-0 !shadow-none !rounded-none dark:bg-gray-700 !pl-1.5"
                 :invalid="$vPatient.phone.$error"/>
    </div>

    <FloatLabel class="col-span-6">
      <Dropdown id="gender" v-model="patient.gender" :options="Object.values(EInfoGender)"
                inputClass="!w-full" :invalid="$vPatient.gender.$error"
                class="!w-full dark:bg-gray-700 hide-arrow" panelClass="dark:bg-gray-800"/>
      <label for="gender"><sup class="text-red-400">*</sup>Sexo</label>
    </FloatLabel>
    <FloatLabel class="col-span-12 ">
      <AutoComplete type="email" id="email" v-model="patient.email" class="w-full dark:bg-gray-700"  inputClass="!w-full"
                    :suggestions="items" @complete="onComplete" :invalid="$vPatient.email.$error"/>
      <label for="email">Correo Electrónico</label>
    </FloatLabel>
    <FloatLabel class="col-span-6 ">
      <InputText id="dni" v-model="patient.dni" class="w-full dark:bg-gray-700"
                 :invalid="$vPatient.dni.$error"/>
      <label for="dni">Cédula/DNI</label>
    </FloatLabel>
    <FloatLabel class="col-span-6 ">
      <InputText id="note" v-model="patient.note" class="w-full dark:bg-gray-700"
                 :invalid="$vPatient.note.$error"/>
      <label for="note">Nota adicional</label>
    </FloatLabel>
    <FloatLabel class="col-span-12">
      <InputText id="line1" v-model="patient.line1" class="w-full dark:bg-gray-700"
                 :invalid="$vPatient.line1.$error"/>
      <label for="line1">Dirección</label>
    </FloatLabel>
    <FloatLabel class="col-span-12">
      <InputText id="line2" v-model="patient.line2" class="w-full dark:bg-gray-700"
                 :invalid="$vPatient.line2.$error"/>
      <label for="line2">Referencia (opcional)</label>
    </FloatLabel>
    <FloatLabel class="col-span-6">
      <Dropdown id="provinceId" v-model="patient.provinceId" :options="provinces" optionLabel="name"
                inputClass="!w-full" :invalid="$vPatient.provinceId.$error" filter optionValue="id" showClear
                class="!w-full dark:bg-gray-700 hide-arrow" panelClass="dark:bg-gray-800" :autoFilterFocus="true"/>
      <label for="provinceId">Provincia</label>
    </FloatLabel>
    <FloatLabel class="col-span-6">
      <Dropdown id="municipeId" v-model="patient.municipeId" :options="municipes" optionLabel="name"
                inputClass="!w-full" :invalid="$vPatient.municipeId.$error" filter optionValue="id" showClear
                class="!w-full dark:bg-gray-700 hide-arrow" panelClass="dark:bg-gray-800" :autoFilterFocus="true"/>
      <label for="municipeId">Municipio</label>
    </FloatLabel>
    <Button type="submit" severity="contrast"
            class="bg-soft hover:bg-opacity-80 text-gray-200 col-start-9 col-end-13"
            raised label="Registrar"/>
    <input type="submit" value="" class="hidden">
  </form>

</template>

<script setup lang="ts">
import countries from "@/assets/static/countries.json"
import {useSetPatient} from "@/services/patients";
import useConfirmService from "@/services/ConfirmService.ts";
import {EInfoGender} from "@/interfaces/ModelInterfaces.ts";
import {onMounted, Ref, ref, watch} from "vue";
import {useGetProvinces} from "@/services/provinces";

const countryCode = ref("DO");
const mask = ref("+1(999) 999-9999");
const municipes = ref([]);

const {patient, $vPatient, createPatient} = useSetPatient();
const {provinces, getProvinces} = useGetProvinces();

const {onConfirmSubmit} = useConfirmService();

const items: Ref<string[]> = ref([]);
const emailSuffixes = ref([
  "@gmail.com",
  "@hotmail.com",
  "@outlook.com",
  "@icloud.com",
  "@outlook.es",
  "@yahoo.com",
  "@live.com",
]);

const onComplete = (evt: any) => {
  items.value = evt.query.includes("@") ? [] :
      emailSuffixes.value.map((suffix: string) => evt.query + suffix);
}

onMounted(() => {
  getProvinces().then();
})

watch(() => patient.value.provinceId, (newVal: string) => {
  const province = provinces.value.find((prov: any) => prov.id === newVal);
  patient.municipeId = '';
  if (province) {
    municipes.value = province.municipes;
  }
})

watch(() => countryCode.value,
    (newVal: string) => {
      const country = countries.find((c: any) => c.isoCode === newVal);
      if (country) {
        mask.value = country.phoneFormat;
      }
    });

</script>