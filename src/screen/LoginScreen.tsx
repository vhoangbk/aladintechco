import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Alert,
  Image,
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

type LoginScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'LoginScreen'
>;

const LoginScreen = ({navigation}: LoginScreenProps) => {
  const {t} = useTranslation();
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const handleLogin = () => {
    if (inputEmail.trim() === '' || inputPassword.trim() === '') {
      Alert.alert(t('alert'), t('alertMessage'), [
        {text: 'OK', onPress: () => {}},
      ]);
      return;
    }
    console.log(inputEmail);
    console.log(inputPassword);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        {/* Nút Back */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Image source={imageResource.backbtn} style={styles.iconBack} />
        </TouchableOpacity>

        {/* Tiêu đề */}
        <Text style={styles.title}>{t('dangnhap')}</Text>

        {/* Ô nhập Email */}
        <View style={styles.inputContainer}>
          <Image source={imageResource.iconemail} style={styles.inputIcon} />
          <TextInput
            placeholder="Email"
            style={styles.input}
            keyboardType="email-address"
            onChangeText={text => setInputEmail(text)}
          />
        </View>

        {/* Ô nhập Password */}
        <View style={styles.inputContainer}>
          <Image source={imageResource.iconpassword} style={styles.inputIcon} />
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry
            onChangeText={text => setInputPassword(text)}
          />
        </View>

        {/* Nút đăng nhập */}
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

        {/* Nút Google */}
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
});

export default LoginScreen;
