<script setup lang="ts">
import { formatDate } from '@/services/main.service';
import { ref } from 'vue';
import type { ModelModel } from '@/models/model.model';
import { ModelService } from '@/services/model.service';

const models = ref<ModelModel[]>()
ModelService.getAllModels().then(rsp => models.value = rsp.data)

async function removeModel(model: ModelModel) {
    await ModelService.deleteModel(model.modelId)
    models.value = models.value?.filter(obj => obj.modelId !== model.modelId)
}
</script>

<template>
    <div v-if="models">
        <h1 class="h3">Models</h1>
        <RouterLink class="btn btn-success mb-3" to="/model/new">
            <i class="fa-solid fa-plus"></i> Add new model
        </RouterLink>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Type</th>
                    <th scope="col">Manufacturer</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Updated At</th>
                    <th scope="col">Options</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="obj in models">
                    <th scope="row">{{ obj.modelId }}</th>
                    <td>{{ obj.name }}</td>
                    <td>
                        <RouterLink :to="`/type/${obj.type.typeId}`">
                            {{ obj.type.name }}
                        </RouterLink>
                    </td>
                    <td>
                        <RouterLink :to="`/manufacturer/${obj.manufacturer.manufacturerId}`">
                            {{ obj.manufacturer.name }}
                        </RouterLink>
                    </td>
                    <td>{{ formatDate(obj.createdAt) }}</td>
                    <td>{{ formatDate(obj.updatedAt) }}</td>
                    <td>
                        <div class="btn-group">
                            <RouterLink class="btn btn-sm btn-primary" :to="`/model/${obj.modelId}`">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </RouterLink>
                            <button type="button" class="btn btn-sm btn-danger" @click="removeModel(obj)">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-else>Models are beeing loaded... Please wait!</div>
</template>