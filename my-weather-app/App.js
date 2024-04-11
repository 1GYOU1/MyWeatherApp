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