<script setup>
import { inject, computed } from 'vue'
import EventCard from '@/components/EventCard.vue'

const GStore = inject('GStore')

// PROPS
const props = defineProps({
  page: {
    type: Number
  }
})

// DATA

// METHODS

// COMPUTES
const hasNextPage = computed(() => {
  let totalPages = Math.ceil(GStore.totalEvents / 2)
  return props.page < totalPages
})

// LIFE CYCLES

</script>

<template>
  <h1>Events For Good</h1>
  <div class="events" v-if="GStore.events">
    <EventCard v-for="event in GStore.events" :key="event.id" :event="event" />
    <div class="pagination">
      <router-link
        id="page-prev"
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        >&#60; Previous</router-link
      >

      <router-link
        id="page-next"
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        >Next &#62;</router-link
      >
    </div>
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}

.pagination {
  display: flex;
  width: 290px;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
