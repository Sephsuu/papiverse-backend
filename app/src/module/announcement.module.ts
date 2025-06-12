import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Announcement, AnnouncementSchema } from "src/schema/announcement.schema";
import { AnnouncementService } from "src/service/announcement.service";
import { AnnouncementController } from "src/controller/announcement.controller";

@Module({
    imports: [MongooseModule.forFeature([{
        name: Announcement.name,
        schema: AnnouncementSchema
    }])],
    
    controllers: [AnnouncementController],
    providers: [AnnouncementService],
})

export class AnnouncementModule {}