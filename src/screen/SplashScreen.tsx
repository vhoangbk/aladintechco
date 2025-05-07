import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {imageResource} from '../assets/imageResource';
import {Image, StyleSheet, useWindowDimensions, View} from 'react-native';
import {RootStackParamList} from '../types/RootStackParamList';
import {useEffect} from 'react';
import { get_AccessKeyStorage } from 'src/commons/AsyncStorage';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/redux/store';
import { login, logout } from 'src/redux/slice/AuthSlice';

type SplashScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SplashScreen'
>;

const SplashScreen = ({navigation}: SplashScreenProps) => {
  const width = useWindowDimensions().width;

  const dispatch = useDispatch<AppDispatch>();

  const checkAuth = async () => {
    if(await get_AccessKeyStorage()){
      dispatch(login());
    }else{
      dispatch(logout());
    }
  };

  useEffect(() => {
    checkAuth();
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('ChatScreen', {
        isFromSplash: true,
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={imageResource.iconAladin}
        style={[
          styles.image,
          {
            width: width * 0.3,
            height: width * 0.3,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderWidth: 0,
  },
});

export default SplashScreen;
