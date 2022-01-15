import React, { useEffect } from "react";
import { FlatList, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import PlaceItem from "../components/PlaceItem";
import { loadPlaces } from "../store/actions/placesActions";

const PlacesListScreen = (props) => {
  const places = useSelector((state) => state.places.places);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPlaces());
  }, [dispatch]);

  onPlaceSelectHandler = (placeId, placeTitle) => {
    props.navigation.navigate("Place Details", {
      place: { title: placeTitle },
      placeId: placeId,
    });
  };

  return (
    <FlatList
      keyExtractor={(item) => item.id}
      data={places}
      renderItem={({ item }) => {
        console.log(item);
        return (
          <PlaceItem
            id={item.id}
            image={item.imageUri}
            title={item.title}
            address={item.address}
            onSelect={onPlaceSelectHandler}
          />
        );
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default PlacesListScreen;
