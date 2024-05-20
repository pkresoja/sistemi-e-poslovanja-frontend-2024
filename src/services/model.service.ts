import { useAxios } from "./main.service";

export class ModelService {
    static async getAllModels() {
        return await useAxios('/model')
    }

    static async getModelById(id: number) {
        return await useAxios(`/model/${id}`)
    }

    static async saveModel(data: any) {
        return await useAxios('/model', 'post', data)
    }

    static async updateModel(id: number, data: any) {
        return await useAxios(`/model/${id}`, 'put', data)
    }

    static async deleteModel(id: number) {
        return await useAxios(`/model/${id}`, 'delete')
    }
}