<template>
  <main class="bg-gray-100 w-screen h-screen flex flex-col relative !overflow-hidden">
    <nav class="h-[2.75rem] w-full  ">
      <TopBar/>
    </nav>
    <main class=" w-full h-full grid grid-cols-9 bg-gray-100 transition-all ease-in-out duration-500">
      <aside class="transition-all ease-in-out duration-500 col-span-2 py-2 px-3">
        <SideMenu/>
      </aside>
      <section class="col-span-7 bg-gray-100 py-2">
        <div class="bg-gray-50 size-full rounded-lg shadow-lg p-1">
          <router-view  v-slot="{ Component }">
                <component class="slide-in" :key="$route.fullPath" :is="Component" />
          </router-view>
        </div>
      </section>
    </main>
  </main>
</template>
<script setup lang="ts">
import SideMenu from "@/components/global/SideMenu.vue";
import TopBar from "@/components/global/TopBar.vue";


</script>
