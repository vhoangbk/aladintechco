import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useTransition } from "react"
import { useTranslation } from "react-i18next"
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { colorBlack, colorGreen, colorWhite } from "src/assets/color"
import { imageResource } from "src/assets/imageResource"
import NutBam from "src/components/NutBam"
import { RootStackParamList } from "src/types/RootStackParamList"

type LoginScreenProps = NativeStackScreenProps<RootStackParamList,'LoginScreen'>

const LoginScreen = ({navigation}:LoginScreenProps) => {

    const { t,i18n } = useTranslation()
    return(
        <SafeAreaView style={{flex:1}}>

            <View style={styles.container}>
                {/* Nút Back */}
                <TouchableOpacity style={styles.backButton} onPress={()=>navigation.goBack()}>
                    <Image source={imageResource.backbtn} style={styles.iconBack} />
                </TouchableOpacity>

                {/* Tiêu đề */}
                <Text style={styles.title}>{t('dangnhap')}</Text>

                {/* Ô nhập Email */}
                <View style={styles.inputContainer}>
                    <Image source={imageResource.iconemail} style={styles.inputIcon} />
                    <TextInput placeholder="Email" style={styles.input} keyboardType="email-address" />
                </View>

                {/* Ô nhập Password */}
                <View style={styles.inputContainer}>
                    <Image source={imageResource.iconpassword} style={styles.inputIcon} />
                    <TextInput placeholder="Password" style={styles.input} secureTextEntry />
                </View>

                {/* Nút đăng nhập */}
                {/* <TouchableOpacity style={styles.loginButton}>
                    <Text style={styles.loginText}>{t('dangnhap')}</Text>
                </TouchableOpacity> */}
                <TouchableOpacity>
                    <View style={{alignItems:'center'}}>
                        <NutBam text={t('dangnhap')} colorBG={colorGreen} colorTxt={colorWhite} widthbtn={370}/>
                    </View>
                </TouchableOpacity>

                
                {/* Nút Google */}
                <TouchableOpacity>
                    <View style={{alignItems:'center',marginTop:20}}>
                        <NutBam text={t('dangnhapgg')} colorBG={colorWhite} colorTxt={colorBlack} widthbtn={370}/>
                    </View>
                </TouchableOpacity>

            </View>

        </SafeAreaView>
    )
}

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
  
  

export default LoginScreen