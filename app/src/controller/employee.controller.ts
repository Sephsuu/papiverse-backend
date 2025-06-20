import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Employee } from "src/schema/employee.schema";
import { EmployeeService } from "src/service/employee.service";

@Controller('employees')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {}

    @Get()
    getAllEmployees(): Promise<Employee[]> {
        return this.employeeService.getAllEmployees();
    }

    @Get(':id')
    getEmployeeById(@Param('id') id: string): Promise<Employee> {
        return this.employeeService.getEmployeeById(id);
    }

    @Get('/gender/:gender')
    getEmployeeByRole(@Param('gender') gender: string) : Promise<Employee[]> {
        return this.employeeService.getEmployeeByGender(gender);
    }

    @Get('/branch/:branch')
    getEmployeeByBranch(@Param('branch') branch: string): Promise<Employee[]> {
        return this.employeeService.getEmployeeByBranch(branch);
    }

    @Post()
    createEmployee(@Body() employee: Employee): Promise<Employee> {
        return this.employeeService.createEmployee(employee);
    }

    @Put(':id')
    updateEmployee(
        @Param('id') id: string,
        @Body() employee: Employee
    ): Promise<Employee> {
        return this.employeeService.updateEmployee(id, employee);
    }

    @Delete(':id')
    deleteEmployee(@Param('id') id: string) {
        return this.employeeService.deleteEmployee(id);
    }
}