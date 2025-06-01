---
title: '번들러 선택 가이드: 라이브러리부터 애플리케이션까지'
description: '다양한 JavaScript 번들러(Bun, esbuild, Parcel, Rollup, Vite, Webpack 등)를 라이브러리 및 애플리케이션 빌드 시나리오별로 비교 분석하고, 기능, 성능, 번들 크기 등을 기준으로 최적의 번들러 선택 가이드를 제공합니다.'
date: '2025-06-01' # 문서가 최종적으로 업데이트된 날짜 또는 발행일로 가정
lang: 'ko'
tags:
  - JavaScript
  - Bundler
  - Webpack
  - Vite
  - esbuild
  - Rollup
  - Parcel
  - Bun
  - tsup
  - microbundle
  - TypeScript
  - 라이브러리 빌드
  - 애플리케이션 빌드
  - 성능 비교
  - 번들 크기
  - 프론트엔드
  - 웹 개발
  - 번들링
categories:
  - 웹 개발
  - JavaScript
  - 개발 도구
slug: 'javascript-bundler-comparison-guide' # URL 친화적인 문서 식별자 예시
# author: "Your Name / Original Author Name" # 원본 문서의 저자 또는 요약자
# draft: false # 문서가 초안 상태인지 여부
---

# 번들러 선택

## 1. 번들러가 무엇인지

### 1-1. What is a bundler

- 번들러는 애플리케이션을 번들링 해준다.
- 여러 파일로 코드를 나누고 `import` 구문을 사용하는 것이 더 쉽다.
- 유지보수를 위해서는 코드가 사람에게 읽기 쉬워야 하기 때문.
- 하지만, 이러한 코드는 프로덕션 환경에는 최적화되어 있지 않다.
- 프로덕션용으로는 다음과 같은 작업이 필요.
  - 코드를 연결, 압축(minify)해서 브라우저가 최대한 빠르게 다운로드할 수 있도록 만들기
  - 폴리필이나 CSS vendor prefix를 자동으로 변환 또는 삽입해서 브라우저 호환성을 극대화하는 것.
- 이러한 역할을 해주는 것이 바로 번들러.
- 번들러는 애플리케이션의 전체 의존 그래프(import 등 포함)를 처리해서, 최종적으로 프로덕션에 바로 사용할 수 있는 최적화된 파일들을 생성.
- 대부분의 경우 번들러는 JavasScript 파일 뿐만 아니라, 이미지 CSS 파일, CSS Modules, SASS 등도 함께 처리 가능
- 다만 번들러와 아래의 도구들과 혼동해서는 안 된다.
  - Parser, Transpiler, compiler(ex. Babel, swc, Typescript): JavaScript 파일을 파싱, 이해, 변환하는 데 목적이 있다. 대부분의 번들러는 내부적으로 이들을 사용.
  - Linter : 코드에 오류나 안 좋은 관행이 있는지
  - formatter : 코드 스타일을 통일되게 유지

### 1-2. Bundler candidates

이 글에서는 다음과 같은 번들러들을 테스트:

- **Bun (v1.0.22)**: Bun은 단순한 번들러 그 이상이지만, 매우 빠르다고 평가받는 `build` 명령어를 제공.
- **esbuild (v0.19.11)**: 매우 빠른 속도를 자랑하는 Go 기반 번들러.
- **microbundle (v0.15.1)**: Rollup을 기반으로 하는 최소 설정 라이브러리 번들러.
- **Parcel (v2.11.0)**: 설정 없이도 다양한 파일 타입을 지원하는 번들러.
- **rollup.js (v4.9.4)**: 라이브러리 번들링에 자주 사용되며, 모듈 최적화에 강점을 가진 번들러.
- **tsup (v8.0.1)**: esbuild 기반으로 작동하며, TypeScript 프로젝트 번들링에 특화되어 있다.
- **TypeScript (v5.3.3)**: 공식적으로 번들러는 아니지만, 특정 시나리오에서는 번들링 없이 `.ts`를 `.js`로 변환하는 것만으로 충분할 수 있다.
- **Vite (v5.0.11)**: 개발 서버로 널리 사용되며, Rollup 기반의 빌드 시스템을 포함.
- **Webpack (v5.89.0)**: 가장 오래되고 확장성 높은 번들러로, 복잡한 앱에 적합.

