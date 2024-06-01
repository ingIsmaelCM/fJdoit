<template>
    <div  v-if="!disabled">
        <span @click="openDialog = !openDialog"
            :class="{ 'pointer-events-none cursor-not-allowed opacity-65': disabled }">
            <slot name="button" />
        </span>

        <Dialog @show="$emit('show')" @hide="$emit('hide')" v-model:visible="openDialog" :modal="!showBack" :header="title"
            :dismissable="false" v-bind="$attrs" :draggable="true" >

            <div class="">
                <slot />
            </div>
          <slot name="footer" />
        </Dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, Ref, } from 'vue';
interface IProps {
    title?: string;
    disabled?: boolean
}

defineProps<IProps>();
const openDialog: Ref<boolean> = ref(false);
const showBack: Ref<boolean> = ref(false);

</script>