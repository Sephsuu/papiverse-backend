import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: "announcement" })
export class Announcement extends Document {
    @Prop({ required: true })
    user: number;

    @Prop({ required: true })
    content: string;

    @Prop({ required: false })
    announcementImages: string[];

    @Prop({ required: true })
    datePosted: string;
}

export const AnnouncementSchema = SchemaFactory.createForClass(Announcement);