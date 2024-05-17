<script setup lang="ts">
import { formatDate } from '@/services/main.service';
import { TypeService } from '@/services/type.service';
import type { TypeModel } from '@/models/type.model';
import { ref } from 'vue';

const types = ref<TypeModel[]>()
TypeService.getAllTypes().then(rsp => types.value = rsp.data)

async function removeType(model: TypeModel) {
    await TypeService.deleteType(model.typeId)
    types.value = types.value?.filter(obj => obj.typeId !== model.typeId)
}
</script>

<template>
    <div v-if="types">
        <h1 class="h3">Types</h1>
        <RouterLink class="btn btn-success mb-3" to="/type/new">
            <i class="fa-solid fa-plus"></i> Add new type
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
                <tr v-for="obj in types">
                    <th scope="row">{{ obj.typeId }}</th>
                    <td>{{ obj.name }}</td>
                    <td>{{ formatDate(obj.createdAt) }}</td>
                    <td>{{ formatDate(obj.updatedAt) }}</td>
                    <td>
                        <div class="btn-group">
                            <RouterLink class="btn btn-sm btn-primary" :to="`/type/${obj.typeId}`">
                                <i class="fa-solid fa-circle-info"></i>
                            </RouterLink>
                            <button type="button" class="btn btn-sm btn-danger" @click="removeType(obj)">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-else>Types are beeing loaded... Please wait!</div>
</template>