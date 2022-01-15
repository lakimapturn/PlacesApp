import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Location from "expo-location";

import MapView, { Marker } from "react-native-maps";
import Colors from "../Constants/Colors";

const MapScreen = (props) => {
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 42,
    longitude: -122,
  });

  useEffect(() => {
    getCurrentLocation();
  }, [props]);

  const getCurrentLocation = async () => {
    const hasPermission = await Location.requestForegroundPermissionsAsync();
    if (hasPermission) {
      const userLocation = await Location.getCurrentPositionAsync();
      await setSelectedLocation({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      });
    }
  };

  const onSelectLocationHandler = (event) => {
    // setSelectedLocation({
    //   latitude: event.nativeEvent.coordinate.latitude,
    //   longitude: event.nativeEvent.coordinate.longitude,
    // });
    saveSelectedLocationHandler({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };

  const saveSelectedLocationHandler = (location) => {
    return props.navigation.navigate("Add Place", {
      userSelectedLocation: location,
    });
  };

  return (
    <MapView
      region={{ ...selectedLocation, longitudeDelta: 0.1, latitudeDelta: 0.1 }}
      style={styles.map}
      onPress={onSelectLocationHandler}
    >
      <Marker title="Selected Location" coordinate={selectedLocation} />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  headerButton: {
    marginHorizontal: 20,
  },
  headerButtonText: {
    fontSize: 16,
    color: Colors.primary,
  },
});

export default MapScreen;
