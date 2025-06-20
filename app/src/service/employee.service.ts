import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Branch } from "src/schema/branch.schema";
import { Employee } from "src/schema/employee.schema";

@Injectable()
export class EmployeeService {
    constructor(@InjectModel(Employee.name) private employeeModel: Model<Employee>) {}

    async getAllEmployees(): Promise<Employee[]> {
        try {
            return this.employeeModel.find().exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getEmployeeById(id: string): Promise<Employee> {
        try {
            const getEmployee = await this.employeeModel.findById(id).exec();
            if (!getEmployee) {
                throw new BadRequestException(`No employee with id ${id}`)
            }
            return getEmployee;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getEmployeeByGender(gender: string) {
        try {
            return await this.employeeModel.find({ gender: gender }).exec()
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getEmployeeByBranch(branchId: string): Promise<Employee[]> {
        try {
            return await this.employeeModel.find({ branch: branchId }).populate('branch').exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async createEmployee(employee: Employee): Promise<Employee> {
        try {
            const newEmployee = new this.employeeModel(employee);
            return newEmployee.save();
        } catch (error) {
            if (error.code) {
                throw new BadRequestException("Employee already exist");
            }
            throw new InternalServerErrorException(error);
        }
    }

    async updateEmployee(id: string, employee: Partial<Employee>): Promise<Employee> {
        try {
            const updatedEmployee = await this.employeeModel.findByIdAndUpdate(id, employee, { new: true }).exec();
            if (!updatedEmployee) {
                throw new BadRequestException(`No employee with id: ${id}`)
            }
            return updatedEmployee;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async deleteEmployee(id: string): Promise<Employee> {
        try {
            const deletedEmployee = await this.employeeModel.findByIdAndDelete(id).exec();
            if (!deletedEmployee) {
                throw new BadRequestException(`No eemployee with id: ${id}`)
            }
            return deletedEmployee;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}