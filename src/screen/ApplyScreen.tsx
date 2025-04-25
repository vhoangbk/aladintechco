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
import { Picker } from '@react-native-picker/picker';
import { CandidateModel } from 'src/types/typeModel';
import { postNewCandidates } from 'src/api/apiServices';

type ApplyScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ApplyScreen'
>;

const ApplyScreen = ({navigation, route}: ApplyScreenProps) => {

  const {recruitment} = route.params;

  const formatDate = (dateInput: Date | string | undefined | null): string => {
    if (!dateInput) {return '1990-01-01';}
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) {return '1990-01-01';}
    return date.toISOString().split('T')[0];
  };

  const testkeybase64 = 'JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PC9DcmVhdG9yIChDaHJvbWl1bSkKL1Byb2R1Y2VyIChTa2lhL1BERiBtOTkpCi9DcmVhdGlvbkRhdGUgKEQ6MjAyNTA0MjMwNzU5MDYrMDcnMDAnKQovTW9kRGF0ZSAoRDoyMDI1MDQyMzA3NTkwNiswNycwMCcpPj4KZW5kb2JqCjIgMCBvYmoKPDwvVHlwZS9QYWdlCi9QYXJlbnQgMyAwIFIKL1Jlc291cmNlcyA8PC9Gb250IDw8L0YxIDQgMCBSID4+ID4+Ci9NZWRpYUJveCBbMCAwIDU5NSA4NDJdCi9Db250ZW50cyA1IDAgUj4+CmVuZG9iagozIDAgb2JqCjw8L1R5cGUvUGFnZXMKL0tpZHNbMiAwIFJdCi9Db3VudCAxPj4KZW5kb2JqCjQgMCBvYmoKPDwvVHlwZS9Gb250Ci9TdWJ0eXBlL1R5cGUxCi9OYW1lL0YxCi9CYXNlRm9udC9IZWx2ZXRpY2EKL0VuY29kaW5nL1dpbkFuc2lFbmNvZGluZz4+CmVuZG9iago1IDAgb2JqCjw8L0xlbmd0aCAxMDk4Pj4Kc3RyZWFtCkJUClsgL1BERiBdIDAgbgo8PC9MZW5ndGggMTAwID4+CnN0cmVhbQpIZWxsbyBmcm9tIFBERiBjdXJyaWN1bHVtIQplbmRzdHJlYW0KZW5kb2JqCnhyZWYKMCA3CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDExMyAwMDAwMCBuIAowMDAwMDAwMjAzIDAwMDAwIG4gCjAwMDAwMDAzMzAgMDAwMDAgbiAKMDAwMDAwMDU0MCAwMDAwMCBuIAowMDAwMDAwNjYxIDAwMDAwIG4gCnRyYWlsZXIKPDwvU2l6ZSA3Ci9Sb290IDEgMCBSCj4+CnN0YXJ0eHJlZgo3MTY1CiUlRU9G';

  const [birthday, setBirthday] = useState<string>(formatDate(new Date()));
  // const [cv, setCv] = useState('');
  const cvContentType = 'application/pdf';
  const dateRegister = formatDate(new Date());
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

  const [loadingSendCandidate,setLoadingSendCandidate] = useState(false);

  const handleSendCandidate = async () => {
    setLoadingSendCandidate(true);
    const candidateModel : CandidateModel = {
      phone: phone,
      email: email,
      position: position,
      location: location,
      preference: preference,
      education: education,
      experience: experience,
      target: target,
      fullname: fullname,
      sex: sex,
      cv: testkeybase64,
      cvContentType: cvContentType,
      birthday: birthday,
      relationship: relationship,
      dateRegister: dateRegister,
      recruitment: recruitment,
    };

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      await postNewCandidates(candidateModel);
      setLoadingSendCandidate(false);
      Alert.alert('Thông báo!', 'Gửi thành công!!', [
        {
          text: 'OK',
          onPress: () => {},
          style: 'cancel',
        },
      ]);
    } catch (error) {
      setLoadingSendCandidate(false);
      Alert.alert('Thông báo!', 'Gửi thất bại', [
        {
          text: 'OK',
          onPress: () => {},
          style: 'cancel',
        },
      ]);
    }

  };

  return (
    <SafeAreaView style={{flex: 1}}>

      <View style={{flex: 1}}>

        <Header navigation={navigation} />

        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={{marginHorizontal: 20, flex: 1, marginTop: 20}}>
            <Text>Ứng tuyển vị trí: {recruitment.job}</Text>

            <InputField
              label= "Họ và tên:"
              placeholder="Vui lòng nhập họ và tên của bạn"
              value={fullname}
              onChangeText={setFullname}
            />

            <PickGender sex={sex} setSex={setSex}/>

            <InputField
              label= "Thư điện tử:"
              placeholder="Vui lòng nhập thư điện tử của bạn"
              value={email}
              onChangeText={setEmail}
            />

            <BirthdayPicker birthday={birthday} setBirthday={setBirthday} />

            <DateRegister dateRegister = {dateRegister}/>

            <InputField
              label="Học vấn:"
              placeholder="Ví dụ: Cử nhân CNTT, Đại học X"
              value={education}
              onChangeText={setEducation}
            />

            <InputField
              label="Kinh nghiệm:"
              placeholder="Ví dụ: 2 năm Java tại công ty Y"
              value={experience}
              onChangeText={setExperience}
            />

            <InputField
              label="Địa chỉ:"
              placeholder="Ví dụ: Nam Từ Liêm, Hà Nội"
              value={location}
              onChangeText={setLocation}
            />

            <InputField
              label="Số điện thoại:"
              placeholder="Ví dụ: 0392289601"
              value={phone}
              onChangeText={setPhone}
            />

            <InputField
              label="Vị trí ứng tuyển:"
              placeholder="Ví dụ: Mobile Developer Intern"
              value={position}
              onChangeText={setPosition}
            />

            <InputField
              label="Sở thích:"
              placeholder="Ví dụ: Môi trường học hỏi, hybrid"
              value={preference}
              onChangeText={setPreference}
            />

            <InputField
              label="Tình trạng hôn nhân:"
              placeholder="Ví dụ: Độc thân"
              value={relationship}
              onChangeText={setRelationship}
            />

            <InputField
              label="Mục tiêu nghề nghiệp:"
              placeholder="Ví dụ: Thăng tiến trong công việc"
              value={target}
              onChangeText={setTarget}
            />

            <Button title={'send'} onPress={handleSendCandidate}/>
          </View>
        </ScrollView>
      </View>

      <Modal visible={loadingSendCandidate} transparent={true}>
        <View style={styles.viewLoading}>
          <ActivityIndicator size={'large'} color={colorGreen}/>
        </View>
      </Modal>

    </SafeAreaView>
  );
};

