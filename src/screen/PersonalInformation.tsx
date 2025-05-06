import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {t} from 'i18next';
import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import { URL_SERVER } from 'src/api/apiConfig';
import {getPersonalInformation} from 'src/api/apiServices';
import {colorGreen, colorWhite} from 'src/assets/color';
import {imageResource} from 'src/assets/imageResource';
import {RootState} from 'src/redux/store';
import {RootStackParamList} from 'src/types/RootStackParamList';
import {fontBold, fontRegular} from 'src/types/typeFont';
import {PersonalInformationModel} from 'src/types/typeModel';

type PersonalInformationProps = NativeStackScreenProps<
  RootStackParamList,
  'PersonalInformation'
>;

const PersonalInformation = ({navigation, route}: PersonalInformationProps) => {
  const authLogin = useSelector((state: RootState) => state.auth.auth);
  const [information, setInformation] = useState<PersonalInformationModel>();
  const [loadingData,setLoadingData] = useState<boolean>(false)

  const fetchPersonalInformation = async () => {
    if(!authLogin) return
    setLoadingData(true);
    const data = await getPersonalInformation();
    setInformation(data);
    if(data === undefined || data === null ){
      Alert.alert(
        "Alert",
        "Please create new employee!",
        [
          { text: "OK", onPress: () => navigation.goBack() }
        ],
        { cancelable: false }
      );
      return
    }
    setLoadingData(false);
  };

  useEffect(() => {
    fetchPersonalInformation();
  }, [authLogin]);

  return (
    <SafeAreaView style={styles.container}>

      <Modal visible={loadingData} transparent={true}>
        <View style={styles.viewLoading}>
          <ActivityIndicator size="large" color={colorGreen} />
        </View>
      </Modal>

      <View style={styles.view1}>
        {/* Header */}
        <Header navigation={navigation} route={route} />
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          {/*body*/}
          <View style={styles.view2}>
            <Image
              source={{ uri : `${URL_SERVER}${information?.avatar}`}}
              style={styles.image1}
              resizeMode="contain"
            />
            <Text style={styles.txt1}>{information?.fullName}</Text>
          </View>
          <View style={styles.view3}>
            <Text style={styles.title1}>{t('personal_info')}</Text>
            <View style={styles.line}></View>

            <View style={styles.informationView}>
              <RowInformation title={t('id')} infor={information?.id} />
              <RowInformation
                title={t('start_date')}
                infor={information?.firstDayWork}
              />
              <RowInformation
                title={t('full_name')}
                infor={information?.fullName}
              />
              <RowInformation
                title={t('phone_number')}
                infor={information?.phoneNumber}
              />
              <RowInformation title={t('email')} infor={information?.email} />
              <RowInformation
                title={t('dob')}
                infor={information?.dateOfBirth}
              />
              <RowInformation
                title={t('hometown')}
                infor={information?.countryside}
              />
              <RowInformation
                title={t('current_address')}
                infor={information?.currentResidence}
              />
              <RowInformation
                title={t('hobbies')}
                infor={information?.favourite}
              />
              <RowInformation
                title={t('marital_status')}
                infor={'Đã kết hôn'}
              />
              <RowInformation title={t('family')} infor={information?.family} />
              <RowInformation
                title={t('gender')}
                infor={information?.gender === 'Nam' ? 'Nam' : 'Nữ'}
              />
            </View>

            <Text style={styles.title1}>{t('education')}</Text>
            <View style={styles.line}></View>

            <View style={styles.informationView}>
              <RowInformation
                title={t('degree')}
                infor={information?.education}
              />
              <RowInformation
                title={t('education_level')}
                infor={information?.level}
              />
              <RowInformation
                title={t('experience')}
                infor={information?.experience}
              />
              <RowInformation
                title={t('languages')}
                infor={`${information?.foreignLanguage}`}
              />
            </View>

            <Text style={styles.title1}>{t('goal')}</Text>
            <View style={styles.line}></View>

            <View style={styles.informationView}>
              <RowInformation
                title={t('career_goal')}
                infor={information?.objectiveInCV}
              />
            </View>

            <Text style={styles.title1}>{t('department')}</Text>
            <View style={styles.line}></View>

            <View style={styles.informationView}>
              <RowInformation
                title={t('username')}
                infor={information?.user?.login}
              />
              <RowInformation
                title={t('department_name')}
                infor={information?.department?.departmentName}
              />
            </View>

            <TouchableOpacity
              style={styles.btnEdit}
              onPress={() => navigation.navigate('EditPersonalInfor')}>
              <Text style={styles.txt3}>{t('sua')}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const Header = ({navigation}: PersonalInformationProps) => {
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
        <Text style={styles.txt}>{t('personal_info')}</Text>
      </View>
    </View>
  );
};

export const RowInformation = ({title, infor}: any) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <View style={styles.titleInformationView}>
        <Text style={styles.titleInforTxt}>{title}</Text>
      </View>
      <View style={styles.userInformationView}>
        <Text style={styles.userinfortxt}>{infor}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  txt3: {
    margin: 10,
    borderWidth: 0,
    color: colorWhite,
    fontFamily: fontRegular,
    fontSize: 15,
  },
  btnEdit: {
    borderWidth: 0,
    alignSelf: 'center',
    marginBottom: 30,
    marginTop: 20,
    backgroundColor: 'red',
    borderRadius: 4,
  },
  container: {
    flex: 1,
  },
  view1: {
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
    marginRight: 30,
  },
  txt: {
    fontFamily: fontBold,
    color: colorWhite,
    fontSize: 17,
  },
  view2: {
    borderWidth: 0,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  image1: {
    width: 100,
    height: 100,
    borderWidth: 0,
  },
  txt1: {
    borderWidth: 0,
    textAlign: 'center',
    marginRight: 40,
    fontFamily: fontBold,
    fontSize: 18,
  },
  view3: {
    marginHorizontal: 20,
    flex: 1,
    borderWidth: 0,
    marginTop: 10,
  },
  title1: {
    fontFamily: fontBold,
    color: colorGreen,
    fontSize: 20,
  },
  line: {
    borderWidth: 0.5,
    borderColor: '#d2d4d2',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  informationView: {},
  titleInformationView: {
    borderWidth: 0,
    width: 130,
  },
  userInformationView: {
    borderWidth: 0,
    flex: 1,
  },
  titleInforTxt: {
    fontSize: 14,
    fontFamily: fontBold,
  },
  userinfortxt: {
    fontFamily: fontRegular,
    fontSize: 14,
  },
  viewLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

export default PersonalInformation;
