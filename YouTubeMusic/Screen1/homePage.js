import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-web";

export default function HomeScreen() {
  return (
    <LinearGradient
      colors={["#72374E", "#603772", "#0E0E0E"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <ScrollView>
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

            <View style={{ width:244,paddingRight:30,justifyContent: "center", alignItems: "flex-end" }}>
              <TouchableOpacity style={{ alignItems: "flex-end" }}>
                <Image
                  source={require("../img/search.png")}
                  style={{ width: 30, height: 30 }}
                ></Image>
              </TouchableOpacity>
            </View>

            <View style={{ width: 54, paddingRight: 20 }}>
              <TouchableOpacity style={{justifyContent:"center",alignItems:"center"}}>
                <Image
                  source={require("../img/avt.png")}
                  style={{ width: 26, height: 26, resizeMode: "contain" }}
                ></Image>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({});
