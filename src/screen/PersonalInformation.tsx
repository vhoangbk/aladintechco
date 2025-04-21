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
import { colorGreen, colorWhite } from 'src/assets/color';
import { imageResource } from 'src/assets/imageResource';
import { RootStackParamList } from 'src/types/RootStackParamList';
import { fontBold, fontRegular } from 'src/types/typeFont';

type PersonalInformationProps = NativeStackScreenProps<
  RootStackParamList,
  'PersonalInformation'
>;

const PersonalInformation = ({ navigation, route }: PersonalInformationProps) => {
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.view1}>
        {/* Header */}
        <Header navigation={navigation} route={route} />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {/*body*/}
          <View style={styles.view2}>
            <Image
              source={imageResource.avt}
              style={styles.image1}
              resizeMode="contain"
            />
            <Text style={styles.txt1}>Nguyễn Tiến Khang Huy</Text>
          </View>
          <View style={styles.view3}>
            <Text style={styles.title1}>{t('personal_info')}</Text>
            <View style={styles.line}> </View>

            <View style={styles.informationView}>

              <RowInformation title={t('id')} infor={'89105'} />
              <RowInformation title={t('start_date')} infor={'6 Th01 2025'} />
              <RowInformation title={t('full_name')} infor={'Nguyễn Tiến Khang Huy'} />
              <RowInformation title={t('phone_number')} infor={'0943185411'} />
              <RowInformation title={t('email')} infor={'huyhuy271003@gmail.com'} />
              <RowInformation title={t('dob')} infor={'27 Th10 2003'} />
              <RowInformation title={t('hometown')} infor={'Hoài Đức, Hà Nội'} />
              <RowInformation title={t('current_address')} infor={'Hoài Đức, Hà Nội'} />
              <RowInformation title={t('hobbies')} infor={'Đọc sách, phim, ăn uống'} />
              <RowInformation title={t('marital_status')} infor={'Độc thân'} />
              <RowInformation title={t('children')} infor={'0'} />
              <RowInformation title={t('family')} infor={'Bố : Nguyễn Tiến Ngọc - Nhân Viên KT Điện , Mẹ : Kiến Thị Thu - Kinh Doanh'} />
              <RowInformation title={t('gender')} infor={'Nam'} />
              <RowInformation title={t('relative')} infor={'Mẹ - 0946073379'} />
              <RowInformation title={t('bank_name')} infor={'(Techcombank) Ngân hàng TMCP Kỹ thương Việt Nam'} />
              <RowInformation title={t('bank_account')} infor={'5902688888'} />

            </View>
            <Text style={styles.title1}>{t('education')}</Text>
            <View style={styles.line}> </View>

            <View style={styles.informationView}>
              <RowInformation title={t('degree')} infor={'asdasd'} />
              <RowInformation title={t('education_level')} infor={'asdasd'} />
              <RowInformation title={t('experience')} infor={'asdasd'} />
              <RowInformation title={t('languages')} infor={'asdasd'} />
            </View>


            <Text style={styles.title1}>{t('goal')}</Text>
            <View style={styles.line}> </View>

            <View style={styles.informationView}>
              <RowInformation title={t('career_goal')} infor={'asdasd'} />
            </View>


            <Text style={styles.title1}>{t('department')}</Text>
            <View style={styles.line}> </View>

            <View style={styles.informationView}>
              <RowInformation title={t('username')} infor={'asdasd'} />
              <RowInformation title={t('department_name')} infor={'asdasd'} />
            </View>

            <TouchableOpacity style={styles.btnEdit} onPress={() => navigation.navigate('EditPersonalInfor')}>
              <Text style={styles.txt3}>Sửa thông tin</Text>
            </TouchableOpacity>


          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const Header = ({ navigation }: PersonalInformationProps) => {
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

export const RowInformation = ({ title, infor }: any) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={styles.titleInformationView}>
        <Text style={styles.titleInforTxt}>{title}</Text>
      </View>
      <View style={styles.userInformationView}>
        <Text style={styles.userinfortxt}>{infor}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  txt3: {
    margin: 10,
    borderWidth: 0,
    color: colorWhite,
    fontFamily: fontRegular,
    fontSize: 15
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
    fontSize: 20
  },
  line: {
    borderWidth: 0.5,
    borderColor: '#d2d4d2',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  informationView: {
  },
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
});

export default PersonalInformation;
