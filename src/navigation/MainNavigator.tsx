import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigator from './TabNavigator'
import SplashScreen from '../screen/SplashScreen'
import { RootStackParamList } from 'src/types/RootStackParamList'
import ChatScreen from '../screen/ChatScreen'
import LoginScreen from 'src/screen/LoginScreen'

const Stack = createNativeStackNavigator <RootStackParamList>()

const MainNavigator = () =>  {
  return (
    <NavigationContainer>
          <Stack.Navigator 
              screenOptions={{headerShown: false}}
          >

              <Stack.Screen 
                  name="SplashScreen" 
                  component={SplashScreen} 
              />

              <Stack.Screen 
                  name="TabNavigator" 
                  component={TabNavigator} 
                  options={{
                    animation: 'fade',
                  }}
              />

              <Stack.Screen 
                  name="ChatScreen" 
                  component={ChatScreen} 
                  options={{
                    animation: 'fade',
                  }}
              />

              <Stack.Screen 
                  name="LoginScreen" 
                  component={LoginScreen} 
                  options={{
                    animation: 'fade',
                  }}
              />
        
          </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigator
