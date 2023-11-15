import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";

const ListenAgain = ({item }) => {
  return (
    <View>
      <TouchableOpacity style={{justifyContent:"center",alignItems:"center",marginHorizontal:5,marginVertical:10}}>
        <Image
          source={require(`../img/${item.img}`)}
          style={{
            width: 115,
            height: 115,
            resizeMode: "contain",
            borderRadius: 10,
          }}
        ></Image>
        <Text style={{fontSize:13,color:'white',fontStyle:'normal'}}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ListenAgain;

const styles = StyleSheet.create({});
