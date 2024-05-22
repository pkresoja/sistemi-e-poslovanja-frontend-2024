<script setup lang="ts">
import { formatDate } from '@/services/main.service';
import { ref } from 'vue';
import type { DeviceModel } from '@/models/device.model';
import { DeviceService } from '@/services/device.service';
import { useRoute } from 'vue-router';

const route = useRoute()
const id = Number.parseInt(route.params.id as any)

const devices = ref<DeviceModel[]>()
DeviceService.getAllDevicesByCustomerId(id).then(rsp => devices.value = rsp.data)

async function removeDevice(model: DeviceModel) {
    await DeviceService.deleteDevice(model.deviceId)
    devices.value = devices.value?.filter(obj => obj.deviceId !== model.deviceId)
}
</script>

<template>
    <div v-if="devices">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <RouterLink to="/customer">Customer</RouterLink>
                </li>
                <li class="breadcrumb-item">
                    <RouterLink :to="`/customer/${id}/device`">{{ String(id).padStart(4, '0') }}</RouterLink>
                </li>
                <li class="breadcrumb-item active" aria-current="page">Devices</li>
            </ol>
        </nav>
        <h1 class="h3">Devices</h1>
        <RouterLink class="btn btn-success mb-3" :to="`/customer/${id}/device/new`">
            <i class="fa-solid fa-plus"></i> Add new device
        </RouterLink>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">SN</th>
                    <th scope="col">Model</th>
                    <th scope="col">Type</th>
                    <th scope="col">Manufacturer</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Updated At</th>
                    <th scope="col">Options</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="obj in devices">
                    <th scope="row">{{ obj.deviceId }}</th>
                    <td>{{ obj.sn }}</td>
                    <td>
                        <RouterLink :to="`/model/${obj.model.modelId}`">
                            {{ obj.model.name }}
                        </RouterLink>
                    </td>
                    <td>
                        <RouterLink :to="`/type/${obj.model.type.typeId}`">
                            {{ obj.model.type.name }}
                        </RouterLink>
                    </td>
                    <td>
                        <RouterLink :to="`/manufacturer/${obj.model.manufacturer.manufacturerId}`">
                            {{ obj.model.manufacturer.name }}
                        </RouterLink>
                    </td>
                    <td>{{ formatDate(obj.createdAt) }}</td>
                    <td>{{ formatDate(obj.updatedAt) }}</td>
                    <td>
                        <div class="btn-group">
                            <RouterLink class="btn btn-sm btn-primary" :to="`/device/${obj.deviceId}`">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </RouterLink>
                            <RouterLink class="btn btn-sm btn-success"
                                :to="`/customer/${id}/device/${obj.deviceId}/service`">
                                <i class="fa-solid fa-list-ul"></i>
                            </RouterLink>
                            <button type="button" class="btn btn-sm btn-danger" @click="removeDevice(obj)">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-else>Devices are beeing loaded... Please wait!</div>
</template>