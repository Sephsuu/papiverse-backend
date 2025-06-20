import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
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

    async getAnnouncementById(id: string) {
        try {   
            const getAnnouncement = await this.announcementModel.findById(id).exec();
            if (!getAnnouncement) {
                throw new BadRequestException(`No announcement with id: ${id}`)
            }
            return getAnnouncement;
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

    async updateAnnouncement(id: string, content: string, announcementImages: string[]): Promise<Announcement> {
        try {
            const updateData = { content, announcementImages };
            const updatedAnnouncement = await this.announcementModel.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true }).exec();
            if (!updatedAnnouncement) {
                throw new BadRequestException(`No announcement with id: ${id}`)
            }
            return updatedAnnouncement;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async deleteAnnouncement(id: string): Promise<Announcement> {
        try {
            const deletedAnnouncement = await this.announcementModel.findByIdAndDelete(id).exec();
            if (!deletedAnnouncement) {
                throw new BadRequestException(`No announcement with id: ${id}`)
            }
            return deletedAnnouncement;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}