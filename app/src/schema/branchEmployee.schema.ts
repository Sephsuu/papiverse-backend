import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Branch } from './branch.schema'
import { Employee } from './employee.schema';

@Schema({ collection: 'papiverse-branchEmployee' })
export class BranchEmployee extends Document {
    @Prop({ type: Branch,  required: true, unique: true })
    branch: Branch;

    @Prop({ type: [Employee], default: [] })
    employees: Employee[];
}

export const BranchEmployeeSchema = SchemaFactory.createForClass(BranchEmployee);