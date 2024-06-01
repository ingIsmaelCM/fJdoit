import {ref} from "vue";
import PatientRepository from "@/repositories/PatientRepository.ts";

export function useUnsetPatient() {
    const key = ref(0);
    const patientRepo = new PatientRepository();

    const deletePatient = (patientId: string) => {
        patientRepo.delete(patientId).then(() => {
            key.value++;
        })
    }

    const restorePatient = (patientId: string) => {
        patientRepo.restore(patientId).then(() => {
            key.value++;
        })
    }

    return {
        key,
        deletePatient,
        restorePatient
    }
}