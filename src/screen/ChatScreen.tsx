import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {imageResource} from '../assets/imageResource';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from 'src/types/RootStackParamList';
import {colorWhite} from '../assets/color';

const URL =
  'https://chatgpt.com/g/g-678dba18480481919884a97072cba654-about-aladin-technology';

type ChatScreenProps = NativeStackScreenProps<RootStackParamList, 'ChatScreen'>;

const ChatScreen = ({navigation, route}: ChatScreenProps) => {
  const handleBack = () => {
    if (route.params?.isFromSplash ?? false) {
      navigation.replace('TabNavigator');
    } else {
      navigation.goBack();
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <WebView source={{uri: URL}} startInLoadingState={true}/>
      <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={imageResource.iconAladin}
            style={{width: 35, height: 35, margin:10}}
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
    top: 60,
    right: 30,
    backgroundColor: colorWhite,
    borderWidth: 0,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation:10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default ChatScreen;
