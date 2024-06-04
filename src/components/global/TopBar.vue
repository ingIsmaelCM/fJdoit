<template>
  <div class="flex items-center justify-between px-4 space-x-3 h-full">

    <div class="flex  space-x-3 items-center text-primary ">

      <button :disabled="!history.back" @click="$router.back()" class=" disabled:text-gray-400">
        <Icon icon="tabler:arrow-back-up" class="text-2xl"/>
      </button>
      <button :disabled="!history.forward" @click="$router.forward()" class=" disabled:text-gray-400">
        <Icon icon="tabler:arrow-forward" class="text-2xl"/>
      </button>
      <div class="h-6 border border-gray-200"></div>
      <button :disabled="$router.currentRoute.value.name==='home'" @click="$router.push('/')"
              class=" disabled:text-gray-400">
        <Icon icon="tabler:home" class="text-2xl hover:scale-105"/>
      </button>
      <div class="h-6 border border-gray-200"></div>
      <h1 class="w-48">{{ $route.meta.title}}</h1>
    </div>
    <div class="w-full h-full flex justify-end items-center">
      <PatientSearch />
    </div>
    <el-dropdown trigger="click" :hide-on-click="false">
      <el-avatar :size="25" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"/>
      <template #dropdown>
        <div
            class="w-full ellipsis bg-gray-100 text-gray-400 select-none py-2 pl-5 items-center flex left-0 top-0 right-0 px-2 ">
                        <span class=" font-bold text-center text-sm">
                          {{ $auth.getUser.name + " " + $auth.user.lastname }}
                        </span>
        </div>

        <el-dropdown-menu class="!relative">
          <el-dropdown-item @click="$router.push('/auth/profile')">
            <div class="size-full flex items-center space-x-1 w-36">
              <Icon icon="iconamoon:profile-bold" class="text-2xl"/>
              <span>Perfil</span>
            </div>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-popconfirm title="¿Cerrar Sesión?" @confirm="logoutAuth">
              <template #reference>
                <div class="size-full flex items-center space-x-1">
                  <Icon icon="mdi:shutdown" class="text-2xl"/>
                  <span>Salir</span>
                </div>
              </template>
            </el-popconfirm>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>


</template>
<script setup lang="ts">
import {computed} from 'vue';
import useAuthService from "@/services/AuthService.ts";
import PatientSearch from "@/components/patients/PatientSearch.vue";

const {logoutAuth} = useAuthService();
const history = computed(() => {
  return window.history.state
});

</script>