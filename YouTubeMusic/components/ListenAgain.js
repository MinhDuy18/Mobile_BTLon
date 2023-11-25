import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useSong } from './SongContext';

const ListenAgain = ({item }) => {
  const{setSelectedSong}=useSong();
  const handleSongSelect = (song) => {
    setSelectedSong(song);
    console.log(song);
  };
  return (
    <View>
      <TouchableOpacity onPress={() => (handleSongSelect(item))} style={{width:120,justifyContent:"center",alignItems:"flex-start",marginHorizontal:5,marginVertical:10}}>
        <Image
          source={item.image}
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
