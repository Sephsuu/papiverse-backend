import { Body, Controller, Get, Post } from "@nestjs/common";
import { Inventory } from "src/schema/inventory.schema";
import { InventoryService } from "src/service/inventory.service";


@Controller('inventories')
export class InventoryController {
    constructor(private readonly inventoryService: InventoryService) {}

    @Get()
    getAllInventories() {
        return this.inventoryService.getAllInventories();
    }

    @Post() 
    createInventory(@Body() inventory: Inventory): Promise<Inventory> {
        return this.inventoryService.createInventory(inventory);
    }
    
    
}