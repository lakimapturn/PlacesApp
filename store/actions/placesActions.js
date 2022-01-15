import * as FileSystem from "expo-file-system";
import { insertPlace, fetchPlaces } from "../../helpers/db";
import * as Location from "expo-location";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "GET_PLACES";

export const addPlace = (title, image, location) => {
  return async (dispatch) => {
    const fileName = image.split("/").pop(); // returns the filename from the image string
    const filePath = FileSystem.documentDirectory + fileName;
    try {
      await FileSystem.moveAsync({ from: image, to: filePath });

      let address = await Location.reverseGeocodeAsync({
        longitude: location.longitude,
        latitude: location.latitude,
      });
      console.log(address[0]);
      address = address[0]["city"] + ", " + address[0]["country"];

      const dbResult = await insertPlace(
        title,
        filePath,
        address,
        location.latitude,
        location.longitude
      );
      console.log(dbResult);

      dispatch({
        type: ADD_PLACE,
        payload: {
          id: dbResult.insertId,
          title: title,
          image: filePath,
          address: address,
          coords: location,
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchPlaces();

      // console.log(dbResult);

      return dispatch({
        type: SET_PLACES,
        payload: { places: dbResult.rows._array },
      });
    } catch (err) {
      throw err;
    }
  };
};
