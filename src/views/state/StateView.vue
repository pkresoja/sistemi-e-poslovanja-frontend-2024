<script setup lang="ts">
import { formatDate } from '@/services/main.service';
import { ref } from 'vue';
import type { StateModel } from '@/models/state.model';
import { StateService } from '@/services/state.service';

const states = ref<StateModel[]>()
StateService.getAllStates().then(rsp => states.value = rsp.data)

async function removeState(model: StateModel) {
    await StateService.deleteState(model.stateId)
    states.value = states.value?.filter(obj => obj.stateId !== model.stateId)
}
</script>

<template>
    <div v-if="states">
        <h1 class="h3">States</h1>
        <RouterLink class="btn btn-success mb-3" to="/state/new">
            <i class="fa-solid fa-plus"></i> Add new state
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
                <tr v-for="obj in states">
                    <th scope="row">{{ obj.stateId }}</th>
                    <td>{{ obj.name }}</td>
                    <td>{{ formatDate(obj.createdAt) }}</td>
                    <td>{{ formatDate(obj.updatedAt) }}</td>
                    <td>
                        <div class="btn-group">
                            <RouterLink class="btn btn-sm btn-primary" :to="`/state/${obj.stateId}`">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </RouterLink>
                            <button type="button" class="btn btn-sm btn-danger" @click="removeState(obj)">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-else>States are beeing loaded... Please wait!</div>
</template>