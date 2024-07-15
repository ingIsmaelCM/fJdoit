import ProfileRepository from "@/repositories/ProfileRepository.ts";
import {EAxiosVerb} from "@/interfaces/AppInterfaces.ts";
import {ref, Ref} from "vue";
import useUserStore from "@/stores/userStore.ts";
import useAuthService from "@/services/auth/AuthService.ts";
import {useChangePasswordValidation, useUpdateProfileValidator} from "@/services/validators/profileValidations.ts";
import {IUserView} from "@/interfaces/ModelInterfaces.ts";

export function useProfile() {
    const profileRepo = new ProfileRepository();
    const user: Ref<Record<string, any>> = ref(useUserStore().getUser);
    const {$vProfile, runFromValidation}=useUpdateProfileValidator(<Ref<IUserView>>user);
    const {$vPassword}=useChangePasswordValidation(<Ref<IUserView>>user);
    const {logoutAuth} = useAuthService();

    const updateProfile = async () => {
       await runFromValidation($vProfile.value, async ()=>{
           profileRepo.custom(`auth/${user.value.id}/profile`, EAxiosVerb.Put, user.value).then(() => {
               logoutAuth();
           })
       })
    }

    const changePassword=async()=>{
        await runFromValidation($vPassword.value, async ()=>{
            profileRepo.custom(`auth/${user.value.id}/password`, EAxiosVerb.Put, user.value).then(() => {
                logoutAuth();
            })
        })
    }

    return {
        user,
        $vProfile: $vProfile.value,
        $vPassword: $vPassword.value,
        updateProfile,
        changePassword
    }

}