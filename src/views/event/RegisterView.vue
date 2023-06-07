<script setup>
import { useRouter } from 'vue-router'
import {inject} from 'vue'

const GStore = inject('GStore')

const props = defineProps({
  event: { required: true }
})

const router = useRouter()

// METHODS
const register = () => {
  // Call to API
  // If registeret then redirect to event details

  GStore.flashMessage = "You are successfully registered for" + props.event.title

  setTimeout(() => {
    GStore.flashMessage = ''
  }, 3000);

  router.push({
    name: 'event-details'
  })
}
</script>

<template>
  <p>Register for the event here</p>
  <button @click="register">Register Me</button>
</template>

<style lang="scss" scoped></style>
