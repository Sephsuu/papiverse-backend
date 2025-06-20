import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { InventoryModule } from './module/inventory.module';
import { AnnouncementModule } from './module/announcement.module';
import { BranchModule } from './module/branch.module';
import { EmployeeModule } from './module/employee.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://josephemanuelbataller:l4SPFmeWYygoRkUA@sephnet.oe3yibi.mongodb.net/?retryWrites=true&w=majority&appName=SephNet', {
      onConnectionCreate: (connection: Connection) => {
        connection.on('connected', () => console.log('MongoDB connected'));
        connection.on('open', () => console.log('MongoDB connection opened'));
        connection.on('disconnected', () => console.log('MongoDB disconnected'));
        connection.on('reconnected', () => console.log('MongoDB reconnected'));
        connection.on('error', (err) => console.error('MongoDB connection error:', err));
        return connection;
      },
    }),

    BranchModule,
    InventoryModule,
    AnnouncementModule,
    EmployeeModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}