<script setup lang="ts">
import type { ManufacturerModel } from '@/models/manufacturer.model';
import type { ModelModel } from '@/models/model.model';
import type { TypeModel } from '@/models/type.model';
import { formatDate } from '@/services/main.service';
import { ManufacturerService } from '@/services/manufacturer.service';
import { ModelService } from '@/services/model.service';
import { TypeService } from '@/services/type.service';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const id = Number.parseInt(route.params.id as any)

const model = ref<ModelModel>()
ModelService.getModelById(id).then(rsp => model.value = rsp.data)

const types = ref<TypeModel[]>()
TypeService.getAllTypes()
    .then(rsp => types.value = rsp.data)

const manufacturers = ref<ManufacturerModel[]>()
ManufacturerService.getAllManufacturers()
    .then(rsp => manufacturers.value = rsp.data)

function updateModel() {
    ModelService.updateModel(id, model.value).then(rsp => {
        router.push({
            path: '/model'
        })
    })
}
</script>

<template>
    <div v-if="model">
        <h1 class="h3">Edit model</h1>
        <RouterLink class="btn btn-danger mb-3" to="/model">
            <i class="fa-solid fa-rotate-left"></i> Return to model list
        </RouterLink>
        <div class="mb-3">
            <label for="id" class="form-label">Id:</label>
            <input type="number" class="form-control" id="id" :value="model.modelId" disabled>
        </div>
        <div class="mb-3">
            <label for="name" class="form-label">Name:</label>
            <input type="text" class="form-control" id="name" v-model="model.name">
        </div>
        <div class="mb-3" v-if="types">
            <label for="type" class="form-label">Type:</label>
            <select class="form-select" v-model="model.typeId" id="type">
                <option v-for="obj in types" :value="obj.typeId">{{ obj.name }}</option>
            </select>
        </div>
        <div class="mb-3" v-if="manufacturers">
            <label for="manufacturer" class="form-label">Manufacturer:</label>
            <select class="form-select" v-model="model.manufacturerId" id="manufacturer">
                <option v-for="obj in manufacturers" :value="obj.manufacturerId">{{ obj.name }}</option>
            </select>
        </div>
        <div class="mb-3">
            <label for="created" class="form-label">Created At:</label>
            <input type="text" class="form-control" id="created" :value="formatDate(model.createdAt)" disabled>
        </div>
        <div class="mb-3">
            <label for="updated" class="form-label">Updated At:</label>
            <input type="text" class="form-control" id="updated" :value="formatDate(model.updatedAt)" disabled>
        </div>
        <button type="button" class="btn btn-success" @click="updateModel">
            <i class="fa-solid fa-save"></i> Save
        </button>
    </div>
</template>import type { ManufacturerModel } from '@/models/manufacturer.model';
import type { TypeModel } from '@/models/type.model';
import { ManufacturerService } from '@/services/manufacturer.service';
import { TypeService } from '@/services/type.service';
