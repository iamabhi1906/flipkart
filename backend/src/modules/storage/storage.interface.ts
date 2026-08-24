export interface StorageUploadResult {
  url: string;
  publicId?: string;
}

export interface IStorageProvider {
  uploadFile(
    file: Express.Multer.File,
    folder?: string,
  ): Promise<StorageUploadResult>;
}

export const STORAGE_PROVIDER = 'STORAGE_PROVIDER';
