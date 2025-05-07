import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {t} from 'i18next';
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {colorGreen, colorWhite} from 'src/assets/color';
import {imageResource} from 'src/assets/imageResource';
import {fontBold, fontRegular} from 'src/types/typeFont';
import {RootStackParamList} from 'src/types/RootStackParamList';
import { useEffect, useState } from 'react';
import { CurrentEmployee, UpdateEmployee } from 'src/types/typeModel';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { getPersonalInformation, putUpdateEmployee, upLoadImageToServer } from 'src/api/apiServices';
import { PickGender } from './ApplyScreen';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CameraOptions, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { URL_SERVER } from 'src/api/apiConfig';

type EditPersonalInformationProps = NativeStackScreenProps<
  RootStackParamList,
  'EditPersonalInfor'
>;

const EditPersonalInformation = ({navigation, route}: EditPersonalInformationProps) => {
  const authLogin = useSelector((state: RootState) => state.auth.auth);
  const [imageURI, setImageUri] = useState<string>();
  const [loadingCreate, setLoadingCreate] = useState(false);

  const [currentEmployeeInfor,setCurrentEmployeeInfor] = useState<CurrentEmployee>();
  const [formUpdateEmployee , setFormUpdateEmployee] = useState<UpdateEmployee>({
    "avatar": "string",  
    "contractInfo": "string",
    "countryside": "string",
    "currentResidence": "string",
    "dateOfBirth": "2025-05-01",
    "departmentId": 1526855,
    "education": "string",
    "email": "string",
    "emergencyContact": "string",
    "employeeDocuments": [],
    "employeeStatus": "string",
    "english": "string",
    "experience": "string",
    "facebookLink": "string",
    "family": "string",
    "favourite": "string",
    "firstDayWork": "2025-05-01",
    "foreignLanguage": "string",
    "fullName": "string",
    "gender": "string",
    "id": 101122,
    "identificationNumber": "string",
    "jobPositionId": 97551,
    "jobTitleId": 97602,
    "level": "string",
    "linkedInLink": "string",
    "objectiveInCV": "string",
    "officialContractEndDate": "2025-05-01",
    "officialContractStartDate": "2025-05-01",
    "phoneNumber": "string",
    "probationEndDate": "2025-05-01",
    "probationStartDate": "2025-05-01",
    "skypeLink": "string",
    "status": "string",
    "telegramLink": "string",
    "userId": "6633746345988905",
    "workModelId": 97503
  });

  const getCurrentEmployInfor = async () => {
    setLoadingCreate(true)
    if(!authLogin) return
    try {
      const currentData = await getPersonalInformation();
      setCurrentEmployeeInfor(currentData);
      console.log('Current Employee:', currentData);
      if(currentData === undefined || currentData === null ){
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
    } catch (error) {
      console.error('Failed to fetch employee info:', error);
    }
    setLoadingCreate(false)
  }

  const handleUpdateEmployee = async () => {
    setLoadingCreate(true)
      var resUpdate
      if(imageURI){
        const urlAvatar = await upToServer(imageURI);
        console.log("new urlAvatar",urlAvatar);
        const updateFormUpdateEmployee: UpdateEmployee = {
          ...formUpdateEmployee,
          avatar: urlAvatar,
        };
        resUpdate = await putUpdateEmployee(currentEmployeeInfor?.id, updateFormUpdateEmployee);
      }else{
        resUpdate = await putUpdateEmployee(currentEmployeeInfor?.id, formUpdateEmployee);
      }
      if (resUpdate){
        navigation.navigate('TabNavigator', {
          screen: 'PersonScreen'
        });
      }

    setLoadingCreate(false)
  }

  const upToServer = async (uri: string) => {
    const uriInServer = await upLoadImageToServer(uri);
    return uriInServer;
  };

  useEffect(()=>{
    getCurrentEmployInfor();
  },[authLogin]);

  useEffect(() => {
    if (currentEmployeeInfor) {
      setFormUpdateEmployee({
        avatar: currentEmployeeInfor.avatar ?? '',
        contractInfo: currentEmployeeInfor.contractInfo ?? 'null',
        countryside: currentEmployeeInfor.countryside ?? '',
        currentResidence: currentEmployeeInfor.currentResidence ?? '',
        dateOfBirth: currentEmployeeInfor.dateOfBirth ?? '',
        departmentId: currentEmployeeInfor.department?.id ?? 0,
        education: currentEmployeeInfor.education ?? '',
        email: currentEmployeeInfor.email ?? '',
        emergencyContact: currentEmployeeInfor.emergencyContact ?? 'null',
        employeeDocuments: currentEmployeeInfor.employeeDocuments ?? [],
        employeeStatus: currentEmployeeInfor.employeeStatus ?? '',
        english: currentEmployeeInfor.english ?? 'null',
        experience: currentEmployeeInfor.experience ?? 'null',
        facebookLink: currentEmployeeInfor.facebookLink ?? 'null',
        family: currentEmployeeInfor.family ?? 'null',
        favourite: currentEmployeeInfor.favourite ?? 'null',
        firstDayWork: currentEmployeeInfor.firstDayWork ?? '',
        foreignLanguage: currentEmployeeInfor.foreignLanguage ?? 'null',
        fullName: currentEmployeeInfor.fullName ?? '',
        gender: currentEmployeeInfor.gender ?? '',
        id: currentEmployeeInfor.id ?? 0,
        identificationNumber: currentEmployeeInfor.identificationNumber ?? 'null',
        jobPositionId: currentEmployeeInfor.jobPosition?.id ?? 97551,
        jobTitleId: currentEmployeeInfor.jobTitle?.id ?? 97601,
        level: currentEmployeeInfor.level ?? 'null',
        linkedInLink: currentEmployeeInfor.linkedInLink ?? 'null',
        objectiveInCV: currentEmployeeInfor.objectiveInCV ?? '',
        officialContractEndDate: currentEmployeeInfor.officialContractEndDate ?? '',
        officialContractStartDate: currentEmployeeInfor.officialContractStartDate ?? '',
        phoneNumber: currentEmployeeInfor.phoneNumber ?? '',
        probationEndDate: currentEmployeeInfor.probationEndDate ?? '',
        probationStartDate: currentEmployeeInfor.probationStartDate ?? '',
        skypeLink: currentEmployeeInfor.skypeLink ?? 'null',
        status: currentEmployeeInfor.status ?? '',
        telegramLink: currentEmployeeInfor.telegramLink ?? 'null',
        userId: currentEmployeeInfor.user?.id ?? '',
        workModelId: currentEmployeeInfor.workModel?.id ?? 97502
      });
    }
  }, [currentEmployeeInfor]);  

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

  return (
    <SafeAreaView style={styles.container}>

      <Modal visible={loadingCreate} transparent={true}>
        <View style={styles.viewLoading}>
          <ActivityIndicator size="large" color={colorGreen} />
        </View>
      </Modal>

      <View style={styles.view1}>
        <Header navigation={navigation} route = {route}/>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.view2}>
          {imageURI ? (
            <Image source={{uri: imageURI}} style={{width: 150, height: 150, alignSelf: 'center'}} />
          ) : (
            <Image source={{ uri : `${URL_SERVER}${currentEmployeeInfor?.avatar}`}} style={{width: 150, height: 150, alignSelf: 'center'}} />
          )}
            <View style={{alignItems: 'center'}}>
              <Text></Text>
              <Button title={t('library')} onPress={selectImageLibrary} />
              <Text></Text>
              <Button title={t('take_photo')} onPress={takePhoto} />
              <Text></Text>
            </View>
          </View>

          <View style={styles.view3}>
            <Text style={styles.title1}>{t('personal_info')}</Text>
            <View style={styles.line} />

            <View style={styles.informationView}>
              <InputRow label={t('id')} value={currentEmployeeInfor?.id.toString()} onChangeText={()=>{}}/>
              <InputRow label={t('full_name')} value={formUpdateEmployee.fullName} onChangeText={(t)=>{setFormUpdateEmployee({...formUpdateEmployee,fullName:t})}}/>
              <InputRow label={t('phone_number')} value={formUpdateEmployee.phoneNumber} onChangeText={(t)=>{setFormUpdateEmployee({...formUpdateEmployee,phoneNumber:t})}}/>
              <InputRow label={t('email')} value={formUpdateEmployee.email} onChangeText={(t)=>{setFormUpdateEmployee({...formUpdateEmployee,email:t})}}/>
              <InputRow label={t('hometown')} value={formUpdateEmployee.countryside} onChangeText={(t)=>{setFormUpdateEmployee({...formUpdateEmployee,countryside:t})}}/>
              <InputRow label={t('current_address')} value={formUpdateEmployee.currentResidence} onChangeText={(t)=>{setFormUpdateEmployee({...formUpdateEmployee,currentResidence:t})}}/>
              <InputRow label={t('hobbies')} value={formUpdateEmployee.favourite} onChangeText={(t)=>{setFormUpdateEmployee({...formUpdateEmployee,favourite:t})}}/>
              <InputRow label={t('family')} value={formUpdateEmployee.family} onChangeText={(t)=>{setFormUpdateEmployee({...formUpdateEmployee,family:t})}}/>
              <PickGender sex={formUpdateEmployee.gender} setSex={(t:any)=>{setFormUpdateEmployee({...formUpdateEmployee,gender:t})}}/>
              <BirthdayPickerEdit birthday={formUpdateEmployee.dateOfBirth} setBirthday={(t:any)=>{setFormUpdateEmployee({...formUpdateEmployee,dateOfBirth:t})}} />
            </View>

            <Text style={styles.title1}>{t('education')}</Text>
            <View style={styles.line} />

            <View style={styles.informationView}>
              <InputRow label={t('education_level')} value={formUpdateEmployee.education} onChangeText={(t)=>{setFormUpdateEmployee({...formUpdateEmployee,education:t})}}/>
              <InputRow label={t('experience')} value={formUpdateEmployee.experience} onChangeText={(t)=>{setFormUpdateEmployee({...formUpdateEmployee,experience:t})}}/>
              <InputRow label={t('languages')} value={formUpdateEmployee.foreignLanguage} onChangeText={(t)=>{setFormUpdateEmployee({...formUpdateEmployee,foreignLanguage:t})}}/>
            </View>

            <Text style={styles.title1}>{t('goal')}</Text>
            <View style={styles.line} />
            <View style={styles.informationView}>
              <InputRow label={t('career_goal')} value={formUpdateEmployee.objectiveInCV} onChangeText={(t)=>{setFormUpdateEmployee({...formUpdateEmployee,objectiveInCV:t})}}/>
            </View>

            <Text style={styles.title1}>{t('department')}</Text>
            <View style={styles.line} />
            <View style={styles.informationView}>
              <InputRow label={t('username')} value={currentEmployeeInfor?.user.login} onChangeText={()=>{}}/>
              <InputRow label={t('department_name')} value={currentEmployeeInfor?.department.departmentName} onChangeText={()=>{}}/>
            </View>

            <TouchableOpacity style={styles.btnEdit} onPress={handleUpdateEmployee}>
              <Text style={styles.txt3}>{t('save')}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const Header = ({navigation}: EditPersonalInformationProps) => {
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
        <Text style={styles.txt}>{t('edit_info')}</Text>
      </View>
    </View>
  );
};

const BirthdayPickerEdit = ({
  birthday,
  setBirthday,
}: {
  birthday: string;
  setBirthday: any;
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const formatDate = (dateInput: Date | string | undefined | null): string => {
    if (!dateInput) return '1990-01-01';
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return '1990-01-01';
    return date.toISOString().split('T')[0];
  };

  const onChange = (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setBirthday(selectedDate);
    }
  };

  return (
    <View style={{marginBottom: 16}}>
      <Text style={{marginBottom: 4}}>{t('birthday')}</Text>
      <TouchableOpacity
        style={styles.dateRegister}
        onPress={() => setShowPicker(true)}>
        <Text>{formatDate(birthday)}</Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={new Date(birthday)}
          mode="date"
          display="default"
          onChange={onChange}
          maximumDate={new Date()}
        />
      )}
    </View>
  );
};

const InputRow = ({label,value,onChangeText}: {label: string; value: any; onChangeText: (text: string) => void;}) => (
  <View style={{flexDirection: 'row', marginBottom: 10}}>
    <View style={styles.titleInformationView}>
      <Text style={styles.titleInforTxt}>{label}</Text>
    </View>
    <View style={styles.userInformationView}>
      <TextInput
        placeholder={label}
        style={styles.input}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  </View>
);

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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 14,
    fontFamily: fontRegular,
  },
  dateRegister: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
  },
  viewLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
})

export default EditPersonalInformation;