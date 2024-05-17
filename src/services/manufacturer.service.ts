import { useAxios } from "./main.service";

export class ManufacturerService {
    static async getAllManufacturers() {
        return await useAxios('/manufacturer')
    }

    static async getManufacturerById(id: number) {
        return await useAxios(`/manufacturer/${id}`)
    }

    static async saveManufacturer(data: any) {
        return await useAxios('/manufacturer', 'post', data)
    }

    static async updateManufacturer(id: number, data: any) {
        return await useAxios(`/manufacturer/${id}`, 'put', data)
    }

    static async deleteManufacturer(id: number) {
        return await useAxios(`/manufacturer/${id}`, 'delete')
    }
}