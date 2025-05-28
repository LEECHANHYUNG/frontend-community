---
title: tsup - README.md 번역
description: 별도 설정 없이 빠른 빌드와 타입 선언 생성까지 지원하는 esbuild 기반 TypeScript 번들러 tsup 소개 및 사용법
author: Max
date: 2025-05-28
tags:
  - tsup
  - 번들러
  - TypeScript
  - esbuild
  - 라이브러리 개발
  - 프론트엔드
layout: post
draft: false
---

# tsup

[](https://badgen.net/npm/v/tsup)

[](https://badgen.net/npm/dm/tsup)

[esbuild](https://github.com/evanw/esbuild)를 기반으로 별도 설정 없이 TypeScript 라이브러리를 번들링하세요.

## 👀 무엇을 번들링할 수 있나요?

Node.js에서 기본 지원하는 `.js`, `.json`, `.mjs` 파일과 TypeScript의 `.ts`, `.tsx` 파일을 번들링할 수 있습니다.

[CSS 지원은 현재 실험적 기능입니다](https://tsup.egoist.dev/#css-support).

## ⚙️ 설치

프로젝트 폴더 내에 로컬로 설치하세요:

```bash
npm i tsup -D
# 또는 Yarn
yarn add tsup --dev
# 또는 pnpm
pnpm add tsup -D
```

글로벌 설치도 가능하지만 권장하지 않습니다.

## 📖 사용법

### 파일 번들링

```bash
tsup [...파일들]
```

번들된 파일은 기본적으로 `./dist` 폴더에 생성됩니다.

여러 파일을 한 번에 번들링할 수도 있습니다:

```bash
tsup src/index.ts src/cli.ts
```

위 명령어는 `dist/index.js`와 `dist/cli.js`를 출력합니다.
