<template>
  <form class="w-full p-4"
        @submit.prevent="(evt:any)=>onConfirmSubmit(evt, '¿Generar sugerencias?', handleSubmit)">
    <div class="flex items-start space-x-2 pb-2 w-full">
      <div class="w-1/2 grid grid-cols-12 gap-x-4 gap-y-8">
        <h1 class="col-span-10 text-primary opacity-80 font-bold text-lg">Datos para el plan</h1>
        <div class="absolute right-6">
          <CustomDialog title="Nota adicional para el plan" :dismissableMask="true">
            <template #button>
              <Button type="button" severity="contrast" rounded v-tooltip="'Añadir nota'"
                      class="text-primary hover:text-soft"
                      raised>
                <template #icon>
                  <Icon icon="fluent:note-add-16-regular" class="text-2xl "/>
                </template>
              </Button>
            </template>
            <div class="pt-8 grid grid-cols-12 gap-x-2 gap-y-5">
              <template v-for="(d) in diet.days">
                <FloatLabel class="col-span-12">
                  <Textarea v-model="diet.notes[EPlanDay[d]]" rows="2" cols="65" maxlength="250"
                            :auto-resize="false" :id="`note${d}`" class="resize-none w-full dark:bg-gray-700"/>
                  <label :for="`note${d}`">Nota para el {{ EPlanDay[d] }}</label>
                </FloatLabel>
              </template>
            </div>
          </CustomDialog>
        </div>
        <FloatLabel class="col-span-4">
          <InputNumber inputClass="!w-full dark:bg-gray-700" class="!w-full" id="proteins"
                       :invalid="$vSuggestions.proteins.$error"
                       v-model="diet.proteins" :min="0" :allowEmpty="false" locale="en-US"
                       mode="decimal" :min-fraction-digits="2" :max-fraction-digits="2"/>
          <label for="proteins">Proteínas</label>
        </FloatLabel>
        <FloatLabel class="col-span-4">
          <InputNumber inputClass="!w-full dark:bg-gray-700" class="!w-full" id="carbohidrates"
                       :invalid="$vSuggestions.carbohidrates.$error"
                       @keydown.enter.prevent="(evt:any)=>onConfirmSubmit(evt, '¿Generar sugerencias?', handleSubmit)"
                       v-model="diet.carbohidrates" :min="0" :allowEmpty="false" locale="en-US"
                       mode="decimal" :min-fraction-digits="2" :max-fraction-digits="2"/>
          <label for="carbohidrates">Carbohidratos</label>
        </FloatLabel>
        <FloatLabel class="col-span-4">
          <InputNumber inputClass="!w-full dark:bg-gray-700" class="!w-full" id="fat"
                       :invalid="$vSuggestions.fat.$error" @keydown.enter.prevent="(evt:any)=>onConfirmSubmit(evt,
                       '¿Generar sugerencias?', handleSubmit)"
                       v-model="diet.fat" :min="0" :allowEmpty="false" locale="en-US"
                       mode="decimal" :min-fraction-digits="2" :max-fraction-digits="2"/>
          <label for="fat">Grasas</label>
        </FloatLabel>
        <FloatLabel class="col-span-4">
          <InputNumber inputClass="!w-full dark:bg-gray-700" class="!w-full" id="maxFoods"
                       :invalid="$vSuggestions.maxFoods.$error" @keydown.enter.prevent="(evt:any)=>onConfirmSubmit(evt,
                       '¿Generar sugerencias?', handleSubmit)"
                       v-model="diet.maxFoods" :min="1" :max="5" :allowEmpty="false" locale="en-US"
                       mode="decimal" :min-fraction-digits="2" :max-fraction-digits="2"/>
          <label for="maxFoods">Alimentos</label>
        </FloatLabel>
        <FloatLabel class="col-span-8">
          <MultiSelect inputClass="!w-full dark:bg-gray-700 " class="!w-full hide-arrow" id="days"
                       :invalid="$vSuggestions.days.$error"
                       v-model="diet.days" :options="Object.keys(EPlanDay)"/>
          <label for="days">Días</label>
        </FloatLabel>

      </div>
      <div class="w-1/2 grid grid-cols-12 gap-x-4 gap-y-8 pt-14 mt-1">
        <FloatLabel class="col-span-4 flex items-center">
          <Dropdown v-model="omitCrude" :options="omitCrudeOptions" optionLabel="label" optionValue="value"
                    class="!w-full dark:bg-gray-700 hide-arrow" panelClass="dark:bg-gray-800"/>
          <label for="proteins">Filtrar Alimentos</label>
        </FloatLabel>
        <FloatLabel class="col-span-8">
          <MultiSelect id="categoryIds" v-model="categoryIds" :options="categories" checkmark
                       optionValue="id" optionLabel="name" @update:modelValue="onCategorySelect"
                       inputClass="  !w-full dark:bg-gray-700" class="!w-full dark:bg-gray-700 hide-arrow"
                       panelClass="dark:bg-gray-700" filter autoFilterFocus :loading="$global.getLoading"
          />
          <label for="categoryIds">Categorías</label>
        </FloatLabel>
        <FloatLabel class="col-span-6">
          <Dropdown v-model="diet.type" :options="Object.values(EPlanType)" filter :invalid="$vPlan.type.$error"
                    class="!w-full dark:bg-gray-700 hide-arrow" panelClass="dark:bg-gray-800" :autoFilterFocus="true">
          </Dropdown>
          <label for="proteins">Tipo de comida</label>
        </FloatLabel>

        <FloatLabel class="col-span-6">
          <Dropdown v-model="diet.patientId" :options="patients" filter :invalid="$vPlan.patientId.$error"
                    optionValue="id"
                    optionLabel="fullname" @filter="(evt:any)=>$debounce(()=>onSearchPatient(evt),500)(evt)"
                    class="!w-full dark:bg-gray-700 hide-arrow" panelClass="dark:bg-gray-800" :autoFilterFocus="true">
          </Dropdown>
          <label for="proteins">Paciente</label>
        </FloatLabel>

      </div>
    </div>
    <div class="flex justify-end items-center space-x-4">
      <AddNewFood/>
      <Button type="submit" severity="contrast" rounded
              class="text-primary hover:text-soft"
              raised>
        <template #icon>
          <Icon icon="mdi:database-search-outline" class="text-2xl "/>
        </template>
      </Button>
      <el-popconfirm :width="250" title="¿Deseas registrar este plan?" @confirm="createPlan">
        <template #reference>
          <Button type="button" severity="contrast" rounded
                  class="text-primary hover:text-soft"
                  raised>
            <template #icon>
              <Icon icon="ic:baseline-save-all" class="text-2xl "/>
            </template>
          </Button>
        </template>
      </el-popconfirm>
      <input type="submit" value="" class="hidden">
    </div>
  </form>
