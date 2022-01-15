import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import MapScreen from "../screens/MapScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import PlaceDetailsScreen from "../screens/PlaceDetailScreen";
import PlacesListScreen from "../screens/PlacesListScreen";

import HeaderButton from "../components/HeaderButton";
import { Text, TouchableOpacity } from "react-native";

const PlacesNavigator = createStackNavigator();

const PlacesNavigatorScreen = () => {
  return (
    <NavigationContainer>
      <PlacesNavigator.Navigator>
        <PlacesNavigator.Screen
          name="Places"
          component={PlacesListScreen}
          options={(navData) => {
            return {
              headerRight: () => (
                <HeaderButton
                  onPress={() => navData.navigation.navigate("Add Place")}
                />
              ),
            };
          }}
        />
        <PlacesNavigator.Screen name="Map" component={MapScreen} />
        <PlacesNavigator.Screen
          name="Place Details"
          component={PlaceDetailsScreen}
          options={(route) => ({
            headerTitle: route.route.params.place.title,
          })}
        />
        <PlacesNavigator.Screen name="Add Place" component={NewPlaceScreen} />
      </PlacesNavigator.Navigator>
    </NavigationContainer>
  );
};

export default PlacesNavigatorScreen;
