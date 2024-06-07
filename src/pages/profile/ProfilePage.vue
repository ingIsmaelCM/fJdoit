<template>
  <div class="grid grid-cols-12 gap-x-4 gap-y-8 p-6 w-2/3 items-center">
    <h1 class="col-span-6 -mb-2">
      Información
    </h1>
    <div class="col-span-6 flex justify-end">
      <Button type="submit" severity="contrast"
              class="bg-primary hover:bg-opacity-80 text-gray-200 col-start-9 col-end-13"
              raised label="Actualizar Información"/>
    </div>
    <FloatLabel class="col-span-3 ">
      <InputText id="username" v-model="user.username" class="w-full dark:bg-gray-700" readonly/>
      <label for="username"><sup class="text-red-400">*</sup>Usuario</label>
    </FloatLabel>
    <FloatLabel class="col-span-4 ">
      <InputText id="name" v-model="user.name" class="w-full dark:bg-gray-700"/>
      <label for="name"><sup class="text-red-400">*</sup>Nombre</label>
    </FloatLabel>
    <FloatLabel class="col-span-5 ">
      <InputText id="lastname" v-model="user.lastname" class="w-full dark:bg-gray-700"/>
      <label for="lastname"><sup class="text-red-400">*</sup>Apellido</label>
    </FloatLabel>
    <FloatLabel class="col-span-3">
      <Dropdown id="gender" v-model="user.gender" :options="Object.values(EInfoGender)"
                inputClass="!w-full" class="!w-full dark:bg-gray-700 hide-arrow" panelClass="dark:bg-gray-800"/>
      <label for="gender"><sup class="text-red-400">*</sup>Sexo</label>
    </FloatLabel>
    <FloatLabel class="col-span-4 ">
      <InputText id="phone" v-model="user.phone" class="w-full dark:bg-gray-700"/>
      <label for="phone"><sup class="text-red-400">*</sup>Teléfono</label>
    </FloatLabel>
    <FloatLabel class="col-span-5 ">
      <InputText id="email" v-model="user.email" class="w-full dark:bg-gray-700" type="email"/>
      <label for="email">Correo Electrónico</label>
    </FloatLabel>

    <h1 class="col-span-6 -mb-2">
      Dirección
    </h1>
    <div class="col-span-6 flex justify-end">
      <Button type="submit" severity="contrast"
              class="bg-sky-600 hover:bg-opacity-80 text-gray-200 col-start-9 col-end-13"
              raised label="Actualizar Dirección"/>
    </div>
    <FloatLabel class="col-span-12 ">
      <InputText id="line1" v-model="user.line1" class="w-full dark:bg-gray-700"/>
      <label for="line1">Dirección</label>
    </FloatLabel>
    <FloatLabel class="col-span-12 ">
      <InputText id="line2" v-model="user.line2" class="w-full dark:bg-gray-700"/>
      <label for="line2">Línea 2</label>
    </FloatLabel>
    <FloatLabel class="col-span-6">
      <Dropdown id="provinceId" v-model="user.provinceId" :options="provinces" optionLabel="name"
                inputClass="!w-full" filter optionValue="id" showClear
                class="!w-full dark:bg-gray-700 hide-arrow" panelClass="dark:bg-gray-800" :autoFilterFocus="true"/>
      <label for="provinceId">Provincia</label>
    </FloatLabel>
    <FloatLabel class="col-span-6">
      <Dropdown id="municipeId" v-model="user.municipeId" :options="municipes" optionLabel="name"
                inputClass="!w-full" filter optionValue="id" showClear
                class="!w-full dark:bg-gray-700 hide-arrow" panelClass="dark:bg-gray-800" :autoFilterFocus="true"/>
      <label for="municipeId">Municipio</label>
    </FloatLabel>
    <h1 class="col-span-6 -mb-2">
      Cambio
    </h1>
    <div class="col-span-6 flex justify-end">
      <Button type="submit" severity="contrast"
              class="bg-teal-600 hover:bg-opacity-80 text-gray-200 col-start-9 col-end-13"
              raised label="Actualizar Contraseña"/>
    </div>
    <FloatLabel class="col-span-6 ">
      <Password id="password" v-model="user.password" class="w-full dark:bg-gray-700" inputClass="w-full" toggle-mask/>
      <label for="password"><sup class="text-red-400">*</sup>Contraseña</label>
    </FloatLabel>
    <FloatLabel class="col-span-6 ">
      <Password id="password_confirmation" v-model="user.password_confirmation" class="w-full dark:bg-gray-700"
                inputClass="w-full" toggle-mask/>
      <label for="password_confirmation"><sup class="text-red-400">*</sup>Confirmación</label>
    </FloatLabel>
  </div>
</template>

<script setup lang="ts">
import useUserStore from "../../stores/userStore.ts";
import {onMounted, Ref, ref, watch} from "vue";
import {EInfoGender} from "@/interfaces/ModelInterfaces.ts";
import {useGetProvinces} from "@/services/provinces";

const user: Ref<Record<string, any>> = ref(useUserStore().getUser);
const municipes: Ref<Record<string, any>[]> = ref([]);
const {provinces, getProvinces} = useGetProvinces();

onMounted(() => {
  getProvinces().then();
})
watch(() => user.value.provinceId, (newVal: string) => {
  const province = provinces.value.find((prov: any) => prov.id === newVal);
  user.value.municipeId = '';
  if (province) {
    municipes.value = province.municipes;
  }
})
</script>