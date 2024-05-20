import type { ModelModel } from "./model.model"

export interface DeviceModel {
    deviceId: number
    sn: string
    modelId: number
    customerId: number
    createdAt: string
    updatedAt: string
    model: ModelModel
}