import "react-native-gesture-handler";

import React from "react";
import ReduxThunk from "redux-thunk";
import { applyMiddleware, combineReducers, createStore } from "redux";
import PlacesNavigator from "./navigation/PlacesNavigator";
import placesReducer from "./store/reducers/placesReducer";
import { Provider } from "react-redux";

import { init } from "./helpers/db";

init()
  .then(() => {
    console.log("Initialized Database!");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

const PlacesReducer = combineReducers({
  places: placesReducer,
});

const Store = createStore(PlacesReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={Store}>
      <PlacesNavigator />
    </Provider>
  );
}
