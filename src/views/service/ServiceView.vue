<script setup lang="ts">
import { formatDate, formatUser } from '@/services/main.service';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import type { ServiceModel } from '@/models/service.model';
import { ServiceService } from '@/services/service.service';

const route = useRoute()
const customer = Number.parseInt(route.params.customer as any)
const device = Number.parseInt(route.params.device as any)

const services = ref<ServiceModel[]>()
ServiceService.getAllServicesByDeviceId(device).then(rsp => services.value = rsp.data)

async function removeService(model: ServiceModel) {
    await ServiceService.deleteService(model.serviceId)
    services.value = services.value?.filter(obj => obj.serviceId !== model.serviceId)
}
</script>

<template>
    <div v-if="services">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <RouterLink to="/customer">Customer</RouterLink>
                </li>
                <li class="breadcrumb-item">
                    <RouterLink :to="`/customer/${customer}/device`">
                        {{ String(customer).padStart(4, '0') }}
                    </RouterLink>
                </li>
                <li class="breadcrumb-item">
                    <RouterLink :to="`/customer/${customer}/device`">Device</RouterLink>
                </li>
                <li class="breadcrumb-item">
                    <RouterLink :to="`/customer/${customer}/device/${device}/service`">
                        {{ String(device).padStart(4, '0') }}
                    </RouterLink>
                </li>
                <li class="breadcrumb-item active" aria-current="page">Services</li>
            </ol>
        </nav>
        <h1 class="h3">Services</h1>
        <RouterLink class="btn btn-success mb-3" :to="`/customer/${customer}/device/${device}/service/new`">
            <i class="fa-solid fa-plus"></i> Add new service
        </RouterLink>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">State</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Created By</th>
                    <th scope="col">Updated At</th>
                    <th scope="col">Updated By</th>
                    <th scope="col">Options</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="obj in services">
                    <th scope="row">{{ obj.serviceId }}</th>
                    <td>
                        <RouterLink :to="`/model/${obj.state.stateId}`">
                            {{ obj.state.name }}
                        </RouterLink>
                    </td>
                    <td>{{ formatDate(obj.createdAt) }}</td>
                    <td>{{ formatUser(obj.createdByUser) }}</td>
                    <td>{{ formatDate(obj.updatedAt) }}</td>
                    <td>{{ formatUser(obj.updatedByUser) }}</td>
                    <td>
                        <div class="btn-group">
                            <RouterLink class="btn btn-sm btn-primary" :to="`/service/${obj.serviceId}`">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </RouterLink>
                            <button type="button" class="btn btn-sm btn-danger" @click="removeService(obj)">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-else>Services are beeing loaded... Please wait!</div>
</template>