### **1-3. Other disqualified tools**

다음 도구들은 이번 테스트 대상에서 제외:

- **WMR**: 앱 번들링만 가능하며, Preact 전용이고, 모노레포 환경에서는 문제를 일으키는 것으로 보인다.
- **Turbopack**: Next.js 툴체인 내 옵션으로만 사용할 수 있으며, 아직 베타 단계.
- **Browserify**: 앱 번들링은 가능하지만 라이브러리 번들링은 불가능하며, 현대적인 번들러에 비해 기능이 많이 부족.
- **Gulp, Grunt**: 번들러의 선조격 도구들이며, 자체적으로 번들링을 수행하지는 않고, 설정이 복잡하며 최신 번들러에 비해 기능이 부족.
- **Brunch, Snowpack, Packem, pkg**: 현재 유지보수가 중단된 상태.

## 2. 재사용 가능한 라이브러리를 번들링하는 시나리오

### 2-1. Operating Mode

- 모든 번들러에 동일한 코드를 사용하여 기능과 성능을 비교.
- 코드에는 다음과 같은 요소들을 포함하여, 번들러의 처리 능력 확인
  - Typescript 사용
  - `.json` 파일을 import
  - React component 사용
    - 해당 컴포넌트는 `<img>` 태그용으로 SVG 이미지를 URL로 import하고, 배경 이미지로 JPG를 사용하는 CSS 파일도 import
  - 큰 문자열이 포함된 파일이 하나 있으며, 해당 파일은 import되지 않는다.
    → 이 항목은 트리 셰이킹 기능을 검증하기 위한 것으로, 프로덕션 번들에 이 사용되지 않은 문자열이 포함되지 않아야 한다.
- 라이브러리 빌드는 다양한 출력 포맷으로 생성되도록 설정
  - ESM
  - CJS
  - 브라우저 호환 포맷 → IIFE
  - UMD, AMD 같은 포맷은 선택 사항
- 측정 항목
  - 라이브러리 빌드에 걸린 시간
  - 최종 번들 크기

### 2-2. Setup

✅ **Bun**

```bash
NODE_ENV=production bun build src/index.ts --outdir dist --target node \
  --format esm --external react
```

- 구성 파일 없이 CLI 옵션만으로 동작합니다. (일부 옵션은 `bunfig.toml`에 정의 필요)
- `NODE_ENV=production`을 명시해야 최적화된 프로덕션 번들을 생성합니다.

---

✅ **esbuild**

```bash
esbuild src/index.ts --outfile=dist/esbuild-lib.mjs --bundle \
  --jsx=automatic --external:react --loader:.jpg=dataurl \
  --loader:.svg=dataurl --format=esm

esbuild src/index.ts --outfile=dist/esbuild-lib.cjs --bundle \
  --jsx=automatic --external:react --loader:.jpg=dataurl \
  --loader:.svg=dataurl --platform=node --format=cjs

esbuild src/index.ts --outfile=dist/esbuild-lib.js --bundle \
  --jsx=automatic --external:react --loader:.jpg=dataurl \
  --loader:.svg=dataurl --platform=browser --format=iife
```

- 설정 파일 없이 CLI만으로 충분히 동작합니다.

---

✅ **microbundle**

```bash
microbundle --jsx React.createElement --jsxFragment React.Fragment \
  --jsxImportSource react --globals react/jsx-runtime=jsxRuntime
```

- 구성 파일 없이 CLI 옵션만으로 작동하며, 기본 설정이 매우 최적화되어 있어 추가 설정이 거의 필요 없습니다.

---

✅ **Parcel**

```bash
parcel build
```

- 설정 파일 없이 작동하지만, `package.json`에 일부 설정 정보 추가가 필요합니다.

---

✅ **Rollup**

```bash
rollup -c
```

- `rollup.config.js` 설정 파일이 필요합니다.

---

