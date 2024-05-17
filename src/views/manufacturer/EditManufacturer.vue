<script setup lang="ts">
import type { ManufacturerModel } from '@/models/manufacturer.model';
import type { StateModel } from '@/models/state.model';
import { formatDate } from '@/services/main.service';
import { ManufacturerService } from '@/services/manufacturer.service';
import { StateService } from '@/services/state.service';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const id = Number.parseInt(route.params.id as any)

const manufacturer = ref<ManufacturerModel>()
ManufacturerService.getManufacturerById(id).then(rsp =>
    manufacturer.value = rsp.data
)

function updateManufacturer() {
    ManufacturerService.updateManufacturer(id, manufacturer.value).then(rsp => {
        router.push({
            path: '/manufacturer'
        })
    })
}
</script>

<template>
    <div v-if="manufacturer">
        <h1 class="h3">Edit state</h1>
        <RouterLink class="btn btn-danger mb-3" to="/manufacturer">
            <i class="fa-solid fa-rotate-left"></i> Return to manufacturer list
        </RouterLink>
        <div class="mb-3">
            <label for="id" class="form-label">Id:</label>
            <input type="number" class="form-control" id="id" :value="manufacturer.manufacturerId" disabled>
        </div>
        <div class="mb-3">
            <label for="name" class="form-label">Name:</label>
            <input type="text" class="form-control" id="name" v-model="manufacturer.name">
        </div>
        <div class="mb-3">
            <label for="created" class="form-label">Created At:</label>
            <input type="text" class="form-control" id="created" :value="formatDate(manufacturer.createdAt)" disabled>
        </div>
        <div class="mb-3">
            <label for="updated" class="form-label">Updated At:</label>
            <input type="text" class="form-control" id="updated" :value="formatDate(manufacturer.updatedAt)" disabled>
        </div>
        <button type="button" class="btn btn-success" @click="updateManufacturer">
            <i class="fa-solid fa-save"></i> Save
        </button>
    </div>
</template>