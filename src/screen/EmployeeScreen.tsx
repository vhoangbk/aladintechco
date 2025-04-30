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
import {colorGreen, colorWhite} from '../assets/color';
import {RootState} from 'src/redux/store';
import {RootStackParamList} from 'src/types/RootStackParamList';
import {fontBold, fontRegular} from 'src/types/typeFont';
import {t} from 'i18next';
import Search from 'src/components/Search';
import {Department, DepartmentMember, Employee} from 'src/types/typeModel';
import {imageResource} from 'src/assets/imageResource';
import {useEffect, useState} from 'react';
import {
  getDepartmentByName,
  getEmployees,
  getListDepartment,
} from 'src/api/apiServices';

type EmployeeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'EmployeeScreen'
>;

const EmployeeScreen = ({navigation, route}: EmployeeScreenProps) => {
  const authLogin = useSelector((state: RootState) => state.auth.auth);

  const [employeesArray, setEmployeesArray] = useState<Employee[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [memberInDepartment,setMemberInDepartment] = useState<DepartmentMember[]>([]);
  const [nameDepartmentSelected,setNameDepartmentSelected] = useState<string>('');

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
    setLoadingData(true);
    const data = await getEmployees();
    setEmployeesArray(data as Employee[]);
    setLoadingData(false);
  };

  const fetchDepartment = async () => {
    setLoadingData(true);
    const data = await getListDepartment();
    setDataDepartment3(data);
    setLoadingData(false);
  };

  useEffect(() => {
    if (authLogin) {
      fetchDepartment();
      fetchData();
    }
  }, [authLogin]);

  const handleSelectDepartment = async (item: Department) => {
    if (item.departmentName === 'ALL') {
      fetchData();
      return;
    } else {
      const member = await getDepartmentByName(
        item.departmentName.toString(),
      );
      setModalVisible(true);
      setMemberInDepartment(member);
      setNameDepartmentSelected(item.departmentName);
      console.log(member);
    }
  };

  if (loadingData) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colorWhite,
        }}>
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
      <View style={{flex: 1, marginHorizontal: 15}}>
        <View style={{flexDirection: 'row'}}>
          <Search />
          <TouchableOpacity style={styles.btnADD} onPress={() => navigation.navigate('AddNewEmployee')}>
            <Text style={{marginHorizontal: 25, color: colorWhite}}>ADD</Text>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            data={dataDepartment1}
            renderItem={({item}) => (
              <DepartmentItem item={item} onPress={handleSelectDepartment} />
            )}
            horizontal={true}
            contentContainerStyle={{alignItems: 'center'}}
          />
        </View>
        <FlatList
          data={employeesArray}
          renderItem={({item}: {item: Employee}) => (
            <EmployeeItem item={item} />
          )}
        />
      </View>

      <ModalDepartmentList
        modalVisible={modalVisible}
        setModalVisible = {setModalVisible}
        memberInDepartment = {memberInDepartment}
        nameDepartment = {nameDepartmentSelected}/>

    </SafeAreaView>
  );
};

const ModalDepartmentList = ({modalVisible,setModalVisible,memberInDepartment,nameDepartment}
  : {
    modalVisible:any;
    setModalVisible:any;
    memberInDepartment: DepartmentMember[];
    nameDepartment:string;
}) => {
  return(
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            {nameDepartment}
          </Text>

          <FlatList
            data={memberInDepartment}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.memberItem}>
                <Text>ID: {item.id}</Text>
                <Text style={{ fontFamily: fontBold }}>Name: {item.user.login}</Text>
                <Text>Email: {item.mail}</Text>
              </View>
            )}
          />

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}>
            <Text style={{ color: 'white' }}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const DepartmentItem = ({item, onPress}: any) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      style={{
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: colorGreen,
        elevation: 10,
        margin: 3,
      }}>
      <Text
        style={{fontFamily: fontBold, marginHorizontal: 20, color: colorWhite}}>
        {item.departmentName}
      </Text>
    </TouchableOpacity>
  );
};

const EmployeeItem = ({item}: {item: Employee}) => {
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
          source={imageResource.noneimage}
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
});

export default EmployeeScreen;
