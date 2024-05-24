import { useAxios } from "./main.service";

export class ServiceService {
    static async getAllServicesByDeviceId(id: number) {
        return await useAxios(`/service/device/${id}`)
    }

    static async getServiceById(id: number) {
        return await useAxios(`/service/${id}`)
    }

    static async getServiceByCode(code: string) {
        return await useAxios(`/service/code/${code}`)
    }

    static async saveService(data: any) {
        return await useAxios('/service', 'post', data)
    }

    static async updateService(id: number, data: any) {
        return await useAxios(`/service/${id}`, 'put', data)
    }

    static async deleteService(id: number) {
        return await useAxios(`/service/${id}`, 'delete')
    }
}