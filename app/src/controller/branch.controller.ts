import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Branch } from "src/schema/branch.schema";
import { Employee } from "src/schema/employee.schema";
import { BranchService } from "src/service/branch.service";

@Controller('branches')
export class BranchController {
    constructor(private readonly branchService: BranchService) {}

    @Get()
    getAllBranches(): Promise<Branch[]> {
        return this.branchService.getAllBranches();
    }

    @Get(':id')
    getBranchById(@Param('id') id: string): Promise<Branch> {
        return this.branchService.getBranchById(id);
    }

    @Get('province/:province')
    getBranchByProvince(@Param('province') province: string): Promise<Branch[]> {
        return this.branchService.getBranchByProvince(province)
    }

    @Post()
    createBranch(@Body() branch: Branch): Promise<Branch> {
        return this.branchService.createBranch(branch);
    }

    @Put(':id')
    updateBranch(
        @Param('id') id: string,
        @Body() branch: Branch
    ): Promise<Branch> {
        return this.branchService.updateBranch(id, branch);
    }

    @Delete(':id')
    deleteBranch(@Param('id') id: string): Promise<Branch> {
        return this.branchService.deleteBranch(id);
    }


}