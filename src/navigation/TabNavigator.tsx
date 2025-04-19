import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screen/HomeScreen';
import TuyenDungScreen from '../screen/TuyenDungScreen';
import {Image} from 'react-native';
import {imageResource} from '../assets/imageResource';
import {useTranslation} from 'react-i18next';
import '../language/i18n';
import PersonScreen from '../screen/PersonScreen';
import EmployeeScreen from '../screen/EmployeeScreen';
import {RootStackParamList} from '../types/RootStackParamList';

const Tab = createBottomTabNavigator<RootStackParamList>();

const TabNavigator = () => {
  const {t} = useTranslation();

  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: '#000',
          tabBarLabel: t('trangchu'),
          tabBarIcon: () => (
            <Image
              source={imageResource.tabtrangchu}
              style={{width: 20, height: 20, tintColor: '#000'}}
            />
          ),
        }}
      />

      <Tab.Screen
        name="TuyenDungScreen"
        component={TuyenDungScreen}
        options={{
          tabBarActiveTintColor: '#000000',
          tabBarInactiveTintColor: '#000000',
          tabBarLabel: t('tuyendung'),
          tabBarIcon: () => (
            <Image
              source={imageResource.tabtuyendung}
              style={{width: 20, height: 20, tintColor: '#000'}}
            />
          ),
        }}
      />

      <Tab.Screen
        name="EmployeeScreen"
        component={EmployeeScreen}
        options={{
          tabBarActiveTintColor: '#000000',
          tabBarInactiveTintColor: '#000000',
          tabBarLabel: t('nhanvien'),
          tabBarIcon: () => (
            <Image
              source={imageResource.tabnhanvien}
              style={{width: 20, height: 20, tintColor: '#000'}}
            />
          ),
        }}
      />

      <Tab.Screen
        name="PersonScreen"
        component={PersonScreen}
        options={{
          tabBarActiveTintColor: '#000000',
          tabBarInactiveTintColor: '#000000',
          tabBarLabel: t('canhan'),
          tabBarIcon: () => (
            <Image
              source={imageResource.tabcanhan}
              style={{width: 20, height: 20, tintColor: '#000'}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
