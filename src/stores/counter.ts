import { defineStore } from 'pinia'
import {useSessionStorage} from "@vueuse/core"

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    counter: useSessionStorage("counter", 0)
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    increment() {
      this.counter++
    }
  }
})