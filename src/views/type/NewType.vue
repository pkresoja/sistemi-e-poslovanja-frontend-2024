<script setup lang="ts">
import { TypeService } from '@/services/type.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const type = ref<any>({
    name: ''
})

function saveType() {
    TypeService.saveType(type.value).then(rsp => {
        router.push({
            path: '/type'
        })
    })
}
</script>

<template>
    <div v-if="type">
        <h1 class="h3">Create type</h1>
        <RouterLink class="btn btn-danger mb-3" to="/type">
            <i class="fa-solid fa-rotate-left"></i> Return to type list
        </RouterLink>
        <div class="mb-3">
            <label for="name" class="form-label">Name:</label>
            <input type="text" class="form-control" id="name" v-model="type.name">
        </div>
        <button type="button" class="btn btn-success" @click="saveType">
            <i class="fa-solid fa-save"></i> Save
        </button>
    </div>
</template>