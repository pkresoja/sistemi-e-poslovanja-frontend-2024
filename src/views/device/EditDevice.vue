<script setup lang="ts">
import type { CustomerModel } from '@/models/customer.model';
import type { DeviceModel } from '@/models/device.model';
import type { ModelModel } from '@/models/model.model';
import { CustomerService } from '@/services/customer.service';
import { DeviceService } from '@/services/device.service';
import { formatDate } from '@/services/main.service';
import { ModelService } from '@/services/model.service';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const id = Number.parseInt(route.params.id as any)

const device = ref<DeviceModel>()
const oldCustomerId = ref<number>()
DeviceService.getDeviceById(id)
    .then(rsp => {
        device.value = rsp.data
        oldCustomerId.value = rsp.data.customerId
    })

const models = ref<ModelModel[]>()
ModelService.getAllModels()
    .then(rsp => models.value = rsp.data)

const customers = ref<CustomerModel[]>()
CustomerService.getAllCustomers()
    .then(rsp => customers.value = rsp.data)

function updateDevice() {
    DeviceService.updateDevice(id, device.value).then(rsp => {
        router.push({
            path: `/customer/${device.value?.customerId}/device`
        })
    })
}
</script>

<template>
    <div v-if="device">
        <h1 class="h3">Edit device</h1>
        <RouterLink class="btn btn-danger mb-3" :to="`/customer/${oldCustomerId}/device`" v-if="oldCustomerId">
            <i class="fa-solid fa-rotate-left"></i> Return to device list
        </RouterLink>
        <div class="mb-3">
            <label for="id" class="form-label">Id:</label>
            <input type="number" class="form-control" id="id" :value="device.deviceId" disabled>
        </div>
        <div class="mb-3">
            <label for="sn" class="form-label">SN:</label>
            <input type="text" class="form-control" id="sn" v-model="device.sn">
        </div>
        <div class="mb-3" v-if="models">
            <label for="model" class="form-label">Model:</label>
            <select class="form-select" v-model="device.modelId" id="model">
                <option v-for="obj in models" :value="obj.modelId">
                    {{ `${obj.name} ${obj.manufacturer.name} ${obj.type.name}` }}
                </option>
            </select>
        </div>
        <div class="mb-3" v-if="customers">
            <label for="customer" class="form-label">Customer:</label>
            <select class="form-select" v-model="device.customerId" id="customer">
                <option v-for="obj in customers" :value="obj.customerId">
                    <span v-if="obj.taxId">{{ obj.name }} [{{ obj.taxId }}]</span>
                    <span v-else>{{ obj.name }}</span>
                </option>
            </select>
        </div>
        <div class="mb-3">
            <label for="created" class="form-label">Created At:</label>
            <input type="text" class="form-control" id="created" :value="formatDate(device.createdAt)" disabled>
        </div>
        <div class="mb-3">
            <label for="updated" class="form-label">Updated At:</label>
            <input type="text" class="form-control" id="updated" :value="formatDate(device.updatedAt)" disabled>
        </div>
        <button type="button" class="btn btn-success" @click="updateDevice">
            <i class="fa-solid fa-save"></i> Save
        </button>
    </div>
</template>
