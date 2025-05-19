import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { fontRegular } from 'src/types/typeFont';

interface Props {
  image: any;
  title: string;
  width?: number;
  onPress?: () => void;
}

const ButtonPerson: React.FC<Props> = ({
  image,
  title,
  width = 250,
  onPress,
}) => {
  return (
    <TouchableOpacity style={[styles.button, { width }]} onPress={onPress}>
      <Image source={image} style={styles.icon} />
      <View style={{ flex: 1, marginRight: 30 }}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ButtonPerson;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    //elevation ios
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginVertical: 6,
    alignSelf: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 15,
    color: '#333',
    alignSelf: 'center',
    fontFamily: fontRegular,
  },
});
