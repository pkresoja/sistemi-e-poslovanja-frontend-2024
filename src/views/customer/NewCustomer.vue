<script setup lang="ts">
import { CustomerService } from '@/services/customer.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const customer = ref<any>({
    name: '',
    email: '',
    phone: '',
    taxId: null
})

function saveCustomer() {
    //@ts-ignore
    if (customer.value!.taxId == '') customer.value!.taxId = null
    CustomerService.saveCustomer(customer.value).then(rsp => {
        router.push({
            path: '/customer'
        })
    })
}
</script>

<template>
    <div v-if="customer">
        <h1 class="h3">Create customer</h1>
        <RouterLink class="btn btn-danger mb-3" to="/customer">
            <i class="fa-solid fa-rotate-left"></i> Return to customer list
        </RouterLink>
        <div class="mb-3">
            <label for="name" class="form-label">Name:</label>
            <input type="text" class="form-control" id="name" v-model="customer.name">
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">Email:</label>
            <input type="email" class="form-control" id="email" v-model="customer.email">
        </div>
        <div class="mb-3">
            <label for="phone" class="form-label">Phone:</label>
            <input type="tel" class="form-control" id="phone" v-model="customer.phone">
        </div>
        <div class="mb-3">
            <label for="tax" class="form-label">Tax Id:</label>
            <input type="number" class="form-control" id="tax" v-model="customer.taxId">
        </div>
        <button type="button" class="btn btn-success" @click="saveCustomer">
            <i class="fa-solid fa-save"></i> Save
        </button>
    </div>
</template>