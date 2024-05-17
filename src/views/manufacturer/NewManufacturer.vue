<script setup lang="ts">
import { ManufacturerService } from '@/services/manufacturer.service';
import { StateService } from '@/services/state.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const manufacturer = ref<any>({
    name: ''
})

function saveManufacturer() {
    ManufacturerService.saveManufacturer(manufacturer.value).then(rsp => {
        router.push({
            path: '/manufacturer'
        })
    })
}
</script>

<template>
    <div v-if="manufacturer">
        <h1 class="h3">Create manufacturer</h1>
        <RouterLink class="btn btn-danger mb-3" to="/state">
            <i class="fa-solid fa-rotate-left"></i> Return to manufacturer list
        </RouterLink>
        <div class="mb-3">
            <label for="name" class="form-label">Name:</label>
            <input type="text" class="form-control" id="name" v-model="manufacturer.name">
        </div>
        <button type="button" class="btn btn-success" @click="saveManufacturer">
            <i class="fa-solid fa-save"></i> Save
        </button>
    </div>
</template>