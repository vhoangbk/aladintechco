import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { colorGreen, colorWhite } from '../assets/color';
import { imageResource } from 'src/assets/imageResource';
import ButtonPerson from 'src/components/ButtonPerson';
import ChangeLanguageBox from 'src/components/ChangeLanguageBox';
import i18n from 'src/language/i18n';
import { RootStackParamList } from 'src/types/RootStackParamList';
import { fontRegular } from 'src/types/typeFont';
import { get_AccessKeyStorage, save_AccessKeyStorage } from 'src/commons/AsyncStorage';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/redux/store';
import { logout } from 'src/redux/slice/AuthSlice';
import { getAccount, getPersonalInformation } from 'src/api/apiServices';
import { Account, PersonalInformationModel } from 'src/types/typeModel';
import { BASE_URL, URL_SERVER } from 'src/api/apiConfig';
import { useFocusEffect } from '@react-navigation/native';
type PersonScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'PersonScreen'
>;

const PersonScreen = ({ navigation }: PersonScreenProps) => {
  const authLogin = useSelector((state: RootState) => state.auth.auth);
  const screenHeight = useWindowDimensions().height;
  const { t } = useTranslation();
  const [showChangeLanguageBox, setShowChangeLanguageBox] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(false);

  const [information, setInformation] = useState<PersonalInformationModel>();

  const openSelectLanguage = () => {
    setShowChangeLanguageBox(true);
  };

  const handleLogin = () => {
    navigation.navigate('LoginScreen');
  };

  const handleLogout = async () => {
    setLoading(true)
    await save_AccessKeyStorage('');
    console.log('Logout success!', await get_AccessKeyStorage());
    dispatch(logout());
    setLoading(false)

  };

  const fetchPersonalInformation = async () => {
    try {
      setLoading(true)
      const data = await getPersonalInformation();
      setInformation(data);
    } catch (error) {
      console.log("error")
    } finally {
      setLoading(false)
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (authLogin === true) {
        fetchPersonalInformation();
      }
    }, [authLogin])
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <Modal visible={loading} transparent={true}>
        <View style={styles.viewLoading}>
          <ActivityIndicator size="large" color={colorGreen} />
        </View>
      </Modal>

      <View style={styles.container}>
        {authLogin ? (
          <TouchableOpacity onPress={() => navigation.navigate('EditPersonalInfor')}>
            <View style={styles.btnEdit}>
              <Text style={styles.txt}>{t('sua')}</Text>
              <Image style={styles.imageEdit} source={imageResource.editicon} />
            </View>
          </TouchableOpacity>
        ) : null}

        <View style={styles.header}>
          {authLogin ? (
            <Image source={{ uri: `${URL_SERVER}${information?.avatar}` }} style={styles.avatar} />
          ) : null}
          <View style={{ marginLeft: 15, justifyContent: 'center' }}>
            {authLogin ? (
              <>
                <Text style={styles.name}>{information?.fullName ?? 'null'}</Text>
                <Text style={styles.email}>{information?.email ?? 'null'}</Text>
              </>
            ) : (
              <View style={{ marginTop: 40 }}>
                <Text style={styles.name}>{t('pleaseLoginTxt')}</Text>
              </View>
            )}
          </View>
        </View>

        <View style={[styles.body, { height: screenHeight * 0.65, position: 'absolute', bottom: 0, left: 0, right: 0 }]}>
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

          {authLogin ? (
            <ButtonPerson
              image={imageResource.iconuser1}
              title={t('thongtin')}
              onPress={() => {
                navigation.navigate('PersonalInformation');
              }}
            />
          ) : null}

          {authLogin ? (
            <ButtonPerson
              image={imageResource.iconkiempl}
              title={t('ki_employee')}
              onPress={() => navigation.navigate('KIEmployeeScreen')}
            />
          ) : null}
          <ButtonPerson
            image={imageResource.iconphone1}
            title={t('lienhe')}
            onPress={() => {
              navigation.navigate('ContactUs');
            }}
          />
          <ButtonPerson
            image={imageResource.iconabout1}
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
    borderWidth: 0,
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
    shadowOffset: { width: 0, height: 2 },
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,

    // Shadow (Android)
    elevation: 5,
  },
  imageEdit: {
    width: 20,
    height: 20,
    marginRight: 5
  },
  txt: {
    fontFamily: fontRegular,
    margin: 2,
    marginHorizontal: 10,
  },
  text1: {
    fontFamily: fontRegular,
    marginLeft: 7
  },
  viewLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

export default PersonScreen;
