import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {colorGreen, colorWhite} from '../assets/color';
import {RootState} from 'src/redux/store';
import {RootStackParamList} from 'src/types/RootStackParamList';
import {fontBold, fontRegular} from 'src/types/typeFont';
import {t} from 'i18next';
import Search from 'src/components/Search';
import {Employee} from 'src/types/typeModel';
import { imageResource } from 'src/assets/imageResource';
import { useEffect, useState } from 'react';
import { getEmployees } from 'src/api/apiServices';

type EmployeeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'EmployeeScreen'
>;

const EmployeeScreen = ({navigation, route}: EmployeeScreenProps) => {

  const authLogin = useSelector((state: RootState) => state.auth.auth);

  const [employeesArray, setEmployeesArray] = useState<Employee[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(false);

  const fetchData = async () => {
    setLoadingData(true);
    const data = await getEmployees();
    setEmployeesArray(data as Employee[]);
    setLoadingData(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loadingData) {
    return (
      <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (!authLogin) {
    return <Frame5 navigation={navigation} route={route} />;
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colorWhite}}>
      <Header />
      <View style={{flex: 1, marginHorizontal: 20}}>
        <View style={{flexDirection: 'row'}}>
          <Search />
          <TouchableOpacity
            style={styles.btnADD}>
            <Text style={{marginHorizontal: 25, color: colorWhite}}>ADD</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={employeesArray}
          renderItem={ ({item}:{item: Employee}) => <EmployeeItem item={item}/>}/>
      </View>
    </SafeAreaView>
  );
};

const EmployeeItem = ({item}:{item: Employee}) => {
  return(
    <TouchableOpacity>
      <View style={{borderWidth:1,margin:3,flexDirection:'row',alignItems:'center',borderRadius:10,elevation:10,backgroundColor:colorWhite}}>
        <Image
          source={imageResource.noneimage}
          style={{width:80,height:80,margin:5,borderRadius:10}}
        />
        <View style={{margin:10}}>
          <Text style={{fontFamily:fontBold}}>{item.fullName}</Text>
          <Text>Email: {item.email}</Text>
          <Text>Level: {item.level}</Text>
          <Text>First Day Work: {item.firstDayWork}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Frame5 = ({navigation}: EmployeeScreenProps) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.view1}>
        <Text style={styles.txt1}>{t('pleaseLoginTxt')}</Text>
        <View style={{marginTop: 5}}>
          <Button
            title={t('dangnhap')}
            onPress={() => {
              navigation.navigate('LoginScreen');
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.title}>
        <Text style={styles.txt}>DANH SÁCH NHÂN VIÊN</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  txt1: {
    fontFamily: fontRegular,
    fontSize: 16,
  },
  btn: {
    marginTop: 30,
  },
  view1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colorWhite,
  },
  header: {
    height: 30,
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
  },
  txt: {
    fontFamily: fontBold,
    color: colorWhite,
    fontSize: 17,
  },
  btnADD:{
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 7,
    backgroundColor: colorGreen,
  },
});

export default EmployeeScreen;
