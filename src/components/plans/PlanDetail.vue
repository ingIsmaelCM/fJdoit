<template>
  <div class="">

    <CustomDialog title="Detalles del Plan">
      <template #button>
        <button class=" !bg-transparent !border-none" circle title="Detalles">
          <Icon icon="carbon:touch-1" class="text-lg text-primary"/>
        </button>
      </template>
      <div class="relative pb-12">
        <div class="absolute bottom-2 right-2 z-10">
          <slot name="addNew"/>
        </div>
        <DataTable :value="plan.planfoods" group-rows-by="day" row-group-mode="rowspan" size="small"
                   scrollable scrollHeight="370px" tableStyle="width:100%">
          <Column field="portion" header="Cant." class="!w-10" header-class="bg-primary !text-gray-200 !py-1"
                  body-class="!py-1">
          </Column>
          <Column field="food.name" header="Alimento" class="whitespace-nowrap ellipsis !max-w-56 "
                  header-class="bg-primary !text-gray-200 !py-1" body-class="!py-1">
            <template #body="{data}">
              <span class="" v-tooltip.top="data.food.name">
                {{ data.food.name}}
              </span>
            </template>
          </Column>
          <Column field="proteins" header="Prot." class="w-10" header-class="bg-primary !text-gray-200 !py-1"
                  body-class="!py-1">
            <template #body="{data}">
              <span>{{ (data.portion * data.food.nutrient.proteins).toFixed(2) }}</span>
            </template>
          </Column>
          <Column field="carbohidrates" header="Carb." class="w-10" header-class="bg-primary !text-gray-200 !py-1"
                  body-class="!py-1">
            <template #body="{data}">
              <span>{{ (data.portion * data.food.nutrient.carbohidrates).toFixed(2) }}</span>
            </template>
          </Column>
          <Column field="fat" header="Gras." class="w-10" header-class="bg-primary !text-gray-200 !py-1"
                  body-class="!py-1">
            <template #body="{data}">
              <span>{{ (data.portion * data.food.nutrient.fat).toFixed(2) }}</span>
            </template>
          </Column>
        </DataTable>
      </div>
    </CustomDialog>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  plan: Record<string, any>
}

 defineProps<IProps>()

</script>