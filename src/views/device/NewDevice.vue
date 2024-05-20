<script setup lang="ts">
import type { ModelModel } from '@/models/model.model';
import { DeviceService } from '@/services/device.service';
import { ModelService } from '@/services/model.service';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const id = Number.parseInt(route.params.id as any)

const router = useRouter()
const device = ref<any>({
    sn: '',
    modelId: 0,
    customerId: id
})

const models = ref<ModelModel[]>()
ModelService.getAllModels()
    .then(rsp => {
        models.value = rsp.data
        device.value.modelId = rsp.data[0].modelId
    })

function saveDevice() {
    DeviceService.saveDevice(device.value).then(rsp => {
        router.push({
            path: `/customer/${id}/device`
        })
    })
}
</script>

<template>
    <div v-if="device">
        <h1 class="h3">Create device</h1>
        <RouterLink class="btn btn-danger mb-3" :to="`/customer/${id}/device`">
            <i class="fa-solid fa-rotate-left"></i> Return to device list
        </RouterLink>
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
        <button type="button" class="btn btn-success" @click="saveDevice">
            <i class="fa-solid fa-save"></i> Save
        </button>
    </div>
</template>