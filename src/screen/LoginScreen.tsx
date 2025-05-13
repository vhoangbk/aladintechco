import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {colorBlack, colorGreen, colorWhite} from '../assets/color';
import {imageResource} from 'src/assets/imageResource';
import NutBam from 'src/components/NutBam';
import {RootStackParamList} from 'src/types/RootStackParamList';
import { getAccessToken } from 'src/api/apiServices';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/redux/store';
import { login } from 'src/redux/slice/AuthSlice';
import { get_AccessKeyStorage, get_Field_Saved, save_AccessKeyStorage, save_Account } from 'src/commons/AsyncStorage';

type LoginScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'LoginScreen'
>;

const LoginScreen = ({navigation}: LoginScreenProps) => {
  const {t} = useTranslation();
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const [loading,setLoading] = useState<boolean>(false)

  const getAccountSaved = async () =>{
    setLoading(true)

    const username = await get_Field_Saved('username');
    const password = await get_Field_Saved('password');

    if(username != null || password != null){
      setInputEmail(username!!);
      setInputPassword(password!!);
    }

    setLoading(false)

  };

  useEffect(()=>{
    getAccountSaved();
  },[]);

  const handleLogin = async () => {

    setLoading(true)

    if (inputEmail?.trim() === '' || inputPassword?.trim() === '') {
      Alert.alert(t('alert'), t('alertMessage'), [
        {text: 'OK', onPress: () => {}},
      ]);
      return;
    }

    const access_token = await getAccessToken(inputEmail!!,inputPassword!!);

    if(access_token === null){
      Alert.alert('Lỗi', 'Sai tài khoản hoặc mật khẩu!!', [
        {text: 'OK', onPress: () => {}},
      ]);
      return;
    }else{
      await save_Account(inputEmail,inputPassword);
      await save_AccessKeyStorage(access_token);
      console.log('Login success!');
      console.log('Saved Account');
      dispatch(login());
      navigation.goBack();
    }

    setLoading(false)

  };
  return (
    <SafeAreaView style={{flex: 1}}>

      <Modal visible={loading} transparent={true}>
        <View style={styles.viewLoading}>
          <ActivityIndicator size="large" color={colorGreen} />
        </View>
      </Modal>

      <View style={styles.container}>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Image source={imageResource.backbtn} style={styles.iconBack} />
        </TouchableOpacity>

        <Text style={styles.title}>{t('dangnhap')}</Text>

        <View style={styles.inputContainer}>
          <Image source={imageResource.iconemail} style={styles.inputIcon} />
          <TextInput
            value={inputEmail}
            placeholder="Email"
            style={styles.input}
            keyboardType="email-address"
            onChangeText={text => setInputEmail(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Image source={imageResource.iconpassword} style={styles.inputIcon} />
          <TextInput
          value={inputPassword}
            placeholder="Password"
            style={styles.input}
            secureTextEntry
            onChangeText={text => setInputPassword(text)}
          />
        </View>

        <TouchableOpacity onPress={handleLogin}>
          <View style={{alignItems: 'center'}}>
            <NutBam
              text={t('dangnhap')}
              colorBG={colorGreen}
              colorTxt={colorWhite}
              widthbtn={'auto'}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={{alignItems: 'center', marginTop: 20}}>
            <NutBam
              text={t('dangnhapgg')}
              colorBG={colorWhite}
              colorTxt={colorBlack}
              widthbtn={'auto'}
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  backButton: {
    marginBottom: 30,
    width: 30,
    height: 30,
  },
  iconBack: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 30,
    fontFamily: 'serif',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },
  inputIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 45,
  },
  loginButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  googleButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    elevation: 2,
  },
  googleText: {
    fontSize: 15,
  },
  viewLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

export default LoginScreen;
