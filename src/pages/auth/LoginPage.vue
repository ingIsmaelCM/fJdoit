<template>

  <div
      class="flex items-center justify-center rounded-xl shadow-xl w-full relative bg-gray-50 bg-cover"
      :style="{backgroundImage:`url(${loginBg})`}"
  >
    <div
        class="w-[44rem] h-[26rem] backdrop-blur-sm bg-secondary bg-opacity-10 overflow-hidden relative mt-8  rounded-xl flex">
      <div class="w-[18rem] h-full flex justify-center items-center bg-secondary bg-opacity-10  overflow-hidden">
        <img :src="icon" alt="icon" class=" z-0 w-full scale-150 ml-4 ">
      </div>

      <div class="w-[20rem] max-w-[20rem]  mx-auto  p-3 flex flex-col space-y-3">
        <img :src="logo" alt="" class="h-24 mx-auto -my-2 scale-150">
        <h1 class="font-bold text-center text-xl uppercase">Acceder al Sistema</h1>

        <form class="w-full px-2 mx-auto py-4 pb-6 flex flex-col space-y-8 relative" @submit.prevent="loginAuth">
          <FloatLabel>
            <InputText id="username" v-model="auth.username" class=" w-full " :minlength="4"/>
            <label for="username">Nombre de Usuario</label>
          </FloatLabel>
          <FloatLabel>
            <Password toggleMask id="password" v-model="auth.password" class="w-full" inputClass=" !w-full "
                      :minlength="6" :feedback="false" @copy.prevent="()=>false" @paste.prevent="()=>false"
                      aria-labelledby="password" aria-label="Ingrese una contraseña"/>
            <label for="password">Contraseña</label>
          </FloatLabel>

          <div class="flex justify-between items-center">
            <a @click="$router.replace({name: 'request_code'})"
               class="text-xs cursor-pointer hover:underline hover:text-blue-500"> Recuperar Contraseña</a>
            <div class="flex items-center space-x-2 w-max ml-auto">
              <label for="remember" class="text-sm">Recordar</label>
              <el-switch v-model="auth.remember" id="remember"/>
            </div>
          </div>
          <Button type="submit" severity="contrast" class="bg-soft hover:bg-opacity-80 text-gray-200" raised label="Acceder"/>
          <input type="submit" value="" class="hidden">
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import logo from "@/assets/logo.svg"
import icon from "@/assets/icon.svg"
import loginBg from "@/assets/login-bg.svg"
import {onMounted} from "vue"
import useAuthService from '@/services/AuthService';

const {auth, loginAuth, getRemember} = useAuthService();
onMounted(() => {
  getRemember()
})

</script>