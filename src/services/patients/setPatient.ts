import PatientRepository from "@/repositories/PatientRepository.ts";
import PatientFormatter from "@/formatter/PatientFormatter.ts";
import {ref, Ref} from "vue";
import {EInfoGender, IPatientView} from "@/interfaces/ModelInterfaces.ts";
import {usePatientValidation} from "@/services/patients/patientValidations.ts";

export function useSetPatient() {
    const patientRepo = new PatientRepository();
    const patientFormatter = new PatientFormatter();
    const patient: Ref<IPatientView> = ref({
        ...patientFormatter.init(),
        gender: EInfoGender.Indefinido
    });
    const {$vPatient, runFromValidation} = usePatientValidation(patient);

    const createPatient = async () => {
        await runFromValidation($vPatient.value, async () => {
            await patientRepo.save(patient.value);
            patient.value = patientFormatter.init();
        })
    }
    const updatePatient = async () => {
        await runFromValidation($vPatient.value, async () => {
            await patientRepo.update(patient.value.id, patient.value);
        })
    }

    return {
        patient,
        $vPatient: $vPatient.value,
        createPatient,
        updatePatient
    }
}