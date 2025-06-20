import { Prop, Schema, SchemaFactory  } from "@nestjs/mongoose";
import { Document } from "mongoose";

enum Category {
    Raw = "Raw",
    Poultry = "Poultry",
    Beverage = "Beverage",
    Spice = "Spice",
    Condiments = "Condiments",
    Fruits = "Fruits",
    Vegetables = "Vegetables"
}

@Schema({ collection: "papiverse-inventory" })
export class Inventory extends Document {

    @Prop({ type: String, required: true, unique: true })
    name: string;
    
    @Prop({ type: String, required: true })
    description: string;

    @Prop({ type: Number, required: true })
    unitCost: number;

    @Prop({ type: Number }) 
    requiredStock: number;

    @Prop({ type: [{ type: String, enum: Object.values(Category) }] })
    category: Category[]
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);