✅ **tsup**

```bash
tsup src/index.ts --format esm,cjs,iife --dts --loader '.jpg=dataurl' \
  --loader '.svg=dataurl'
```

- 설정 파일 없이 CLI만으로 작동하며, 기본 설정이 이미 최적화되어 있습니다.

---

✅ **TypeScript**

```bash
tsc && tsc --project tsconfig.cjs.json
```

- `tsconfig.json` 및 `tsconfig.cjs.json` 구성 파일이 필요합니다.

---

✅ **Vite**

```bash
vite build
```

- `vite.config.js` 설정 파일이 필요합니다.

---

❌ **Webpack**

```bash
webpack --mode production
```

- `webpack.config.js` 설정 파일이 필요합니다.

---

### 2-3. Feature Comparison

라이브러리 번들러들의 주요 기능 및 파일 호환성 비교는 다음과 같습니다:

| Bundler         | TypeScript | React | JSON | 이미지 | CSS | CSS 내 이미지 | Tree-shaking |
| --------------- | ---------- | ----- | ---- | ------ | --- | ------------- | ------------ |
| **Bun**         | ❗①        | ✅    | ✅   | ❗②    | ❗③ | ❌②           | ✅           |
| **esbuild**     | ❗①        | ✅    | ✅   | ✅     | ✅  | ✅            | ✅           |
| **microbundle** | ✅         | ✅    | ✅   | ❌     | ❗③ | ❌            | ✅           |
| **Parcel**      | ✅         | ✅    | ✅   | ✅     | ✅  | ✅            | ❗④          |
| **Rollup**      | ✅         | ✅    | ✅   | ✅     | ✅  | ✅            | ✅           |
| **tsup**        | ✅         | ✅    | ✅   | ✅     | ✅  | ✅            | ✅           |
| **TypeScript**  | ✅         | ✅    | ✅   | ❌     | ❌  | ❌            | ✅           |
| **Vite**        | ✅         | ✅    | ✅   | ✅     | ✅  | ✅            | ✅           |
| **Webpack**     | ✅         | ✅    | ✅   | ✅     | ✅  | ✅            | ❌           |

---

### 📌 비고:

1. **❗①**: 해당 번들러는 `.d.ts` 타입 정의 파일을 자동으로 생성하지 않음 → 별도 `tsc` 실행 필요
2. **❗②**: 일부 로더 미지원으로 이미지 파일을 `data-url` 형태로 포함할 수 없음
3. **❗③**: CSS 파일은 생성되지만, 배경 이미지 경로가 누락되어 import 불가
4. **❗④**: 작은 규모의 라이브러리에서는 Tree-shaking이 제대로 작동하지 않음. (대규모 라이브러리에서는 정상 작동)

### 2-4 Format Comparison

| Bundler         | ESM | CJS | Browser 포맷 (IIFE 등) |
| --------------- | --- | --- | ---------------------- |
| **Bun**         | ✅  | ❌  | ❌                     |
| **esbuild**     | ✅  | ✅  | ✅                     |
| **microbundle** | ✅  | ✅  | ✅                     |
| **Parcel**      | ✅  | ✅  | ✅                     |
| **Rollup**      | ✅  | ✅  | ✅                     |
| **tsup**        | ✅  | ✅  | ✅                     |
| **TypeScript**  | ✅  | ✅  | ❌                     |
| **Vite**        | ✅  | ✅  | ✅                     |
| **Webpack**     | ✅  | ✅  | ✅                     |

---

📌 **해설 요약**:

- **Bun**은 빠르지만 포맷 지원이 부족하여 **ESM 외 포맷 지원은 미흡**합니다.
- **TypeScript**는 기본적으로 번들링 도구가 아니기 때문에 **브라우저 포맷은 미지원**입니다.
- **esbuild, tsup, Rollup, Vite**는 **라이브러리 및 브라우저 대상에 모두 적합**한 포맷을 안정적으로 지원합니다.

### 2-5. Bundle size comparison

**✅ 소규모 라이브러리 결과 (단위: KB)**

