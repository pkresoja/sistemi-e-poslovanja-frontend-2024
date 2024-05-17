<script setup lang="ts">
import { formatDate } from '@/services/main.service';
import { ref } from 'vue';
import type { ManufacturerModel } from '@/models/manufacturer.model';
import { ManufacturerService } from '@/services/manufacturer.service';

const manufacturers = ref<ManufacturerModel[]>()
ManufacturerService.getAllManufacturers().then(rsp =>
    manufacturers.value = rsp.data
)

async function removeManufacturer(model: ManufacturerModel) {
    await ManufacturerService.deleteManufacturer(model.manufacturerId)
    manufacturers.value = manufacturers.value?.filter(obj =>
        obj.manufacturerId !== model.manufacturerId
    )
}
</script>

<template>
    <div v-if="manufacturers">
        <h1 class="h3">Manufacturers</h1>
        <RouterLink class="btn btn-success mb-3" to="/manufacturer/new">
            <i class="fa-solid fa-plus"></i> Add new manufacturer
        </RouterLink>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Updated At</th>
                    <th scope="col">Options</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="obj in manufacturers">
                    <th scope="row">{{ obj.manufacturerId }}</th>
                    <td>{{ obj.name }}</td>
                    <td>{{ formatDate(obj.createdAt) }}</td>
                    <td>{{ formatDate(obj.updatedAt) }}</td>
                    <td>
                        <div class="btn-group">
                            <RouterLink class="btn btn-sm btn-primary" :to="`/manufacturer/${obj.manufacturerId}`">
                                <i class="fa-solid fa-circle-info"></i>
                            </RouterLink>
                            <button type="button" class="btn btn-sm btn-danger" @click="removeManufacturer(obj)">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-else>Manufacturers are beeing loaded... Please wait!</div>
</template>