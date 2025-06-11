import { Prop, Schema, SchemaFactory  } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: "inventory" })
export class Inventory extends Document {
    @Prop({ required: true })
    name: string;
    @Prop({ required: true })
    description: string;
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);