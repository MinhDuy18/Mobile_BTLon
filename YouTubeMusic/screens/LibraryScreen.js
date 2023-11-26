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
import { AntDesign } from '@expo/vector-icons';
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
            <TouchableOpacity
              style={{ alignItems: "flex-end" }}
            >
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
              <Avatar.Image size={26} source={avatar} />
            </TouchableOpacity>
          </View>
        </View>
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
            <Image source={require('../img/lib.png')} style={{width:258,height:262}}></Image>
      </View>
    </View>
  );
};

export default LibraryScreen;

const styles = StyleSheet.create({

});
