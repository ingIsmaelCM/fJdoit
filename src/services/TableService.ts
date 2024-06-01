import {IColumns} from "@/interfaces/AppInterfaces.ts";
import {onBeforeMount, ref, Ref, watch, computed, ComputedRef} from "vue";
import QueryService from "@/services/QueryService";
import moment from "moment-timezone";

function useTable(props: any) {
    const searchValue = ref(null);
    const pageSize: Ref<number> = ref(0);
    const currentPage: Ref<number> = ref(0);
    const loading: Ref<boolean> = ref(false);
    const filterFields: Ref<Array<any>> = ref([]);
    const range: Ref<any> = ref(null);
    const date: Ref<string> = ref("");
    const showMetadata: Ref<boolean> = ref(false);
    const rowRef = ref();
    const rowForMetadata: any = ref({})

    /* Trigger when eval click on clickable cell */
    function onHeaderClick(row: any, col: any, cols: IColumns[]) {
        const currentCol = cols.find((c) => c.key == col.rawColumnKey);
        if (currentCol && currentCol.action) {
            currentCol.action(row);
        }
    }

    function onFilterChange(col: any) {
        const key = Object.keys(col)[0];
        const value: any = Object.values(col)[0];
        if (value[0]) {
            props.query.replaceFilter(key, value[0], "eq", "and");
        } else {
            props.query.removeFilter(key);
        }
    }

    function getTrashed() {
        props.query.onlyTrashed(!props.query.unParsed.value.onlytrashed)
    }

    function onSortChange({prop, order}: any) {
        props.query.order(prop).desc(order == "descending");
    }

    /* To filter according filter selects */
    function filterData(field: string, value: any, query: QueryService) {
        if (value) {
            query.replaceFilter(field, value, "eq", "and");
        } else {
            query.removeFilter(field);
        }
    }

    /* To filter single date */
    function filterDate(field: string, query: QueryService) {
        if (date.value) {
            const start = moment(date.value).startOf("day").format("YYYYMMDDTHHmmss");
            const end = moment(date.value).endOf("day").format("YYYYMMDDTHHmmss");
            query.replaceFilter(field, `${start},${end}`, "bet", "and");
        } else {
            query.removeFilter(field);
        }
    }

    /* To filter between two dates */
    function filterRange(field: string, query: QueryService) {
        if ((range.value && range.value[0]) || (range.value && range.value[1])) {
            if (range.value[0] && range.value[1]) {
                const start = moment(range.value[0])
                    .startOf("day")
                    .format("YYYYMMDDTHHmmss");
                const end = moment(range.value[1])
                    .endOf("day")
                    .format("YYYYMMDDTHHmmss");

                query.replaceFilter(field, `${start},${end}`, "bet", "and");
            }
        } else {
            query.removeFilter(field);
        }
    }

    const vHeight = ref(window.innerHeight);
    const vWidth = ref(window.innerWidth);

    const layouts: ComputedRef<Array<string>> = computed(() => {
        let items: Array<string> = [];

        const lastPage = props.query.getPagination.value.lastPage;
        if (lastPage && lastPage > 1) {
            items.push(...["prev", "pager", "next"]);
            if (vWidth.value > 1230) {
                items.push("jumper");
            }
        }
        items.push("total", "sizes");
        return items;
    });

    const openMetadata = (row: any, _column: any, evt: any) => {
        rowRef.value = evt.target;
        showMetadata.value = true;
        rowForMetadata.value = row;
    };


    onBeforeMount(async () => {
        window.addEventListener("resize", () => {
            vHeight.value = window.innerHeight;
            vWidth.value = window.innerWidth;
        });
        try {
            currentPage.value = props.query.unParsed.value.page || 1;
            pageSize.value = props.query.unParsed.value.perpage || 0;
            await props.method();
        } catch (error) {
        }
    });

    watch(props.query.parsed, async () => {
        try {
            await props.method();
        } catch (error) {
        }
    });
    return {
        searchValue,
        pageSize,
        currentPage,
        loading,
        filterData,
        filterFields,
        range,
        date,
        showMetadata,
        rowForMetadata,
        rowRef,
        layouts,
        vHeight,
        vWidth,
        onHeaderClick,
        filterDate,
        filterRange,
        onFilterChange,
        onSortChange,
        getTrashed,
        openMetadata,
    };
}

export default useTable;
