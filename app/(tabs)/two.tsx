import { Alert, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

export default function TabTwoScreen() {
  const [rootInfo, setRootInfo] = useState<{
    distance: string;
    duration: string;
  }>();

  const start = { latitude: 35.91098804422327, longitude: 139.9563367447037 };
  const goal = {
    latitude: 35.89558857951504,
    longitude: 139.94060827149445,
  };

  const handleDirectionsReady = (result: { distance: any; duration: any }) => {
    const distance = `${Math.round(result.distance * 10) / 10} Km`;
    const duration = `${Math.round(result.duration)} min`;
    setRootInfo({ distance, duration });

    console.log(`距離: ${distance}, 所要時間: ${duration}`);
  };

  return (
    <>
      <View style={styles.container}>
        <>
          <Text style={styles.title}>
            Map-1(柏たなか駅～公園) {rootInfo?.distance} {rootInfo?.duration}
          </Text>
        </>
      </View>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: start.latitude,
          longitude: start.longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        }}
      >
        <MapViewDirections
          origin={start}
          destination={goal}
          apikey=""
          onReady={handleDirectionsReady}
          strokeWidth={4}
          strokeColor="hotpink"
        />

        <Marker
          coordinate={start}
          onPress={() => {
            Alert.alert("start!");
          }}
        />
        <Marker
          coordinate={goal}
          onPress={() => {
            Alert.alert("goal!");
          }}
        />
      </MapView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
