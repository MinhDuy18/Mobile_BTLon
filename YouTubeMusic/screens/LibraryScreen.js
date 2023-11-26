import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { useAccount } from "../components/AccountContext";
const LibraryScreen = () => {
  const { avatar } = useAccount();
  const filter_list = [
    "All",
    "Albums",
    "Artists",
    "Songs",
    "Playlists",
    "Downloads",
  ];
  return (
    <View style={{ width: "100%", height: "100%", backgroundColor: "black" }}>
      <View
        style={{
          flexDirection: "row",
          height: 64,
          paddingLeft: 16,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 24, color: "white" }}>My Library</Text>
        <AntDesign name="down" size={24} color="black" />
        <TouchableOpacity style={{ alignItems: "flex-end" }}>
          <Image
            source={require("../img/search.png")}
            style={{ width: 30, height: 30 }}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <Avatar.Image size={26} source={avatar} style={{}}/>
        </TouchableOpacity>
      </View>
      <View>
        <ScrollView horizontal={true} showsVerticalScrollIndicator>
          {filter_list.map((item) => (
            <View
              style={{
                height: 84,
                margin: 6,
                paddingTop: 32,
                paddingBottom: 16,
              }}
            >
              <TouchableOpacity
                style={{
                  height: 36,
                  borderRadius: 8,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(255,255,255,.1)",
                }}
              >
                <Text
                  style={{ fontSize: 14, color: "white", marginHorizontal: 12 }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
      <View>
        <Image
          source={require("../img/lib.png")}
          style={{ width: 258, height: 262 }}
        ></Image>
      </View>
    </View>
  );
};

export default LibraryScreen;

const styles = StyleSheet.create({});
