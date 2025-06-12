import { Body, Controller, Get, Post } from "@nestjs/common";
import { Announcement } from "src/schema/announcement.schema";
import { AnnouncementService } from "src/service/announcement.service";

@Controller('announcements')
export class AnnouncementController {
    constructor(private readonly announcementService: AnnouncementService) {}

    @Get()
    getAllAnnouncements() {
        return this.announcementService.getAllAnnouncements();
    }

    @Post()
    createAnnouncement(@Body() announcement: Announcement) {
        return this.announcementService.createAnnouncement(announcement);
    }
}