<script setup lang="ts">
import type { DeviceModel } from '@/models/device.model';
import type { ServiceModel } from '@/models/service.model';
import type { StateModel } from '@/models/state.model';
import { DeviceService } from '@/services/device.service';
import { formatDate, formatUser } from '@/services/main.service';
import { ServiceService } from '@/services/service.service';
import { StateService } from '@/services/state.service';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()
const id = Number.parseInt(route.params.id as any)

const service = ref<ServiceModel>()
const oldDeviceId = ref<number>()
const states = ref<StateModel[]>()
const devices = ref<DeviceModel[]>()

ServiceService.getServiceById(id)
    .then(rsp => {
        service.value = rsp.data
        oldDeviceId.value = rsp.data.deviceId

        StateService.getAllStates()
            .then(srsp => states.value = srsp.data)

        DeviceService.getAllDevicesByCustomerId(rsp.data.device.customerId)
            .then(drsp => devices.value = drsp.data)
    })

function updateService() {
    ServiceService.updateService(id, {
        stateId: service.value?.stateId,
        deviceId: service.value?.deviceId
    }).then(rsp => {
        router.push({
            path: `/customer/${service.value?.device.customerId}/device/${service.value?.deviceId}/service`
        })
    })
}
</script>

<template>
    <div v-if="service">
        <h1 class="h3">Edit service</h1>
        <RouterLink class="btn btn-danger mb-3"
            :to="`/customer/${service.device.customerId}/device/${oldDeviceId}/service`" v-if="oldDeviceId">
            <i class="fa-solid fa-rotate-left"></i> Return to service list
        </RouterLink>
        <div class="mb-3">
            <label for="id" class="form-label">Id:</label>
            <input type="number" class="form-control" id="id" :value="service.serviceId" disabled>
        </div>
        <div class="mb-3">
            <label for="code" class="form-label">Code:</label>
            <input type="text" class="form-control" id="code" :value="service.code" disabled>
        </div>
        <div class="mb-3" v-if="states">
            <label for="state" class="form-label">State:</label>
            <select class="form-select" v-model="service.stateId" id="state">
                <option v-for="obj in states" :value="obj.stateId">
                    {{ obj.name }}
                </option>
            </select>
        </div>
        <div class="mb-3" v-if="devices">
            <label for="device" class="form-label">Device:</label>
            <select class="form-select" v-model="service.deviceId" id="device" @change="console.log(service.deviceId)">
                <option v-for="obj in devices" :value="obj.deviceId">
                    {{ `${obj.model.manufacturer.name} ${obj.model.name} (${obj.sn})` }}
                </option>
            </select>
        </div>
        <div class="mb-3">
            <label for="created" class="form-label">Created At:</label>
            <input type="text" class="form-control" id="created" :value="formatDate(service.createdAt)" disabled>
        </div>
        <div class="mb-3">
            <label for="createdby" class="form-label">Created By:</label>
            <input type="text" class="form-control" id="createdby" :value="formatUser(service.createdByUser)" disabled>
        </div>
        <div class="mb-3">
            <label for="updated" class="form-label">Updated At:</label>
            <input type="text" class="form-control" id="updated" :value="formatDate(service.updatedAt)" disabled>
        </div>
        <div class="mb-3">
            <label for="updated" class="form-label">Updated By:</label>
            <input type="text" class="form-control" id="updated" :value="formatUser(service.updatedByUser)" disabled>
        </div>
        <button type="button" class="btn btn-success" @click="updateService">
            <i class="fa-solid fa-save"></i> Save
        </button>
    </div>
</template>
