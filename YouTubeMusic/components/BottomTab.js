import HomeScreen from "../screens/HomeScreen";
import ExploreScreen from "../screens/ExploreScreen";
import LibraryScreen from "../screens/LibraryScreen";
import PlayList from "./PlayList";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Foundation } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";
import React from "react";
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
export default function BottomTab() {
  return (
    <Tab.Navigator screenOptions={BottomTabOptions} initialRouteName="HomeScreen">
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
      <Tab.Screen name="PlayList" component={PlayList} options={{tabBarButton:()=>null}}></Tab.Screen>
    </Tab.Navigator>
  );
}
