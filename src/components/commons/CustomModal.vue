<template>
  <div v-if="!disabled" class="w-max" >
        <span @click="openDialog = !openDialog"
              :class="{ 'pointer-events-none cursor-not-allowed opacity-65': disabled }">
            <slot name="button"/>
        </span>

    <Sidebar @show="$emit('show')" v-model:visible="openDialog" :modal="!showBack" :header="title"
             :dismissable="false" v-bind="$attrs"    >
      <div class=" py-4">
        <slot/>
      </div>
    </Sidebar>
  </div>
</template>

<script setup lang="ts">
import {ref, Ref,} from 'vue';

interface IProps {
  title?: string;
  disabled?: boolean
}

defineProps<IProps>();
const openDialog: Ref<boolean> = ref(false);
const showBack: Ref<boolean> = ref(false);

</script>