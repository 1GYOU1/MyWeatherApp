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
			<ScrollView
				pagingEnabled /* 페이징 기능 */
				horizontal /* 가로 스크롤 */
				showsHorizontalScrollIndicator={false} /* 스크롤 바 숨기기 */
				// indicatorStyle="white" ios에서는 스크롤 바 색상 변경 가능. aos는 지원 X
				contentContainerStyle={styles.weather}
			>
				<View style={styles.day}>
					<Text style={styles.temp}>27</Text>
					<Text style={styles.description}>Sunny</Text>
				</View>
				<View style={styles.day}>
					<Text style={styles.temp}>27</Text>
					<Text style={styles.description}>Sunny</Text>
				</View>
				<View style={styles.day}>
					<Text style={styles.temp}>27</Text>
					<Text style={styles.description}>Sunny</Text>
				</View>
				<View style={styles.day}>
					<Text style={styles.temp}>27</Text>
					<Text style={styles.description}>Sunny</Text>
				</View>
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 38,
    fontWeight: "500",
	color: "pink"
  },
  day: {
	width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temp: {
    // marginTop: 50,
	fontWeight: "600",
    fontSize: 180,
	color: "pink"
  },
  description: {
    marginTop: -30,
    fontSize: 60,
	color: "pink"
  },
});