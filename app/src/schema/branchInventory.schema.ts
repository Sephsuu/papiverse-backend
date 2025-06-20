import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Branch } from './branch.schema';
import { Document, Types } from 'mongoose';
import { StockItem, StockItemSchema } from './stockItem.schema';

@Schema({ collection: "papiverse-branchInventory" })
export class BranchInventory extends Document {
    @Prop({ type: Types.ObjectId, ref: Branch.name, required: true, unique: true })
    branch: Types.ObjectId;

    @Prop({ type: [StockItemSchema], default: [], unique: true })
    inventoryItem: StockItem[];
}

export const BranchInventorySchema = SchemaFactory.createForClass(BranchInventory);