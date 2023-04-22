import { useLocalStorage } from "@vueuse/core";
import type { User } from "firebase/auth";
import { defineStore } from "pinia";
import { getCurrentUser } from "vuefire";

const AuthStore= defineStore('authStore', {
  state: ()=> ({
    userData: useLocalStorage<User>('userData', null)
  }),
  actions: {
    async getUser() {
      const user= await getCurrentUser()

      if (user) {
        this.userData= user
      }
    }
  }
})

export default AuthStore
