---
title: '패키지 초기화 - package init'
description: '패키지 초기화에 대한 정보 기술'
---

# 패키지 초기화

이 문서에서는 모노레포 환경에서 새로운 패키지를 초기화하고 설정하는 방법에 대해 설명합니다.

## 목차

- [패키지 설치](./package-install) - 새로운 패키지 생성 및 기본 의존성 설치 방법
- [스크립트 설정](./script-setup) - package.json의 스크립트 설정 방법
- [TypeScript 설정](./typescript-config) - tsconfig.json 설정 방법
- [ESLint 설정](./eslint-config) - ESLint 설정 및 규칙 적용 방법
- [Tsup 설정](./tsup-config) - 빌드 도구 설정 방법

각 섹션에서는 해당 주제에 대한 자세한 설명과 예제 코드를 제공합니다. 패키지 초기화를 시작하기 전에 이 문서들을 순서대로 읽어보시는 것을 추천드립니다.

## 패키지 설치

새로운 패키지를 생성할 때는 다음과 같은 기본 의존성들이 필요합니다:

```json
{
  "dependencies": {
    "typescript": "^5.8.3",
    "tsup": "^8.5.0",
    "rimraf": "^6.0.1"
  },
  "devDependencies": {
    "@lch/eslint-config": "workspace:*",
    "@lch/typescript-config": "workspace:*"
  }
}
```

## 스크립트 설정

기본적인 스크립트 설정은 다음과 같습니다:

```json
{
  "scripts": {
    "lint:fix": "eslint ./src --ext .ts,.tsx --quiet --fix",
    "build": "tsup",
    "dev": "tsup --watch",
    "lint:format": "prettier --loglevel warn --write \"./**/*.{ts,tsx,css,md,json}\"",
    "lint": "pnpm lint:format && pnpm lint:fix"
  }
}
```

## TypeScript 설정

`tsconfig.json` 파일은 다음과 같이 설정합니다:

```json
{
  "extends": "@lch/typescript-config/base",
  "compilerOptions": {
    "declaration": true,
    "target": "ESNext",
    "lib": ["ESNext", "DOM"],
    "strict": true,
    "noImplicitAny": false,
    "esModuleInterop": true,
    "moduleResolution": "node",
    "outDir": "lib",
    "module": "ESNext",
    "skipLibCheck": true,
    "rootDir": "src",
    "emitDeclarationOnly": true,
    "strictPropertyInitialization": false
  },
  "include": ["src/**/*"]
}
```

## ESLint 설정

ESLint 설정은 공통 설정을 확장하여 사용합니다:

```json
{
  "extends": ["@lch/eslint-config/base"]
}
```

## Tsup 설정

`tsup.config.ts` 파일을 생성하여 빌드 설정을 구성합니다:

```typescript
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
});
```

## 디렉토리 구조

권장하는 기본 디렉토리 구조는 다음과 같습니다:

```
packages/your-package/
├── src/
│   ├── types/          # 타입 정의
│   ├── utils/          # 유틸리티 함수
│   ├── constants/      # 상수 정의
│   └── index.ts        # 메인 진입점
├── package.json
├── tsconfig.json
├── tsup.config.ts
└── .eslintrc.json
```

## 주의사항

1. `package.json`의 `type` 필드를 `"module"`로 설정하여 ESM을 사용합니다.
2. `main` 필드는 빌드된 파일을 가리키도록 설정합니다.
3. 워크스페이스 패키지를 참조할 때는 `workspace:*`를 사용합니다.
4. 빌드 결과물은 `lib` 디렉토리에 생성됩니다.
