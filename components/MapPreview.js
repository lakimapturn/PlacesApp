import React from "react";
import { StyleSheet, View } from "react-native";

import MapView, { Marker } from "react-native-maps";

const MapPreview = (props) => {
  console.log(props.location);
  return (
    <View>
      {!props.location ? (
        props.children
      ) : (
        <MapView
          region={{
            ...props.location,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          style={{ width: 300, height: 150 }}
        >
          <Marker coordinate={props.location} />
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MapPreview;
