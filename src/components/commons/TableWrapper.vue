<template>
  <div class="relative rounded-xl p-0.5 overflow-hidden flex flex-col h-full w-full max-w-full ">

    <template v-if="hideFilters!==true ">
      <div class="flex space-x-4 items-center justify-end h-10 my-1 z-50 ml-auto w-full">
        <InputText v-if="hideFilters!=='search'" type="search" class="!w-full !max-w-sm" placeholder="Buscar"
                   v-model="searchValue" id="searchOnTable"
                   @input="()=>$debounce((search: string)=>query.search(search),500)(searchValue)"/>
        <div v-if="formatter.getFilterDate && hideFilters!=='filterDate'" id="filterDate">
          <Calendar v-model="date" :placeholder="'Filtrar por: ' + formatter.getFilterDate().label"
                    class="!w-[12.3rem]"
                    @update:model-value="filterDate(formatter.getFilterDate().field, query)"
                    showIcon showButtonBar iconDisplay="input" dateFormat="dd/mm/yy"/>
        </div>
        <div v-if="formatter.getFilterRange && hideFilters!=='filterDate'">
          <Calendar v-model="range" :placeholder="'Filtrar por: ' + formatter.getFilterRange().label"
                    selectionMode="range" :manualInput="false" class="!w-[12.3rem] "
                    @update:model-value="filterRange(formatter.getFilterRange().field, query)" showIcon
                    showButtonBar iconDisplay="input" dateFormat="dd/mm/yy"/>
        </div>
      </div>
    </template>

    <div class="p-2 pt-4 w-full flex justify-between items-center" v-if="title">
      <h1 class="uppercase font-bold text-sm max-w-md ellipsis">
        {{ query.unParsed.value.onlytrashed ? 'Papelera de Reciclaje' : title }}</h1>
      <div class="flex space-x-1 items-center " v-if=" selectionActions?.length">
        <el-dropdown trigger="click" :hideOnClick="false" placement="bottom-end">
          <el-button severity="info" size="small" outlined class="!px-0.5 !w-28 flex items-end">
            <span>Acciones</span>
            <Icon icon="mdi-light:dots-horizontal" class="text-xl pl-2"/>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="(item, index) in selectionActions" :key="`action${index}`"
                                @click="item.action" :disabled="item.disabled">
                <Icon :icon="item.icon" class="text-xl el-icon--left"/>
                <span class="w-20 ellipsis" :title="item.label"> {{ item.label }}</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="flex space-x-1 items-center " v-else>
        <div :class="formatter.exportable ? '!w-[12.3rem]' : 'w-max'"
             v-if="$slots.addButton || formatter.exportable">
          <div class="flex justify-between space-x-4">
            <div class="max-w-10" id="addButton">
              <slot name="addButton" v-if="$slots.addButton"/>
            </div>
            <Button disabled title="En desarrollo" v-if="formatter.exportable"
                    v-for="(exportFunction, n) in TableExport.exportFunctions()"
                    :key="'ef' + n" :severity="exportFunction.severity"
                    @click="exportFunction.command(data, formatter.exportableCols())">

              <template #icon>
                <Icon :icon="exportFunction.icon" class="text-2xl"/>
              </template>
            </Button>

          </div>
        </div>
        <Button class="!border-none !ml-3" severity="contrast" @click="method()" id="reloadOnTable">
          <template #icon>
            <Icon icon="carbon:renew" class="text-xl"/>
          </template>
        </Button>
        <Button v-if="hasTrash" class="!border-none !ml-3"
                severity="contrast" id="trashOnTable"
                @click="getTrashed" title="Ver Papelera">
          <template #icon>
            <Icon icon="fluent-mdl2:empty-recycle-bin" class="text-xl "
                  :class="query.unParsed.value.onlytrashed?'text-gray-700 dark:text-gray-100':'text-gray-300'"/>
          </template>
        </Button>
        <tour-component name="tableTour" hint="¿Cómo ver y consultar datos?" :steps="steps"/>

      </div>
    </div>
    <div class="relative size-full overflow-hidden">
      <el-table highlight-current-row v-loading="$global.getLoading" id="dataOnTable"
                empty-text="Sin Datos Para Mostrar" @row-contextmenu="openMetadata"
                @cell-click="(row: any, col: any) => onHeaderClick(row, col, formatter.getCols())" :data="data"
                :height="vHeight - 260" :max-height="vHeight - 260" :min-height="450"
                :show-overflow-tooltip="true"
                row-key="id" :show-summary="formatter.hasSummary" @filter-change="onFilterChange"
                @sort-change="onSortChange"
                :summary-method="formatter.hasSummary ? formatter.getSummaries : undefined"
                class="!w-full !max-w-[]" :header-click="onHeaderClick" :row-class-name="rowClassName" v-bind="$attrs">
        <slot name="before"/>
        <el-table-column labelClassName="font-bold"
                         v-for="col in formatter.getCols().filter(col=>!col.hide)" :key="col.key"
                         :label="col.title" :prop="col.dataKey" :type="col.type" :fixed="col.fixed"
                         :width="col.width"
                         :min-width="col.minWidth" :filter-multiple="false"
                         :filter-method="col.filters ? () => true : undefined" :column-key="col.dataKey"
                         :class-name="col.action ? 'select-none cursor-pointer hover:underline' : ''"
                         :sort-orders="['ascending', 'descending']" :sortable="col.sortable ? 'custom' : false"
                         :filters="col.filters" :formatter="col.formatter"
                         :align="col.align"/>
        <slot name="after"/>
      </el-table>
    </div>

    <div class="flex justify-end py-2 sticky bottom-0 z-50" v-if="query.getPagination.value.currentPage > 0"
         id="paginationOnTable">
      <el-pagination v-model:page-size="pageSize"
                     :page-count="query.getPagination.value.lastPage || 0"
                     :layout="layouts.join(', ')" v-model:current-page="currentPage"
                     :total="query.getPagination.value.count || 0" :page-sizes="[10, 15, 25, 50, 100, 250]"
                     :background="true" @update:page-size="query.perpage(pageSize)"
                     @update:current-page="query.page(currentPage)" :pager-count="5"/>
    </div>

    <el-tooltip
        ref="tooltipRef"
        v-model:visible="showMetadata"
        :virtual-ref="rowRef"
        :auto-close="5000"
        v-if="rowForMetadata.createdAt && rowRef"
        :raw-content="true"
        popper-class="singleton-tooltip">
      <template #content>
        <h1 class="font-bold uppercase pb-2">Metadata</h1>
        <div class="grid grid-cols-3 w-96">
          <span>Creación: </span>
          <span class="col-span-2">{{ moment(rowForMetadata.createdAt).format('DD/MM/YYYY h:mm:ss A') }} </span>
          <span>Actualización: </span>
          <span class="col-span-2">{{ moment(rowForMetadata.updatedAt).format('DD/MM/YYYY h:mm:ss A') }} </span>
        </div>
      </template>
    </el-tooltip>

  </div>
