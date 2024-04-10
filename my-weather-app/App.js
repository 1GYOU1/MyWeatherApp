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
		`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`
	  );
	  const json = await response.json();
	  setDays(json.daily);
	};
	useEffect(() => {
		getWeather();
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
				{days === undefined ? (
			   		<View style={{ ...styles.day, alignItems: "center" }}>
						<ActivityIndicator
							color="white"
							style={{ marginTop: 10 }}
							size="large"
						/>
					</View>
					) : (
					days.map((day, index) => (
						<View key={index} style={styles.day}>
							 <View
								style={{
								flexDirection: "row",
								alignItems: "center",
								width: "100%",
								justifyContent: "space-between",
								}}
							>
								<Text style={styles.temp}>
								{parseFloat(day.temp.day).toFixed(1)}
								</Text>
								<Fontisto
								name={icons[day.weather[0].main]}
								size={50}
								color="pink"
								/>
							</View>
							<Text style={styles.description}>{day.weather[0].main}</Text>
							<Text style={styles.tinyText}>{day.weather[0].description}</Text>
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 38,
    fontWeight: "500",
	color: "pink"
  },
  weather: {},
  day: {
	width: SCREEN_WIDTH,
    alignItems: "center",
	alignItems: "flex-start",
    paddingHorizontal: 20,
  },
  temp: {
    marginTop: 50,
	fontWeight: "600",
    fontSize: 100,
	color: "pink"
  },
  description: {
	marginTop: -10,
    fontSize: 30,
	color: "pink",
	fontWeight: "500",
  },
  tinyText: {
	marginTop: -5,
    fontSize: 20,
	color: "pink",
	fontWeight: "500",
  },
});