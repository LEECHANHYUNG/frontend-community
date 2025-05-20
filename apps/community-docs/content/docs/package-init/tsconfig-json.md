---
title: tsconfig.json
description: tsconfig의 주요 필드에 대한 설명
---

# TypeScript `tsconfig.json` 파일 구조 및 `compilerOptions` 설명

## 📄 `tsconfig.json` 개요

`tsconfig.json`은 TypeScript 프로젝트의 루트 디렉터리에 위치하는 설정 파일로, 해당 디렉터리가 TypeScript 프로젝트의 루트임을 나타낸다. 이 파일은 컴파일러 옵션, 포함 및 제외할 파일, 프로젝트 참조 등을 정의하여 프로젝트의 빌드 및 타입 검사 동작을 제어.

## 🔧 `compilerOptions`란?

`compilerOptions`는 TypeScript 컴파일러(`tsc`)가 코드를 어떻게 변환하고 검사할지에 대한 설정을 지정하는 객체. 이를 통해 생성할 자바스크립트 코드의 대상 버전, 모듈 시스템, 타입 검사 강도, 빌드 속도 최적화 등 다양한 컴파일 동작을 제어할 수 있다.

## 🧾 `compilerOptions` 주요 필드 설명

| 필드명                             | 설명                                                                                                                            |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `declaration`                      | `true`일 경우, `.d.ts` 타입 선언 파일을 생성한다. 타입스크립트 라이브러리 배포 시 주로 사용한다.                                |
| `declarationMap`                   | `true`일 경우, `.d.ts` 선언 파일에 대응하는 소스맵(`.d.ts.map`)을 생성한다. 디버깅 시 선언 파일과 소스 코드 매핑에 도움이 된다. |
| `esModuleInterop`                  | CommonJS 모듈을 ES6 모듈처럼 `import` 할 수 있게 하여, 기본 내보내기 호환성을 향상시킨다.                                       |
| `incremental`                      | 증분 빌드를 활성화하는 옵션이다. `false`로 설정하여 전체 빌드를 강제한다.                                                       |
| `isolatedModules`                  | 각 파일을 독립적인 모듈로 간주하여, Babel 등 트랜스파일러 호환성을 위해 모든 파일이 개별적으로 컴파일 가능해야 함을 의미한다.   |
| `lib`                              | 컴파일 시 참조할 라이브러리들을 지정한다. 여기서는 ES2022, DOM, DOM.Iterable API들을 포함한다.                                  |
| `module`                           | 모듈 시스템을 지정한다. `NodeNext`는 Node.js의 최신 ES 모듈 해석 방식을 따른다.                                                 |
| `moduleDetection`                  | 모듈 형식 탐지 방식을 지정한다. `force`는 강제로 모듈로 간주.                                                                   |
| `moduleResolution`                 | 모듈 해석 전략을 지정합니다. `NodeNext`는 Node.js의 최신 ES 모듈 해석 방식을 사용.                                              |
| `noUncheckedIndexedAccess`         | 인덱스 접근 시 반환 타입에 `undefined`를 자동으로 포함시켜, 더 엄격한 타입 검사를 수행.                                         |
| `resolveJsonModule`                | JSON 파일을 모듈로 가져올 수 있게 허용.                                                                                         |
| `skipLibCheck`                     | 라이브러리 파일(`.d.ts`) 검사를 건너뛰어 컴파일 속도를 높인다.                                                                  |
| `strict`                           | 엄격한 타입 검사 옵션을 모두 활성화하는 메타 옵션.                                                                              |
| `target`                           | 컴파일 결과물의 자바스크립트 버전을 지정. `ES2022`로 최신 사양에 맞춰 컴파일.                                                   |
| `baseUrl`                          | 모듈 해석 시 기준이 되는 기본 디렉터리를 설정. 상대 경로를 절대 경로처럼 사용할 수 있게 한다.                                   |
| `lib`                              | 컴파일 시 참조할 라이브러리들을 지정합니다.                                                                                     |
| `allowJs`                          | JavaScript 파일을 TypeScript 프로젝트에 포함할 수 있게 허용. JavaScript와 TypeScript 파일을 함께 사용할 수 있다.                |
| `forceConsistentCasingInFileNames` | 파일 이름의 대소문자 일관성을 강제하여, 대소문자 구분이 있는 파일 시스템에서의 호환성을 유지.                                   |
| `noEmit`                           | 컴파일 시 출력 파일을 생성하지 않는다. 타입 검사만 수행.                                                                        |
| `esModuleInterop`                  | CommonJS 모듈을 ES6 모듈처럼 `import` 할 수 있게 하여, 기본 내보내기 호환성을 향상시킨다.                                       |
| `isolatedModules`                  | 각 파일을 독립적인 모듈로 간주하여, Babel 등 트랜스파일러 호환성을 위해 모든 파일이 개별적으로 컴파일 가능해야 함을 의미한다.   |
| `jsx`                              | JSX 코드의 변환 방식을 지정. `preserve`로 설정하여 JSX를 그대로 보존.                                                           |
| `paths`                            | 모듈 경로 별칭을 설정하여, 복잡한 상대 경로를 간단하게 사용할 수 있게 한다. 예: `@/*`를 `./src/*`로 매핑                        |
| `plugins`                          | TypeScript 언어 서비스 플러그인을 설정하여, 코드 편집기에서의 기능을 확장. 예: `next` 플러그인으로 Next.js 지원을 활성화        |

## 📂 `include` 및 `exclude` 필드 설명

- `include`: 컴파일에 포함할 파일이나 디렉터리를 지정합니다. 예: `["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"]`
- `exclude`: 컴파일에서 제외할 파일이나 디렉터리를 지정합니다. 예: `["node_modules"]`

## 📌 참고

- [TypeScript 공식 문서: tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
- [JSON Schema Store: tsconfig.json 스키마](https://json.schemastore.org/tsconfig.json)
