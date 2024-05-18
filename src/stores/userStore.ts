import { defineStore } from "pinia";
export const useUserStore = defineStore("userStore", {
  state: () => ({
    user: sessionStorage.getItem("jdoitAuth")
      ? JSON.parse(sessionStorage.getItem("jdoitAuth") as string)
      : {},
  }),

  getters: {
    getUser(state) {
      const cookieJdoit = sessionStorage.getItem("jdoitAuth");
      if (cookieJdoit) {
        state.user = JSON.parse(cookieJdoit);
      } else {
        state.user = {};
      }
      return state.user;
    },
  },
  actions: {
    setUser(loggedValue: any) {
      this.user = loggedValue;
      sessionStorage.setItem("jdoitAuth", JSON.stringify(loggedValue));
    },
  },
});
export default useUserStore;
