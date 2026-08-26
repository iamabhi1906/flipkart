import { Injectable, Inject } from '@nestjs/common';
import type {
  IStorageProvider,
  StorageUploadResult,
} from './storage.interface';
import { STORAGE_PROVIDER } from './storage.interface';

@Injectable()
export class StorageService {
  constructor(
    @Inject(STORAGE_PROVIDER)
    private readonly storageProvider: any,
  ) {}

  async uploadFile(
    file: Express.Multer.File,
    folder?: string,
  ): Promise<StorageUploadResult> {
    return (this.storageProvider as IStorageProvider).uploadFile(file, folder);
  }
}
