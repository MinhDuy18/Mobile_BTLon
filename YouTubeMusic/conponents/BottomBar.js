import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Foundation } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
const BottomBar = () => {
  return (
    <View style={styles.container}>
    <TouchableOpacity>

    </TouchableOpacity>
      <View style={styles.wrapbar}>
        <TouchableOpacity style={styles.tab}>
          <Foundation name="home" size={24} color="grey" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <MaterialIcons name="explore" size={24} color="grey" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <MaterialIcons name="library-music" size={24} color="grey"/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomBar;

const styles = StyleSheet.create({
  container: {
    height:150,
    backgroundColor:'rgb(34,0,17)',
    justifyContent:"space-between",
    alignItems:"center"
  },
  wrapbar:{
    flexDirection:"row",
    height:32,
    margin:20,
    alignItems:"center",
    justifyContent:"space-between"
  },
  tab: {
    margin:45
  },
});
