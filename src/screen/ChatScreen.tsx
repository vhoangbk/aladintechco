import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {imageResource} from '../assets/imageResource';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from 'src/types/RootStackParamList';
import { colorWhite } from '../assets/color';

type ChatScreenProps = NativeStackScreenProps<RootStackParamList, 'ChatScreen'>;

const ChatScreen = ({navigation}: ChatScreenProps) => {
  const URL =
    'https://chatgpt.com/g/g-678dba18480481919884a97072cba654-about-aladin-technology';

  const handleBack = () => {
    navigation.navigate('TabNavigator');
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <WebView source={{uri: URL}} startInLoadingState={true} />
      <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={imageResource.backbtn}
            style={{width: 25, height: 20}}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backBtn: {
    position: 'absolute',
    width: 70,
    height: 40,
    top: 42,
    right: 20,
    backgroundColor: colorWhite,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatScreen;
