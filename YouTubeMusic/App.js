import { NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import MiniPlay from "./components/MiniPlayer";
import { SongProvider } from "./components/SongContext";
import BottomTab from "./components/BottomTab";
import LoginScreen from "./screens/LoginScreen";
import { AccountProvider } from "./components/AccountContext";
const Stack = createStackNavigator();
export default function App() {
  const [song, setSong] = useState({});
  return (
    <AccountProvider>
      <SongProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="BottomTab">
              <Stack.Screen name="BottomTab" component={BottomTab} />
              <Stack.Screen name="Login" component={LoginScreen} />
            </Stack.Navigator>
            <MiniPlay song={song} />
          </NavigationContainer>
      </SongProvider>
    </AccountProvider>
  );
}

