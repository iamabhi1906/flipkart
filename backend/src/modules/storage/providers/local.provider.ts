import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { IStorageProvider, StorageUploadResult } from '../storage.interface';

@Injectable()
export class LocalStorageProvider implements IStorageProvider {
  async uploadFile(
    file: Express.Multer.File,
    folder: string = 'uploads',
  ): Promise<StorageUploadResult> {
    const uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const ext = path.extname(file.originalname || '.png') || '.png';
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}${ext}`;
    const filePath = path.join(uploadDir, filename);

    await fs.promises.writeFile(filePath, file.buffer);

    const port = process.env.PORT || 5050;
    const url = `http://localhost:${port}/uploads/${filename}`;

    return {
      url,
      publicId: filename,
    };
  }
}
