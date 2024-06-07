<template>
  <div class="w-1/3 h-full rounded-lg bg-sky-900 shadow-lg select-none relative overflow-hidden bg-no-repeat bg-top bg-cover"
       :style="{backgroundImage: `url(${wave})`}"
  >
    <h1 class="font-bold text-white text-2xl text-center leading-6 mt-8 ">Gestiona tu cuenta de Whatsapp</h1>
    <div class=" absolute left-1/2 transform -translate-x-1/2 mt-3">
      <el-popconfirm v-if="!isConnected" title="¿Conectarse a Whatsapp?" @confirm="connectWhatsapp">
        <template #reference>
          <button v-tooltip="'Conectarse'"
                  :disabled="isLoading || Boolean(qrCode)">
            <Icon icon="tabler:plug-connected" class="!text-6xl text-green-500"/>
          </button>
        </template>
      </el-popconfirm>
      <el-popconfirm v-else title="¿Desconectarse de Whatsapp?" @confirm="disconnectWhatsapp">
        <template #reference>
          <button v-tooltip="'Desconectarse'"
                  :disabled="isLoading || Boolean(qrCode)">
            <Icon icon="tabler:plug-connected-x" class="!text-6xl text-red-500"/>
          </button>
        </template>
      </el-popconfirm>
    </div>
    <div class="absolute  bottom-4 transform -translate-x-1/2 left-1/2 w-36 z-10 flex justify-center">
      <Icon v-if="isLoading" icon="eos-icons:bubble-loading" class="text-6xl"/>
      <qrcode-vue v-else-if="Boolean(qrCode)" :value="qrCode" :size="140" level="H"/>
      <img v-else :src="whatsapp" alt="Whatsapp">
    </div>

  </div>
</template>
<script setup lang="ts">

import wave from "@/assets/wave.svg";
import whatsapp from "@/assets/whatsapp.png";
import {onMounted} from "vue";
import {useWhatsapp} from "@/services/whatsapp/whatsapp.ts";
import QrcodeVue from "qrcode.vue";

const {isConnected, isLoading, qrCode, checkConnection, connectWhatsapp, disconnectWhatsapp} = useWhatsapp();


onMounted(() => {

  checkConnection();
})
</script>