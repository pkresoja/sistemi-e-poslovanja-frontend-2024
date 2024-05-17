<script setup lang="ts">
import type { TypeModel } from '@/models/type.model';
import { formatDate } from '@/services/main.service';
import { TypeService } from '@/services/type.service';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const id = Number.parseInt(route.params.id as any)

const type = ref<TypeModel>()
TypeService.getTypeById(id).then(rsp => type.value = rsp.data)

function updateType() {
    TypeService.updateType(id, type.value).then(rsp => {
        router.push({
            path: '/type'
        })
    })
}
</script>

<template>
    <div v-if="type">
        <h1 class="h3">Edit type</h1>
        <RouterLink class="btn btn-danger mb-3" to="/type">
            <i class="fa-solid fa-rotate-left"></i> Return to type list
        </RouterLink>
        <div class="mb-3">
            <label for="id" class="form-label">Id:</label>
            <input type="number" class="form-control" id="id" :value="type.typeId" disabled>
        </div>
        <div class="mb-3">
            <label for="name" class="form-label">Name:</label>
            <input type="text" class="form-control" id="name" v-model="type.name">
        </div>
        <div class="mb-3">
            <label for="created" class="form-label">Created At:</label>
            <input type="text" class="form-control" id="created" :value="formatDate(type.createdAt)" disabled>
        </div>
        <div class="mb-3">
            <label for="updated" class="form-label">Updated At:</label>
            <input type="text" class="form-control" id="updated" :value="formatDate(type.updatedAt)" disabled>
        </div>
        <button type="button" class="btn btn-success" @click="updateType">
            <i class="fa-solid fa-save"></i> Save
        </button>
    </div>
</template>