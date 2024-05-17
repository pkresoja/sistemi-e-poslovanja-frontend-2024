import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TypeView from '@/views/type/TypeView.vue'
import EditType from '@/views/type/EditType.vue'
import NewType from '@/views/type/NewType.vue'
import StateView from '@/views/state/StateView.vue'
import EditState from '@/views/state/EditState.vue'
import NewState from '@/views/state/NewState.vue'
import ManufacturerView from '@/views/manufacturer/ManufacturerView.vue'
import NewManufacturer from '@/views/manufacturer/NewManufacturer.vue'
import EditManufacturer from '@/views/manufacturer/EditManufacturer.vue'
import CustomerView from '@/views/customer/CustomerView.vue'
import NewCustomer from '@/views/customer/NewCustomer.vue'
import EditCustomer from '@/views/customer/EditCustomer.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/type',
      name: 'type',
      component: TypeView
    },
    {
      path: '/type/new',
      name: 'new-type',
      component: NewType
    },
    {
      path: '/type/:id',
      name: 'edit-type',
      component: EditType
    },
    {
      path: '/state',
      name: 'state',
      component: StateView
    },
    {
      path: '/state/new',
      name: 'new-state',
      component: NewState
    },
    {
      path: '/state/:id',
      name: 'edit-state',
      component: EditState
    },
    {
      path: '/manufacturer',
      name: 'manufacturer',
      component: ManufacturerView
    },
    {
      path: '/manufacturer/new',
      name: 'new-manufacturer',
      component: NewManufacturer
    },
    {
      path: '/manufacturer/:id',
      name: 'edit-manufacturer',
      component: EditManufacturer
    },
    {
      path: '/customer',
      name: 'customer',
      component: CustomerView
    },
    {
      path: '/customer/new',
      name: 'new-customer',
      component: NewCustomer
    },
    {
      path: '/customer/:id',
      name: 'edit-customer',
      component: EditCustomer
    },
  ]
})

export default router
