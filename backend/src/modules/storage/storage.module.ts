import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StorageService } from './storage.service';
import { STORAGE_PROVIDER } from './storage.interface';
import { CloudinaryStorageProvider } from './providers/cloudinary.provider';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: STORAGE_PROVIDER,
      useClass: CloudinaryStorageProvider,
    },
    StorageService,
  ],
  exports: [StorageService],
})
export class StorageModule {}
