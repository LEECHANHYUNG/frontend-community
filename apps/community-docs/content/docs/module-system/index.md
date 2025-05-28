---
title: 모듈 시스템의 역사 및 특징
description: JavaScript 모듈 시스템(CJS vs ESM)의 구조와 차이점을 시각적으로 비교한 다이어그램. 각 모듈 시스템의 동작 방식, 사용 환경, 로딩 방식, 문법 등을 직관적으로 설명합니다
---

## 1. 모듈 시스템 개요

- 초기에는 JavaScript 파일을 `<script>` 태그로 순차적으로 나열
- 전역 스코프 오염, 의존성 파악 어려움 등 문제 발생 → **모듈화 필요성 대두**

---

## 2. 모듈 시스템 도입 배경

### 2-1. 기존 방식의 한계

- **전역 스코프 오염**
  - 변수/함수 이름 충돌
  - 디버깅 어려움, 네임스페이스 설계 필요
- **의존성 관리 불가**
  - 파일 간 의존성 추적 어려움
- **캡슐화 부족**
  - 재사용성/유지보수성 저하

### 2-2. 해결: 모듈 시스템

- **CommonJS (CJS)**
  - `require()` / `module.exports` 사용
  - 각 파일은 자체 스코프
  - **동기 로딩**: 서버 사이드(Node.js) 적합
- **ECMAScript Module (ESM)**
  - `import` / `export` 사용
  - **비동기 로딩**: 브라우저 + 현대 번들러 환경 적합
  - `top-level await` 지원

---

## 3. 구조 시각화

### 📦 CommonJS (CJS)

```
┌──────────────┐
│  moduleA.js  │
├──────────────┤
│ module.exports = { ... } │
└──────────────┘
        │
        ▼
┌──────────────┐
│  moduleB.js  │
├──────────────┤
│ const moduleA = require('./moduleA'); │
└──────────────┘

```

- **환경**: Node.js
- **로딩 방식**: 동기적
- **특징**:
  - 동적 로딩 가능 (`require`는 런타임 실행)
  - 브라우저에서 기본적으로 미지원

---

### 🌐 ECMAScript Modules (ESM)

```
┌──────────────┐
│  moduleA.mjs │
├──────────────┤
│ export const foo = ...; │
└──────────────┘
        │
        ▼
┌──────────────┐
│  moduleB.mjs │
├──────────────┤
│ import { foo } from './moduleA.mjs'; │
└──────────────┘

```

- **환경**: 브라우저, Node.js (v12+)
- **로딩 방식**: 비동기적
- **특징**:
  - 정적 분석 가능 (트리 쉐이킹에 유리)
  - 모던 번들러와의 호환성 높음

---

## 4. ESM vs CJS 비교표

| 항목          | CommonJS (CJS)                | ECMAScript Modules (ESM)                     |
| ------------- | ----------------------------- | -------------------------------------------- |
| 사용 환경     | Node.js, 레거시 도구          | 브라우저, 최신 번들러, Node.js (12+)         |
| 로딩 방식     | 동기(synchronous)             | 비동기(asynchronous)                         |
| 문법          | `require()`, `module.exports` | `import`, `export`                           |
| 브라우저 지원 | ❌ 기본 미지원                | ✅ 기본 지원                                 |
| 정적 분석     | ❌ 어려움                     | ✅ 용이 (트리 쉐이킹 최적화)                 |
| 파일 확장자   | `.js`, `.cjs`                 | `.mjs`, `.js` + `"type": "module"` 지정 필요 |
| 사용 사례     | 레거시 Node.js 모듈           | 모던 프론트엔드 앱, 라이브러리               |

---

## 5. `package.json` 설정

- **`type` 필드 기준**
  ```json
  {
    "type": "module"
  }
  ```
  → `.js` 확장자를 가진 파일도 **ESM으로 해석**
- 지정하지 않거나 `"commonjs"`일 경우, `.js`는 **CJS로 해석**
- **확장자 규칙**
  - `.mjs`: ESM 강제 해석
  - `.cjs`: CJS 강제 해석

---

## 6. 결론 및 권장 사항

- **프론트엔드 라이브러리/앱**: ESM 우선 사용 (트리 쉐이킹, 모던 번들러 호환)
- **Node.js 유틸 / CLI / 레거시 호환성 고려**: CJS 유지 가능

> 모듈 시스템을 도입할 때는 대상 환경, 트리 쉐이킹 필요 여부, 호환성을 고려해 선택해야 합니다.

## 참고 자료

- [**CommonJS와 ESM에 모두 대응하는 라이브러리 개발하기: exports field**](https://toss.tech/article/commonjs-esm-exports-field)
- https://f-lab.kr/insight/understanding-dual-package-and-esm-cjs-module-systems-20240625
