import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import FilterCard from "../conponents/FilterCard";
import ListenAgain from "../conponents/ListenAgain";
import MixedCard from "../conponents/MixedCard";
import BottomBar from "../conponents/BottomBar";
import { Avatar } from "react-native-paper";
export default function HomeScreen() {
  const [filter, setFilter] = useState([
    "Nạp năng lượng",
    "Thư giãn",
    "Vui tươi",
    "Tập thể dục",
    "Tiệc tùng",
    "Tập trung",
    "Buồn",
    "Lãng mạn",
    "Dễ ngủ",
  ]);
  const [listenAgain, setListenAgain] = useState([
    { id: 1, name: "Pink Ponk", img: "image 1.png" },
    { id: 2, name: "Pink Ponk", img: "image 1.png" },
    { id: 3, name: "Pink Ponk", img: "image 1.png" },
    { id: 4, name: "Pink Ponk", img: "image 1.png" },
    { id: 5, name: "Pink Ponk", img: "image 1.png" },
    { id: 6, name: "Pink Ponk", img: "image 1.png" },
    { id: 7, name: "Pink Ponk", img: "image 1.png" },
    { id: 8, name: "Pink Ponk", img: "image 1.png" },
    { id: 9, name: "Pink Ponk", img: "image 1.png" },
    { id: 10, name: "Pink Ponk", img: "image 1.png" },
    { id: 11, name: "Pink Ponk", img: "image 1.png" },
    { id: 12, name: "Pink Ponk", img: "image 1.png" },
  ]);
  const [mixed, setMixed] = useState([
    { id: 1, name: "Pink Ponk", img: "image 1.png" },
    { id: 2, name: "Pink Ponk", img: "image 1.png" },
    { id: 3, name: "Pink Ponk", img: "image 1.png" },
    { id: 4, name: "Pink Ponk", img: "image 1.png" },
    { id: 5, name: "Pink Ponk", img: "image 1.png" },
    { id: 6, name: "Pink Ponk", img: "image 1.png" },
  ]);
  return (
    <LinearGradient
      colors={["#72374E", "#603772", "#0E0E0E"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      locations={[0, 0.01, 0.6]}
      style={{ flex: 1 }}
    >
      <View>
        <View
          style={{
            flexDirection: "row",
            height: 64,
            paddingLeft: 16,
            alignItems: "center",
          }}
        >
          <View>
            <Image
              source={require("../img/YMusicLogo.svg")}
              style={{
                height: 24,
                width: 80,
                resizeMode: "contain",
              }}
            ></Image>
          </View>
          <View
            style={{
              width: 244,
              paddingRight: 30,
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <TouchableOpacity style={{ alignItems: "flex-end" }}>
              <Image
                source={require("../img/search.png")}
                style={{ width: 30, height: 30 }}
              ></Image>
            </TouchableOpacity>
          </View>
          <View style={{ width: 54, paddingRight: 20 }}>
            <TouchableOpacity
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <Avatar.Image size={26} source={require("../img/avt.png")} />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView horizontal={true} showsVerticalScrollIndicator>
          {filter.map((item, index) => (
            <FilterCard item={item} key={index} />
          ))}
        </ScrollView>
      </View>
      <ScrollView>
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
            contentContainerStyle={{ alignSelf: "flex-start" }}
            numColumns={Math.ceil(listenAgain.length / 2)}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={listenAgain}
            renderItem={({ item, index }) => (
              <ListenAgain item={item} key={index} />
            )}
          />
        </ScrollView>
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
          data={mixed}
          renderItem={({ item, index }) => (
            <MixedCard item={item} key={index} />
          )}
        ></FlatList>
      </ScrollView>
          <BottomBar/>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({});
