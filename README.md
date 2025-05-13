# Frontend Community

프론트엔드 커뮤니티 모노레포 프로젝트입니다. 이 프로젝트는 Turborepo와 pnpm을 사용하여 구성된 모노레포 아키텍처를 기반으로 합니다.

## 기술 스택

- **패키지 매니저**: pnpm@9.0.0
- **모노레포 도구**: Turborepo v2.5.3
- **Node.js 버전**: >= 18
- **TypeScript**: v5.8.2

## 프로젝트 구조

```
frontend-community/
├── apps/           # 애플리케이션 디렉토리
├── packages/       # 공유 패키지 디렉토리
├── package.json    # 루트 패키지 설정
├── pnpm-workspace.yaml # pnpm 워크스페이스 설정
└── turbo.json     # Turborepo 설정
```

## 시작하기

### 필수 요구사항

- Node.js >= 18
- pnpm >= 9.0.0

### 설치

```bash
# 패키지 설치
pnpm install
```

## 사용 가능한 스크립트

```bash
# 개발 서버 실행
pnpm dev

# 프로젝트 빌드
pnpm build

# 린트 검사
pnpm lint

# 타입 체크
pnpm check-types

# 코드 포맷팅
pnpm format
```

## Turborepo 파이프라인

프로젝트는 다음과 같은 Turborepo 태스크 파이프라인을 포함합니다:

### build

- 의존성: 하위 워크스페이스의 build 태스크
- 입력: 기본 Turbo 입력 및 .env 파일들
- 출력: .next 디렉토리 (캐시 제외)

### dev

- 지속적인 개발 모드
- 캐시 비활성화
- 영구적 태스크로 실행

### lint

- 의존성: 하위 워크스페이스의 lint 태스크

### check-types

- 의존성: 하위 워크스페이스의 check-types 태스크

## 워크스페이스 구조

프로젝트는 두 가지 주요 워크스페이스 타입을 포함합니다:

1. **apps/**: 최종 사용자용 애플리케이션
2. **packages/**: 공유 패키지 및 설정

## 개발 가이드라인

1. 새로운 패키지 추가:

   ```bash
   cd packages
   pnpm create my-package
   ```

2. 새로운 앱 추가:

   ```bash
   cd apps
   pnpm create next-app my-app
   ```

3. 워크스페이스 간 의존성 추가:
   ```bash
   pnpm add @frontend-community/package-name --filter @frontend-community/app-name
   ```

## 환경 변수

- 프로젝트는 `.env` 파일을 지원합니다
- 각 워크스페이스는 자체 `.env` 파일을 가질 수 있습니다
- `.env.local` 파일들은 전역 의존성으로 처리됩니다

## 기여하기

1. 새로운 브랜치 생성
2. 변경사항 커밋
3. 풀 리퀘스트 생성

## 라이선스

이 프로젝트는 private 저장소로 관리됩니다.
