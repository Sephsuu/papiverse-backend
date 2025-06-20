import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: "papiverse-announcement" })
export class Announcement extends Document {
    @Prop({ required: true })
    user: number;

    @Prop({ type: String, required: true })
    content: string;

    @Prop({ type: [String], required: false })
    announcementImages: string[];

    @Prop({ type: String, required: true })
    datePosted: string;
}

export const AnnouncementSchema = SchemaFactory.createForClass(Announcement);