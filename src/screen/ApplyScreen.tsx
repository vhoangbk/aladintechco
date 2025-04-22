import {NavigationProp} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { t } from 'i18next';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colorGreen, colorWhite} from 'src/assets/color';
import {imageResource} from 'src/assets/imageResource';
import {RootStackParamList} from 'src/types/RootStackParamList';
import {fontBold} from 'src/types/typeFont';

type ApplyScreenProps = NativeStackScreenProps<RootStackParamList,'ApplyScreen'>

const ApplyScreen = ({navigation}:ApplyScreenProps) => {
  return (
    <SafeAreaView style={{flex: 1}}>
        <View style={{flex:1}}>
            {/* header */}
            <Header navigation={navigation}/>
            {/* body */}
            <ScrollView contentContainerStyle={{flexGrow:1}}>
                
            </ScrollView>
        </View>
    </SafeAreaView>
  );
};

export default ApplyScreen;

type HeaderProps = {
  navigation: NavigationProp<RootStackParamList>;
};

const Header = ({navigation}: HeaderProps) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={styles.containBack}>
          <Image
            source={imageResource.backbtn}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
      <View style={styles.title}>
        <Text style={styles.txt}>{t('apply')}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {
    height: 50,
    backgroundColor: colorGreen,
    flexDirection: 'row',
  },
  containBack: {
    width: 50,
    height: 50,
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 20,
    height: 20,
    tintColor: colorWhite,
  },
  title: {
    flex: 1,
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 45,
  },
  txt: {
    fontFamily: fontBold,
    color: colorWhite,
    fontSize: 17,
  },
});