</template>

<script setup lang="ts">
import useTable from "@/services/TableService";
import TableExport from "@/exports/TableExport.ts"
import QueryService from "@/services/QueryService";
import Formatter from "@/formatter/Formatter.ts";
import {ISelectionAction} from "@/interfaces/AppInterfaces.ts";
import tableTour from "@/hints/tours/tableTour";
import {computed,  useSlots} from "vue"
import moment from "moment";


interface IProps {
  query: QueryService;
  data: Array<any>;
  method: Function;
  title?: string;
  hideFilters?: Boolean | string;
  rowClassName?: any;
  formatter: Formatter<any>,
  hasTrash?: boolean,
  selectionActions?: Array<ISelectionAction>
}


const props = defineProps<IProps>();
const slots = useSlots();




const {
  searchValue,
  pageSize,
  currentPage,
  vHeight,
  date,
  showMetadata,
  rowForMetadata,
  range,
  layouts,
  rowRef,
  onHeaderClick,
  filterDate,
  filterRange,
  onFilterChange,
  onSortChange,
  getTrashed,
  openMetadata

} = useTable(props);

const steps = computed(() => {
  return [
    tableTour.data,
    ...(props.hideFilters !== true && props.hideFilters !== 'search' ?
        [tableTour.search] : []),
    ...(props.hideFilters !== true && props.hideFilters !== 'filterDate' && props.formatter.getFilterDate
        ? [tableTour.filterDate] : []),
    ...(slots.addButton ? [tableTour.addButton] : []),
    tableTour.reload,
    ...(props.hasTrash ? [tableTour.trash] : []),
    ...(props.query.getPagination.value.currentPage > 0 ? [tableTour.pagination] : []),

  ];
})
</script>
