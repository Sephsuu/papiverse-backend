import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EmployeeController } from "src/controller/employee.controller";
import { Employee, EmployeeSchema } from "src/schema/employee.schema";
import { EmployeeService } from "src/service/employee.service";

@Module({
    imports: [MongooseModule.forFeature([{
        name: Employee.name,
        schema: EmployeeSchema
    }])],
    
    controllers: [EmployeeController],
    providers: [EmployeeService],
})

export class EmployeeModule {}