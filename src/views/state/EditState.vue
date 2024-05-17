<script setup lang="ts">
import type { StateModel } from '@/models/state.model';
import { formatDate } from '@/services/main.service';
import { StateService } from '@/services/state.service';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const id = Number.parseInt(route.params.id as any)

const state = ref<StateModel>()
StateService.getStateById(id).then(rsp => state.value = rsp.data)

function updateState() {
    StateService.updateState(id, state.value).then(rsp => {
        router.push({
            path: '/state'
        })
    })
}
</script>

<template>
    <div v-if="state">
        <h1 class="h3">Edit state</h1>
        <RouterLink class="btn btn-danger mb-3" to="/state">
            <i class="fa-solid fa-rotate-left"></i> Return to state list
        </RouterLink>
        <div class="mb-3">
            <label for="id" class="form-label">Id:</label>
            <input type="number" class="form-control" id="id" :value="state.stateId" disabled>
        </div>
        <div class="mb-3">
            <label for="name" class="form-label">Name:</label>
            <input type="text" class="form-control" id="name" v-model="state.name">
        </div>
        <div class="mb-3">
            <label for="created" class="form-label">Created At:</label>
            <input type="text" class="form-control" id="created" :value="formatDate(state.createdAt)" disabled>
        </div>
        <div class="mb-3">
            <label for="updated" class="form-label">Updated At:</label>
            <input type="text" class="form-control" id="updated" :value="formatDate(state.updatedAt)" disabled>
        </div>
        <button type="button" class="btn btn-success" @click="updateState">
            <i class="fa-solid fa-save"></i> Save
        </button>
    </div>
</template>