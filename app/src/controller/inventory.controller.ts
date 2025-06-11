import { Controller, Get } from "@nestjs/common";
import { InventoryService } from "src/service/inventory.service";


@Controller('inventories')
export class InventoryController {
    constructor(private readonly inventoryService: InventoryService) {}

    @Get()
    getAllInventories() {
        return this.inventoryService.getAllInventories();
    }
}