import { useAxios } from "./main.service";

export class CustomerService {
    static async getAllCustomers() {
        return await useAxios('/customer')
    }

    static async getCustomerById(id: number) {
        return await useAxios(`/customer/${id}`)
    }

    static async saveCustomer(data: any) {
        return await useAxios('/customer', 'post', data)
    }

    static async updateCustomer(id: number, data: any) {
        return await useAxios(`/customer/${id}`, 'put', data)
    }

    static async deleteCustomer(id: number) {
        return await useAxios(`/customer/${id}`, 'delete')
    }
}