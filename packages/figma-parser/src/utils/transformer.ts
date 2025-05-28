import type { GetFileResponse } from '@figma/rest-api-spec';

interface TransformedPage {
  id: string;
  name: string;
}

export const transformFileData = (data: GetFileResponse): TransformedPage[] => {
  // 필요한 데이터만 추출하여 반환
  return data.document.children.map((page) => ({
    id: page.id,
    name: page.name,
  }));
};
