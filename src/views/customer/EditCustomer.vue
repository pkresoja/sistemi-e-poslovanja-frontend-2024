<script setup lang="ts">
import type { CustomerModel } from '@/models/customer.model';
import { CustomerService } from '@/services/customer.service';
import { formatDate } from '@/services/main.service';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const id = Number.parseInt(route.params.id as any)

const customer = ref<CustomerModel>()
CustomerService.getCustomerById(id).then(rsp => customer.value = rsp.data)

function updateCustomer() {
    //@ts-ignore
    if (customer.value!.taxId == '') customer.value!.taxId = null
    CustomerService.updateCustomer(id, customer.value).then(rsp => {
        router.push({
            path: '/customer'
        })
    })
}
</script>

<template>
    <div v-if="customer">
        <h1 class="h3">Edit customer</h1>
        <RouterLink class="btn btn-danger mb-3" to="/customer">
            <i class="fa-solid fa-rotate-left"></i> Return to customer list
        </RouterLink>
        <div class="mb-3">
            <label for="id" class="form-label">Id:</label>
            <input type="number" class="form-control" id="id" :value="customer.customerId" disabled>
        </div>
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
        <div class="mb-3">
            <label for="created" class="form-label">Created At:</label>
            <input type="text" class="form-control" id="created" :value="formatDate(customer.createdAt)" disabled>
        </div>
        <div class="mb-3">
            <label for="updated" class="form-label">Updated At:</label>
            <input type="text" class="form-control" id="updated" :value="formatDate(customer.updatedAt)" disabled>
        </div>
        <button type="button" class="btn btn-success" @click="updateCustomer">
            <i class="fa-solid fa-save"></i> Save
        </button>
    </div>
</template>