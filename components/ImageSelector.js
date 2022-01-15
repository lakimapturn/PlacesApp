import React, { useState } from "react";
import { View, Button, Text, StyleSheet, Alert, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
// import * as Permissions from "expo-permissions";

import Colors from "../Constants/Colors";

const ImageSelector = (props) => {
  const [image, setImage] = useState();

  const getPermissions = async () => {
    const response = await ImagePicker.requestCameraPermissionsAsync();
    if (response.status !== "granted") {
      Alert.alert(
        "Oops!",
        "We require camera permissions to carry out this function!",
        [{ text: "Okay!" }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await getPermissions(); //ImagePicker.getMediaLibraryPermissionsAsync
    if (!hasPermission) return;

    const pickedImage = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.5, // any value between 0.5
      aspect: [16, 9],
    });

    setImage(pickedImage.uri);
    props.onImageTaken(pickedImage.uri);
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!image ? (
          <Text>No Image Picked Yet!</Text>
        ) : (
          <Image style={styles.image} source={{ uri: image }} />
        )}
      </View>
      <Button
        title="Take Image"
        color={Colors.primary}
        onPress={takeImageHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImageSelector;
