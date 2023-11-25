import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import ExploreScreen from "./screens/ExploreScreen";
import LibraryScreen from "./screens/LibraryScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Foundation } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import {View} from "react-native";
import React, { createContext, useContext, useState } from "react";
import PlayList from "./components/PlayList";
import MiniPlay from "./components/MiniPlayer";
import { SongProvider, useSong } from "./components/SongContext";
const Tab = createBottomTabNavigator();

const BottomTabOptions = {
  headerShown: false,
  tabBarShowLabel: false,
  tabBarStyle: {
    possition: "absolute",
    heigth: 50,
    backgroundColor: "#220011",
    borderWidht: 0,
  },
};
const Context = createContext();
export default function App() {
  // const [selectedSong, setSelectedSong] = useState(null);
  // const [selectedSong] = useSong();
  const songInit = {
    id: 2,
    title: "json-server",
    name: "Lạ Lùng",
    duration: "6:02",
    singer: "Vũ",
    image:
      "https://lh3.googleusercontent.com/YXUb8Reei3riqh9s0xO2m5TE9NF8txl5-mjN0XN0wwbVw-tKxfpd6q0LFJqqWAfpWnMBbtIhykQ_7NM=w544-h544-l90-rj",
    mp3: "https://res.cloudinary.com/djkmqg6tr/video/upload/v1700304876/Upgrade-A-11250963_jkdln4.mp3",
    genres: ["Energy"],
  };

  const [song, setSong] = useState({songInit});
  function changeSong(song) {
    setSong(song);
    console.log("bai hat " + song);
  }
  return (
    <SongProvider>
      <Context.Provider value={changeSong}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={BottomTabOptions}>
          <Tab.Screen
            name={"Home"}
            component={HomeScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <View>
                  <Foundation
                    name="home"
                    size={24}
                    color={focused ? "white" : "grey"}
                  />
                </View>
              ),
            }}
          ></Tab.Screen>
          <Tab.Screen
            name={"Explore"}
            component={ExploreScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <View>
                  <MaterialIcons
                    name="explore"
                    size={24}
                    color={focused ? "white" : "grey"}
                  />
                </View>
              ),
            }}
          ></Tab.Screen>
          <Tab.Screen
            name={"Library"}
            component={LibraryScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <View>
                  <MaterialIcons
                    name="library-music"
                    size={24}
                    color={focused ? "white" : "grey"}
                  />
                </View>
              ),
            }}
          ></Tab.Screen>
          <Tab.Screen
            name={"PlayList"}
            component={PlayList}
            options={{
              tabBarIcon: ({ focused }) => (
                <View>
                  <MaterialIcons
                    name="library-music"
                    size={24}
                    color={focused ? "white" : "grey"}
                  />
                </View>
              ),
            }}
          ></Tab.Screen>
        </Tab.Navigator>
        <MiniPlay song={song}/>
      </NavigationContainer>
    </Context.Provider>
    </SongProvider>
  );
}
export function useChangeSong() {
  return useContext(Context);
}