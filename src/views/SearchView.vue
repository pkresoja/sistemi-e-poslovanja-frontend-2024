<script setup lang="ts">
import type { ServiceModel } from '@/models/service.model';
import { formatDate } from '@/services/main.service';
import { ServiceService } from '@/services/service.service';
import { ref } from 'vue';

const search = ref<string>('')
const service = ref<ServiceModel>()

function onSearch() {
    if (search.value == '') return
    ServiceService.getServiceByCode(search.value).then(rsp => {
        service.value = rsp.data
    })
}
</script>

<template>
    <div class="input-search mt-3 mb-3">
        <input type="text" class="form-control" id="search-box" v-model="search">
        <button class="btn btn-sm btn-primary" @click="onSearch">
            <i class="fa-solid fa-magnifying-glass"></i>
        </button>
    </div>
    <div class="mb-3" v-if="service">
        <table class="table table-striped mx-auto text-center" id="details">
            <thead>
                <tr>
                    <th colspan="2">
                        <h3>{{ service.state.name }}</h3>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>Code:</th>
                    <td>{{ service.code }}</td>
                </tr>
                <tr>
                    <th>Type:</th>
                    <td>{{ service.device.model.type.name }}</td>
                </tr>
                <tr>
                    <th>Model:</th>
                    <td>{{ service.device.model.name }}</td>
                </tr>
                <tr>
                    <th>Manufacturer:</th>
                    <td>{{ service.device.model.manufacturer.name }}</td>
                </tr>
                <tr>
                    <th>Customer:</th>
                    <td>{{ service.device.customer.name }}</td>
                </tr>
                <tr>
                    <th>Tax Id</th>
                    <td v-if="service.device.customer.taxId">{{ service.device.customer.taxId }}</td>
                    <td v-else>Not defined</td>
                </tr>
                <tr>
                    <th>Created At:</th>
                    <td>{{ formatDate(service.createdAt) }}</td>
                </tr>
                <tr>
                    <th>Updated At:</th>
                    <td>{{ formatDate(service.updatedAt) }}</td>
                </tr>
                <tr>
                    <td colspan="2">
                        <RouterLink :to="`/service/${service.serviceId}`" class="btn btn-sm btn-primary">
                            Click here to update the service
                        </RouterLink>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="text-center" v-else>Service not found!<br>Make sure to type in the correct service code.</div>
</template>

<style>
.input-search {
    max-width: 200px;
    display: flex;
    flex-direction: row;
    margin-left: auto;
    margin-right: auto;
    gap: 10px;
}

#search-box {
    text-transform: uppercase;
}

#details {
    max-width: 900px;
}
</style>