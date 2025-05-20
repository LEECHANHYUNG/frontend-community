---
title: 자동 디펜던시 관리
description: automated dependency-management
---

# Greenkeeper → Snyk 전환 및 보안 관리 워크플로우

## 🧩 문제 인식: `greenkeeper` 필드 발견

- `package.json` 내 `"greenkeeper": true` 필드를 발견
- lodash
  ```
  "greenkeeper": {
      "ignore": [
      "lodash"
      ]
  }
  ```
- ✅ Greenkeeper는 오래전 GitHub 저장소 의존성 업데이트 자동화 도구였으나, **2020년 서비스 종료됨**
- ▶️ 현재는 더 이상 유효하지 않음 → 대체 도구 필요

---

## 🔎 대체 도구 탐색: `Snyk` 선택

- 종속성 자동 보안 검사와 수정 기능이 있는 **Snyk**가 대체 도구로 적합하다고 판단
- 주요 장점:
  - 오픈소스 패키지 보안 취약점 탐지 (SCA)
  - 코드 수준 보안 분석 (SAST)
  - 컨테이너 & IaC 지원
  - CI/CD 통합 및 GitHub App 제공

---

## 🛠 Snyk 설정 단계 요약

### 1. Snyk CLI 설치

```bash
npm install -g snyk
```

또는

```bash
brew install snyk  # macOS
```

### 2. 인증

```bash
snyk auth  # 브라우저에서 로그인
```

### 3. 프로젝트 스캔

```bash
snyk test
```

| package.json 기준으로 종속성 취약점 검사

### 4. 지속적 모니터링 설정

```bash
snyk monitor
```

프로젝트를 Snyk 대시보드에 등록하여 추후 취약점 발생 시 알림 받기
