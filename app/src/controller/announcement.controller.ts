import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { Announcement } from "src/schema/announcement.schema";
import { AnnouncementService } from "src/service/announcement.service";

@Controller('announcements')
export class AnnouncementController {
    constructor(private readonly announcementService: AnnouncementService) {}

    @Get()
    getAllAnnouncements(): Promise<Announcement[]> {
        return this.announcementService.getAllAnnouncements();
    }

    @Get(':id')
    getAnnouncementById(@Param('id') id: string): Promise<Announcement> {
        return this.announcementService.getAnnouncementById(id);
    }

    @Post()
    createAnnouncement(@Body() announcement: Announcement): Promise<Announcement> {
        return this.announcementService.createAnnouncement(announcement);
    }

    @Patch(':id')
    updateAnnouncement(
        @Param('id') id: string,
        @Body() announcement: { content: string, announcementImages: string[] }
    ) {
        return this.announcementService.updateAnnouncement(id, announcement.content, announcement.announcementImages);
    }

    @Delete(':id')
    deleteAnnouncementById(@Param('id') id: string): Promise<Announcement> {
        return this.announcementService.deleteAnnouncement(id);
    } 
}