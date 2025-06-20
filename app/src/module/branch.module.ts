import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BranchController } from "src/controller/branch.controller";
import { Branch, BranchSchema } from "src/schema/branch.schema";
import { BranchService } from "src/service/branch.service";

@Module({
    imports: [MongooseModule.forFeature([{
        name: Branch.name,
        schema: BranchSchema
    }])],
    
    controllers: [BranchController],
    providers: [BranchService],
})

export class BranchModule {}