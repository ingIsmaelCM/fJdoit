import {ComputedRef, Ref, unref} from "vue";
import useVuelidate, {ErrorObject, Validation} from "@vuelidate/core";
import utils from "@/helpers/utils.ts";
import {INotification} from "@/interfaces/AppInterfaces.ts";

export function useValidation() {

    const getValidation = (rule: ComputedRef, value: object): Ref<Validation> => {
        return useVuelidate(rule, value)
    }

    function showErrorMessage(errors: ErrorObject[]) {
        const message = errors.map((item: any) =>
            `<span style="white-space: nowrap">${item.$property}: ${item.$message}</span>`)
            .join("<br>");
        const errorContent: INotification = {
            title: "Verifique los datos",
            message: message,
            type: "error",
            duration: 3000,
            position: "bottom-right"
        };
        utils.showNoti(errorContent)
    }

    const runFromValidation = async (validation: Ref<Validation>, method: Function) => {
        validation.value.$validate().then(async (res) => {
            if (res) {
                return await method()
            } else {
                const errors = validation.value.$errors.map(error => ({
                    ...error,
                    $message: unref(error.$message)
                }))
                showErrorMessage(errors);
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    return {getValidation, runFromValidation}
}