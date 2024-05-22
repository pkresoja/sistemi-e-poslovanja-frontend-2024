<script setup lang="ts">
import type { StateModel } from '@/models/state.model';
import { ServiceService } from '@/services/service.service';
import { StateService } from '@/services/state.service';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const customer = Number.parseInt(route.params.customer as any)
const device = Number.parseInt(route.params.device as any)

const router = useRouter()
const service = ref<any>({
    stateId: 0,
    deviceId: device
})

const states = ref<StateModel[]>()
StateService.getAllStates()
    .then(rsp => {
        states.value = rsp.data
        service.value.stateId = rsp.data[0].stateId
    })

function saveService() {
    ServiceService.saveService(service.value).then(rsp => {
        router.push({
            path: `/customer/${customer}/device/${device}/service`
        })
    })
}
</script>

<template>
    <div v-if="service">
        <h1 class="h3">Create service</h1>
        <RouterLink class="btn btn-danger mb-3" :to="`/customer/${customer}/device/${device}/service`">
            <i class="fa-solid fa-rotate-left"></i> Return to service list
        </RouterLink>
        <div class="mb-3" v-if="states">
            <label for="state" class="form-label">State:</label>
            <select class="form-select" v-model="service.stateId" id="state">
                <option v-for="obj in states" :value="obj.stateId">
                    {{ `${obj.name}` }}
                </option>
            </select>
        </div>
        <button type="button" class="btn btn-success" @click="saveService">
            <i class="fa-solid fa-save"></i> Save
        </button>
    </div>
</template>