| Bundler         | ESM | CJS | Browser | CSS   |
| --------------- | --- | --- | ------- | ----- |
| **Bun**         | 34k | -   | -       | 0.5k¹ |
| **esbuild**     | 34k | 35k | 34k     | 33k   |
| **microbundle** | 33k | 33k | 33k     | 0.4k¹ |
| **Parcel**      | 36k | 37k | -       | 35k   |
| **Rollup**      | 33k | 34k | 34k     | 33k   |
| **tsup**        | 34k | 35k | 164k    | 33k   |
| **Typescript**  | 33k | 35k | -       | -     |
| **Vite**        | 34k | 33k | 34k     | 33k   |
| **Webpack**     | 34k | 34k | 34k     | 33k   |

**✅ 대규모 라이브러리 결과 (JS만, 단위: KB)**

| Bundler         | ESM  | CJS  | Browser |
| --------------- | ---- | ---- | ------- |
| **Bun**         | 109k | -    | -       |
| **esbuild**     | 139k | 148k | 153k    |
| **microbundle** | 64k  | 66k  | 66k     |
| **Parcel**      | 146k | 153k | -       |
| **Rollup**      | 128k | 133k | 141k    |
| **tsup**        | 144k | 154k | 2.2m    |
| **Typescript**  | 323k | 349k | -       |
| **Vite**        | 108k | 79k  | 79k     |
| **Webpack**     | 96k  | 95k  | 94k     |

📌 **비고**:

¹ Bun 및 microbundle의 CSS 파일이 작은 이유는 **background-image가 data-url로 포함되지 않았기 때문**입니다.

**요약 인사이트**:

- **microbundle**은 최종 번들 크기 면에서 효율적이며 매우 작음 (특히 대규모 라이브러리에서).
- **Webpack**, **Vite**, **Rollup**은 **균형 잡힌 사이즈와 기능 지원**을 제공.
- **tsup**은 브라우저 번들이 비정상적으로 큼 (2.2MB): 설정 최적화 필요.
- **TypeScript**는 번들러가 아니므로 출력 최적화가 부족함.

### 2-6 **Performance comparison**

**✅ 소규모 라이브러리**

| Bundler         | Command | Types | Total Time | Notes |
| --------------- | ------- | ----- | ---------- | ----- |
| **Bun**         | ~200ms  | ~1.1s | ~1.5s      | ①     |
| **esbuild**     | ~200ms  | ~1.1s | ~1.5s      | ②     |
| **microbundle** | ~4.6s   | -     | ~4.6s      | ③④    |
| **Parcel**      | ~900ms  | -     | ~900ms     | ②④    |
| **Rollup**      | ~1.7s   | -     | ~1.7s      | ③     |
| **tsup**        | ~1.7s   | -     | ~1.7s      | ③     |
| **TypeScript**  | ~1.1s   | -     | ~2.3s      | ②     |
| **Vite**        | ~1.8s   | -     | ~1.8s      | ③     |
| **Webpack**     | ~2.6s   | -     | ~3.2s      | ③     |

**✅ 대규모 라이브러리**

| Bundler         | Command | Types | Total Time | Notes |
| --------------- | ------- | ----- | ---------- | ----- |
| **Bun**         | ~200ms  | ~3.7s | ~4.3s      | ①     |
| **esbuild**     | ~200ms  | ~3.7s | ~4.3s      | ②     |
| **microbundle** | ~24s    | -     | ~24s       | ③④    |
| **Parcel**      | ~1s     | -     | ~1s        | ②④    |
| **Rollup**      | ~5s     | -     | ~5s        | ③     |
| **tsup**        | ~4.9s   | -     | ~4.9s      | ③     |
| **TypeScript**  | ~3.8s   | -     | ~7.6s      | ②     |
| **Vite**        | ~5.3s   | -     | ~5.3s      | ③     |
| **Webpack**     | ~7.2s   | -     | ~17s       | ③     |

---

📌 **주요 해석**:

