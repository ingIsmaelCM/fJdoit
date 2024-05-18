<template>
  <div
      class=" flex flex-col h-full overflow-hidden text-gray-300 bg-primary transition-all duration-300 ease-in-out relative">
    <div class="fixed  z-20 text-gray-50 left- top-2 transform transition-all duration-300 ease-in-out "
         :class="isCollapsed?'translate-x-[4.5rem]':'translate-x-[12.5rem]'">
      <button link @click="toggleCollapse" class="!border-none">
        <Icon :icon="isCollapsed?'ic:baseline-keyboard-arrow-right':'ic:baseline-keyboard-arrow-left'"
              class="text-2xl"/>
      </button>

    </div>
    <el-menu
        :collapse="isCollapsed"
        class="!select-none !border-none h-[2.5rem] "
        background-color="primary"
    >
      <el-menu-item index="0" class="!pl-4 relative !overflow-hidden menu-title hover:!bg-transparent">
        <img alt="logo" :src="logo" class="absolute left-0  w-full object-center scale-50
         transform transition-all -translate-y-2 duration-300 ease-in-out"
             :class="isCollapsed?'opacity-0':'opacity-100'"
        />
        <img alt="icon" :src="icon" class="absolute left-0 h-full w-full object-cover scale-75  -translate-y-2
         transform transition-all duration-300 ease-in-out"
             :class="isCollapsed?'opacity-100':'opacity-0'"
        />
      </el-menu-item>
    </el-menu>
    <hr>
<!--    Main Menu-->
    <el-menu
        :collapse="isCollapsed"
        :default-active="activeMenu"
        class="!select-none !border-none el-menu-vertical-demo"
        background-color="primary"
        text-color="#ccc"
        active-text-color="#94bbcd"
        :unique-opened="true"

    >
      <template v-for="link in links" :key="link.id">
        <el-sub-menu v-if="link.childs" :index="link.id">
          <template #title>
            <el-icon>
              <Icon :icon="link.icon" class="text-2xl"/>
            </el-icon>
            <span>{{ link.title }}</span>
          </template>
          <el-menu-item v-for="child in link.childs" :index="child.id" class="" @click="$router.push(child.path!)">
            <el-icon>
              <Icon :icon="child.icon" class="text-2xl"/>
            </el-icon>
            <span>{{ child.title }}</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else :index="link.id" class="!pl-4" @click="$router.push(link.path!)">
          <el-icon>
            <Icon :icon="link.icon" class="text-2xl"/>
          </el-icon>
          <span>{{ link.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
    <el-menu
        :collapse="isCollapsed"
        default-active="9"
        class="!select-none !w-full !border-r-0 !absolute !bottom-0 !border-t-2  "
        background-color="--accent"
        text-color="#94bbcd"
        active-text-color="#134E4A"
    >
      <el-menu-item index="0" class="!pl-4 menu-title">
        <el-icon>
          <Icon icon="ic:round-account-circle" class="text-4xl"/>
        </el-icon>
        <span>Mi Cuenta</span>
      </el-menu-item>
    </el-menu>

  </div>


</template>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 190px;
}
</style>
<script setup lang="ts">
import links, {ILink} from "@/routes/links.ts"
import {ref, computed} from "vue";
import icon from "@/assets/icon-white.svg"
import logo from "@/assets/logo-white.svg"
import emitter from "@/services/emitter.ts";
import {useRoute} from "vue-router";


const route = useRoute();
const isCollapsed = ref(false);

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
  emitter.emit("onCollapseMenu", isCollapsed.value)
}

const activeMenu = computed(() => {
  const allLinks: ILink[]=[links, links.map((l:ILink)=>l.childs||[])].flat(2);
  const activeLink = allLinks.find((link: ILink) => link.path === route.path );
  return activeLink?.id || "1";
})
</script>