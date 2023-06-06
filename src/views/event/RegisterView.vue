<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  event: { required: true }
})

const router = useRouter()

// METHODS
const register = () => {
  // Call to API
  // If registeret then redirect to event details
  // console.log($router);
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
