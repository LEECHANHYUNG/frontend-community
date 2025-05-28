import axios from 'axios';
import { config } from '../config';
import type { GetFileResponse } from '@figma/rest-api-spec';

const API_URL = 'https://api.figma.com/v1';

export const getFigmaFile = async (fileKey: string) => {
  try {
    const response = await axios.get<GetFileResponse>(`${API_URL}/files/${fileKey}`, {
      headers: {
        'X-Figma-Token': config.figmaToken,
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Figma API 요청 실패: ${error.message}`);
    }
    throw new Error('Figma API 요청 실패: 알 수 없는 오류');
  }
};
