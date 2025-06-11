import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { InventoryController } from "src/controller/inventory.controller";
import { Inventory, InventorySchema } from "src/schema/inventory.schema";
import { InventoryService } from "src/service/inventory.service";

@Module({
    imports: [MongooseModule.forFeature([{
        name: Inventory.name,
        schema: InventorySchema
    }])],
    
    controllers: [InventoryController],
    providers: [InventoryService],
})

export class InventoryModule {}