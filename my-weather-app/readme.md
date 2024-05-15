## #2 WEATHER APP

#### 사용자의 위치에 따른 16일간의 기상 예보 날씨 어플

- 사용자의 좌표를 이용하여 사용자의 위치에 따른 날씨 API를 사용해 도시 이름, 온도, 습도 등의 일기예보 정보를 가져와 보여주는 기능

- nomadcoders 2024.04 ~

#### 배우는 이론
- React Native Foundations
- Styles on React Native
- Font Icons
- Data Fetching
- Permissions
- Inputs
- Async Storage
- React Native Web

#### 구현하는 기능 
- Weather App
- To Do App
- Phone Geolocation
- Address Geocoding
- Data Fetching
- Responsive Design
- User Input
- Disk Persistance

#### 패키지
- "React"
- "React Native"
- "React Native Web"
- "Open Weather API"

<br>

---

### #2.1 The Rules of Native

- div 대신 view 태그 사용하며 import 해야함.
- 모든 텍스트는 text component 안에 있어야 함.
    - 브라우저가 아니기 때문에 h1, p, span 태그 등 사용 X
- StyleSheet.create를 쓰거나 object 만들거나, 태그 자체에 style 주기
    - StyleSheet.create 사용 또는 태그 자체에 스타일 줄때만 자동 완성 사용가능
- 웹에서 쓰던 css를 모두 쓸 수 없음.

my-weather-app/App.js
```js
import { StatusBar } from 'expo-status-bar';// 최상단 상태 바(시간, 와이파이, 배터리 등)
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello</Text>
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 28,
    color: "black",
  },
});
```

<img src="https://github.com/1GYOU1/MyWeatherApp/assets/90018379/3f83ff16-150d-4db4-aaa1-d4b2270144d7" style="width:300px"/>

statusBar dark 테마

<img src="https://github.com/1GYOU1/MyWeatherApp/assets/90018379/addea3a9-7124-4a45-bdc1-0de7c1ef37c6" style="width:300px"/>

statusBar light 테마

<img src="https://github.com/1GYOU1/MyWeatherApp/assets/90018379/8c57917b-2e1c-4fd8-b6e5-09dae90566e6" style="width:300px"/>

<br>

### style 작성 방법
1. 상단 App.js에 쓰인 코드처럼 사용. 
- StyleSheet.create
- 자동 완성 기능 사용 가능

사용 예시
```js
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello</Text>
    </View>∂
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: 'center',
    justifyContent: 'center',
  }
});
```

<br>

2. 태그에 style 적용 
- 자동 완성 기능 사용 가능

사용 예시
```js
export default function App() {
  return (
    <View style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: 'center'
    }}>
      <Text style={{
        fontSize: 28,
        color: "black"
      }}
        >
        Hello</Text>
      <StatusBar style="dark" />
    </View>
  );
}
```

<br>

3. StyleSheet.create 사용 X
- 자동 완성 기능 X

사용 예시
```js
const styles = {
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 28,
    color: "black",
  },
};
```

<br>

4. ES6 문법 사용
```js
<View style={{ ...styles.day, alignItems: "center" }}></View>
```

<br>

### #2.3 Third Party Packages

react-native component와 Api

component
- 화면에 렌더링할 항목
- return 안에 있는 것
- ex) < view />
- https://reactnative.dev/docs/components-and-apis

api
- 자바스크립트 코드
- ex) Vibration 휴대폰 진동 기능
- https://reactnative.dev/docs/accessibilityinfo

Expo SDK
- Expo 팀에서 자체적으로 packages와 apis를 만듬
- React native packages를 찾을 수 없다면 Expo Packages 또는 Api 쓰면 됨
- https://docs.expo.dev/versions/latest/

<br>

### #2.4 Layout System

- 모든 view는 flex container
- flexDirection의 기본 값은 column
- 부모 flex box를 기준으로 children box의 비율을 정할 수 있음.

사용 예시
```js
import React from "react";
import { View } from "react-native";

export default function App() {
  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <View style={{ flex: 1, backgroundColor: "lightpink" }}></View>
      <View style={{ flex: 1, backgroundColor: "lemonchiffon" }}></View>
      <View style={{ flex: 1, backgroundColor: "lavender" }}></View>
    </View>
  );
}
```

