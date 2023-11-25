import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";

const MixedCard = ({item}) => {
  return (
    <View>
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 5,
          marginVertical: 10,
        }}
      >
        <Image
          source={require(`../img/${item.img}`)}
          style={{
            width: 177,
            height: 177,
            resizeMode: "contain",
            borderRadius: 10,
          }}
        ></Image>
      </TouchableOpacity>
    </View>
  );
};

export default MixedCard;

const styles = StyleSheet.create({});
