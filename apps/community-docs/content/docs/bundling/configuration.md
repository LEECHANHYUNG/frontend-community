---
title: Figma Parser 패키지 설정 파일 설명
description: max-lee2/figma-parser 패키지의 주요 설정 파일들(package.json, tsup.config.ts, tsconfig.json)에 대한 상세 설명
author: Chanhyung
date: 2025-05-28
tags:
  - configuration
  - typescript
  - figma
  - package
---

# Figma Parser 패키지 설정 파일 설명

이 문서는 `@max-lee2/figma-parser` 패키지의 주요 설정 파일들에 대한 상세 설명을 제공합니다.

## 1. package.json

### 기본 정보

- `name`: 패키지의 고유 식별자. `@max-lee2` 스코프 아래에 위치
- `version`: 패키지의 버전 정보
- `description`: 패키지에 대한 간단한 설명
- `main`: CommonJS 모듈 시스템에서 사용할 진입점 파일
- `module`: ES 모듈 시스템에서 사용할 진입점 파일
- `types`: TypeScript 타입 정의 파일의 위치

### exports 필드

```json
"exports": {
  ".": {
    "require": "./dist/index.js",    // CommonJS 환경
    "import": "./dist/index.mjs",    // ES 모듈 환경
    "types": "./dist/index.d.ts"     // TypeScript 타입
  }
}
```

- Node.js의 패키지 엔트리포인트를 명시적으로 정의
- 다양한 모듈 시스템에 대한 지원을 명확하게 표현
- 패키지의 공개 API를 명확하게 정의

### 의존성

- `dependencies`: 런타임에 필요한 패키지들
  - `axios`: HTTP 클라이언트
  - `dotenv`: 환경 변수 관리
- `devDependencies`: 개발 시에만 필요한 패키지들
  - `@figma/rest-api-spec`: Figma API 타입 정의
  - `rimraf`: 크로스 플랫폼 파일 삭제 도구
  - `tsup`: TypeScript 번들러
  - `typescript`: TypeScript 컴파일러

## 2. tsup.config.ts

### 주요 설정

- `entry`: 번들링할 진입점 파일
- `format`: 출력할 모듈 형식
  - `cjs`: CommonJS 형식 (Node.js 기본)
  - `esm`: ES 모듈 형식 (최신 JavaScript)
- `dts`: TypeScript 타입 정의 파일 생성 여부
- `splitting`: 코드 스플리팅 활성화 여부
- `sourcemap`: 소스맵 생성 여부
- `clean`: 빌드 전 dist 디렉토리 정리 여부
- `treeshake`: 사용하지 않는 코드 제거 여부
- `external`: 번들에서 제외할 외부 의존성

## 3. tsconfig.json

### 컴파일러 옵션

- `target`: 컴파일할 JavaScript 버전 (ES2020)
- `module`: 모듈 시스템 (ESNext)
- `lib`: 사용할 JavaScript API 정의
- `moduleResolution`: 모듈 해석 방식 (bundler)
- `declaration`: `.d.ts` 파일 생성 여부
- `declarationMap`: 타입 정의 소스맵 생성 여부
- `sourceMap`: JavaScript 소스맵 생성 여부
- `strict`: 엄격한 타입 체크 활성화
- `skipLibCheck`: 선언 파일 타입 체크 건너뛰기
- `esModuleInterop`: CommonJS 모듈을 ES 모듈처럼 사용 가능하게 함
- `outDir`: 컴파일된 파일이 생성될 디렉토리
- `rootDir`: 소스 파일의 루트 디렉토리

## 설정 파일들의 연관 관계

1. **package.json과 tsup.config.ts**

   - `package.json`의 `main`, `module`, `types` 필드는 `tsup.config.ts`의 빌드 결과물을 참조
   - `tsup.config.ts`의 `format` 설정이 `package.json`의 `exports` 필드와 연동

2. **tsconfig.json과 tsup.config.ts**

   - `tsconfig.json`의 컴파일러 옵션이 `tsup`의 빌드 프로세스에 영향을 미침
   - `tsup.config.ts`의 `dts` 옵션이 `tsconfig.json`의 `declaration` 설정과 연동

3. **전체적인 빌드 프로세스**
   - TypeScript 소스 코드 → `tsconfig.json` 설정에 따른 타입 체크
   - `tsup`이 `tsup.config.ts` 설정에 따라 번들링
   - 최종 결과물이 `package.json`에 정의된 경로에 생성

## 왜 이러한 설정이 필요한가?

1. **모듈 시스템 호환성**

   - CommonJS와 ES 모듈 모두 지원하여 다양한 환경에서 사용 가능
   - Node.js의 패키지 엔트리포인트 명시로 모듈 해석 문제 방지

2. **타입 안정성**

   - TypeScript 설정으로 강력한 타입 체크
   - 타입 정의 파일 자동 생성으로 사용자에게 타입 정보 제공

3. **빌드 최적화**

   - `tsup`을 통한 빠른 빌드 프로세스
   - 트리쉐이킹으로 번들 크기 최적화
   - 소스맵 생성으로 디버깅 용이성 확보

4. **개발 경험**
   - 개발 시 실시간 빌드 지원
   - 명확한 빌드 결과물 구조
   - 타입 안정성과 자동완성 지원
