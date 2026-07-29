# AIRO 원페이지 사이트 (Next.js)

AI 교육 브랜드 **AIRO**(대표 권용명)의 원페이지 랜딩 사이트입니다.
기존 저장소 루트의 정적 배포본(`/index.html`, `/assets`)은 그대로 두고, 이 `web/`
디렉터리에 React/Next.js 소스를 새로 구성했습니다.

## 기술 스택

| 항목 | 선택 |
| --- | --- |
| 프레임워크 | Next.js 15 (App Router) |
| 라이브러리 | React 19 |
| 언어 | TypeScript (strict) |
| 스타일 | Tailwind CSS v4 |
| 배포 | 정적 export (`output: "export"`) |

런타임 의존성은 `next` / `react` / `react-dom` 3개뿐이며, 애니메이션·캐러셀 등
추가 라이브러리 없이 구현했습니다. First Load JS는 약 119kB입니다.

## 실행

```bash
cd web
npm install
npm run dev      # http://localhost:3000
npm run build    # out/ 에 정적 파일 생성
npm run typecheck
```

GitHub Pages(`https://<user>.github.io/AIRO`)처럼 하위 경로에 배포할 때는
base path를 지정합니다.

```bash
NEXT_PUBLIC_BASE_PATH=/AIRO npm run build
```

## 페이지 구성 (원페이지 8개 섹션)

| 앵커 | 섹션 | 내용 |
| --- | --- | --- |
| `#home` | 히어로 | 캐치프레이즈, CTA 2종, 핵심 지표 4종(카운트업) |
| `#about` | 강사 소개 | 프로필, AIRO Method 4원칙, **학력·경력 타임라인**, 인증·자격 |
| `#programs` | 강의 프로그램 | 4개 과정 탭 전환 + 단계별(입문·중급·고급) 커리큘럼 |
| `#solutions` | 대상별 솔루션 | 기업 / 정부기관 / 대학 |
| `#portfolio` | 포트폴리오 | 사례 6건 카테고리 필터 + 교육 전후 성과 비교 |
| `#reviews` | 수강 후기 | 후기 8건 |
| `#insights` | 인사이트 | 아티클 6건 + 무료 자료실 3건 |
| `#contact` | 문의하기 | 신청 폼(검증 포함) + 상담 채널 |

## UI/UX 구현 사항

- **반응형**: 모바일(390px) ~ 데스크톱(1440px+). 모바일은 햄버거 메뉴 + 전체화면 패널.
- **스크롤 스파이**: IntersectionObserver로 현재 섹션의 메뉴를 자동 강조(`aria-current`).
- **앵커 오프셋**: `scroll-padding-top`으로 고정 헤더에 가려지지 않도록 보정.
- **진입 애니메이션**: 섹션·카드가 뷰포트 진입 시 페이드업(순차 지연).
- **읽기 진행률 바**와 맨 위로 이동 버튼.
- **접근성**: 시맨틱 마크업, 본문 건너뛰기 링크, 탭 `role`/`aria-selected`,
  폼 오류 `role="alert"` + `aria-describedby`, 포커스 링, ESC로 메뉴 닫기.
- **모션 최소화 존중**: `prefers-reduced-motion: reduce`에서 애니메이션·스무스
  스크롤을 비활성화.
- **레이아웃 안정성**: 카운트업 숫자는 최종값만큼 폭을 미리 확보해 CLS를 방지.

## 콘텐츠 수정

모든 텍스트·목록 데이터는 **`src/data/site.ts` 한 파일**에 모여 있습니다.
컴포넌트를 건드리지 않고 이 파일만 수정하면 전체 페이지에 반영됩니다.

프로필 사진을 넣으려면 이미지를 `public/images/`에 두고
`site.ownerPhoto`에 경로(예: `/images/profile.jpg`)를 지정하면 이니셜 아바타가
사진으로 바뀝니다.

> **주의**: PRD 명세에 따라 학력·경력·인증·성과 지표·사례·후기는 **가상(데모)
> 데이터**입니다. 실제 서비스 전에 `src/data/site.ts`의 내용을 실제 이력으로
> 교체해야 합니다. 푸터에도 해당 고지가 표시됩니다.

## MVP 범위 밖 (후속 과제)

문의 폼은 백엔드 없이 동작합니다. 제출 시 클라이언트 검증 후 접수 확인 화면을
보여주고, 입력 내용을 채운 `mailto:` 링크를 제공합니다. 실제 접수 저장이
필요하면 API 라우트 또는 폼 서비스 연동이 추가로 필요합니다.
(정적 export 모드에서는 API 라우트를 쓸 수 없으므로 배포 방식도 함께 검토해야
합니다.)
