import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Announcement } from "src/schema/announcement.schema";

@Injectable()
export class AnnouncementService {
    constructor(@InjectModel(Announcement.name) private announcementModel : Model<Announcement>) {}

    async getAllAnnouncements(): Promise<Announcement[]> {
        try {
            return this.announcementModel.find().exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async createAnnouncement(announcement: Announcement): Promise<Announcement> {
        try {
            const newAnnouncement = new this.announcementModel(announcement);
            return await newAnnouncement.save();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

}