export default ApplyScreen;

const PickGender = ({sex,setSex}:any) => {
  return(
    <View style={{marginBottom:16}}>
      <Text style={{marginBottom:4}}>Chọn giới tính:</Text>
      <View style={styles.pickgender}>
        <Picker
            selectedValue={sex}
            onValueChange={
              (itemValue) => {
                setSex(itemValue);
              }}
              style={{marginLeft:20}}
            >
            <Picker.Item label="Choose Gender" value="" />
            <Picker.Item label="Nam" value="Nam" />
            <Picker.Item label="Nữ" value="Nữ" />
        </Picker>
      </View>
    </View>
  );
};

const DateRegister = ({dateRegister}:{dateRegister :string}) => {
  return(
    <View style={{marginBottom:16}}>
      <Text style={{marginBottom:4}}>Ngày đăng ký:</Text>
      <View
        style={styles.dateRegister}>
        <Text>{dateRegister}</Text>
      </View>
    </View>
  );
};

interface BirthdayPickerProps {
  birthday: string;
  setBirthday: any;
}

  const BirthdayPicker = ({birthday, setBirthday} : BirthdayPickerProps) => {
    const formatDate = (dateInput: Date | string | undefined | null): string => {
      if (!dateInput) {return '1990-01-01';}
      const date = new Date(dateInput);
      if (isNaN(date.getTime())) {return '1990-01-01';}
      return date.toISOString().split('T')[0];
    };

    const onChange = (event: any, selectedDate?: Date) => {
      setShowPicker(Platform.OS === 'ios');
      if (selectedDate) {
        setBirthday(selectedDate);
      }
  };

  const [showPicker, setShowPicker] = useState(false);

  return (
    <View style={{marginBottom:16}}>
      <Text style={{marginBottom:4}}>Ngày sinh:</Text>
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

type HeaderProps = {
  navigation: NavigationProp<RootStackParamList>;
};

const Header = ({navigation}: HeaderProps) => {
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
    marginRight: 45,
  },
  txt: {
    fontFamily: fontBold,
    color: colorWhite,
    fontSize: 17,
  },
  pickgender:{
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    fontSize: 14,
    backgroundColor: '#fff',
    width:200,
  },
  viewLoading:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
