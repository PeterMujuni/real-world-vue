import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
import AboutView from '../views/AboutView.vue'
import DetailsView from '../views/event/DetailsView.vue'
import LayoutView from '../views/event/LayoutView.vue'
import RegisterView from '../views/event/RegisterView.vue'
import EditView from '../views/event/EditView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list',
      props: route => ({ page: parseInt(route.query.page) || 1}),
      component: EventListView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/events/:id',
      name: 'event-layout',
      props: true,
      component: LayoutView,
      children: [
        {
          path: '',
          name: 'event-details',
          component: DetailsView
        },
        {
          path: 'register',
          name: 'event-register',
          component: RegisterView
        },
        {
          path: 'edit',
          name: 'event-edit',
          component: EditView
        }
      ]
    },
    
  ]
})

export default router
