import {NativeStackScreenProps} from '@react-navigation/native-stack';
import ImageLoad from 'react-native-image-placeholder';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {colorBlack, colorGreen, colorWhite} from '../assets/color';
import {RootState} from 'src/redux/store';
import {RootStackParamList} from 'src/types/RootStackParamList';
import {fontBold, fontRegular} from 'src/types/typeFont';
import {t} from 'i18next';
import Search from 'src/components/Search';
import {Department, Employee} from 'src/types/typeModel';
import {imageResource} from 'src/assets/imageResource';
import {useCallback, useEffect, useState} from 'react';
import {
  getDepartmentByName,
  getEmployees,
  getListDepartment,
} from 'src/api/apiServices';
import {URL_SERVER} from 'src/api/apiConfig';
import {useFocusEffect} from '@react-navigation/native';

type EmployeeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'EmployeeScreen'
>;

const EmployeeScreen = ({navigation, route}: EmployeeScreenProps) => {
  const authLogin = useSelector((state: RootState) => state.auth.auth);
  const [inputSearch, setInputSearch] = useState<string>();

  const [employeesArray, setEmployeesArray] = useState<Employee[]>([]);

  const [isSelectAllEmp, setIsSelectAllEmp] = useState<boolean>(true);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<number | null>(11111);

  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [memberInDepartment, setMemberInDepartment] = useState<Department[]>([]);

  const [dataDepartment2, setDataDepartment2] = useState<Department[]>([]);

  const dataDepartment1: Department[] = [
    {
      id: 11111,
      departmentName: 'ALL',
      isleader: '',
      mail: '',
      datetime: '',
      user: {
        id: '',
        login: '',
        firstName: '',
        lastName: '',
        email: '',
        activated: true,
        langKey: '',
        imageUrl: '',
      },
    },
    ...dataDepartment2,
  ];
  

  const fetchData = async () => {
    if (!authLogin) return;
    setLoadingData(true);
    const data = await getEmployees();
    if(data){
      setEmployeesArray(data as Employee[]);
    }
    setLoadingData(false);
  };

  const fetchDepartment = async () => {
    if (!authLogin) return;
    setLoadingData(true);
    const data = await getListDepartment();
    if(data){
      setDataDepartment2(data);
    }
    console.log(dataDepartment2)
    setLoadingData(false);
  };

  useFocusEffect(
    useCallback(() => {
      if (authLogin) {
        fetchDepartment();
        fetchData();
      }
    }, [authLogin]),
  );

  const handleSelectDepartment = async (item: Department) => {
    setSelectedDepartmentId(item.id)

    if (item.departmentName === 'ALL') {
      setIsSelectAllEmp(true);
      fetchData();
      return;
    } else {
      setLoadingData(true);
      const member = await getDepartmentByName(item.departmentName.toString());
      setIsSelectAllEmp(false);
      setMemberInDepartment(member);
      console.log(member);
      setLoadingData(false);
    }
  };

  if (!authLogin) {
    return <Frame5 navigation={navigation} route={route} />;
  }

  const fillterDataInDepartment = () => {
    return memberInDepartment.filter((e) => {
      return e.user.login.includes(inputSearch ?? '')
    })
  }

  const fillterDataAll = () => {
    return employeesArray.filter((e) => {
      return e.fullName.includes(inputSearch ?? '')
    })
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colorWhite}}>

      <Modal visible={loadingData} transparent={true}>
        <View style={styles.viewLoading}>
          <ActivityIndicator size="large" color={colorGreen} />
        </View>
      </Modal>

      <Header />

      <View style={{flex: 1, marginHorizontal: 15}}>
        <View style={{flexDirection: 'row'}}>
          <Search
            setValue={(v: any) => setInputSearch(v)}
            value={inputSearch}
          />
          <TouchableOpacity
            style={styles.btnADD}
            onPress={() => navigation.navigate('AddNewEmployee')}>
            <Text style={{marginHorizontal: 25, color: colorWhite, fontFamily:fontBold}}>{t('add')}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            data={dataDepartment1}
            renderItem={({item}) => (
              <DepartmentItem item={item} onPress={handleSelectDepartment} isSelected={item.id === selectedDepartmentId}/>
            )}
            horizontal={true}
            contentContainerStyle={{alignItems: 'center'}}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {isSelectAllEmp ? (
          <FlatList
            data={fillterDataAll()}
            renderItem={({item}: {item: Employee}) => (
              <EmployeeItem 
                  item={item} 
                  navigation={navigation} 
                  name={item.fullName} 
                  image={item.avatar}
                  email={item.email}
                  level={item.level}
                  first_daywork={item.firstDayWork} />
            )}
            ListEmptyComponent={
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 20,
                }}>
                <Text>{t('data_null')}</Text>
              </View>
            }
          />
        ) : (
          <FlatList
            data={fillterDataInDepartment()}
            renderItem={({item}: {item: Department}) => (
              <EmployeeItem 
                  item={item} 
                  navigation={navigation} 
                  name={item.user.login} 
                  image={item.user.imageUrl}
                  email={item.mail}
                  level={''}
                  first_daywork={item.datetime ?? ''} />
            )}
            ListEmptyComponent={
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 20,
                }}>
                <Text>{t('data_null')}</Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const DepartmentItem = ({item, onPress, isSelected}: any) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      style={{
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: isSelected ? colorGreen : colorWhite,
        elevation: 10,
        margin: 3,
      }}>
      <Text
        style={{fontFamily: fontBold, marginHorizontal: 20, color: isSelected ? colorWhite : colorBlack}}>
        {item.departmentName}
      </Text>
    </TouchableOpacity>
  );
};

const EmployeeItem = ({
  item,
  navigation,
  name,
  email,
  level,
  first_daywork,
  image
}: {
  item: any;
  navigation: any;
  name: string,
  email: string,
  level: string,
  first_daywork: string,
  image: any
}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('DetailEmployeeScreen', {employeeDetail: item})
      }>
      <View
        style={{
          margin: 5,
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 10,
          elevation: 6,
          backgroundColor: colorWhite,
        }}>

        <ImageLoad
          source={{uri: `${URL_SERVER}${image}`}}
          style={{width: 80, height: 80, margin: 10}}
          isShowActivity = {false}
          placeholderSource = {imageResource.default}
          placeholderStyle = {{width: 80, height: 80}}
        />

        <View style={{margin: 10}}>
          <Text style={{fontFamily: fontBold}}>{name}</Text>
          <Text>{t('email')}: {email}</Text>
          <Text>{t('level')}: {level}</Text>
          <Text>{t('first_daywork')}: {first_daywork}</Text>
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
        <Text style={styles.txt}>{t('danhsachnhanvien')}</Text>
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
  btnADD: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 7,
    backgroundColor: colorGreen,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '85%',
    maxHeight: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: fontBold,
    marginBottom: 10,
  },
  memberItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: 'tomato',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  viewLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

export default EmployeeScreen;
