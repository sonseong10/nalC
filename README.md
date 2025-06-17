# 🌤️ nalC - 날씨 정보 웹앱

`nalC`는 사용자 위치 기반으로 현재 날씨와 예보를 확인할 수 있는 간단하고 직관적인 날씨 앱입니다.  
Vite + TypeScript 기반으로 빠르고 가볍게 제작되었습니다.

![demo](https://user-images.githubusercontent.com/your-demo-gif.gif) <!-- optional: 데모 이미지 -->

---

## 🚀 배포 주소

👉 [nalC 바로가기](https://your-username.github.io/nalC)

---

## 🛠️ 사용 기술 스택

| 기술 | 설명 |
|------|------|
| **React** | 사용자 UI CSR 구성 |
| **TypeScript** | 날씨 API res 정보 타입으로 안정성 확보 |
| **Vite** | 번들링 및 개발 서버 |
| **GitAction&GithubPages** | Releases `27 tags`로 배포 버전관리 |
| **vanilla-extract/css** | 모듈 단위 스타일링 |
| **[공공데이터포탈 API](https://www.data.go.kr/index.do)** | 국내 실시간 날씨 데이터 제공 |

---

## 📂 프로젝트 구조

```besh
src/
├── assets/ # 이미지 등 정적 자산
├── components/ # 공통 컴포넌트
├── hooks/ # 커스텀 훅
├── pages/ # 페이지 단위 컴포넌트
├── services/ # API 호출
├── styles/ # 글로벌 스타일
├── utils/ # 유틸리티 함수
└── main.tsx # 진입 파일
```

## 📂 핵심 구조
1. `commit`시 자동배포가 아닌 tag를 추가하여 자동배포 방식으로 개발중 배포되는 현상을 제어 버전관리 용이

> // ~/.github/workflows/deploy.yml

```besh
on:
  push:
    tags:
      - 'v*' # v로 시작하는 태그 (예: v1.0.0)
  workflow_dispatch:
```

2. API통신 데이터 + 사용자 화면용 타입 결합 및 정의 (유니온타입 개선필요)
```ts
interface ForecastItem {
  baseDate: string;
  baseTime: string;
  category: string;
  fcstDate: string;
  fcstTime: string;
  fcstValue: string;
  nx: number;
  ny: number;
}

// Display vlaue로 사용자 화면단에 필요한 타입정의
interface ForecastGroup extends ForecastItem {
  isNight?: boolean;
  dayLabel: "오늘" | "내일" | "모레";
  timeLabel: string;
}

interface IHourlyWeatherProps {
  status: {
    latitude: number;
    longitude: number;
  } | null;
}
```

3.  Web API 중 `Geolocation` API를 활용하여 사용자 위치 정보 획득 및 이용불가 서비스인경우 경복궁 좌표로 initialization을 진행함

```tsx
const getLocation = () => {
    // Geolocation API 지원 여부 확인
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({
            longitude,
            latitude,
          });
        },
        (error) => {
          switch (error.code) {
            case 1:
              console.warn("사용자가 거부");
              break;
            case 2:
              console.error("시스템오류");
              break;
            case 3:
              console.warn("타임아웃");
              break;
          }
          setLocation({
            latitude: 37.575,
            longitude: 126.973,
          }); // 경북궁 좌표;
        },
        {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 30000,
        }
      );
    } else {
      console.error("위치서비스 브라우저 미지원");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);
```

## 개선점

- [ ] typescript를 사용하지만 jsDoc으로 파라미터나 프로퍼티를 정의하여 추후 유지보수 필요시 도움을 받을 수 있도록 개선해야합니다.
- [ ] 컴포넌트와 커스텀Hook 분리로 비지니스 로직과 분리하여 관리해야 합니다.