- **최고 속도**: `Bun`과 `esbuild`는 **가장 빠르며**, 타입 생성까지 포함한 작업에서 4.3s 이내 완료.
- **TypeScript 단독 사용**은 **타입 생성은 빠르지만 전체 출력 최적화는 부족**.
- **Webpack**, **microbundle**은 **대규모 라이브러리에서 느림**.
- **Parcel**은 빠르지만 기능 제한이 있음 (예: Browser format 제한).

---

성능과 기능 사이에서 균형을 원하신다면 **`tsup`**, **`Rollup`**, **`esbuild`** 조합을 추천드립니다.

필요하시면 [성능 vs 사이즈 그래프](https://chatgpt.com/c/f)나 [사용 사례별 추천 번들러](https://chatgpt.com/c/f)도 제공해드릴 수 있습니다.

## 3. 애플리케이션을 번들링하는 시나리오

### 3-1. Operating Mode

**목표**

- **9개 라이브러리(번들러별 테스트 대상) 재사용하여 각각 앱 빌드**
- **아래 번들러 제외**
  - Bun, microbundle, tsup, TypeScript → 라이브러리 전용, 앱 빌드에 적합하지 않음

**각 번들러에 대해 확인할 사항**

1. 라이브러리 호환성 및 통합 가능성 테스트
2. 단일 설정으로 다중 진입점(multi-entry) 지원 여부 확인
3. HTML 파일 자동 관리 및 JS/CSS 자동 삽입
4. 개발 환경(dev mode) 및 프로덕션 빌드 모두 지원
5. HMR (Hot Module Replacement) 지원 여부 - 개발 편의성 향상 목적
6. 소스맵(sourcemaps) 생성 가능 여부
7. 모든 라이브러리 간 공통 청크(common chunk) 생성 지원

**측정 지표 (소규모 및 대규모 라이브러리 대상)**

- 라이브러리 빌드에 소요되는 시간
- 개발 모드에서 변경 감지 및 반영에 걸리는 시간
- 생성된 번들 크기

→ 라이브러리 여러 개를 조합해 실제 앱을 빌드하는 현실적인 상황에서 각 번들러가 얼마나 잘 작동하는지, 성능과 기능 측면에서 어떤 차이가 있는지 평가하는 것

### 3-2. Feature comparison

앱 번들러 기능 및 호환성 비교

| 번들러  | 다중 진입점 지원 | JS 자동 삽입 | CSS 자동 삽입 | 개발 서버 | HMR 지원 | 소스맵 지원 | 공통 청크 생성 |
| ------- | ---------------- | ------------ | ------------- | --------- | -------- | ----------- | -------------- |
| esbuild | ✅               | ❌           | ❌            | ✅        | ❌       | ✅          | ❗①            |
| Parcel  | ✅               | ✅           | ✅            | ✅        | ✅       | ✅          | ✅             |
| Rollup  | ❗②              | ❌           | ❌            | ❌        | ❌       | ✅          | ❗③            |
| Vite    | ✅               | ✅           | ✅            | ✅        | ✅       | ✅          | ✅             |
| Webpack | ✅               | ❗④          | ✅            | ✅        | ✅       | ✅          | ✅             |

---

### 주석

1. **공통 청크 관련:** esbuild는 ESM 포맷에서만 공통 청크를 지원하며 제한 사항이 존재합니다.
2. **Rollup 다중 진입점:** Rollup은 다중 진입점 지원이 완전하지 않으며 glob 패턴 대신 별도의 라이브러리를 사용해야 합니다.
3. **Rollup 공통 청크:** UMD나 IIFE 포맷에서는 공통 청크 기능이 제공되지 않습니다.
4. **Webpack JS 삽입:** Webpack은 JS 자동 삽입에 일부 제한사항이 있으며, 모든 진입점의 JS 파일을 모든 HTML에 삽입하는 현상이 있을 수 있습니다. 이는 의도한 동작이 아닙니다.

### 3-3. Bundle size comparison

소형 라이브러리:

| 번들러 ⯈    | esbuild     | Parcel      | Rollup      | Vite        | Webpack     |
| ----------- | ----------- | ----------- | ----------- | ----------- | ----------- |
| Bun         | 140k + 1.5k | 142k + 1.8k | 138k + 1k   | 140k + 1.3k | 137k + 2.3k |
| esbuild     | 140k + 1.2k | 142k + 1.7k | 138k + 1.1k | 140k + 1.1k | 137k + 4.4k |
| microbundle | 140k + 0.8k | 142k + 1.3k | 138k + 0.7k | 140k + 0.7k | 137k + 2.3k |
| Parcel      | 140k + 34k① | 142k + 1.8k | 138k + 34k① | 140k + 34k① | 137k + 37k① |
| Rollup      | 140k + 1.2k | 142k + 1.7k | 138k + 1.1k | 140k + 1.1k | 137k + 4.4k |
| tsup        | 140k + 1.2k | 142k + 1.7k | 138k + 1.1k | 140k + 1.1k | 137k + 4.4k |
| Typescript  | 140k + 0.7k | 142k + 1.3k | 138k + 0.6k | 140k + 0.6k | 137k + 2.3k |
| Vite        | 140k + 1.2k | 142k + 1.7k | 138k + 1.2k | 140k + 1.2k | 137k + 4.4k |
| Webpack     | 140k + 34k① | 142k + 34k① | 138k + 34k① | 140k + 34k① | 137k + 37k① |

대형 라이브러리:

| 번들러 ⯈    | esbuild      | Parcel       | Rollup       | Vite         | Webpack      |
| ----------- | ------------ | ------------ | ------------ | ------------ | ------------ |
| Bun         | 603k + 36k   | 672k + 36k   | 372k + 24k   | 372k + 22k   | 599k + 38k   |
| esbuild     | 603k + 37k   | 672k + 37k   | 372k + 26k   | 372k + 23k   | 599k + 39k   |
| microbundle | 603k + 37k   | 672k + 37k   | 372k + 26k   | 372k + 23k   | 599k + 40k   |
| Parcel      | 603k + 34k   | 672k + 37k   | 372k + 24k   | 372k + 21k   | 599k + 37k   |
| Rollup      | 603k + 37k   | 672k + 38k   | 372k + 27k   | 372k + 24k   | 599k + 40k   |
| tsup        | 603k + 37k   | 672k + 37k   | 372k + 26k   | 372k + 23k   | 599k + 39k   |
| Typescript  | 603k + 41k   | 672k + 43k   | 372k + 30k   | 372k + 27k   | 599k + 43k   |
| Vite        | 603k + 35k   | 672k + 35k   | 372k + 24k   | 372k + 22k   | 599k + 38k   |
| Webpack     | 603k + 105k① | 672k + 106k① | 372k + 801k① | 372k + 319k① | 599k + 107k① |

비고:

트리 쉐이킹(tree-shaking) 미적용 상태임.

### 3-4. Performance comparison

소형 라이브러리:

| 번들러  | Build 시간 | Dev 시간 |
| ------- | ---------- | -------- |
| esbuild | 약 300ms   | 약 10ms  |
| Parcel  | 약 900ms①  | 약 10ms  |
| Rollup  | 약 15초    | 약 1초   |
| Vite    | 약 1.2초   | 약 10ms  |
| Webpack | 약 7초     | 약 500ms |

대형 라이브러리:

| 번들러  | Build 시간  | Dev 시간         |
| ------- | ----------- | ---------------- |
| esbuild | 약 700ms    | 약 500ms         |
| Parcel  | 약 1.2초①   | 약 1.2초         |
| Rollup  | 약 1분 35초 | 메모리 부족 발생 |
| Vite    | 약 5.5초    | 약 20ms          |
| Webpack | 약 24초     | 약 1.6초         |

비고:

캐시(Cache) 사용 기준.

## 4. 어떤 번들러를 사용하는 것이 최선인지

### 4-1. Building a library

**1. Vite**

- 앱 빌드에 널리 알려진 솔루션이며, 라이브러리 빌드도 매우 훌륭하게 지원함.
- 단점 없이 가장 추천하는 번들러.

**2. tsup**

- 라이브러리 빌드에 좋은 솔루션.
- CSS 지원은 아직 실험적이므로 CSS가 포함된 경우 주의 필요.
- 실제 사용 시 결과가 매우 좋음.

**3. esbuild**

- 매우 빠른 번들링 속도와 다양한 기능 지원.
- 라이브러리 빌드에 적합하며, 타입 정의 파일 생성만 잊지 말 것.

**4. microbundle**

- 이미지 파일 처리 불가.
- 번들 크기가 매우 작음(단, 빌드 시간이 다소 소요됨).
- 브라우저에서 직접 사용하는 JS/TS 라이브러리 번들링 시 추천.
- npm 배포용 라이브러리에는 적합하지 않음.

**5. Typescript (tsc)**

- 엄밀히 말하면 번들러는 아님.
- 추가 의존성을 추가하지 않는 큰 장점이 있음.
- JS/TS 프로젝트에서 순수 ESM 패키지 빌드 시 유용 (참고: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).

**6. Parcel**

- "마법 같은" 간단한 솔루션으로 빠르게 사용 가능.
- 내부 동작 제어가 어렵다는 느낌 때문에 라이브러리 번들링용으로는 다소 주저됨.

**7. Rollup**

- 라이브러리 빌드에 적합한 번들러지만 설정이 다소 복잡할 수 있음.
- Vite가 Rollup 기반이라 개인적으로는 Vite 선호.

**8. Bun**

- 가능성이 있는 신생 솔루션.
- 아직 핵심 기능이 부족하여 라이브러리 번들링에는 권장하지 않음.
- 추후 발전 상황 주시 필요.

**9. Webpack**

- 가장 오래된 번들러 중 하나이나, 트리 쉐이킹(tree-shaking) 문제 때문에 라이브러리 빌드에는 권장하지 않음.

---

### 요약

- **권장:** Vite, tsup, esbuild, microbundle, Typescript
- **보류/주의:** Parcel, Rollup, Bun
- **비추천:** Webpack, Bun (현 시점에서 라이브러리 번들링용)

실제 프로젝트 상황, 빌드 타겟(브라우저, npm 배포 등), 지원해야 하는 파일 유형(CSS, 이미지 등)에 따라 선택이 달라질 수 있습니다.

### 4-2. Building an app

**1. Vite**

- 다시 1위.
- Parcel과 근소한 차이지만 개발 모드에서 앱 업데이트 속도가 매우 빠르고, 확장성도 뛰어남.
- 개발에 투자하는 시간이 빌드 시간보다 훨씬 많기 때문에 개발 성능을 우선시하는 경우 최적 선택.

**2. Parcel**

- 설정이 거의 필요 없고, 기본 프리셋이 훌륭해 앱 번들러로 매우 적합.
- Parcel로 번들한 라이브러리도 트리 쉐이킹이 제대로 작동하는 몇 안 되는 번들러임.
- 내부 동작이 "마법적"이라 느껴져서, 개인적으로는 Vite보다 선호도가 약간 낮음.

**3. Webpack**

- 라이브러리 번들링에는 비추천이나, 앱 번들링은 가능함.
- 설정이 복잡하고, 특정 상황에서 최적화가 어렵고, Parcel이나 Vite 대비 성능이 떨어짐.
- 3순위로 고려 가능.

**4. esbuild**

- 앱 번들러로 사용 가능하나, 특히 개발 모드에서 경험이 좋지 않음.
- 라이브러리 번들링용으로 더 적합.

**5. Rollup**

- esbuild보다도 앱 번들링 경험이 더 떨어짐.
- 앱 번들러로는 권장하지 않음.

---

### 요약

- **권장:** Vite (1순위), Parcel (2순위)
- **보류:** Webpack (성능과 설정 문제), esbuild (개발 경험 미흡), Rollup (비추천)

앱 개발 환경에서는 개발 생산성이 매우 중요하므로, Vite 또는 Parcel을 사용하는 것이 현업에서 가장 효율적입니다. Webpack은 레거시 프로젝트나 특정 요구 사항이 있을 때만 고려하세요.

## 참고 문서

2024 JavaScript bundlers comparison[https://tonai.github.io/blog/posts/bundlers-comparison/#setup]
