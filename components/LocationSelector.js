import React, { useEffect, useState } from "react";
import { View, Button, Text, Alert, StyleSheet } from "react-native";
import * as Location from "expo-location";

import Colors from "../Constants/Colors";
import MapPreview from "./MapPreview";

const LocationSelector = (props) => {
  const [location, setLocation] = useState();

  const userSelectedLocation = props.route.params
    ? props.route.params.userSelectedLocation
    : "";

  useEffect(() => {
    setLocation(userSelectedLocation);
    props.onLocationSelected(userSelectedLocation);
  }, [userSelectedLocation]);

  const getPermissions = async () => {
    const response = await Location.requestForegroundPermissionsAsync();
    if (response.status !== "granted") {
      Alert.alert(
        "Oops!",
        "We require location permissions to carry out this function!",
        [{ text: "Okay!" }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await getPermissions();
    if (!hasPermission) return;

    try {
      const selectedLocation = await Location.getCurrentPositionAsync({
        timeout: 5000,
      }); // throws an error if not completed in 5 seconds

      setLocation({
        latitude: selectedLocation.coords.latitude,
        longitude: selectedLocation.coords.longitude,
      });

      props.onLocationSelected({
        latitude: selectedLocation.coords.latitude,
        longitude: selectedLocation.coords.longitude,
      });
    } catch (err) {
      Alert.alert("Could Not Fetch Location!", "Try Again Later!", [
        { text: "Okay!" },
      ]);
    }
  };

  const pickOnMapHandler = () => {
    props.navigation.navigate("Map");
  };

  return (
    <View style={styles.locationSelector}>
      <View style={styles.mapPreview}>
        <MapPreview
          location={userSelectedLocation ? userSelectedLocation : location}
        >
          <Text>No Location Selected!</Text>
        </MapPreview>
      </View>
      <View style={styles.actions}>
        <Button
          title="Select Location"
          color={Colors.primary}
          onPress={getLocationHandler}
        />
        <Button
          title="Pick on Map"
          color={Colors.primary}
          onPress={pickOnMapHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationSelector: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default LocationSelector;
