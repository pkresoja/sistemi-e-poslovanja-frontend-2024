import { useAxios } from "./main.service";

export class StateService {
    static async getAllStates() {
        return await useAxios('/state')
    }

    static async getStateById(id: number) {
        return await useAxios(`/state/${id}`)
    }

    static async saveState(data: any) {
        return await useAxios('/state', 'post', data)
    }

    static async updateState(id: number, data: any) {
        return await useAxios(`/state/${id}`, 'put', data)
    }

    static async deleteState(id: number) {
        return await useAxios(`/state/${id}`, 'delete')
    }
}