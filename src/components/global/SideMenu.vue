<template>
  <div class="w-full h-full bg-gray-50 overflow-hidden rounded-lg shadow-xl ">
    <el-tabs type="border-card" class="!bg-transparent !h-full !border-none">
      <el-tab-pane label="Principal">
        <template #label>
          <Icon icon="tdesign:app" class="text-2xl"/>
        </template>
        <div class="mb-12" v-for="link in links" :key="link.id">
          <div class="flex items-center space-x-2 text-primary font-semibold01">
            <div class=" w-1/5 border-t border-primary opacity-50"></div>
            <span class="w-3/5 text-center">{{ link.title }}</span>
            <div class="w-1/5 border-t border-primary opacity-50"></div>
          </div>
          <div class="p-2  flex items-center space-x-2">
            <Button v-tooltip.bottom="child.title" v-for="child in link.childs" :key="child.id" link raised
                    class="!w-16 !h-12 active:bg-primary text-dark" @click="()=>$router.push(child.path!)"
                    :class="child.path===$route.path?'!bg-primary !text-gray-200':''">
              <template #icon>
                <div class="h-full flex items-center">
                  <Icon :icon="child.icon" class="text-3xl "/>
                </div>
              </template>
            </Button>

          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Notificaciones">
        <template #label>
          <Icon icon="mdi:bell-outline" class="text-2xl"/>
        </template>
      </el-tab-pane>
      <el-tab-pane label="Estadísticas">
        <template #label>
          <Icon icon="mdi:chart-bar" class="text-2xl"/>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>


</template>


<script setup lang="ts">
import links from "@/routes/links"
</script>