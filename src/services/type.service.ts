import { useAxios } from "./main.service";

export class TypeService {
    static async getAllTypes() {
        return await useAxios('/type')
    }

    static async getTypeById(id: number) {
        return await useAxios(`/type/${id}`)
    }

    static async saveType(data: any) {
        return await useAxios('/type', 'post', data)
    }

    static async updateType(id: number, data: any) {
        return await useAxios(`/type/${id}`, 'put', data)
    }

    static async deleteType(id: number) {
        return await useAxios(`/type/${id}`, 'delete')
    }
}