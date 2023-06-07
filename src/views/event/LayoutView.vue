<script setup>
import { inject } from 'vue'

const GStore = inject('GStore')

</script>

<template>
  <div v-if="GStore.event">
    <h1>{{ GStore.event.title }}</h1>
    <div id="nav">
      <router-link :to="{ name: 'event-details' }">Details</router-link> |
      <router-link :to="{ name: 'event-register' }">Register</router-link> |
      <router-link :to="{ name: 'event-edit' }">Edit</router-link>
    </div>
    <router-view :event="GStore.event" />
  </div>
</template>

<style lang="scss" scoped></style>
