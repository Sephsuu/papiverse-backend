import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Model, Types } from "mongoose";
import { Inventory } from "./inventory.schema";

@Schema({ collection: "papiverse-stockItem" })
export class StockItem extends Document {
    @Prop({ type: Types.ObjectId, ref: Inventory.name, required: true })
    inventory: Types.ObjectId;

    @Prop({ type: Number, required: true, default: 0 })
    stock: number;

    @Prop({ type: Number, required: false, default: 0 })
    totalCost: number;
}

export const StockItemSchema = SchemaFactory.createForClass(StockItem);