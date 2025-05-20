import {Image, StyleSheet, View} from 'react-native';
import {colorGreen} from '../assets/color';
import {imageResource} from '../assets/imageResource';

const FloatingBtnChat = () => {
  return (
    <View style={styles.container}>
      <Image source={imageResource.chat} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 70,
    height: 70,
    backgroundColor: colorGreen,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    elevation: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: 40,
    height: 40,
  },
});

export default FloatingBtnChat;
