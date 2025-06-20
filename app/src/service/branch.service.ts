import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Branch } from "src/schema/branch.schema";

@Injectable()
export class BranchService {
    constructor(@InjectModel(Branch.name) private branchModel: Model<Branch>) {}

    async getAllBranches(): Promise<Branch[]> {
        try {
            return await this.branchModel.find().exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getBranchById(id: string): Promise<Branch> {
        try {
            const getBranch = await this.branchModel.findById(id).exec();
            if (!getBranch) {
                throw new BadRequestException(`No branch with id ${id}`)
            }
            return getBranch;
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    async getBranchByProvince(province: string): Promise<Branch[]> {
        try {
            return await this.branchModel.find({ province: province }).exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async createBranch(branch: Branch): Promise<Branch> {
        try {
            const newBranch = new this.branchModel(branch);
            return await newBranch.save();
        } catch (error) {
            if (error.code === 11000) {
                throw new BadRequestException("Branch already exists");
            }
            throw new InternalServerErrorException(error);
        }
    }

    async updateBranch(id: string, branch: Partial<Branch>): Promise<Branch> {
        try {
            const updatedAnnouncement = await this.branchModel.findByIdAndUpdate(id, branch, { new: true }).exec();
            if (!updatedAnnouncement) {
                throw new BadRequestException(`No branch with id: ${id}`)
            }
            return updatedAnnouncement;
        } catch (error) {
            throw new InternalServerErrorException(error);
        } 
    }

    async deleteBranch(id: string): Promise<Branch> {
        try {
            const deleteBranch = await this.branchModel.findByIdAndDelete(id).exec();
            if (!deleteBranch) {
                throw new BadRequestException(`No branch woth this id : ${id}`)
            }
            return deleteBranch;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}