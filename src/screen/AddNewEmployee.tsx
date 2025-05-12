import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
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
import {
  getListDepartment,
  getPersonalInformation,
  postNewEmployee,
  upLoadImageToServer,
} from 'src/api/apiServices';
import InputField from 'src/components/InputField';
import {RootState} from 'src/redux/store';
import {RootStackParamList} from 'src/types/RootStackParamList';
import {NewEmployee} from 'src/types/typeModel';
import {BirthdayPicker, PickGender} from './ApplyScreen';
import {
  CameraOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {imageResource} from 'src/assets/imageResource';
import {NavigationProp} from '@react-navigation/native';
import {fontBold} from 'src/types/typeFont';
import {colorGreen, colorWhite} from 'src/assets/color';
import {t} from 'i18next';

type AddNewEmployeeProps = NativeStackScreenProps<
  RootStackParamList,
  'AddNewEmployee'
>;

const AddNewEmployee = ({navigation}: AddNewEmployeeProps) => {
  const [imageURI, setImageUri] = useState<string>();
  const authLogin = useSelector((state: RootState) => state.auth.auth);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [formNewEmployee, setFormNewEmployee] = useState<NewEmployee>({
    avatar: 'null',
    contractInfo: 'null',
    countryside: '',
    currentResidence: '',
    dateOfBirth: '2025-04-30',
    departmentId: 0,
    education: '',
    email: '',
    emergencyContact: 'null',
    employeeDocuments: null,
    employeeStatus: 'null',
    english: 'null',
    experience: 'null',
    facebookLink: 'null',
    family: 'null',
    favourite: 'null',
    firstDayWork: '2025-04-30',
    foreignLanguage: 'null',
    fullName: '',
    gender: '',
    identificationNumber: 'null',
    jobPositionId: 97551,
    jobTitleId: 97602,
    level: 'null',
    linkedInLink: 'null',
    objectiveInCV: '',
    officialContractEndDate: '2025-04-30',
    officialContractStartDate: '2025-04-30',
    phoneNumber: '',
    probationEndDate: '2025-04-30',
    probationStartDate: '2025-04-30',
    skypeLink: 'null',
    status: 'null',
    telegramLink: 'null',
    userId: 'string',
    workModelId: 97502,
  });

  const getUserID = async () => {
    if(!authLogin) return
    const data = await getListDepartment();
    const userid = data[0].user.id.toString();
    setFormNewEmployee(oldData => ({...oldData, userId: userid}));
  };

  const getDepartmentID = async () => {
    if(!authLogin) return
    const data = await getListDepartment();
    const departmentid = data[0].id;
    setFormNewEmployee(oldData => ({
      ...oldData,
      departmentId: Number(departmentid),
    }));
  };

  useEffect(() => {
    if(authLogin){
      getUserID();
      getDepartmentID();
      return
    }
  }, [authLogin]);

  const handleCreateNewEmployee = async () => {
    setLoadingCreate(true);
    if (
      !imageURI ||
      !formNewEmployee.fullName.trim() ||
      !formNewEmployee.gender.trim() ||
      !formNewEmployee.phoneNumber.trim() ||
      !formNewEmployee.email.trim() ||
      !formNewEmployee.countryside.trim() ||
      !formNewEmployee.currentResidence.trim() ||
      !formNewEmployee.education.trim() ||
      !formNewEmployee.objectiveInCV.trim()
    ) {
      setLoadingCreate(false);
      Alert.alert(t('error'), t('fill_all_required'));
      return;
    }

      const checkdatauser = await getPersonalInformation();
      if(checkdatauser) {
        Alert.alert(
          t('create'), 
          "Tài khoản này đã tạo thông tin người dùng rồi!",
          [
            { text: "OK", onPress: () => navigation.goBack() }
          ],
          { cancelable: false }
        );
        return
      }
      const urlAvatar = await upToServer(imageURI);
      console.log(urlAvatar);
      const updateFormNewEmployee: NewEmployee = {
        ...formNewEmployee,
        avatar: urlAvatar,
      };
      await postNewEmployee(updateFormNewEmployee);
      clearData();
    setLoadingCreate(false);
  };

  const clearData = () => {
    setFormNewEmployee({
      avatar: 'null',
      contractInfo: 'null',
      countryside: '',
      currentResidence: '',
      dateOfBirth: '1990-01-01',
      departmentId: 0,
      education: '',
      email: '',
      emergencyContact: 'null',
      employeeDocuments: [
        {
          documentType: 'CERTIFICATE',
          documentUrl: 'null',
          id: 0,
        },
      ],
      employeeStatus: 'null',
      english: 'null',
      experience: 'null',
      facebookLink: 'null',
      family: 'null',
      favourite: 'null',
      firstDayWork: '1990-01-01',
      foreignLanguage: 'null',
      fullName: '',
      gender: '',
      identificationNumber: 'null',
      jobPositionId: 0,
      jobTitleId: 0,
      level: 'null',
      linkedInLink: 'null',
      objectiveInCV: '',
      officialContractEndDate: '1990-01-01',
      officialContractStartDate: '1990-01-01',
      phoneNumber: '',
      probationEndDate: '1990-01-01',
      probationStartDate: '1990-01-01',
      skypeLink: 'null',
      status: 'null',
      telegramLink: 'null',
      userId: 'string',
      workModelId: 0,
    });
    setImageUri('');
  };

  const formatDate = (dateInput: Date | string | undefined | null): string => {
    if (!dateInput) return '1990-01-01';
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return '1990-01-01';
    return date.toISOString().split('T')[0];
  };

  const camOptions: CameraOptions = {
    mediaType: 'photo',
    includeBase64: false,
  };

  const libOptions: CameraOptions = {
    mediaType: 'photo',
    includeBase64: false,
  };

  const selectImageLibrary = () => {
    launchImageLibrary(libOptions, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const uri = response.assets?.[0]?.uri;
        setImageUri(uri);
        console.log('Library image URI: ', uri);
      }
    });
  };

  const takePhoto = () => {
    launchCamera(camOptions, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const uri = response.assets?.[0]?.uri;
        setImageUri(uri);
        console.log('Camera image URI: ', uri);
      }
    });
  };

  const upToServer = async (uri: string) => {
    const uriInServer = await upLoadImageToServer(uri);
    return uriInServer;
  };

  return (
    <SafeAreaView>

      <Modal visible={loadingCreate} transparent={true}>
        <View style={styles.viewLoading}>
          <ActivityIndicator size="large" color={colorGreen} />
        </View>
      </Modal>

      <Header navigation={navigation} />
      <ScrollView>
        <View style={styles.container}>
          {imageURI ? (
            <Image source={{uri: imageURI}} style={{width: 150, height: 150, alignSelf: 'center'}} />
          ) : (
            <Image source={imageResource.avt} style={{width: 150, height: 150, alignSelf: 'center'}} />
          )}
          <View style={{alignItems: 'center'}}>
            <Text></Text>
            <Button title={t('photo_library')} onPress={selectImageLibrary} />
            <Text></Text>
            <Button title={t('take_photo')} onPress={takePhoto} />
            <Text></Text>
          </View>

          <InputField
            label={t('full_name')}
            placeholder={t('full_name_placeholder')}
            value={formNewEmployee.fullName}
            onChangeText={change => setFormNewEmployee(old => ({...old, fullName: change}))}
          />

          <BirthdayPicker
            birthday={formNewEmployee.dateOfBirth}
            setBirthday={(change: any) => setFormNewEmployee(old => ({...old, dateOfBirth: formatDate(change)}))}
          />

          <PickGender
            sex={formNewEmployee.gender}
            setSex={(change: any) => setFormNewEmployee(old => ({...old, gender: change}))}
          />

          <InputField
            label={t('phone_number')}
            placeholder={t('phone_number')}
            value={formNewEmployee.phoneNumber}
            onChangeText={change => setFormNewEmployee(old => ({...old, phoneNumber: change}))}
          />
          <InputField
            label={t('email')}
            placeholder={t('email')}
            value={formNewEmployee.email}
            onChangeText={change => setFormNewEmployee(old => ({...old, email: change}))}
          />
          <InputField
            label={t('countryside')}
            placeholder={t('countryside')}
            value={formNewEmployee.countryside}
            onChangeText={change => setFormNewEmployee(old => ({...old, countryside: change}))}
          />
          <InputField
            label={t('current_residence')}
            placeholder={t('current_residence')}
            value={formNewEmployee.currentResidence}
            onChangeText={change => setFormNewEmployee(old => ({...old, currentResidence: change}))}
          />
          <InputField
            label={t('education')}
            placeholder={t('education')}
            value={formNewEmployee.education}
            onChangeText={change => setFormNewEmployee(old => ({...old, education: change}))}
          />
          <InputField
            label={t('career_objective')}
            placeholder={t('career_objective')}
            value={formNewEmployee.objectiveInCV}
            onChangeText={change => setFormNewEmployee(old => ({...old, objectiveInCV: change}))}
          />

          <Button title={t('create')} onPress={handleCreateNewEmployee} />
          <Text></Text>
          <Text></Text>
          <Text></Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Header = ({ navigation }: { navigation: NavigationProp<RootStackParamList> }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={styles.containBack}>
          <Image source={imageResource.backbtn} style={styles.image} resizeMode="contain" />
        </View>
      </TouchableOpacity>
      <View style={styles.title}>
        <Text style={styles.txt}>{t('add_new_employee')}</Text>
      </View>
    </View>
  );
};

export default AddNewEmployee;

const styles = StyleSheet.create({
  container: {
    margin: 20,
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
  viewLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
