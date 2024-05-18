import utils from "@/helpers/utils";
import api from "@/services/Axios";
import useGlobalStore from "@/stores/globalStore";
import {EAxiosVerb} from "@/interfaces/AppInterfaces.ts";

export default abstract class BaseRepository<I extends {}> {
    abstract endpoint: string;
    protected Api = api;

    protected async safeRun(method: () => Promise<any>) {
        try {
            useGlobalStore().setLoading(true);
            const res = await method().then();
            useGlobalStore().setLoading(false);
            if (res.config.method !== 'get') {
                utils.showNoti({
                    title: res.data.title,
                    type: "success",
                    duration: 3000,
                    position: "bottom-right",
                });
            }
            return res;
        } catch (error) {
            useGlobalStore().setLoading(false);
            throw error;
        }
    }

    async custom(endpoint: string, verb: EAxiosVerb, data?: object): Promise<any> {
        return this.safeRun(async () =>
            await this.Api[verb](endpoint, data)
        );
    }

    async sendFile(endpoint: string, files: File[]): Promise<any> {
        return this.safeRun(async () => {
            let data= new FormData();
           files.forEach((file:File)=>{
               data.append('files', file);
           });
           return  await this.Api.post(endpoint, data, {
                headers: {
                    'Content-Type': `multipart/form-data`,
                }
            })
        });
    }

    async save(data: I): Promise<any> {
        return this.safeRun(async () =>
            await this.Api.post(this.endpoint, data)
        );
    }

    async update(key: string, data: I): Promise<any> {
        return this.safeRun(async () =>
            await this.Api.put(this.endpoint + "/" + key, data));
    }

    async patch(key: string, data: object): Promise<any> {
        return this.safeRun(() =>
            this.Api.patch(this.endpoint + "/" + key, data)
        );
    }

    async get(params: string = ""): Promise<any> {
        return this.safeRun(() =>
            this.Api.get(this.endpoint + params)
        );
    }

    async find(key: string, params: string = ""): Promise<any> {
        return this.safeRun(() =>
            this.Api.get(this.endpoint + "/" + key + params)
        );
    }

    async delete(key: number | string): Promise<any> {
        return this.safeRun(() =>
            this.Api.delete(this.endpoint + "/" + key)
        );
    }

    async restore(key: number | string): Promise<any> {
        return this.safeRun(() =>
            this.Api.patch(this.endpoint + "/" + key)
        );
    }
}

