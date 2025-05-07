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
          tabBarActiveTintColor: '#0096d6',
          tabBarInactiveTintColor: '#000',
          tabBarLabel: t('trangchu'),
          tabBarIcon: ({focused}) => (
            <Image
              source={imageResource.tabtrangchu}
              style={{width: 20, height: 20, tintColor: focused ? '#0096d6' :'#00000'}}
            />
          ),
        }}
      />

      <Tab.Screen
        name="TuyenDungScreen"
        component={TuyenDungScreen}
        options={{
          tabBarActiveTintColor: '#0096d6',
          tabBarInactiveTintColor: '#000000',
          tabBarLabel: t('tuyendung'),
          tabBarIcon: ({focused}) => (
            <Image
              source={imageResource.tabtuyendung}
              style={{width: 20, height: 20, tintColor: focused ? '#0096d6' :'#00000'}}
            />
          ),
        }}
      />

      <Tab.Screen
        name="EmployeeScreen"
        component={EmployeeScreen}
        options={{
          tabBarActiveTintColor: '#0096d6',
          tabBarInactiveTintColor: '#000000',
          tabBarLabel: t('nhanvien'),
          tabBarIcon: ({focused}) => (
            <Image
              source={imageResource.tabnhanvien}
              style={{width: 20, height: 20, tintColor: focused ? '#0096d6' :'#00000'}}
            />
          ),
        }}
      />

      <Tab.Screen
        name="PersonScreen"
        component={PersonScreen}
        options={{
          tabBarActiveTintColor: '#0096d6',
          tabBarInactiveTintColor: '#000000',
          tabBarLabel: t('canhan'),
          tabBarIcon: ({focused}) => (
            <Image
              source={imageResource.tabcanhan}
              style={{width: 20, height: 20, tintColor: focused ? '#0096d6' :'#00000'}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
