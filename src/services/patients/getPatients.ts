import PatientRepository from "@/repositories/PatientRepository.ts";
import PatientFormatter from "@/formatter/PatientFormatter.ts";
import QueryService from "@/services/QueryService.ts";
import {ref, Ref} from "vue";
import {IPatientView} from "@/interfaces/ModelInterfaces.ts";
import {EAxiosVerb} from "@/interfaces/AppInterfaces.ts";
import {AxiosResponse} from "axios";

export function useGetPatients() {
    const patientRepo = new PatientRepository();
    const patientFormatter = new PatientFormatter();
    const query = new QueryService();
    const patients: Ref<IPatientView[]> = ref([]);
    const patient: Ref<IPatientView> = ref(patientFormatter.init());
    const patientPlans = ref()

    query.page(1).perpage(15).order("code").include("evals,eval");

    const getPatients = async () => {
        patientRepo.get(query.parsed.value).then(({data}) => {
            patients.value = data.rows;
            query.setPagination(data)
        })
    }

    const getPatientPlans = async (patientId: string) => {
        patientRepo.custom(`patients/${patientId}/plans`, EAxiosVerb.Get)
            .then(({data}: AxiosResponse) => {
                patientPlans.value = data;
            })
    }

    const findPatient = async (patientId: string) => {
        patientRepo.find(patientId, query.parsed.value).then(({data}) => {
            patient.value = data;
        })
    }

    return {
        patients,
        patient,
        patientPlans,
        query,
        patientFormatter,
        getPatients,
        findPatient,
        getPatientPlans
    }
}