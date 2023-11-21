import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./Screen1/homePage";
import ExploreScreen from "./Screen1/explorePage";
import LibraryScreen from "./Screen1/libraryPage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Foundation } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import * as React from "react";
import { Text, View, TouchableOpacity } from "react-native";
const Tab = createBottomTabNavigator();
const screenOptions = {
  headerShown: false,
  tabBarShowLabel: false,
  tabBarStyle: {
    possition: "absolute",
    heigth: 50,
    backgroundColor: "#220011",
    borderWidht: 0,
  },
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
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
      </Tab.Navigator>
    </NavigationContainer>
  );
}
