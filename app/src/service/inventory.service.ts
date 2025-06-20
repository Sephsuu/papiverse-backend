import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BranchInventory } from "src/schema/branchInventory.schema";
import { Inventory } from "src/schema/inventory.schema";
import { StockItem } from "src/schema/stockItem.schema";

@Injectable()
export class InventoryService {
    constructor(
        @InjectModel(Inventory.name) private inventoryModel: Model<Inventory>,
        @InjectModel(BranchInventory.name) private branchInventoryModel: Model<BranchInventory>
    ) {}

    async getAllInventories(): Promise<Inventory[]> {
        try {
            return this.inventoryModel.find().exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getInventoryByCategory(category: string): Promise<Inventory[]> {
        try {
            return this.inventoryModel.find({ category: category }).exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getAllBranchInventories(): Promise<BranchInventory[]> {
        try {
            const branchInventories = await this.branchInventoryModel.find().populate('branch').populate({ path: "inventoryItem.inventory" }).exec();
            return branchInventories;
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

    async createBranchInventory(branchInventory: BranchInventory): Promise<BranchInventory> {
        try {
            const newBranchInventory = new this.branchInventoryModel(branchInventory);
            for (const item of newBranchInventory.inventoryItem) {
                const inventory = await this.inventoryModel.findById(item.inventory);
                if (!inventory) {
                    throw new Error(`Inventory not found for id ${item.inventory}`);
                }
                item.totalCost = inventory.unitCost * item.stock;
            }
            await newBranchInventory.save();
            return newBranchInventory;
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    async addBranchStockItem(id: string, stockItem: Partial<StockItem>): Promise<BranchInventory> {
        try {
            const addedBranchStockItem = await this.branchInventoryModel.findByIdAndUpdate(id, { $addToSet: { inventoryItem: stockItem } }, { new: true, runValidators: true} );
            if (!addedBranchStockItem) {
                throw new BadRequestException(`No branch inventory with id: ${id}`)
            }
            return addedBranchStockItem;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async updateInventory(id: string, inventory: Partial<Inventory>) {
        try{
            const updatedInventory = await this.inventoryModel.findByIdAndUpdate(id, inventory, { new: true }).exec();
            if (!updatedInventory) {
                throw new BadRequestException(`No inventory with id: ${id}`);
            }
            return updatedInventory;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async deleteInventory(id: string): Promise<Inventory> {
        try {
            const deletedInventory = await this.inventoryModel.findByIdAndDelete(id).exec();
            if (!deletedInventory) {
                throw new BadRequestException(`No inventory with id: ${id}`)
            }
            return deletedInventory;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async deleteBranchInventory(id: string): Promise<BranchInventory> {
        try {
            const deletedBranchInventory = await this.branchInventoryModel.findByIdAndDelete(id).exec();
            if (!deletedBranchInventory) {
                throw new BadRequestException(`No branch inventory with id: ${id}`)
            }
            return deletedBranchInventory;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}