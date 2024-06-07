<template>
  <div class="relative">
      <Button v-tooltip="hint" class="!border-none !ml-3 z-[500]" severity="contrast" @click="openTour=true" v-if="steps.length" >
        <Icon icon="mdi:help-circle-outline" class="text-xl" v-bind="$attrs"/>
      </Button>
  </div>
  <el-tour v-if="steps.length>0"  v-model="openTour" ref="tour" v-model:current="current">
    <el-tour-step v-for="step in steps" :description="step.description"
                  :target="step.target" :title="step.title"
                  :nextButtonProps="{children: '→'}"
                  :prevButtonProps="{children: '←' }"

   />
  </el-tour>
  <Hotkey v-if="openTour" :keys="[ 's']" @hotkey="goNext"/>
</template>
<script setup lang="ts">
import {ref, Ref} from "vue";
import {TourInstance} from "element-plus";

interface IProps {
  steps: Array<any>,
  hint: string,
  name: string
}

const props = defineProps<IProps>();
const openTour = ref(false);
const tour: Ref<TourInstance|unknown> = ref();
const current = ref(0);

const goNext = () => {
  if (tour.value && openTour.value) {
    if (props.steps.at(current.value + 1)) {
      current.value++;
    } else {
      openTour.value = false;
      current.value = 0;
    }
  }
}

</script>