import WhatsappRepository from "@/repositories/WhatsappRepository.ts";
import {ref} from "vue";
import {AxiosResponse} from "axios";
import {EAxiosVerb, EWhatsappStatus} from "@/interfaces/AppInterfaces.ts";
import SocketService from "@/services/SocketService.ts";

export function useWhatsapp() {

    const whatsappRepo = new WhatsappRepository();
    const isConnected = ref(false);
    const qrCode = ref("");
    const isLoading = ref(false)

    SocketService.getInstance().getFromChannel(`whatsappStatus`, (data: any) => {
        switch (data.status) {
            case EWhatsappStatus.pending:
                isLoading.value = true;
                break;
            case EWhatsappStatus.qrCode:
                isLoading.value = false;
                qrCode.value = data.qr;
                break
            case EWhatsappStatus.connected:
                isLoading.value = false;
                qrCode.value = "";
                isConnected.value = true
                break
            case EWhatsappStatus.cancelled:
                isLoading.value = false;
                qrCode.value = "";
                isConnected.value = false
                break
        }
    })
    const checkConnection = async () => {
        whatsappRepo.get().then(({data}: AxiosResponse) => {
            isConnected.value = data;
        })
    }

    const connectWhatsapp = async () => {
        whatsappRepo.custom("/whatsapp/connect", EAxiosVerb.Post).then(({data}: AxiosResponse) => {
            console.log(data)
        })
    }

    const disconnectWhatsapp = async () => {
        whatsappRepo.custom("/whatsapp/disconnect", EAxiosVerb.Post).then(({data}: AxiosResponse) => {
            console.log(data)
        })
    }

    return {
        isConnected,
        qrCode,
        isLoading,
        checkConnection,
        connectWhatsapp,
        disconnectWhatsapp
    }
}