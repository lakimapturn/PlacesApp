import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { Colors } from "react-native/Libraries/NewAppScreen";

const HeaderButton = (props) => {
  return (
    <TouchableOpacity style={{ marginRight: "5%" }}>
      <FontAwesome5Icon
        {...props}
        name="plus"
        size={23}
        style={{ color: Colors.primary }}
      />
    </TouchableOpacity>
  );
};

export default HeaderButton;
