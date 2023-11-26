import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
const MixedCard = ({ items,setPlayList,setVisible}) => {
  const navigaton = useNavigation();
  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={{
            fontSize: 24,
            fontStyle: "roboto",
            color: "white",
            fontWeight: "bold",
            marginLeft: 16,
          }}
        >
          Mixed for you
        </Text>
      </View>
      <FlatList
        horizontal
        numColumns={1}
        data={items}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 5,
              marginVertical: 10,
            }}
            onPress={() => {
              navigaton.navigate("PlayList", { item: item });

            }}
          >
            <Image
              source={item.image}
              style={{
                width: 177,
                height: 177,
                resizeMode: "contain",
                borderRadius: 10,
              }}
            ></Image>
            <Text style={{fontSize:20,color:'white'}}>{item.title}</Text>
          </TouchableOpacity>
        )}
      ></FlatList>
    </View>
  );
};

export default MixedCard;

const styles = StyleSheet.create({});
