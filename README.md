# Figma Parser

Figma API를 통해 받아온 디자인 데이터를 쉽게 파싱하고 활용할 수 있는 유틸리티 라이브러리입니다.

## 설치

```bash
npm install @lch/figma-parser
# or
yarn add @lch/figma-parser
```

## 주요 기능

- Figma 파일 및 컴포넌트 정보 파싱
- 디자인 토큰 추출 (색상, 타이포그래피, 간격 등)
- 컴포넌트 구조 분석
- 스타일 속성 변환

## 사용 방법

### 기본 사용법

```typescript
import { FigmaParser } from "figma-parser";

const parser = new FigmaParser({
  accessToken: "YOUR_FIGMA_ACCESS_TOKEN",
});

// 파일 정보 파싱
const fileData = await parser.parseFile("FILE_KEY");

// 특정 노드 파싱
const nodeData = await parser.parseNode("FILE_KEY", "NODE_ID");
```

### 디자인 토큰 추출

```typescript
// 색상 토큰 추출
const colors = await parser.extractColors("FILE_KEY");

// 타이포그래피 토큰 추출
const typography = await parser.extractTypography("FILE_KEY");

// 간격 토큰 추출
const spacing = await parser.extractSpacing("FILE_KEY");
```

### 컴포넌트 분석

```typescript
// 컴포넌트 구조 분석
const components = await parser.analyzeComponents("FILE_KEY");

// 컴포넌트 속성 추출
const componentProps = await parser.extractComponentProps(
  "FILE_KEY",
  "COMPONENT_ID"
);
```

## API 문서

### FigmaParser

#### 생성자

```typescript
new FigmaParser(config: {
  accessToken: string;
  options?: ParserOptions;
})
```

#### 메서드

- `parseFile(fileKey: string): Promise<ParsedFile>`
- `parseNode(fileKey: string, nodeId: string): Promise<ParsedNode>`
- `extractColors(fileKey: string): Promise<ColorTokens>`
- `extractTypography(fileKey: string): Promise<TypographyTokens>`
- `extractSpacing(fileKey: string): Promise<SpacingTokens>`
- `analyzeComponents(fileKey: string): Promise<ComponentAnalysis>`
- `extractComponentProps(fileKey: string, componentId: string): Promise<ComponentProps>`

## 라이선스

MIT

## 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 이슈

버그 리포트나 기능 요청은 GitHub 이슈를 통해 제출해주세요.
