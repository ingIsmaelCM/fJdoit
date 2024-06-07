<template>
  <div class="grid grid-cols-2 items-center max-w-sm select-none ">
    <div class="human-body">
      <div @click="highlight('head')" v-html="body.head"></div>
      <div @click="highlight('shoulder')" v-html="body.shoulder"></div>
      <div @click="highlight('arm')" v-html="body.arm"></div>
      <div @click="highlight('cheast')" v-html="body.cheast"></div>
      <div @click="highlight('stomach')" v-html="body.stomach"></div>
      <div @click="highlight('legs')" v-html="body.legs"></div>
      <div v-html="body.hands"></div>
      <svg class="absolute top-0 -left-8 -z-20 h-full w-14 ">
        <text x="50%" y="59%" class="cota-text !text-base font-bold ">{{ (eval?.height || 0.00) }}</text>
        <text x="50%" y="62.5%" class="cota-text !text-sm">cm</text>
        <line x1="50%" y1="0" x2="50%" y2="55%"  class="cota"/>
        <line x1="50%" y1="65%" x2="50%" y2="90%" class="cota"/>
        <text x="50%" y="93%" class="cota-text !text-base font-bold">{{ (eval?.weight || 0.00) }}</text>
        <text x="50%" y="97%" class="cota-text !text-sm">kg</text>

      </svg>
    </div>
    <div class="w-44 whitespace-nowrap pl-2 text-base text-primary font-bold" v-if="measures.length > 0">
      <div class="p-2 w-full" v-for="measure in measures">
        <div
            class="grid grid-cols-4 leading-4 items-center"
            :class="measure.key == selected ? 'text-gray-800' : ''"
        >
          <span class="col-span-3 capitalize">{{ measure.name.toString() }}</span>
          <span class="col-span-1">{{ measure.value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref, onMounted, Ref} from "vue";
import "@/style/body.css";
import body from "@/assets/static/body.ts";
import parts from "@/assets/static/parts.ts";
import {IEval} from "@/interfaces/ModelInterfaces.ts";

interface IProps {
  eval?: IEval
}

const measures: Ref<Record<string, any>[]> = ref([]);
const selected = ref(null);
const props = defineProps<IProps>();

const highlight = (part: any) => {
  selected.value = part;
};

onMounted(async () => {
  measures.value = [];
  parts
      .filter((part) => part.key != "body")
      .forEach((piece) => {
        measures.value.push(piece);
      });
  if (props.eval) {
    measures.value = measures.value.map((measure: any) => {
      return {
        ...measure,
        value: props.eval && props.eval[measure.name]
      }
    })
  }
});
</script>