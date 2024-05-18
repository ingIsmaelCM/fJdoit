import axios, {InternalAxiosRequestConfig} from "axios";
import useGlobalStore from "@/stores/globalStore";
import utils from "@/helpers/utils";

const api = axios.create({
    baseURL: import.meta.env.DEV
        ? import.meta.env.VITE_DEV_API_URL
        : import.meta.env.VITE_API_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",

    },
    withCredentials: true
});

api.interceptors.request.use((req: InternalAxiosRequestConfig) => {

    return req;
});
api.interceptors.response.use(
    async (res) => {
        sessionStorage.isCallingRequest = false;
        return res;
    },
    (error: any) => {
        const status = error.response?.status;
        if (status === 401) {
            sessionStorage.removeItem("jdoitAuth");
            if (!error.request.responseURL.includes("auth")) {
                location.replace("/");
            }
        }
        if (status) {
            const message = utils.getErrorFromAxios(error);
            utils.showNoti(message);
        } else {
            utils.showNoti({
                title: "Ha ocurrido un error",
                message: error.message,
                type: "error",
                duration: 5000,
                position: "bottom-right"
            });
        }
        useGlobalStore().setLoading(false);
        sessionStorage.isCallingRequest = false;
        return Promise.reject(error);
    }
);
export default api;
