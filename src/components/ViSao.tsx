import {Image, StyleSheet, Text, View} from 'react-native';
import {fontRegular} from '../types/typeFont';

const ViSao = ({image, text}: any) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <View style={styles.view}>
        <Text
          style={{
            fontFamily: fontRegular,
            fontSize: 15,
          }}>
          {text}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  image: {
    width: 130,
    height: 130,
  },
  view: {
    borderWidth: 0,
    height: 60,
    justifyContent: 'center',
  },
});

export default ViSao;
