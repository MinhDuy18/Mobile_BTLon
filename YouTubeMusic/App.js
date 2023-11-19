import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import playPage from './Screen1/playPage';
import listPlay from './Screen1/listPlay';
import { AudioProvider } from './Screen1/AudioContext';

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
}

export default function App() {
  return (

    <AudioProvider>
        <NavigationContainer>
            
            <Stack.Navigator screenOptions={screenOptions} initialRouteName='listPlay'>
          <Stack.Screen name="playPage" component={playPage} />
          <Stack.Screen name="listPlay" component={listPlay} />
        </Stack.Navigator>
        
       
      </NavigationContainer>

      </AudioProvider>

   
  );
}
