import {useConfirm} from "primevue/useconfirm";
export default function useConfirmService() {
    const confirm = useConfirm();
    const onConfirmSubmit = async (
        event: any,
        message: string,
        acceptCallback:Function,
        title?:string,
        rejectCallback?: Function) => {
        await confirm.require({
            target: event.currentTarget,
            message: message,
            header: title||'Confirmación',
            acceptClass: "bg-sky-500 dark:bg-gray-800 !text-gray-200 p-button-outlined p-button-sm",
            rejectClass: "!bg-red-500 dark:bg-gray-800 !text-gray-200  p-button-outlined p-button-sm",
            accept: async () => {
                await acceptCallback()
            },
            reject: async () => {
                rejectCallback && await rejectCallback();
            }
        })

    };

    return {onConfirmSubmit};
}