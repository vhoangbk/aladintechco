import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colorGreen, colorWhite} from '../assets/color';
import {imageResource} from 'src/assets/imageResource';
import {RootStackParamList} from 'src/types/RootStackParamList';
import {fontBold, fontRegular} from 'src/types/typeFont';

type ContactUsProps = NativeStackScreenProps<RootStackParamList, 'ContactUs'>;

const ContactUs = ({navigation}: ContactUsProps) => {
  const {t} = useTranslation();

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
            <Text style={styles.txt}>{t('tieudethongtinlh')}</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.body}>
            <View style={styles.body1}>
              {/* Row */}
              <View style={styles.row}>
                <View style={styles.imagerow}>
                  <View>
                    <Image
                      source={imageResource.positionicon}
                      style={styles.image2}
                      resizeMode="contain"
                    />
                  </View>
                </View>
                <View style={styles.txtrow}>
                  <Text style={styles.thongtin}>{t('thongtinlienhe1')}</Text>
                </View>
              </View>

              {/* Row */}
              <View style={styles.row}>
                <View style={styles.imagerow}>
                  <View>
                    <Image
                      source={imageResource.positionicon}
                      style={styles.image2}
                      resizeMode="contain"
                    />
                  </View>
                </View>
                <View style={styles.txtrow}>
                  <Text style={styles.thongtin}>{t('thongtinlienhe2')}</Text>
                </View>
              </View>

              {/* Row */}
              <View style={styles.row}>
                <View style={styles.imagerow}>
                  <View>
                    <Image
                      source={imageResource.iconemail}
                      style={styles.image2}
                      resizeMode="contain"
                    />
                  </View>
                </View>
                <View style={styles.txtrow}>
                  <Text style={styles.thongtin}>{t('thongtinlienhe3')}</Text>
                </View>
              </View>

              {/* Row */}
              <View style={styles.row}>
                <View style={styles.imagerow}>
                  <View>
                    <Image
                      source={imageResource.iconphone}
                      style={styles.image2}
                      resizeMode="contain"
                    />
                  </View>
                </View>
                <View style={styles.txtrow}>
                  <Text style={styles.thongtin}>{t('thongtinlienhe4')}</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  thongtin: {
    fontFamily: fontRegular,
    fontSize: 15,
  },
  image2: {
    width: 30,
    height: 30,
  },
  imagerow: {
    flex: 1,
  },
  txtrow: {
    flex: 4,
  },
  row: {
    borderWidth: 0,
    flexDirection: 'row',
    marginTop: 10,
  },
  body1: {
    borderWidth: 0,
    flex: 1,
    marginHorizontal: 40,
    marginTop: 50,
  },
  body: {
    borderWidth: 0,
    flex: 1,
  },
  title: {
    flex: 1,
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
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
  container: {
    flex: 1,
    backgroundColor: colorWhite,
  },
  header: {
    height: 50,
    backgroundColor: colorGreen,
    flexDirection: 'row',
  },
  txt: {
    fontFamily: fontBold,
    color: colorWhite,
    fontSize: 17,
  },
});

export default ContactUs;