<img src="https://github.com/1GYOU1/MyWeatherApp/assets/90018379/694268bb-7604-42ce-8945-8138f6f39be6" style="width:300px"/>

<br>

### #2.5 Styles

npm start 후 터미널에서 주로 쓰이는 명령어들

```
› Using Expo Go
› Press s │ switch to development build

› Press a │ open Android
› Press i │ open iOS simulator
› Press w │ open web

› Press j │ open debugger ★★★★★ 웹 console창 열기 
› Press r │ reload app ★★★★★
› Press m │ toggle menu ★★★★★ 또는 휴대폰 흔들기
› Press o │ open project code in your editor

› Press ? │ show all commands
```

<br>

### #2.6 Styles part Two

- 스크롤 기능 넣으려면 ScrollView Component 사용해야함.
  - 브라우저가 아니기 때문에 자동으로 스크롤 기능이 생기지 않음.
  - https://reactnative.dev/docs/scrollview

- 기기의 전체 화면 크기 width 값 불러오는 API - https://reactnative.dev/docs/dimensions

- ScrollView의 props인 pagingEnabled는 자동 스크롤을 방지해주고 대신 페이지가 생기도록 해줌.
  - https://reactnative.dev/docs/scrollview#pagingenabled

- ScrollView는 contentContainerStyle로 style 변경.

<br>

my-weather-app/App.js

사용예시
```js
import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, Dimensions, StyleSheet, ScrollView } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
// 기기의 화면 크기 width 값 불러오는 API

export default function App() {
  return (
      /* ... 생략 */
		<ScrollView
			pagingEnabled /* 페이징 기능 */
			horizontal /* 가로 스크롤 */
      // indicatorStyle="white" ios에서는 스크롤 바 색상 변경 가능. aos는 지원 X
			showsHorizontalScrollIndicator={false} /* 스크롤 바 숨기기 */
			contentContainerStyle={styles.weather} /* ScrollView style 변경 */
		>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  /* ... 생략 */
  day: {
	width: SCREEN_WIDTH, // 디바이스 기기 화면 width 값
    alignItems: "center",
  },
  /* ... 생략 */
});
```

<br>

### #2.7 Location

유저의 위치정보 가져오기 - https://docs.expo.dev/versions/latest/sdk/location/

1. expo-location 설치

>$ expo install expo-location

2. 최상단 import 추가, 선언 변수 셋팅

```js
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
/* ... 생략 */
export default function App() {
  const [location, setLocation] = useState();
 	const [ok, setOk] = useState(true);
 	const ask = async => {	
  }

 	useEffect(() => {
    ask();
  }, [])
}
```

3. 위치 권한 요청하기
requestPermossionsAsync() 권한 요청 메서드가 현재 사용 불가하여 하단 메서드 둘 중 하나 선택하여 사용
- requestBackground - 항상 허용
- requestForeground - 엡 사용 중에만 허용

```js
export default function App() {
	
  const [location, setLocation] = useState();
  const [ok, setOk] = useState(true);
  const ask = async () => {
    const permission = await Location.requestForegroundPermissionsAsync();
  };

  useEffect(() => {
    ask();
  }, []);
}
```

4. 사용자의 권한 허용 값 변수 처리

- granted는 권한 허용 여부에 대한 값을 가지고 있는 변수
- true면 권한 허용 동의, false면 권한 허용 거부

```js
const ask = async () => {
  // 권한
  const { granted } = await Location.requestForegroundPermissionsAsync();// 앱 사용 중에만 허용
  if (!granted) { // 허가를 받지 않았다면
    setOk(false);
  }
};
```

5. 사용자의 위치 정보 가져오기

    1) getCurrentPositionAsync 메서드로 사용자의 경도, 위도 값 구해서 정보를 요청.
    2) reverseGeocodeAsync 메서드 사용하여 구한 경도, 위도 값, 구글맵 사용 여부 넘기기.

```js
const {
  coords: { latitude, longitude },
} = await Location.getCurrentPositionAsync({ accuracy: 5 });
// 공식 문서에 따라 경도, 위도, 구글맵 사용 여부 값을 넘겨야 함.
const location = await Location.reverseGeocodeAsync(
  { latitude, longitude },
  { useGoogleMaps: false }
);
// 내가 있는 위치의 도시명
setCity(location[0].city);
```

<br>

6. 화면에 위치 값 출력하기

