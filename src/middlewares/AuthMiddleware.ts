import userStore from "@/stores/userStore.ts";

export default class AuthMiddleware {
    static isAuth() {
        try {
            const auth = sessionStorage.getItem("jdoitAuth");
            if (auth) {
                const decoded = JSON.parse(auth);
                if (decoded.token) {
                    return true;
                }
            }
            return false;
        } catch (error: any) {
            console.log(error)
            return false
        }
    }

    static hasPhone() {
        try {
            const user=userStore().getUser;
            return Boolean(user.phone);
        } catch (error: any) {
            console.log(error)
            return false
        }
    }
}