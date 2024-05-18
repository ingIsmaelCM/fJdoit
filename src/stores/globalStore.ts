import {defineStore} from "pinia";


export const useGlobalStore = defineStore("global", {
    state: () => ({
        darkMode: Boolean(localStorage.getItem("jdoitDark")),
        loading: false,
        lockScreen: false,
        errors: {},
        preferences: {},
        tenant: sessionStorage.tenant?JSON.parse(sessionStorage.tenant): {},
        tours:[]
    }),

    getters: {
        getDarkMode: (state) => state.darkMode,
        getLoading: (state) => state.loading,
        getLockScreen: (state) => state.lockScreen,
        getErrors: (state) => state.errors,
        getPreferences: (state) => state.preferences,
        getTenant: (state) => state.tenant,
        getTours: (state) => state.tours||[],
    },

    actions: {
        setDarkMode(status: boolean) {
            if (status) {
                localStorage.setItem("jdoitDark", status.toString());
            } else {
                localStorage.removeItem("jdoitDark");
            }
            this.darkMode = status;
        },
        setLoading(isLoading: boolean) {
            this.loading = isLoading;
        },
        setLockScreen(status: boolean) {
            this.lockScreen = status;
        },
        setPreferences(preferences: any) {
            this.preferences = preferences;
        },
        setTenant(tenant: any) {
            sessionStorage.tenant=JSON.stringify(tenant);
            this.tenant = tenant;
        },
        setTours(tours: any) {
            this.tours = tours;
        },


    },
});

export default useGlobalStore;