```js
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, Dimensions, StyleSheet, ScrollView } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window"); // 기기의 화면 크기 width 값 불러오는 API

export default function App() {

	const [city, setCity] = useState("Loading...");
	const [location, setLocation] = useState(); // 사용자 위치 정보 저장
	const [ok, setOk] = useState(true);
	const ask = async () => {
	  const { granted } = await Location.requestForegroundPermissionsAsync();// 앱 사용 중에만 허용
	  if (!granted) { // 허가를 받지 않았다면
		setOk(false);
	  }
	  const {
		coords: { latitude, longitude },
	  } = await Location.getCurrentPositionAsync({ accuracy: 5 });
	   // 공식 문서에 따라 경도, 위도, 구글맵 사용 여부 값을 넘겨야 함.
	  const location = await Location.reverseGeocodeAsync(
		{ latitude, longitude },
		{ useGoogleMaps: false }
	  );
	  setCity(location[0].city);
	};
	useEffect(() => {
	  ask();
	}, []);	

	return (
		<View style={styles.container}>
			<StatusBar style="light"/>
			<View style={styles.city}>
				<Text style={styles.cityName}>{city}</Text>
			</View>
			<ScrollView>
      	{/* 코드 생략 */}
			</ScrollView>
		</View>
	);
}

/* 코드 생략 */
```

<img src="https://github.com/1GYOU1/MyWeatherApp/assets/90018379/5d741bdd-fff0-4f6b-a03f-de4ef3a705e6" style="width:300px"/>

<br>

### #2.8 Weather

무료 API 사용 
- https://openweathermap.org/ 가입 후 API key 발급
  - 무료 API는 2가지가 있음, 2번 사용
    1. Current Weather
    2. 3-hour Forecast 5 days 5일간 3시간 간격 예측
- 위도와 경도, API Key 필수

<br>

API call 예시
```js
api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}
```

적용<br>
my-weather-app/App.js
```js
const [days, setDays] = useState([]); // 일기예보 array 저장

const response = await fetch(
  `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
);
const json = await response.json();
setDays(
  json.list.filter((weather) => {
    if (weather.dt_txt.includes("03:00:00")) {// "00:00:00"는 표준시 00시를 기준, 한국은 표준시보다 9시간을 더해야함. 따라서 한국의 정오(낮 12시)로 설정하려면 "03:00:00"으로 설정
      return weather;
    }
  })
);
```

<br>

ActivityIndicator 로딩 아이콘 component
- https://reactnative.dev/docs/activityindicator

my-weather-app/App.js
```js
<ActivityIndicator
  color="white"
  style={{ marginTop: 10 }}
  size="large"
/>{/* 로딩 애니메이션 */}
```

<br>

### API_KEY .env로 숨기기 (ios)

#### 1. env 파일 추가하기

파일 경로 - my-weather-app/.env
```js
// env 파일 작성 예시
API_KEY=abcdefgabcdefgabcdefg
```

파일 경로 - my-weather-app/.gitignore
#### 2. gitignore 파일에 env 추가

```
.env
```

#### 2. 둘 중 하나 설치
>$ npm install react-native-dotenv

>$ yarn add react-native-dotenv

#### 3. babel.config.js 수정하기
파일 경로 - my-weather-app/babel.config.js
```js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [ // 여기부터 추가
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
    ],
  };
};

```

#### 4. 환경변수 import

파일 경로 - my-weather-app/App.js
```js
import { API_KEY } from "@env";
// babel.config.js파일에서 모듈네임을 @env로 설정했기 때문에 @env에서 불러온다.
// 모듈네임을 설정하지 않은 경우에는 import { API_KEY } from 'react-native-dotenv;

