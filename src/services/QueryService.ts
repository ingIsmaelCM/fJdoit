import { ComputedRef, Ref, computed, ref } from "vue";

export interface IParams {
  order?: string;
  desc?: boolean;
  fields: string;
  limit?: number;
  page?: number;
  perpage?: number;
  include?: string;
  filter: string[];
  withtrashed?: boolean;
  onlytrashed: boolean;
  search?: string;
  scopes?: string;
  like?: string;
  operation?: string;
}

export interface IPagination {
  count: number;
  currentPage: number;
  lastPage: number | null;
  nextPage: number | null;
  prevPage: number | null;
}
export default class QueryService {
  private _params: Ref<IParams> = ref({
    fields: "*",
    filter: [],
    order: "createdAt",
    desc: false,
    search: "",
    page: 0,
    perpage: 0,
    include: "",
    withtrashed: false,
    onlytrashed: false,
    scopes: "",
    operation: ""
  });

  private _pagination: Ref<IPagination> = ref({
    count: 0,
    currentPage: 0,
    lastPage: null,
    nextPage: null,
    prevPage: null,
  });

  parsed: ComputedRef<string> = computed(() => {
    const parsedParams = Object.keys(this._params.value)
      .filter((k) => k !== "filter")
      .map((key) => {
        return `${key}=${(this._params.value as any)[key]}`;
      })
      .join("&");
    return "?" + parsedParams + "&" + this.parseFilter();
  });

  unParsed: ComputedRef<IParams> = computed(() => this._params.value);
  setPagination({
    count,
    currentPage,
    lastPage,
    nextPage,
    prevPage,
  }: IPagination) {
    this._pagination.value = {
      count,
      currentPage,
      lastPage,
      nextPage,
      prevPage,
    };
  }

  getPagination: ComputedRef<IPagination> = computed(
    () => this._pagination.value
  );

  order(order: string): QueryService {
    this._params.value = {
      ...this._params.value,
      order,
      page: 1,
    };
    return this;
  }

  getOrder(): string {
    if (this._params.value.order == undefined) return "";
    return this._params.value.order;
  }
  desc(desc: boolean): QueryService {
    this._params.value = {
      ...this._params.value,
      desc,
      page: 1,
    };
    return this;
  }

  getDesc(): boolean {
    if (this._params.value.desc == undefined) return false;
    return this._params.value.desc;
  }
  fields(fields: string[]): QueryService {
    this._params.value.fields = fields.join(",");
    return this;
  }

  limit(limit?: number): QueryService {
    this._params.value = {
      ...this._params.value,
      limit: limit,
    };
    return this;
  }

  page(page?: number): QueryService {
    this._params.value.page = page;
    return this;
  }
  perpage(perpage?: number): QueryService {
    this._params.value = {
      ...this._params.value,
      page: 1,
      perpage: perpage,
    };
    return this;
  }

  setOperation(operation: string, column:string){
    this._params.value={
      ...this._params.value,
      operation:`${operation}:${column}`,
      fields:"*",
      include: ""
    };
    return this;
  }

  filter(
    column: string,
    value: string | number | boolean,
    operator: string = "eq",
    union: string = "and"
  ): QueryService {
    const filt = `${column}:${operator}:${value}:${union}`;
    this._params.value.filter?.push(filt);
    return this;
  }

  replaceFilter(
    column: string,
    value: string | number | boolean,
    operator: string = "eq",
    union: string = "and"
  ) {
    const filt = `${column}:${operator}:${value}:${union}`;
    const filtered = this._params.value.filter?.filter(
      (f) => !f.includes(column)
    );
    this._params.value.filter = [...filtered, filt];
    return this;
  }

  removeFilter(column: string) {
    const filtered = this._params.value.filter?.filter(
      (f) => !f.includes(column)
    );
    this._params.value.filter = [...filtered];
    return this;
  }
  scope(scopes: string): QueryService {
    this._params.value.scopes = scopes;
    return this;
  }

  withTrashed(trashed: boolean): QueryService {
    this._params.value.withtrashed = trashed;
    return this;
  }

  onlyTrashed(trashed: boolean): QueryService {
    this._params.value.onlytrashed = trashed;
    return this;
  }

  include(include: string): QueryService {
    this._params.value.include = include;
    return this;
  }

  search(search: string | null): QueryService {
    this._params.value.search = search || "";
    this._params.value.page && (this._params.value.page = 1);
    return this;
  }
  like(term: string | null): QueryService {
    this._params.value.like = term || "";
    this._params.value.page && (this._params.value.page = 1);
    return this;
  }

  private parseFilter(): string {
    return (
      this._params.value.filter.map((item) => `filter[]=${item}`).join("&") ||
      ""
    );
  }
}
