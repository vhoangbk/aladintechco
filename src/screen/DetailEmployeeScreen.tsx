import {NavigationProp} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {t} from 'i18next';
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
import { URL_SERVER } from 'src/api/apiConfig';
import {colorGreen, colorWhite} from 'src/assets/color';
import {imageResource} from 'src/assets/imageResource';
import {RootStackParamList} from 'src/types/RootStackParamList';
import {fontBold} from 'src/types/typeFont';

type DetailEmployeeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'DetailEmployeeScreen'
>;
const DetailEmployeeScreen = ({
  navigation,
  route,
}: DetailEmployeeScreenProps) => {
  const {employeeDetail} = route.params;
  const {t} = useTranslation();

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header navigation={navigation} />
      <ScrollView style={{flex: 1, backgroundColor: '#fff', padding: 16}}>
        <Image
          source={{ uri : `${URL_SERVER}${employeeDetail?.avatar}`}}
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            alignSelf: 'center',
            marginBottom: 24,
          }}
        />

        <Label title={t('fullName')} value={employeeDetail.fullName} />
        <Label title={t('email')} value={employeeDetail.email} />
        <Label title={t('phoneNumber')} value={employeeDetail.phoneNumber} />
        <Label title={t('dateOfBirth')} value={employeeDetail.dateOfBirth} />
        <Label title={t('firstDayWork')} value={employeeDetail.firstDayWork} />
        <Label title={t('countryside')} value={employeeDetail.countryside} />
        <Label title={t('status')} value={employeeDetail.status} />
        <Label
          title={t('employeeStatus')}
          value={employeeDetail.employeeStatus}
        />
        <Label title={t('level')} value={employeeDetail.level} />
        <Label title={t('workModel')} value={employeeDetail.workModel} />
      </ScrollView>
    </SafeAreaView>
  );
};

const Label = ({title, value}: {title: string; value: string}) => (
  <View style={{marginBottom: 12, flexDirection: 'row'}}>
    <Text style={{fontWeight: 'bold', fontSize: 16, width: 170}}>{title}</Text>
    <Text style={{fontSize: 16, color: '#444'}}>{value}</Text>
  </View>
);

const Header = ({
  navigation,
}: {
  navigation: NavigationProp<RootStackParamList>;
}) => {
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
        <Text style={styles.txt}>{t('detailTitle')}</Text>
      </View>
    </View>
  );
};

export default DetailEmployeeScreen;

const styles = StyleSheet.create({
  dateRegister: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
  },
  header: {
    height: 50,
    backgroundColor: colorGreen,
    flexDirection: 'row',
  },
  containBack: {
    width: 50,
    height: 50,
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
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 45,
  },
  txt: {
    fontFamily: fontBold,
    color: colorWhite,
    fontSize: 17,
  },
  pickgender: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    backgroundColor: '#fff',
    width: 200,
  },
  viewLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
