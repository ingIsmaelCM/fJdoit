<template>
  <main class="bg-white w-screen h-screen  grid" :class="grid.gridCol">
    <aside :class="grid.col1" class="transition-all ease-in-out duration-500">
      <SideMenu/>
    </aside>
    <main class=" w-full h-screen flex flex-col transition-all ease-in-out duration-500" :class="grid.col2" id="mainContent">
      <nav class="h-[2.75rem] w-full  bg-primary ">
        <TopBar/>
      </nav>
      <router-view :key="$route.fullPath"/>
    </main>
  </main>
</template>
<script setup lang="ts">
import SideMenu from "@/components/global/SideMenu.vue";
import TopBar from "@/components/global/TopBar.vue";
import {onMounted, ref} from "vue";
import emitter from "@/services/emitter.ts";

const grid = ref({
  gridCol: "grid-cols-10",
  col1: "col-span-2",
  col2: "col-span-8"
})

onMounted(() => {
  emitter.on("onCollapseMenu", handleResize)
});

const handleResize = (isCollapsed: boolean) => {
  console.log(isCollapsed)
  grid.value = isCollapsed ? {
    gridCol: "!flex",
    col1: "",
    col2: "gridMin"
  } : {
    gridCol: "grid-cols-10",
    col1: "col-span-2",
    col2: "col-span-8"
  };
}
</script>
