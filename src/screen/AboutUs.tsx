import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {colorGreen, colorWhite} from '../assets/color';
import {imageResource} from 'src/assets/imageResource';
import Line from 'src/components/Line';
import {RootStackParamList} from 'src/types/RootStackParamList';
import {fontBold} from 'src/types/typeFont';

type AboutUsProps = NativeStackScreenProps<RootStackParamList, 'AboutUs'>;

const AboutUs = ({navigation}: AboutUsProps) => {
  const {t} = useTranslation();
  const screenwidth = useWindowDimensions().width;
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
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
            <Text style={styles.txt}>{t('tieudeaboutus')}</Text>
          </View>
        </View>

        <View style={styles.view}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <Image
              source={imageResource.vechungtoibg}
              style={{width: screenwidth, height: 186}}
              resizeMode="contain"
            />
            <View style={{margin: 15, flex: 1, alignItems: 'center'}}>
              {/* chung toi la ai */}
              <Text style={styles.txt1}>{t('chungtoilaai')}</Text>
              <Line />
              <Text> </Text>
              <Text style={styles.txt2}>{t('noidungaboutus')}</Text>
              <Text> </Text>
              <Image
                source={imageResource.aboutus1}
                style={{width: screenwidth, height: 200}}
                resizeMode="contain"
              />

              {/* Su menh tam nhin */}
              <Text> </Text>
              <Text style={styles.txt1}>{t('sumenhtamnhin')}</Text>
              <Line />
              <Text>  </Text>

              <Image source={require('../assets/image/sumenhtamnhin.png')} />

              <View
                style={{
                  borderWidth: 1,
                  marginBottom: 15,
                  width: screenwidth * 0.9,
                  borderStyle: 'dashed',
                  borderColor: '#22c55e',
                  borderRadius: 10,
                }}>
                <View style={{margin: 5}}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: fontBold,
                      color: '#609af8',
                    }}>
                    {t('sumenh')}
                  </Text>
                  <Text style={styles.txt3}>{t('ndsumenh')}</Text>
                </View>
              </View>

              <View
                style={{
                  borderWidth: 1,
                  marginBottom: 15,
                  width: screenwidth * 0.9,
                  borderStyle: 'dashed',
                  borderColor: '#204887',
                  borderRadius: 10,
                }}>
                <View style={{margin: 5}}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: fontBold,
                      color: '#609af8',
                    }}>
                    {t('tamnhin')}
                  </Text>
                  <Text style={styles.txt3}>{t('ndtamnhin')}</Text>
                </View>
              </View>

              <View
                style={{
                  borderWidth: 1,
                  marginBottom: 15,
                  width: screenwidth * 0.9,
                  borderStyle: 'dashed',
                  borderColor: '#eec137',
                  borderRadius: 10,
                }}>
                <View style={{margin: 5}}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: fontBold,
                      color: '#609af8',
                    }}>
                    {t('giatri')}
                  </Text>
                  <Text style={styles.txt3}>{t('ndgiatri')}</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  txt3: {
    fontSize: 18,
  },
  txt2: {
    textAlign: 'justify',
    fontSize: 16,
  },
  view: {
    margin: 0,
    borderWidth: 0,
    flex: 1,
    backgroundColor: colorWhite,
  },
  container: {
    flex: 1,
  },
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
  title: {
    flex: 1,
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
  },
  txt: {
    fontFamily: fontBold,
    color: colorWhite,
    fontSize: 17,
  },
  image: {
    width: 20,
    height: 20,
    tintColor: colorWhite,
  },
  txt1: {
    fontFamily: fontBold,
    fontSize: 32,
    alignSelf: 'center',
  },
});

export default AboutUs;