const response = await fetch(
  `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`
);
```

#### 5. 타입스크립트 기반이라면
env.d.ts 파일을 루트에 만들고 아래와 같이 타입 지정을 해주지 않으면 에러 발생한다고 함. 참고 하기 !

파일 경로 - my-weather-app/.env.d.ts
```js
declare module '@env' {
  export const API_KEY: string;
}
```

참고 사이트- https://velog.io/@chloedev/React-Native-%EB%A6%AC%EC%95%A1%ED%8A%B8%EB%84%A4%EC%9D%B4%ED%8B%B0%EB%B8%8C%EC%97%90%EC%84%9C-%ED%99%98%EA%B2%BD%EB%B3%80%EC%88%98-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0

<br>

### #2.10 Icons

expo를 사용해서 앱을 만들었다면, "@expo/vector-icons"가 설치되어 있음.

- https://icons.expo.fyi/Index

사용법

<img src="https://github.com/1GYOU1/MyWeatherApp/assets/90018379/f06a297f-670c-4eb3-8246-8338432fa485" style="width:500px"/>

my-weather-app/App.js 최상단에 import
```js
import { Fontisto } from "@expo/vector-icons";
```

여러가지 아이콘을 사용하기 위해 name을 object에서 가져오도록 수정.
```js
const icons = {
	Clouds: "cloudy",
	Clear: "day-sunny",
	Atmosphere: "cloudy-gusts",
	Snow: "snow",
	Rain: "rains",
	Drizzle: "rain",
	Thunderstorm: "lightning",
};

<Fontisto
  name={icons[day.weather[0].main]}
  size={50}
  color="pink"
/>
```

<br>

---
my-weather-app/App.js - 최종
```js
import { API_KEY } from '@env';

import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	Dimensions,
	ActivityIndicator,
	StyleSheet,
	ScrollView,
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Fontisto } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window"); // 기기의 화면 크기 width 값 불러오는 API

const icons = {
	Clouds: "cloudy",
	Clear: "day-sunny",
	Atmosphere: "cloudy-gusts",
	Snow: "snow",
	Rain: "rains",
	Drizzle: "rain",
	Thunderstorm: "lightning",
};

