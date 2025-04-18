import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {colorWhite} from '../assets/color';
import {RootState} from 'src/redux/store';
import {RootStackParamList} from 'src/types/RootStackParamList';
import {fontRegular} from 'src/types/typeFont';

type EmployeeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'EmployeeScreen'
>;

const EmployeeScreen = ({navigation}: EmployeeScreenProps) => {
  const authLogin = useSelector((state: RootState) => state.auth.auth);
  const {t} = useTranslation();

  return (
    <SafeAreaView
      style={{flex: 1}}>
      {authLogin ? (
        <Frame5 />
      ) : (
        <View
          style={styles.view1}>
          <Text style={styles.txt}>{t('pleaseLoginTxt')}</Text>
          <View style={{marginTop:5}}>
            <Button
                title={t('dangnhap')}
                onPress={() => {
                navigation.navigate('LoginScreen');
                }}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const Frame5 = () => {
  return (
    <View style={{flex: 1, backgroundColor: colorWhite}}>
      <Text>Danh sach Nhan vien</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  txt: {
    fontFamily: fontRegular,
    fontSize: 16,
  },
  btn: {
    marginTop: 30,
  },
  view1:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colorWhite,
  },
});

export default EmployeeScreen;
