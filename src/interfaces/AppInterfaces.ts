export interface SummaryMethodProps<T = any> {
    columns: any[];
    data: T[];
}

export interface IFilter {
    field: string;
    label: string;
    options: Record<any, any>;
}

export interface IFilterDate {
    field: string;
    label: string;
}

export interface IColumns<T = any> {
    key: keyof T;
    dataKey: string;
    title: string;
    width?: number | string;
    minWidth?: number | string;
    type?: 'default' | 'selection' | 'index' | 'expand';
    filters?: Array<{ text: string, value: string }>;
    fixed?: "right" | "left" | true | undefined;
    action?: Function;
    formatter?: any;
    sortable?: boolean;
    summable?: boolean;
    hiddeable?: boolean;
    hide?: boolean;
    align?: "left" | "center" | "right";
    sumAction?:(rows:any)=>number
}

export interface IToast {
    type?:
        | "success"
        | "info"
        | "warn"
        | "error"
        | "secondary"
        | "contrast"
        | undefined;
    title?: string;
    message?: string;
    duration?: number;
}

export interface INotification {
    type?: "success" | "info" | "warning" | "error" | "";
    title?: string;
    message?: string;
    duration?: number;
    position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
}

export enum EAxiosVerb {
    Get = "get",
    Post = "post",
    Put = "put",
    Patch = "patch",
    Delete = "delete",
}

export interface ISelectionAction{
    label: string,
    action: Function,
    icon: string,
    disabled?: boolean
}

export  enum  EWhatsappStatus{
    pending="Pendiente",
    qrCode="Enviando QR",
    connected="Conectado",
    cancelled="Cancelado"
}

