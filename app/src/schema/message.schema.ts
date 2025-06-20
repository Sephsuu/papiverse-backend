import { Prop, Schema } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ collection: 'papiverse-message' })
export class Message extends Document {
    @Prop({ type: Types.ObjectId, required: true })
    senderId: string;
}