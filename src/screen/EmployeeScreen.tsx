import {NativeStackScreenProps} from '@react-navigation/native-stack';
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
import {Department, DepartmentMember, Employee} from 'src/types/typeModel';
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
  const [allEmployees, setAllEmployees] = useState<Employee[]>([]);

  const [isSelectAllEmp, setIsSelectAllEmp] = useState<boolean>(true);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<number | null>(152162567);

  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [memberInDepartment, setMemberInDepartment] = useState<
    DepartmentMember[]
  >([]);
  const [nameDepartmentSelected, setNameDepartmentSelected] =
    useState<string>('');

  const dataDepartment2 = [
    {
      id: 152162567,
      departmentName: 'ALL',
      isleader: '0',
      mail: 'All@gmail.com',
      datetime: null,
      user: {
        id: '0528210048690774',
        login: 'admin',
        firstName: 'Admin',
        lastName: 'Admin',
        email: 'admin@gmail.com',
        activated: false,
        langKey: 'en',
        imageUrl: null,
      },
    },
  ];

  const [dataDepartment3, setDataDepartment3] = useState<Department[]>([]);

  const dataDepartment1 = [...dataDepartment2, ...dataDepartment3];

  const fetchData = async () => {
    if (!authLogin) return;
    setLoadingData(true);
    const data = await getEmployees();
    setEmployeesArray(data as Employee[]);
    setAllEmployees(data as Employee[]);
    setLoadingData(false);
  };

  const fetchDepartment = async () => {
    if (!authLogin) return;
    setLoadingData(true);
    const data = await getListDepartment();
    setDataDepartment3(data);
    console.log(dataDepartment3);
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
      setNameDepartmentSelected(item.departmentName);
      console.log(member);
      setLoadingData(false);
    }
  };

  const getEmployeeByName = (keyword: string | undefined) => {
    if (!keyword) return allEmployees;
    return allEmployees.filter(
      emp =>
        emp.fullName &&
        emp.fullName.toLowerCase().includes(keyword.toLowerCase()),
    );
  };

  // useEffect(() => {
  //   const searchResult = getEmployeeByName(inputSearch);
  //   setEmployeesArray(searchResult);
  // }, [inputSearch]);

  if (!authLogin) {
    return <Frame5 navigation={navigation} route={route} />;
  }

  console.log('rendering...')

  const fillterData = () => {
    console.log('fillterData', memberInDepartment)
    return memberInDepartment.filter((e) => {
      return e.user.login.includes(inputSearch ?? '')
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
            <Text style={{marginHorizontal: 25, color: colorWhite}}>ADD</Text>
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
          />
        </View>

        {isSelectAllEmp ? (
          <FlatList
            data={employeesArray}
            renderItem={({item}: {item: Employee}) => (
              <EmployeeItem item={item} navigation={navigation} />
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
            data={fillterData()}
            renderItem={({item}: {item: DepartmentMember}) => (
              <EmployeeInDepartmentItem item={item} navigation={navigation} />
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
}: {
  item: Employee;
  navigation: any;
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
        <Image
          source={{uri: `${URL_SERVER}${item.avatar}`}}
          style={{width: 80, height: 80, margin: 5, borderRadius: 10}}
        />

        <View style={{margin: 10}}>
          <Text style={{fontFamily: fontBold}}>{item.fullName}</Text>
          <Text>Email: {item.email}</Text>
          <Text>Level: {item.level}</Text>
          <Text>First Day Work: {item.firstDayWork}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const EmployeeInDepartmentItem = ({
  item,
  navigation,
}: {
  item: DepartmentMember;
  navigation: any;
}) => {
  return (
    <TouchableOpacity>
      <View
        style={{
          margin: 5,
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 10,
          elevation: 6,
          backgroundColor: colorWhite,
        }}>
        <Image
          source={imageResource.default}
          style={{width: 80, height: 80, margin: 5, borderRadius: 10}}
        />

        <View style={{margin: 10}}>
          <Text style={{fontFamily: fontBold}}>{item.user.login}</Text>
          <Text>Email: {item.mail}</Text>
          <Text>Level: {item.isleader}</Text>
          <Text>First Day Work: {item.datetime}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const AvatarImage = ({uri}: {uri: string}) => {
  const [error, setError] = useState(false);

  return (
    <Image
      source={error ? imageResource.default : {uri}}
      style={{width: 80, height: 80, margin: 5, borderRadius: 10}}
      onError={() => setError(true)}
    />
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
