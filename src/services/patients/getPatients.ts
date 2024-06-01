import PatientRepository from "@/repositories/PatientRepository.ts";
import PatientFormatter from "@/formatter/PatientFormatter.ts";
import QueryService from "@/services/QueryService.ts";
import {ref, Ref} from "vue";
import {IPatientView} from "@/interfaces/ModelInterfaces.ts";

export function useGetPatients() {
    const patientRepo = new PatientRepository();
    const patientFormatter = new PatientFormatter();
    const query = new QueryService();
    const patients: Ref<IPatientView[]> = ref([]);
    const patient: Ref<IPatientView> = ref(patientFormatter.init());

    query.page(1).perpage(15).order("code").include("evals,eval");

    const getPatients = async () => {
        patientRepo.get(query.parsed.value).then(({data}) => {
            patients.value = data.rows;
            query.setPagination(data)
        })
    }

    const findPatient = async (patientId: string) => {
        patientRepo.find(patientId, query.parsed.value).then(({data}) => {
            console.log(data)
            patient.value = data;
        })
    }

    return {
        patients,
        patient,
        query,
        patientFormatter,
        getPatients,
        findPatient
    }
}