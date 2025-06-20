import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { BranchInventory } from "src/schema/branchInventory.schema";
import { Inventory } from "src/schema/inventory.schema";
import { StockItem } from "src/schema/stockItem.schema";
import { InventoryService } from "src/service/inventory.service";


@Controller('inventories')
export class InventoryController {
    constructor(private readonly inventoryService: InventoryService) {}

    @Get()
    getAllInventories() {
        return this.inventoryService.getAllInventories();
    }

    @Get('/category/:category')
    getInventoryByCategory(@Param('category') category: string): Promise<Inventory[]> {
        return this.inventoryService.getInventoryByCategory(category);
    }

    @Get('/branch')
    getAllBranchInventories() {
        return this.inventoryService.getAllBranchInventories();
    }
    
    @Post() 
    createInventory(@Body() inventory: Inventory): Promise<Inventory> {
        return this.inventoryService.createInventory(inventory);
    }

    @Post('/branch')
    createBranchInventory(@Body() branchInventory: BranchInventory): Promise<BranchInventory> {
        return this.inventoryService.createBranchInventory(branchInventory);
    }

    @Put(':id')
    updateInventory(
        @Param('id') id: string,
        @Body() inventory: Inventory
    ): Promise<Inventory> {
        return this.inventoryService.updateInventory(id, inventory);
    }

    @Patch('/branch/:id') 
    addBranchStockItem(
        @Param('id') id: string,
        @Body() stockItem: StockItem
    ): Promise<BranchInventory> {
        return this.inventoryService.addBranchStockItem(id, stockItem);
    }

    @Delete(':id')
    deleteInventory(@Param('id') id: string): Promise<Inventory> {
        return this.inventoryService.deleteInventory(id);
    }

    @Delete('/branch/:id')
    deleteBranchInventory(@Param('id') id: string): Promise<BranchInventory> {
        return this.inventoryService.deleteBranchInventory(id);
    }
}