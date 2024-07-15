<template>
  <div class="size-full flex items-center">
    <div class="grid grid-cols-12 gap-x-4 gap-y-8 p-6  w-2/3 items-center">
      <FloatLabel class="col-span-3 ">
        <InputText id="username" v-model="user.username" class="w-full dark:bg-gray-700" readonly/>
        <label for="username"><sup class="text-red-400">*</sup>Usuario</label>
      </FloatLabel>
      <FloatLabel class="col-span-4 ">
        <InputText id="name" v-model="user.name" class="w-full dark:bg-gray-700" :invalid="$vProfile.name.$error"/>
        <label for="name"><sup class="text-red-400">*</sup>Nombre</label>
      </FloatLabel>
      <FloatLabel class="col-span-5 ">
        <InputText id="lastname" v-model="user.lastname" class="w-full dark:bg-gray-700"
                   :invalid="$vProfile.lastname.$error"/>
        <label for="lastname"><sup class="text-red-400">*</sup>Apellido</label>
      </FloatLabel>
      <FloatLabel class="col-span-3">
        <Dropdown id="gender" v-model="user.gender" :options="Object.values(EInfoGender)"
                  :invalid="$vProfile.gender.$error"
                  inputClass="!w-full" class="!w-full dark:bg-gray-700 hide-arrow" panelClass="dark:bg-gray-800"/>
        <label for="gender"><sup class="text-red-400">*</sup>Sexo</label>
      </FloatLabel>
      <FloatLabel class="col-span-4 ">
        <InputMask :mask="mask" id="phone" v-model="user.phone" placeholder="Teléfono"
                   class="w-full  dark:bg-gray-700 !pl-1.5"
                   :invalid="$vProfile.phone.$error"/>
        <label for="phone" v-if="user.phone"><sup class="text-red-400">*</sup>Teléfono</label>
      </FloatLabel>
      <FloatLabel class="col-span-5 ">
        <InputText id="email" v-model="user.email" class="w-full dark:bg-gray-700" type="email"
                   :invalid="$vProfile.email.$error"/>
        <label for="email">Correo Electrónico</label>
      </FloatLabel>

      <FloatLabel class="col-span-12 ">
        <InputText id="line1" v-model="user.line1" class="w-full dark:bg-gray-700" :invalid="$vProfile.line1.$error"/>
        <label for="line1">Dirección</label>
      </FloatLabel>
      <FloatLabel class="col-span-12 ">
        <InputText id="line2" v-model="user.line2" class="w-full dark:bg-gray-700" :invalid="$vProfile.line2.$error"/>
        <label for="line2">Línea 2</label>
      </FloatLabel>
      <FloatLabel class="col-span-6">
        <Dropdown id="provinceId" v-model="user.provinceId" :options="provinces" optionLabel="name"
                  inputClass="!w-full" filter optionValue="id" showClear :invalid="$vProfile.provinceId.$error"
                  class="!w-full dark:bg-gray-700 hide-arrow" panelClass="dark:bg-gray-800" :autoFilterFocus="true"/>
        <label for="provinceId">Provincia</label>
      </FloatLabel>
      <FloatLabel class="col-span-6">
        <Dropdown id="municipeId" v-model="user.municipeId" :options="municipes" optionLabel="name"
                  inputClass="!w-full" filter optionValue="id" showClear :invalid="$vProfile.municipeId.$error"
                  class="!w-full dark:bg-gray-700 hide-arrow" panelClass="dark:bg-gray-800" :autoFilterFocus="true"/>
        <label for="municipeId">Municipio</label>
      </FloatLabel>
      <div class="flex justify-end col-start-8 col-end-13 -mt-4 mb-4">
        <el-popconfirm width="250" title="¿Desea actualizar su perfil?" @confirm="updateProfile">
          <template #reference>
            <Button type="button" severity="contrast"
                    class="bg-primary hover:bg-opacity-80 !text-red-500 !w-full "
                    raised label="Actualizar Información"/>
          </template>
        </el-popconfirm>
      </div>
      <FloatLabel class="col-span-6 ">
        <Password id="password" v-model="user.password" class="w-full dark:bg-gray-700" inputClass="w-full"
                  toggle-mask :invalid="$vPassword.password.$error"/>
        <label for="password"><sup class="text-red-400">*</sup>Contraseña</label>
      </FloatLabel>
      <FloatLabel class="col-span-6 ">
        <Password id="password_confirmation" v-model="user.password_confirmation" class="w-full dark:bg-gray-700"
                  inputClass="w-full" :invalid="$vPassword.password_confirmation.$error" toggle-mask/>
        <label for="password_confirmation"><sup class="text-red-400">*</sup>Confirmación</label>
      </FloatLabel>
      <div class="flex justify-end col-start-8 col-end-13 -mt-4">
        <el-popconfirm width="260" title="¿Desea cambiar su contraseña?" @confirm="changePassword">
          <template #reference>
            <Button type="button" severity="contrast"
                    class="bg-primary hover:bg-opacity-80 text-gray-50 !w-full"
                    raised label="Actualizar Contraseña"/>
          </template>
        </el-popconfirm>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, Ref, ref, watch} from "vue";
import {EInfoGender} from "@/interfaces/ModelInterfaces.ts";
import {useGetProvinces} from "@/services/provinces";
import {useProfile} from "@/services/auth/ProfileService.ts";

const {user, $vProfile, $vPassword, updateProfile, changePassword} = useProfile()
const municipes: Ref<Record<string, any>[]> = ref([]);
const {provinces, getProvinces} = useGetProvinces();
const mask = ref("+1(899) 999-9999");

onMounted(() => {
  getProvinces().then(() => {
    onChangeProvince(user.value.provinceId);
  });
})

const onChangeProvince = (newVal: string) => {
  const province = provinces.value.find((prov: any) => prov.id === newVal);
  if (province) {
    municipes.value = province.municipes;
  }
}
watch(() => user.value.provinceId, (newVal: string) => {
  onChangeProvince(newVal)
}, {
  deep: true
})
</script>