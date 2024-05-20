<script setup lang="ts">
import { formatDate } from '@/services/main.service';
import { ref } from 'vue';
import type { CustomerModel } from '@/models/customer.model';
import { CustomerService } from '@/services/customer.service';

const customers = ref<CustomerModel[]>()
CustomerService.getAllCustomers().then(rsp => customers.value = rsp.data)

async function removeCustomer(model: CustomerModel) {
    await CustomerService.deleteCustomer(model.customerId)
    customers.value = customers.value?.filter(obj => obj.customerId !== model.customerId)
}
</script>

<template>
    <div v-if="customers">
        <h1 class="h3">Customers</h1>
        <RouterLink class="btn btn-success mb-3" to="/customer/new">
            <i class="fa-solid fa-plus"></i> Add new customer
        </RouterLink>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Tax Id</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Updated At</th>
                    <th scope="col">Options</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="obj in customers">
                    <th scope="row">{{ obj.customerId }}</th>
                    <td>{{ obj.name }}</td>
                    <td>{{ obj.email }}</td>
                    <td>{{ obj.phone}}</td>
                    <td>{{ obj.taxId}}</td>
                    <td>{{ formatDate(obj.createdAt) }}</td>
                    <td>{{ formatDate(obj.updatedAt) }}</td>
                    <td>
                        <div class="btn-group">
                            <RouterLink class="btn btn-sm btn-primary" :to="`/customer/${obj.customerId}`">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </RouterLink>
                            <RouterLink class="btn btn-sm btn-success" :to="`/customer/${obj.customerId}/device`">
                                <i class="fa-solid fa-list-ul"></i>
                            </RouterLink>
                            <button type="button" class="btn btn-sm btn-danger" @click="removeCustomer(obj)">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-else>Customers are beeing loaded... Please wait!</div>
</template>