<script setup lang="ts">
import { StateService } from '@/services/state.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const state = ref<any>({
    name: ''
})

function saveState() {
    StateService.saveState(state.value).then(rsp => {
        router.push({
            path: '/state'
        })
    })
}
</script>

<template>
    <div v-if="state">
        <h1 class="h3">Create state</h1>
        <RouterLink class="btn btn-danger mb-3" to="/state">
            <i class="fa-solid fa-rotate-left"></i> Return to type list
        </RouterLink>
        <div class="mb-3">
            <label for="name" class="form-label">Name:</label>
            <input type="text" class="form-control" id="name" v-model="state.name">
        </div>
        <button type="button" class="btn btn-success" @click="saveState">
            <i class="fa-solid fa-save"></i> Save
        </button>
    </div>
</template>