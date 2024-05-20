import type { ManufacturerModel } from "./manufacturer.model"
import type { TypeModel } from "./type.model"

export interface ModelModel {
    modelId: number
    name: string
    typeId: number
    manufacturerId: number
    createdAt: string
    updatedAt: string
    type: TypeModel
    manufacturer: ManufacturerModel
}