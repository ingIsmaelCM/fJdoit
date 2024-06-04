<template>
  <div class=" col-span-8 flex space-x-4 ">
    <div v-for="image in images" class="w-1/3 h-56 flex flex-col justify-end bg-white overflow-hidden rounded-lg
      shadow-lg relative  ">
      <div class=" absolute left-0 top-0 size-full  z-0 bg-no-repeat blur-xs"
           :style="{backgroundImage: `url(${image.url})`, backgroundSize: '150%', backgroundPosition: 'center'}">
      </div>
      <Button :label="image.label" class="bg-primary bg-opacity-50" @click="()=>goToPlans(image.label)"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import {EPlanType} from "@/interfaces/ModelInterfaces.ts";
import breakfast from "@/assets/breakfast.jpg";
import lunch from "@/assets/lunch.jpg";
import dinner from "@/assets/dinner.jpg";
import {useRouter} from "vue-router";

const router = useRouter();

const images = [
  {url: breakfast, label: EPlanType.Desayuno},
  {url: lunch, label: EPlanType.Almuerzo},
  {url: dinner, label: EPlanType.Cena}]

const goToPlans = (type: EPlanType) => {
  router.push({name: "plans", query: {type: type}})
}
</script>