<script setup lang="ts">
import type { ManufacturerModel } from '@/models/manufacturer.model';
import type { TypeModel } from '@/models/type.model';
import { ManufacturerService } from '@/services/manufacturer.service';
import { ModelService } from '@/services/model.service';
import { TypeService } from '@/services/type.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const model = ref<any>({
    name: '',
    typeId: 0,
    manufacturerId: 0
})

const types = ref<TypeModel[]>()
TypeService.getAllTypes()
    .then(rsp => {
        types.value = rsp.data
        model.value.typeId = rsp.data[0].typeId
    })

const manufacturers = ref<ManufacturerModel[]>()
ManufacturerService.getAllManufacturers()
    .then(rsp => {
        manufacturers.value = rsp.data
        model.value.manufacturerId = rsp.data[0].manufacturerId
    })

function saveModel() {
    ModelService.saveModel(model.value).then(rsp => {
        router.push({
            path: '/model'
        })
    })
}
</script>

<template>
    <div v-if="model">
        <h1 class="h3">Create model</h1>
        <RouterLink class="btn btn-danger mb-3" to="/model">
            <i class="fa-solid fa-rotate-left"></i> Return to model list
        </RouterLink>
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
        <button type="button" class="btn btn-success" @click="saveModel">
            <i class="fa-solid fa-save"></i> Save
        </button>
    </div>
</template>