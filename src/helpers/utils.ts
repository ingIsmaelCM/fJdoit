import jsCookie from "js-cookie";
import {INotification, IToast} from "@/interfaces/AppInterfaces";
import {ElNotification} from "element-plus";
import moment from "moment";

let timer: any;


export default {
    formatPhone: (number: number | string) => {
        var cleaned = ("" + number).replace(/\D/g, "");
        var length = cleaned.length;
        if (length <= 10) {
            return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
        } else if (length <= 11) {
            return (
                "+" +
                cleaned.replace(/(\d{2})(\d{3})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5")
            );
        } else if (length <= 12) {
            return (
                "+" + cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, "$1 ($2) $3-$4")
            );
        } else {
            return "+" + cleaned;
        }
    },
    setCookies: (key: string, value: string, expires: number) => {
        jsCookie.set(key, value, {expires});
    },

    getSavedParams: (schema: string) => {
        let prevParams: any = jsCookie.get(`${schema}Params`);
        let page = 1;
        let perpage = 10;
        if (prevParams) {
            prevParams = JSON.parse(prevParams);
            page = prevParams.currentPage || 10;
            perpage = prevParams.pageSize || 1;
        }

        return {page, perpage};
    },

    getErrorFromAxios: (error: any): INotification => {
        console.log(error)
        let message = error.response?.data.message || error.response?.data || "Error desconocido";
        if (typeof message == "object") {
            message = Object.values(message)
                .map((item: any) => item)
                .join("<br>");
        }
        return {
            title: "Ha ocurrido un error",
            message: message,
            type: "error",
            duration: 5000,
            position: "bottom-right"
        };
    },
    getSuccessFromAxios: (title: string): IToast => {
        return {
            title: title,
            type: "success",
            duration: 3500,
        };
    },
    toHourAndDay: (value: number) => {
        if (value < 48) return `${value} Hrs.`;
        const days = Math.floor(value / 24);
        const hours = Math.round(value % 24);
        return `${days}D ${hours} hrs.`;
    },

    formatMoney: (number: any, precision=2) => {
        number = parseFloat(number);
        if (isNaN(number)) {
            return "$" + "0";
        }
        return "$" + number.toLocaleString("en-US", {minimumFractionDigits: precision});
    },
    formatNumber: (number: any, precision=2):number => {
        number = parseFloat(number);
        if (isNaN(number)) {
            return 0.00;
        }
        return Number(number.toFixed(precision));
    },
    uppercaseFirst(str: string) {
        return `${str[0].toUpperCase()}${str.substring(1)}`;
    },


    showNoti(options: INotification = {}) {
        const {type, title, message, duration, position} = options;
        ElNotification({
            title: title || "",
            type: type || "success",
            message: message || "",
            duration: duration || 3000,
            dangerouslyUseHTMLString: true,
            position: position || "top-right",
        });
    },

    dateFromDB(date: string): string {
        const newDate = moment(date).format("DD/MM/YYYY");
        if (newDate === "Invalid date" || !date) {
            return "";
        }
        return newDate;
    },

    debounce:(fn: Function, wait: number)=>{
        return function(...args: any[]){
            if(timer) {
                clearTimeout(timer);
            }
            const context=<any>this ;
            timer = setTimeout(()=>{
                fn.apply(context, args);
            }, wait);
        }
    },

    async encrypt(text:string, secretKey:string) {
        const encoder = new TextEncoder();
        const keyData = encoder.encode(secretKey);
        const keyHash = await crypto.subtle.digest('SHA-256', keyData); // Asegura 256 bits para AES-256
        const key = await crypto.subtle.importKey(
            "raw",
            keyHash, // Usamos el hash como clave
            { name: "AES-CBC" },
            false,
            ["encrypt"]
        );
        const iv = crypto.getRandomValues(new Uint8Array(16)); // IV aleatorio adecuado
        const encryptedData = await crypto.subtle.encrypt(
            { name: "AES-CBC", iv },
            key,
            encoder.encode(text)
        );
        return {
            encrypted: Array.from(new Uint8Array(encryptedData)),
            iv: Array.from(iv)
        };
    }
};
