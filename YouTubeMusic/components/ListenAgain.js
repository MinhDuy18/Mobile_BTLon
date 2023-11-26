import { StyleSheet, Text, View, TouchableOpacity, Image ,ScrollView,FlatList} from "react-native";
import React from "react";

const ListenAgain = ({ items, setSong }) => {
  return (
    <View>
      <Text
        style={{
          fontSize: 24,
          fontStyle: "roboto",
          color: "white",
          fontWeight: "bold",
          marginLeft: 16,
        }}
      >
        Listen again
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        directionalLockEnabled={true}
        alwaysBounceVertical={false}
      >
        <FlatList
          key={"#"}
          keyExtractor={(item) => "#" + item.id}
          contentContainerStyle={{ alignSelf: "flex-start" }}
          numColumns={6}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={items}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity
                style={{
                  width: 120,
                  justifyContent: "center",
                  alignItems: "flex-start",
                  marginHorizontal: 5,
                  marginVertical: 10,
                }}
                onPress={() => {
                  setSong(item);
                }}
              >
                <Image
                  source={item.image}
                  style={{
                    width: 115,
                    height: 115,
                    resizeMode: "contain",
                    borderRadius: 10,
                  }}
                ></Image>
                <Text
                  style={{ fontSize: 13, color: "white", fontStyle: "normal" }}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
};

export default ListenAgain;

const styles = StyleSheet.create({});
