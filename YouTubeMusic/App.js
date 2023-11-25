import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { createContext, useContext, useState } from "react";
import MiniPlay from "./Screen1/PlayPageModal";
import BottomTabNavigator from "./conponents/BottomTabNavigator";


const Context = createContext();
export default function App() {
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

  const [song, setSong] = useState(songInit);
  function changeSong(song) {
    setSong(song);
    console.log("bai hat " + song);
  }
  return (
    <Context.Provider value={changeSong}>
      <NavigationContainer>
        <BottomTabNavigator />
        <MiniPlay song={song} />
      </NavigationContainer>
    </Context.Provider>
  );
}
export function useChangeSong() {
  return useContext(Context);
}
