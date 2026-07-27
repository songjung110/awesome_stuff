# YouTube 좋아요 분석 대시보드

이 프로젝트는 OAuth 로그인으로 진입한 사용자의 YouTube "좋아요" 데이터를 수집하고, 이를 바탕으로 콘텐츠 분석을 수행하기 위한 React + TypeScript 기반 대시보드입니다.

사용자는 Google 계정으로 인증한 뒤 YouTube 읽기 권한을 사용해 자신의 구독 정보, 좋아요 플레이리스트, 좋아요한 영상, 영상 카테고리 등을 조회할 수 있으며, 이를 통해 사용자의 YouTube 이용 패턴을 분석하는 흐름을 구현합니다.

## 프로젝트 목적

- OAuth 인증을 통한 Google 로그인 흐름 구현
- 인증된 사용자의 YouTube 좋아요 데이터 조회
- 좋아요한 영상과 관련 메타데이터를 정리해 분석 가능한 형태로 처리
- React 기반의 대시보드 UI를 통해 결과를 탐색할 수 있도록 구성

## 폴더 구조

```text
src/
  api/               # YouTube API 호출 및 서버 프록시 관련 모듈
  components/        # 공통 UI 컴포넌트 및 인증 컴포넌트
  config/            # 환경 설정 관련 파일
  constants/         # 상수 정의
  lib/               # 인증 토큰 처리 등 공통 유틸리티
  pages/             # 로그인, 대시보드 등 페이지 컴포넌트
  routes/            # 라우팅 설정
  services/          # YouTube 데이터 수집 및 캐시 로직
  types/             # TypeScript 타입 정의
public/              # 정적 자원
server.js            # YouTube API 프록시 서버
```

## 사용된 스택

- React 19
- TypeScript
- Vite
- React Router DOM
- Tailwind CSS
- SCSS
- Google OAuth (@react-oauth/google)
- Node.js 기반 YouTube API 프록시 서버

## 실행 방법

1. 의존성 설치
   ```bash
   npm install
   ```

2. 환경 변수 설정
   - `.env` 파일에 Google OAuth 클라이언트 ID와 YouTube API 키를 설정합니다.

3. 개발 서버 실행
   ```bash
   npm run dev
   ```

4. API 프록시 서버 실행
   ```bash
   npm run serve-api
   ```

## 참고

이 프로젝트는 OAuth 로그인 이후 사용자의 YouTube 활동 데이터를 활용해 "좋아요" 표기와 관련된 분석 흐름을 구현하는 것을 목표로 합니다.
