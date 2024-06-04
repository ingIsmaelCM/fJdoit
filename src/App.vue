<template>
  <div class="absolute bottom-1 w-full">
    <ProgressBar mode="indeterminate" style="height: 6px; z-index: 99999;" v-if="$global.getLoading"/>
    <Toast position="bottom-right"/>
    <ConfirmDialog/>

  </div>
  <el-config-provider :locale="es">
    <router-view class=" w-screen  h-screen"/>
  </el-config-provider>


  <div class="fixed left-0 top-0 right-0 bottom-0 flex items-center justify-center bg-gray-700 bg-opacity-5 z-[9999] "
       v-if="$global.getLockScreen">
    <Icon icon="eos-icons:bubble-loading" class="text-9xl text-blue-300"/>
  </div>

</template>


<script setup lang="ts">
import ProgressBar from 'primevue/progressbar';
import es from "element-plus/dist/locale/es.mjs";
import Toast from 'primevue/toast';


</script>