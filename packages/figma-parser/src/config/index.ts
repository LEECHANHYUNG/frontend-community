import dotenv from 'dotenv';

dotenv.config();

export const config = {
  figmaToken: process.env.FIGMA_TOKEN || '',
  fileKey: process.env.FILE_KEY || '',
};
