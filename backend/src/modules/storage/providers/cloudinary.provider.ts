import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { IStorageProvider, StorageUploadResult } from '../storage.interface';
import { LocalStorageProvider } from './local.provider';
@Injectable()
export class CloudinaryStorageProvider implements IStorageProvider {
  private readonly logger = new Logger(CloudinaryStorageProvider.name);
  private readonly localProvider = new LocalStorageProvider();

  constructor(private readonly configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadFile(
    file: Express.Multer.File,
    folder: string = 'flipkart_products',
  ): Promise<StorageUploadResult> {
    const cloudName = this.configService.get<string>('CLOUDINARY_CLOUD_NAME');
    const apiKey = this.configService.get<string>('CLOUDINARY_API_KEY');
    console.log(cloudName, apiKey);

    if (!cloudName || !apiKey || cloudName.includes('dwl2op3oh_fake')) {
      this.logger.log('Using local disk storage provider for uploads.');
      return this.localProvider.uploadFile(file, folder);
    }

    try {
      const cloudinaryPromise = new Promise<StorageUploadResult>(
        (resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder, resource_type: 'auto' },
            (error, result) => {
              if (error || !result) {
                return reject(error || new Error('Cloudinary upload error'));
              }
              resolve({
                url: result.secure_url,
                publicId: result.public_id,
              });
            },
          );
          uploadStream.end(file.buffer);
        },
      );
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error('Cloudinary request timed out (5s)')),
          5000,
        ),
      );

      return await Promise.race([cloudinaryPromise, timeoutPromise]);
    } catch (err: any) {
      this.logger.warn(
        `Cloudinary upload failed: ${err?.message || err}. Falling back to local disk storage.`,
      );
      return this.localProvider.uploadFile(file, folder);
    }
  }
}
