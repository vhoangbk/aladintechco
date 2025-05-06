import {NavigationProp} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {t} from 'i18next';
import {useState} from 'react';
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
  TouchableOpacity,
  View,
} from 'react-native';
import {colorGreen, colorWhite} from 'src/assets/color';
import {imageResource} from 'src/assets/imageResource';
import InputField from 'src/components/InputField';
import {RootStackParamList} from 'src/types/RootStackParamList';
import {fontBold} from 'src/types/typeFont';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import {CandidateModel} from 'src/types/typeModel';
import {postNewCandidates} from 'src/api/apiServices';
import {pick} from '@react-native-documents/picker';
import NutBam from 'src/components/NutBam';
import RNFS from 'react-native-fs';

type ApplyScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ApplyScreen'
>;

const ApplyScreen = ({navigation, route}: ApplyScreenProps) => {
  const {recruitment} = route.params;

  const formatDate = (dateInput: Date | string | undefined | null): string => {
    if (!dateInput) return '1990-01-01';
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return '1990-01-01';
    return date.toISOString().split('T')[0];
  };

  const [nameFilePicked, setNameFilePicked] = useState('');
  const [birthday, setBirthday] = useState<string>(formatDate(new Date()));
  const [cv, setCv] = useState('');
  const [education, setEducation] = useState('');
  const [email, setEmail] = useState('');
  const [experience, setExperience] = useState('');
  const [fullname, setFullname] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [position, setPosition] = useState('');
  const [preference, setPreference] = useState('');
  const [relationship, setRelationship] = useState('');
  const [sex, setSex] = useState('');
  const [target, setTarget] = useState('');
  const [loadingSendCandidate, setLoadingSendCandidate] = useState(false);

  const handleSendCandidate = async () => {
    if (
      !fullname ||
      !email ||
      !phone ||
      !position ||
      !location ||
      !education ||
      !experience ||
      !relationship ||
      !target ||
      !cv
    ) {
      Alert.alert(t('notification'), t('please_fill_all_fields'));
      return;
    }
    setLoadingSendCandidate(true);
    const candidateModel: CandidateModel = {
      phone,
      email,
      position,
      location,
      preference,
      education,
      experience,
      target,
      fullname,
      sex,
      cv,
      cvContentType: 'application/pdf',
      birthday,
      relationship,
      dateRegister: formatDate(new Date()),
      recruitment,
    };

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      let response = await postNewCandidates(candidateModel);
      setLoadingSendCandidate(false);
      if (response) {
        Alert.alert(t('notification'), t('send_success'), [
          {text: t('ok'), onPress: () => clearInput(), style: 'cancel'},
        ]);
      }
      
    } catch (error) {
      setLoadingSendCandidate(false);
      Alert.alert(t('notification'), t('send_fail'), [
        {text: t('ok'), style: 'cancel'},
      ]);
    }
  };

  const clearInput = () => {
    setFullname('');
    setSex('');
    setEmail('');
    setBirthday(formatDate(new Date()));
    setEducation('');
    setExperience('');
    setLocation('');
    setPhone('');
    setPosition('');
    setPreference('');
    setRelationship('');
    setTarget('');
    setCv('');
    setNameFilePicked('');
  };

  const handlePickFile = async () => {
    try {
      const [pickResult] = await pick({mode: 'import'});
      setNameFilePicked(pickResult.name!!);
      if (pickResult) {
        const fileUri = pickResult.uri;
        const base64Data = await RNFS.readFile(fileUri, 'base64');
        setCv(base64Data);
      }
    } catch (err) {
      Alert.alert('Error', t('error_picking_file'));
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Header navigation={navigation} />
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={{marginHorizontal: 20, flex: 1, marginTop: 20}}>
            <Text>
              {t('applying_for_position')} {recruitment.job}
            </Text>

            <InputField
              label={t('full_name')}
              placeholder={t('enter_full_name')}
              value={fullname}
              onChangeText={setFullname}
            />
            <PickGender sex={sex} setSex={setSex} />
            <InputField
              label={t('email')}
              placeholder={t('enter_email')}
              value={email}
              onChangeText={setEmail}
            />
            <BirthdayPicker birthday={birthday} setBirthday={setBirthday} />
            <DateRegister dateRegister={formatDate(new Date())} />
            <InputField
              label={t('education')}
              placeholder={t('enter_education')}
              value={education}
              onChangeText={setEducation}
            />
            <InputField
              label={t('experience')}
              placeholder={t('enter_experience')}
              value={experience}
              onChangeText={setExperience}
            />
            <InputField
              label={t('address')}
              placeholder={t('enter_address')}
              value={location}
              onChangeText={setLocation}
            />
            <InputField
              label={t('phone_number')}
              placeholder={t('enter_phone')}
              value={phone}
              onChangeText={setPhone}
            />
            <InputField
              label={t('position_applied')}
              placeholder={t('enter_position')}
              value={position}
              onChangeText={setPosition}
            />
            <InputField
              label={t('preference')}
              placeholder={t('enter_preference')}
              value={preference}
              onChangeText={setPreference}
            />
            <InputField
              label={t('relationship_status')}
              placeholder={t('enter_relationship')}
              value={relationship}
              onChangeText={setRelationship}
            />
            <InputField
              label={t('career_target')}
              placeholder={t('enter_target')}
              value={target}
              onChangeText={setTarget}
            />

            <Text>
              {nameFilePicked === '' ? t('please_select_cv') : nameFilePicked}
            </Text>
            <Button title={t('choose_cv_pdf')} onPress={handlePickFile} />

            <TouchableOpacity onPress={handleSendCandidate} style={{marginVertical:20}}>
              <NutBam
                text={t('send')}
                colorBG={colorGreen}
                colorTxt={colorWhite}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <Modal visible={loadingSendCandidate} transparent={true}>
        <View style={styles.viewLoading}>
          <ActivityIndicator size="large" color={colorGreen} />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ApplyScreen;

export const PickGender = ({sex, setSex}: any) => {
  return (
    <View style={{marginBottom: 16}}>
      <Text style={{marginBottom: 4}}>{t('gender')}</Text>
      <View style={styles.pickgender}>
        <Picker
          selectedValue={sex}
          onValueChange={setSex}
          style={{marginLeft: 20}}>
          <Picker.Item label={t('choose_gender')} value="" />
          <Picker.Item label={t('male')} value="Nam" />
          <Picker.Item label={t('female')} value="Nữ" />
        </Picker>
      </View>
    </View>
  );
};

const DateRegister = ({dateRegister}: {dateRegister: string}) => {
  return (
    <View style={{marginBottom: 16}}>
      <Text style={{marginBottom: 4}}>{t('register_date')}</Text>
      <View style={styles.dateRegister}>
        <Text>{dateRegister}</Text>
      </View>
    </View>
  );
};

export const BirthdayPicker = ({
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
        <Text style={styles.txt}>{t('apply')}</Text>
      </View>
    </View>
  );
};

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
