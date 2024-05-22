import { createRouter, createWebHistory } from 'vue-router'
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
import ModelView from '@/views/model/ModelView.vue'
import NewModel from '@/views/model/NewModel.vue'
import EditModel from '@/views/model/EditModel.vue'
import DeviceView from '@/views/device/DeviceView.vue'
import NewDevice from '@/views/device/NewDevice.vue'
import EditDevice from '@/views/device/EditDevice.vue'
import LoginView from '@/views/LoginView.vue'
import ServiceView from '@/views/service/ServiceView.vue'
import NewService from '@/views/service/NewService.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/customer'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
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
    {
      path: '/model',
      name: 'model',
      component: ModelView
    },
    {
      path: '/model/new',
      name: 'new-model',
      component: NewModel
    },
    {
      path: '/model/:id',
      name: 'edit-model',
      component: EditModel
    },
    {
      path: '/customer/:id/device',
      name: 'device',
      component: DeviceView
    },
    {
      path: '/customer/:id/device/new',
      name: 'new-device',
      component: NewDevice
    },
    {
      path: '/device/:id',
      name: 'edit-device',
      component: EditDevice
    },
    {
      path: '/customer/:customer/device/:device/service',
      name: 'service',
      component: ServiceView
    },
    {
      path: '/customer/:customer/device/:device/service/new',
      name: 'new-service',
      component: NewService
    },
  ]
})

export default router
