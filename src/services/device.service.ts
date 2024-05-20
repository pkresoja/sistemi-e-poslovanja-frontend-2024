import { useAxios } from "./main.service";

export class DeviceService {
    static async getAllDevicesByCustomerId(id: number) {
        return await useAxios(`/device/customer/${id}`)
    }

    static async getDeviceById(id: number) {
        return await useAxios(`/device/${id}`)
    }

    static async saveDevice(data: any) {
        return await useAxios('/device', 'post', data)
    }

    static async updateDevice(id: number, data: any) {
        return await useAxios(`/device/${id}`, 'put', data)
    }

    static async deleteDevice(id: number) {
        return await useAxios(`/device/${id}`, 'delete')
    }
}