</template>

<script setup lang="ts">
import {useSetPlan} from "@/services/plans";
import useConfirmService from "@/services/ConfirmService.ts";
import {EPlanDay, EPlanType} from "@/interfaces/ModelInterfaces.ts";
import {useGetCategories} from "@/services/foods";
import {onMounted, ref, Ref, watch} from "vue";
import utils from "@/helpers/utils.ts";
import {useGetPatients} from "@/services/patients";
import AddNewFood from "@/components/plans/AddNewFood.vue";

const {onConfirmSubmit} = useConfirmService();
const {$vSuggestions, $vPlan, diet, query, createPlan, getSuggestions} = useSetPlan();
const {categories, query: catQuery, getCategories} = useGetCategories();
const categoryIds: Ref<string[]> = ref([])
const omitCrude = ref(false)
const {patients, query: patQuery, getPatients} = useGetPatients();


const omitCrudeOptions = ref([
  {
    value: false,
    label: "Todos"
  }, {
    value: true,
    label: "Excluir crudos"
  }
])

const onCategorySelect = (val: string[]) => {
  if (val.length) {
    query.replaceFilter("categoryId", val.join(","), "in", "and")
  } else {
    query.removeFilter("categoryId");
  }
}

const handleSubmit = async () => {
  if (categoryIds.value.length && categoryIds.value.length < 2) {
    utils.showNoti({
      type: "warning",
      duration: 5000,
      message: "Seleccione por los menos 2 grupos alimenticios",
      position: "bottom-right",
      title: "Categorías insuficientes"
    })
  } else {
    await getSuggestions()
  }
}

const onSearchPatient = async ({value}: { value: string }) => {
  patQuery.search(value);
  await getPatients();
}


watch(() => omitCrude.value, (newVal: boolean) => {
  query.notLike("name", newVal ? "%CRUD%" : "")
})

onMounted(() => {
  catQuery.limit(50);
  getPatients().then();
  getCategories().then();
})

</script>