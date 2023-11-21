import { StyleSheet, Text, View,Image,TouchableOpacity,ScrollView,FlatList} from 'react-native'
import React from 'react'

const FilterSong = ({items}) => {
    console.log(items)
  return (
    <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    directionalLockEnabled={true}
    alwaysBounceVertical={false}
  >
    <FlatList
      numColumns={3}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      data={items}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              height: 60,
              width: window.innerWidth,
              justifyContent: "flex-start",
              alignItems: "center",
              paddingLeft: 20,
            }}
          >
            <Image
              source={item.image}
              style={{
                height: 50,
                width: 50,
                resizeMode: "contain",
                borderRadius: 15,
                marginRight: 10,
              }}
            ></Image>
            <View
              style={{
                paddingHorizontal: 20,
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 16, color: "white" }}>
                {item.name}
              </Text>
              <Text style={{ fontSize: 16, color: "grey" }}>
                {item.singer}
              </Text>
            </View>
          </TouchableOpacity>
        );
      }}
    ></FlatList>
  </ScrollView>
  )
}

export default FilterSong

const styles = StyleSheet.create({})