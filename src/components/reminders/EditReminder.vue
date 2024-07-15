<template>
  <CustomDialog title="Actualizar Datos del Recordatorio"
                class="!w-[500px]">
    <template #button>
      <Button severity="contrast" title="Actualizar paciente">
        <Icon icon="carbon:edit" class="text-2xl"/>
      </Button>
    </template>
  </CustomDialog>
</template>

<script setup lang="ts">

import {IReminder} from "@/interfaces/ModelInterfaces.ts";

interface  IProps{
  oldReminder: IReminder
}

defineProps<IProps>()
</script>