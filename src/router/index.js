import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
import AboutView from '../views/AboutView.vue'
import DetailsView from '../views/event/DetailsView.vue'
import LayoutView from '../views/event/LayoutView.vue'
import RegisterView from '../views/event/RegisterView.vue'
import EditView from '../views/event/EditView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import NetWorkErrorView from '../views/NetworkErrorView.vue'
import NProgress from 'nprogress'
import EventService from '@/services/EventService.'
import GStore from '../stores/index.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list',
      props: (route) => ({ page: parseInt(route.query.page) || 1 }),
      component: EventListView,
      beforeEnter: (to) => {
        return EventService.getEvents(2, to.params.page)
          .then((response) => {
            GStore.events = response.data
            GStore.totalEvents = response.headers['x-total-count']
          })
          .catch(() => {
            return { name: 'network-error' }
          })
      }
    },
    {
      path: '/about-us',
      name: 'about',
      component: AboutView
    },
    {
      path: '/about',
      redirect: { name: 'about' }
    },
    {
      path: '/events/:id',
      name: 'event-layout',
      props: true,
      component: LayoutView,
      beforeEnter: (to) => {
        return EventService.getEvent(to.params.id)
          .then((response) => {
            GStore.event = response.data
          })
          .catch((error) => {
            if (error.response && error.response.status == 404) {
              return {
                name: '404-resource',
                params: { resource: 'event' }
              }
            } else {
              return { name: 'network-error' }
            }
          })
      },
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
          component: EditView,
          meta: { requireAuth: true }
        }
      ]
    },
    {
      // redirects childrens
      path: '/event/:afterEvent(.*)',
      redirect: (to) => {
        return { path: '/events/' + to.params.afterEvent }
      }
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    },
    {
      path: '/404/:resource',
      name: '404-resource',
      component: NotFoundView,
      props: true
    },
    {
      path: '/network-error',
      name: 'network-error',
      component: NetWorkErrorView
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach((to, from) => {
  NProgress.start()

  const notAuthorized = true
  if (to.meta.requireAuth && notAuthorized) {
    GStore.flashMessage = 'Sorry, you are not authorized to view this page'

    setTimeout(() => {
      GStore.flashMessage = ''
    }, 3000)

    if (from.href) {
      return false
    } else {
      return { path: '/' }
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
