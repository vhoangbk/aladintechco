import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {imageResource} from '../assets/imageResource';
import {Image, StyleSheet, useWindowDimensions, View} from 'react-native';
import {RootStackParamList} from '../types/RootStackParamList';
import {useEffect} from 'react';

type SplashScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SplashScreen'
>;

const SplashScreen = ({navigation}: SplashScreenProps) => {
  const width = useWindowDimensions().width;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('TabNavigator');
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
