import { StyleSheet, View ,TouchableOpacity,Image} from 'react-native'
import React from 'react'
import { Avatar } from "react-native-paper";
const Header = ({setVisileModalSearch,avatar}) => {
  return (
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
              onPress={() => setVisileModalSearch(true)}
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
  )
}

export default Header

const styles = StyleSheet.create({})