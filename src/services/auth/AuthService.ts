import {Ref, ref} from "vue";
import {useRouter} from "vue-router";
import AuthRepository from "@/repositories/AuthRepository.ts";
import {useGlobalStore} from "@/stores/globalStore.ts";
import useUserStore from "@/stores/userStore.ts";
import {EAxiosVerb} from "@/interfaces/AppInterfaces.ts";

function useAuthService() {
    const authRepo = new AuthRepository();
    const recoverActiveIndex = ref(0)
    const recoverCode = ref(null)
    const auth: Ref<any> = ref({
        username: "",
        email: "",
        password: "",
        name: "",
        lastname: "",
        remember: false,
        password_confirmation: ""
    });
    const userStore = useUserStore();
    const router = useRouter();
    const loginAuth = async () => {
        useGlobalStore().setLockScreen(true);
        try {
            const {data} = await authRepo.custom("auth/login", EAxiosVerb.Post, auth.value);
            const user = {
                user: data.user,
                token: data.accessToken,
            };
            userStore.setUser(user);
            saveRemember();

            if (userStore.getUser) {
                await router.replace({path: "/", force: true});
            }
        } finally {
            useGlobalStore().setLockScreen(false);
        }
    };

    const saveRemember = () => {
        auth.value.remember
            ? localStorage.setItem("jdoitRemember", JSON.stringify(auth.value))
            : localStorage.removeItem("jdoitRemember");
    };

    const getRemember = () => {
        const savedRemember: string | null =
            localStorage.getItem("jdoitRemember");
        if (savedRemember) {
            auth.value = JSON.parse(savedRemember);
        }
    };
    const logoutAuth = () => {
        sessionStorage.removeItem("jdoitAuth");
        if (!location.href.includes("login")) {
            location.replace("/");
        }
    };


    return {
        auth,
        recoverActiveIndex,
        recoverCode,
        loginAuth,
        logoutAuth,
        getRemember
    };
}

export default useAuthService;