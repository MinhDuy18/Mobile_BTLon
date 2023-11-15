import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import playPage from './Screen1/playPage';
import homePage from './Screen1/homePage';

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions} initialRouteName='homePage'>
        <Stack.Screen name="homePage" component={homePage} />
        <Stack.Screen name="playPage" component={playPage}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
