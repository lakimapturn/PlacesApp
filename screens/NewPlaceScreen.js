import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import { useDispatch } from "react-redux";

import ImageSelector from "../components/ImageSelector";
import { addPlace } from "../store/actions/placesActions";
import Colors from "../Constants/Colors";
import LocationSelector from "../components/LocationSelector";

const NewPlaceScreen = (props) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(); // creates an undefined state
  const [location, setLocation] = useState();

  const dispatch = useDispatch();

  const titleChangeHandler = (text) => {
    setTitle(text);
  };

  const savePlaceHandler = () => {
    dispatch(addPlace(title, image, location));
    props.navigation.navigate("Places");
  };

  const onSelectImageHandler = (image) => {
    setImage(image);
  };

  const onLocationSelectedHandler = (selectedLocation) => {
    setLocation(selectedLocation);
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>New Place Screen</Text>
        <TextInput
          style={styles.textInput}
          value={title}
          onChangeText={titleChangeHandler}
        />
        <ImageSelector onImageTaken={onSelectImageHandler} />
        <LocationSelector
          navigation={props.navigation}
          route={props.route}
          onLocationSelected={onLocationSelectedHandler}
        />
        <Button
          title="Save Place"
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});

export default NewPlaceScreen;
