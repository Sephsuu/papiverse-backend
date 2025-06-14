import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Inventory } from "src/schema/inventory.schema";

@Injectable()
export class InventoryService {
    constructor(@InjectModel(Inventory.name) private inventoryModel: Model<Inventory>) {}

    async getAllInventories(): Promise<Inventory[]> {
        try {
            return this.inventoryModel.find().exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async createInventory(inventory: Inventory): Promise<Inventory> {
        try {
            const newInventory = new this.inventoryModel(inventory);
            return await newInventory.save();
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

}