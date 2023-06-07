import { reactive } from "vue"
// import { ref, computed } from 'vue'
// import { defineStore } from 'pinia'

export default reactive({
    flashMessage: '',
    event: null,
    events: null,
    totalEvents: 0
})


// export const useCounterStore = defineStore('counter', () => {
//   const count = ref(0)
//   const doubleCount = computed(() => count.value * 2)
//   function increment() {
//     count.value++
//   }

//   return { count, doubleCount, increment }
// })