export default function App() {

	const [city, setCity] = useState("Loading...");
	const [days, setDays] = useState([]);
	const [ok, setOk] = useState(true);
	const getWeather = async () => {
	  const { granted } = await Location.requestForegroundPermissionsAsync();// 앱 사용 중에만 허용
	  if (!granted) { // 허가를 받지 않았다면
		setOk(false);
	  }
		const {
			coords: { latitude, longitude },
		} = await Location.getCurrentPositionAsync({ accuracy: 5 });
		// 공식 문서에 따라 경도, 위도, 구글맵 사용 여부 값을 넘겨야 함.
		const location = await Location.reverseGeocodeAsync(
			{ latitude, longitude },
			{ useGoogleMaps: false }
		);
		setCity(location[0].city);
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
		);
		const json = await response.json();
		setDays(
			json.list.filter((weather) => {
				if (weather.dt_txt.includes("03:00:00")) {// "00:00:00"는 표준시 00시를 기준, 한국은 표준시보다 9시간을 더해야함. 따라서 한국의 정오(낮 12시)로 설정하려면 "03:00:00"으로 설정
					return weather;
				}
			})
		);
	};

	useEffect(() => {
		getWeather();
	}, []);	

	return (
		<View style={styles.container}>
			<StatusBar style="light"/>
			<View style={styles.city}>
				<MaterialIcons name="place" size={35} color="pink" />
				<Text style={styles.cityName}>{city}</Text>
			</View>
			<ScrollView
				pagingEnabled /* 페이징 기능 */
				horizontal /* 가로 스크롤 */
				showsHorizontalScrollIndicator={false} /* 스크롤 바 숨기기 */
				// indicatorStyle="white" ios에서는 스크롤 바 색상 변경 가능. aos는 지원 X
				contentContainerStyle={styles.weather}
			>
				{days === undefined ? (
			   		<View style={{ ...styles.day, alignItems: "center" }}>
						<ActivityIndicator
							color="white"
							style={{ marginTop: 10 }}
							size="large"
						/>{/* 로딩 애니메이션 */}
					</View>
					) : (
					days.map((day, index) => (
						<View key={index} style={styles.day}>
							<Text 
							style={{
								color: "pink",
								fontSize: 32,
								width:"100%",
								textAlign:"center",
								fontWeight:"500",
								paddingBottom:"1.5%"
							}}>
								{/* 날짜 */}
								{new Date(day.dt * 1000).toString().substring(0, 10)}
							</Text>
							 <View
								style={{
								flexDirection: "row",
								width: "100%",
								justifyContent: "center",
								marginLeft:"3%"
								}}
							>
								<Text style={styles.temp}>
								{parseFloat(day.main.temp).toFixed(1)}{/* 온도 소수점 한자리수까지만 노출 */}
								</Text>
								{/* 날씨 아이콘 */}
								<Fontisto
								name={icons[day.weather[0].main]}
								size={35}
								color="pink"
								/>
							</View>
							<Text style={styles.description}>
								{day.weather[0].main}
							</Text>{/* 날씨 */}
							<Text style={styles.tinyText}>
								{day.weather[0].description
							}</Text>{/* 날씨 설명 */}
						</View>
					))
				)}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  city: {
    flex: 1.1,
	flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
	marginTop:30,
	marginLeft:-15,
  },
  cityName: {
    fontSize: 36,
    fontWeight: "500",
	color: "pink",
  },
  weather: {},
  day: {
	width: SCREEN_WIDTH,
    paddingHorizontal: 20,
  },
  temp: {
	fontWeight: "600",
    fontSize: 100,
	color: "pink"
  },
  description: {
	marginTop: 3,
    fontSize: 45,
	color: "pink",
	fontWeight: "500",
	width:"100%",
	textAlign:"center"
  },
  tinyText: {
	marginTop: 2,
    fontSize: 20,
	color: "pink",
	fontWeight: "400",
	width:"100%",
	textAlign:"center"
  },
});
```

<br>

최종 화면 - iphone

<img src="https://github.com/1GYOU1/MyWeatherApp/assets/90018379/16e49911-0f06-4a5f-8ad5-5733d0e53832" style="width:300px"/>

<br>

<img src="https://github.com/1GYOU1/MyWeatherApp/assets/90018379/992d7e7a-f9e1-4b89-9e5d-5f717bd38ce9" style="width:600px"/>

ios, aos 애뮬레이터, 시뮬레이터로 실행해본 결과,
.env 파일이 aos에서 제대로 작동되지 않는 오류가 있었다 ㅠ_ㅜ

<br>

<img src="https://github.com/1GYOU1/MyWeatherApp/assets/90018379/816436e6-1938-49bf-8890-c119f4dc4b2a" style="width:600px"/>

++ update ) 2024-05-15 기준 
<br> SDK 51로 업데이트 되고나서 실행해보니 정상적으로 동작하는 중 !

### react-native eas 배포

#### 1. 최신 EAS CLI 설치
>$ npm install -g eas-cli

#### 2. expo 계정에 로그인

>$ npx expo login

>$ npx eas login

#### 3. 프로젝트 구성

>$ npx eas build:configure

#### 4. 빌드 실행 (스토어 배포용)

build가 완료되면, expo 사이트 > 생성한 프로젝트 > build 된 내 앱을 확인 가능

>$ npx eas build --platform android

>$ npx eas build --platform ios

>$ npx eas build --platform all

#### 5. 빌드 리스트 확인

>$ npx eas build:list

#### 6. 빌드 배포

>$ npx eas update

#### 7. expo 사이트 > 생성한 프로젝트 > 사이드 메뉴 맨 밑 "Settings"에서 "Project Privacy"를 `Public`으로 설정

#### 8. update가 끝나면 Website link 클릭, 사이트 우측 상단에 Preview QR 확인.

<br>

참고 url - https://docs.expo.dev/build/setup/

<br>

---

++)2024-05-14 update

<img src="https://github.com/1GYOU1/MyWeatherApp/assets/90018379/86254cec-672e-41a9-bfaf-13818be6ae07" style="width:300px;">

최근 Expo Go 어플로 프로젝트 build 시켜놓은 플젝들이 상단 화면처럼 나와서 
<br>SDK 51로 업그레이드를 시키라길래 해봤다 !

1. 프로젝트 폴더 열고 하단 명령어 입력
>$ npx expo install expo@^51.0.0 --fix

2. 혹시 몰라 하단 명령어도 설치
>$ npx expo-doctor@latest

3. 프로젝트 실행하고 ios, aos에서도 추천하는 버전 설치
>$ npm start

>$ i

>$ a

4. yes ! 선택
```
✔ Expo Go 2.31.2 is recommended for SDK 51.0.0 
Install the recommended Expo Go version? … yes
```

++) ios expo 버전 설치하다가 이런 오류가 나왔는데 냅다 패키지 설치

<img src="https://github.com/1GYOU1/MyWeatherApp/assets/90018379/5d363c52-f536-4a11-bf70-23af3a93f297"/>

<br>

5. 다시 expo에 배포

>$ npx eas update

<br>

참고 사이트 - https://expo.dev/changelog/2024/05-07-sdk-51
