import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: "papiverse-branch" })
export class Branch extends Document {
    @Prop({ type: String, required: true, unique: true })
    name: string;

    @Prop({ type: String, required: true })
    streetAddress: string;

    @Prop({ type: String, required: true })
    barangay: string;

    @Prop({ type: String, required: true })
    city: string;

    @Prop({ type: String, required: true })
    province: string;
}

export const BranchSchema = SchemaFactory.createForClass(Branch);