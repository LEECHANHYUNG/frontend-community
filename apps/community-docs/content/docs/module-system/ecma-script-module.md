---
title: 'ESM(ECMAScript Modules) 문법 구조 및 사용법 정리'
description: 'ESM의 도입으로 인한 개선점과 export/import 문법 구조, named export와 default export의 차이점 등을 예제와 함께 정리합니다.'
tags: ['JavaScript', 'ESM', '모듈 시스템', 'Frontend', '웹 개발']
date: 2025-05-28
author: 'Chanhyung'
draft: false
language: 'ko'
---

# 1. ESM 도입으로 인한 주요 개선점 ✨

- **스코프 격리**
  각 모듈이 독립적인 스코프를 가지면서 전역 스코프 오염 문제를 해소
- **명시적인 의존성 선언**
  `import`와 `export` 키워드로 모듈 간 의존 관계를 명확히 선언 → 코드 이해 및 관리 용이
- **코드 재사용성 향상**
  필요한 모듈만 선택적으로 임포트 가능 → 재사용성 극대화
- **성능 최적화 가능**
  정적 분석 기반 트리 쉐이킹(Tree Shaking) 지원 → 불필요한 코드 제거
  `async` / `defer` 속성과 병행해 로딩 성능 개선 가능
- **생태계 통합**
  브라우저와 Node.js 환경에서 동일한 모듈 시스템 사용 → 개발 편의성 증대

---

# 2. ESM에서 `export`와 `import` 키워드 사용법

## 2-1. 모듈 내보내기 (`export`)

- 모듈의 변수, 함수, 클래스 등을 외부에 공개하여 재사용 가능하게 함
- 두 가지 방식 존재

### 1) 이름이 있는 내보내기 (Named Export)

```
// lib.mjs
export const pi = Math.PI;
export function square(x) {
  return x * x;
}

```

```
// app.mjs
import { pi, square } from './lib.mjs';
console.log(pi);        // 3.141592653589793
console.log(square(10)); // 100

```

### 2) 기본 내보내기 (Default Export)

```
// lib.mjs
export default function greet(name) {
  console.log(`Hello, ${name}!`);
}

```

```
// app.mjs
import greet from './lib.mjs';
greet('Alice'); // Hello, Alice!

```

---

## 2-2. 모듈 가져오기 (`import`)

- 다른 모듈에서 `export`한 식별자를 현재 모듈로 가져옴

### 사용법

- **Named Import**

  ```
  import { pi, square } from './lib.mjs';

  ```

- **Default Import**

  ```
  import greet from './lib.mjs';

  ```

- **별칭 사용 (Renaming Imports)**

  ```
  import { pi as π, square as sq } from './lib.mjs';
  console.log(π);  // 3.141592653589793
  console.log(sq(10)); // 100

  ```

- **모듈 전체를 객체로 가져오기 (Import All as Object)**

  ```
  import * as lib from './lib.mjs';
  console.log(lib.pi);        // 3.141592653589793
  console.log(lib.square(10)); // 100

  ```

---

## 2-3. Named Export와 Default Export 차이점

| 구분                   | 이름이 있는 내보내기 (Named Export)   | 기본 내보내기 (Default Export)      |
| ---------------------- | ------------------------------------- | ----------------------------------- |
| 내보낼 수 있는 개체 수 | 여러 개 가능                          | 하나만 가능                         |
| 가져올 때 문법         | `import { name } from 'module';`      | `import name from 'module';`        |
| 가져올 때 이름         | 내보낸 이름과 동일해야 함             | 원하는 이름으로 지정 가능           |
| 사용 예시              | `export const add = (x, y) => x + y;` | `export default function() { ... }` |

---

## 2-4. `export ... from ...` 문법

- 다른 모듈에서 가져온 식별자를 현재 모듈에서 재내보내기 가능
- 모듈 API 재구성 및 내부 모듈 외부 노출에 유용

```
// helpers.mjs
export function helper() { ... }

// lib.mjs
export { helper } from './helpers.mjs';

// app.mjs
import { helper } from './lib.mjs';
```
