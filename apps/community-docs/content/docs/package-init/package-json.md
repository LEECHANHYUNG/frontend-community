---
title : package.json 각 필드 설명
description : package.json 각 필드에 대한 설명 페이지
---
# 📦 package.json 가이드

## 📘 package.json이란?

`package.json`은 Node.js 및 프론트엔드 프로젝트에서 프로젝트의 메타데이터와 의존성 정보를 담고 있는 핵심 파일입니다. npm 또는 yarn과 같은 패키지 매니저가 이 파일을 기반으로 의존성 설치, 빌드, 실행 등의 작업을 수행합니다.

---

## 🔑 주요 필드 설명

- **`name`**: 패키지 이름. npm 등록 시 고유해야 합니다.
- **`version`**: 현재 버전. 보통 [Semantic Versioning](https://semver.org/)을 따릅니다.
- **`description`**: 패키지에 대한 간단한 설명.
- **`main`**: 패키지의 엔트리 포인트 파일. CommonJS 기준.
- **`scripts`**: 명령어 단축어를 정의하는 필드. 예:

  ```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "lint": "eslint ."
  }
  ```

- **`repository`**: Git 저장소 정보.
- **`license`**: 오픈소스 라이선스 정보 (예: `"MIT"`).
- **`keywords`**: 검색 최적화를 위한 키워드 배열.
- **`author` / `contributors`**: 작성자 및 기여자 정보.
- **`engines`**: 프로젝트가 지원하는 Node.js, npm 버전 명시. 예:

  ```json
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  }
  ```

- **`type`**: `"module"` 또는 `"commonjs"` 모듈 시스템 지정. 기본값은 CommonJS.

---

## 📁 의존성 관리 필드 차이점

| 필드              | 설명                                                                                          | 예시 패키지           |
|-------------------|-----------------------------------------------------------------------------------------------|------------------------|
| `dependencies`    | 앱 실행 시 실제 필요한 패키지. `npm install` 시 자동 설치됨.                                  | `react`, `axios`       |
| `devDependencies` | 개발 및 빌드 환경에만 필요한 패키지. `npm install --production` 시 제외됨.                    | `eslint`, `webpack`    |
| `peerDependencies`| 패키지를 사용하는 쪽에서 직접 설치해야 하는 패키지. 주로 플러그인이나 라이브러리 개발 시 사용됨. | `react`, `styled-components` |

```json
"dependencies": {
  "react": "^18.2.0"
},
"devDependencies": {
  "eslint": "^8.0.0"
},
"peerDependencies": {
  "react": "^18.0.0"
}
```

> 💡 `peerDependencies`는 버전 충돌을 피하고, 상위 앱에서 통제 가능한 형태로 의존성을 지정할 때 유용합니다.

---

## 🧪 패키지 설치 시 명령어 요약

- `npm install <pkg>` → `dependencies`에 추가
- `npm install <pkg> --save-dev` → `devDependencies`에 추가
- `npm install <pkg> --save-peer` → `peerDependencies`에 추가 (npm v7+)
- `npm ci` → `package-lock.json` 기준 정확한 버전 설치
- `npm install --production` → `devDependencies` 생략하고 설치

---

## 🧰 기타 팁

- `files` 필드를 사용해 배포 시 포함할 파일을 제한할 수 있습니다.
- `bin` 필드를 사용해 CLI 실행 가능하게 만들 수 있습니다.
- `exports`, `imports`를 통해 모듈 접근 제어가 가능합니다 (ESM 기반 패키지에서 사용).

---

## 🔗 참고 링크

- [npm docs: package.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-json)
- [Node.js 공식 문서](https://nodejs.org/en)
- [Semantic Versioning](https://semver.org/)
