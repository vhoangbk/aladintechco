import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {colorGreen, colorWhite} from '../assets/color';
import {imageResource} from 'src/assets/imageResource';
import ButtonPerson from 'src/components/ButtonPerson';
import ChangeLanguageBox from 'src/components/ChangeLanguageBox';
import i18n from 'src/language/i18n';
import {login, logout} from 'src/redux/slice/AuthSlice';
import {AppDispatch, RootState} from 'src/redux/store';
import {RootStackParamList} from 'src/types/RootStackParamList';
import {fontRegular} from 'src/types/typeFont';

type PersonScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'PersonScreen'
>;

const PersonScreen = ({navigation}: PersonScreenProps) => {
  const {t} = useTranslation();
  const [showChangeLanguageBox, setShowChangeLanguageBox] = useState(false);

  const authLogin = useSelector((state: RootState) => state.auth.auth);
  const dispatch = useDispatch<AppDispatch>();

  const openSelectLanguage = () => {
    setShowChangeLanguageBox(true);
  };

  const handleLogin = () => {
    dispatch(login());
    navigation.navigate('LoginScreen');
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text>Trạng thái: {authLogin ? 'Đã login' : 'Chưa login'}</Text>
        {authLogin ? (
          <TouchableOpacity>
            <View style={styles.btnEdit}>
              <Text style={styles.txt}>{t('sua')}</Text>
              <Image style={styles.imageEdit} source={imageResource.editicon} />
            </View>
          </TouchableOpacity>
        ) : null}

        <View style={styles.header}>
          {authLogin ? (
            <Image source={imageResource.avt} style={styles.avatar} />
          ) : null}
          <View style={{marginLeft: 15, justifyContent: 'center'}}>
            {authLogin ? (
              <>
                <Text style={styles.name}>Nguyễn Văn A</Text>
                <Text style={styles.email}>abcabc@gmail.com</Text>
              </>
            ) : (
              <Text style={styles.name}>{t('pleaseLoginTxt')}</Text>
            )}
          </View>
        </View>

        <View style={[styles.body, {flex: 1}]}>
          <TouchableOpacity onPress={openSelectLanguage}>
            <View style={styles.viewNgongu}>
              <Text style={styles.text1}> {t('chonngongu')}:</Text>
              <Image
                source={
                  i18n.language === 'vi'
                    ? imageResource.covietnam
                    : imageResource.coanh
                }
                style={styles.logo2}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>

          {/* Các nút */}
          {authLogin ? (
            <ButtonPerson
              image={imageResource.iconuser}
              title={t('thongtin')}
              onPress={() => {
                navigation.navigate('PersonalInformation');
              }}
            />
          ) : null}
          <ButtonPerson
            image={imageResource.iconphone}
            title={t('lienhe')}
            onPress={() => {
              navigation.navigate('ContactUs');
            }}
          />
          <ButtonPerson
            image={imageResource.infoicon}
            title={t('vechungtoi')}
            onPress={() => {
              navigation.navigate('AboutUs');
            }}
          />
          {!authLogin ? (
            <ButtonPerson
              image={imageResource.loginicon}
              title={t('dangnhap')}
              onPress={handleLogin}
            />
          ) : (
            <ButtonPerson
              image={imageResource.logouticon}
              title={t('dangxuat')}
              onPress={handleLogout}
            />
          )}
        </View>
      </View>

      <ChangeLanguageBox
        showModal={showChangeLanguageBox}
        setShowModal={setShowChangeLanguageBox}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorGreen,
  },
  header: {
    flexDirection: 'row',
    borderWidth: 0,
    alignSelf: 'center',
    marginVertical: 30,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 35,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 18,
    color: '#fff',
    marginTop: 10,
    width: 200,
  },
  email: {
    fontSize: 14,
    color: '#fff',
  },
  body: {
    backgroundColor: colorWhite,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  viewNgongu: {
    backgroundColor: colorWhite,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 0,
    // width:130,
    alignSelf: 'center',
    marginVertical: 20,

    // Shadow (iOS)
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,

    // Shadow (Android)
    elevation: 5,
    marginBottom: 50,
  },
  logo2: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
  },
  btnEdit: {
    borderWidth: 0,
    flexDirection: 'row',
    backgroundColor: colorWhite,
    alignSelf: 'flex-end',
    borderRadius: 4,
    marginRight: 20,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',

    // Shadow (iOS)
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,

    // Shadow (Android)
    elevation: 5,
  },
  imageEdit: {
    width: 20,
    height: 20,
  },
  txt: {
    fontFamily: fontRegular,
    margin: 2,
    marginHorizontal: 10,
  },
  text1: {
    fontFamily: fontRegular,
  },
});

export default PersonScreen;
