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