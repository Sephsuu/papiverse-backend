import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Branch } from './branch.schema';

export enum Gender {
    Male = "Male", 
    Female = "Female"
}

@Schema({ collection: 'papiverse-employee' })
export class Employee extends Document {

    @Prop({ type: String, required: true })
    firstName: string;
    
    @Prop({ type: String, required: false })
    middleName: string;

    @Prop({ type: String, required: true })
    lastName: string;

    @Prop({ type: String, required: true })
    dateOfBirth: string;

    @Prop({ type: Object.values(Gender), required: true })
    gender: Gender;

    @Prop({ type: Types.ObjectId, ref: 'Branch', required: true })
    branch: Types.ObjectId;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);