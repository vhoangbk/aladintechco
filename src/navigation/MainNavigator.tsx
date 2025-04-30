import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import SplashScreen from '../screen/SplashScreen';
import {RootStackParamList} from 'src/types/RootStackParamList';
import ChatScreen from '../screen/ChatScreen';
import LoginScreen from 'src/screen/LoginScreen';
import ContactUs from 'src/screen/ContactUs';
import AboutUs from 'src/screen/AboutUs';
import PersonalInformation from 'src/screen/PersonalInformation';
import EditPersonalInfor from 'src/screen/EditPersonalInfor';
import DetailRecruitment from 'src/screen/DetailRecruitment';
import ApplyScreen from 'src/screen/ApplyScreen';
import AddNewEmployee from 'src/screen/AddNewEmployee';

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />

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

        <Stack.Screen
          name="ContactUs"
          component={ContactUs}
          options={{
            animation: 'fade',
          }}
        />

        <Stack.Screen
          name="AboutUs"
          component={AboutUs}
          options={{
            animation: 'fade',
          }}
        />

        <Stack.Screen
          name="PersonalInformation"
          component={PersonalInformation}
          options={{
            animation: 'fade',
          }}
        />

        <Stack.Screen
          name="EditPersonalInfor"
          component={EditPersonalInfor}
          options={{
            animation: 'fade',
          }}
        />

        <Stack.Screen
          name="DetailRecruitment"
          component={DetailRecruitment}
          options={{
            animation: 'slide_from_right',
          }}
        />

        <Stack.Screen
          name="ApplyScreen"
          component={ApplyScreen}
          options={{
            animation: 'fade',
          }}
        />

        <Stack.Screen
          name="AddNewEmployee"
          component={AddNewEmployee}
          options={{
            animation: 'fade',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
