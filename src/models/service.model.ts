import type { DeviceModel } from "./device.model"
import type { StateModel } from "./state.model"
import type { UserModel } from "./user.model"

export interface ServiceModel {
    serviceId: number
    deviceId: number
    stateId: number
    createdAt: string
    createdBy: number
    updatedAt: string
    updatedBy: number
    device: DeviceModel
    state: StateModel
    createdByUser: UserModel
    updatedByUser: UserModel
}