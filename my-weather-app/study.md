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

결과 화면