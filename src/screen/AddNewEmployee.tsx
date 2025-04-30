import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useEffect, useState} from 'react';
import {Alert, Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import { useSelector } from 'react-redux';
import { getListDepartment, postNewEmployee } from 'src/api/apiServices';
import InputField from 'src/components/InputField';
import { RootState } from 'src/redux/store';
import {RootStackParamList} from 'src/types/RootStackParamList';
import { NewEmployee} from 'src/types/typeModel';

type AddNewEmployeeProps = NativeStackScreenProps<
  RootStackParamList,
  'AddNewEmployee'
>;

const AddNewEmployee = () => {
    const authLogin = useSelector((state: RootState) => state.auth.auth);
    const [loadingCreate , setLoadingCreate] = useState(false);
    const [formNewEmployee, setFormNewEmployee] = useState<NewEmployee>({
        "avatar": "null",
        "contractInfo": "null",
        "countryside": "",
        "currentResidence": "",
        "dateOfBirth": "2025-04-30",
        "departmentId": 0,
        "education": "",
        "email": "",
        "emergencyContact": "null",
        "employeeDocuments": [
        {
            "documentType": "CERTIFICATE",
            "documentUrl": "null",
            "id": 0
        }
        ],
        "employeeStatus": "null",
        "english": "null",
        "experience": "null",
        "facebookLink": "null",
        "family": "null",
        "favourite": "null",
        "firstDayWork": "2025-04-30",
        "foreignLanguage": "null",
        "fullName": "",
        "gender": "null",
        "identificationNumber": "null",
        "jobPositionId": 0,
        "jobTitleId": 0,
        "level": "null",
        "linkedInLink": "null",
        "objectiveInCV": "",
        "officialContractEndDate": "2025-04-30",
        "officialContractStartDate": "2025-04-30",
        "phoneNumber": "",
        "probationEndDate": "2025-04-30",
        "probationStartDate": "2025-04-30",
        "skypeLink": "null",
        "status": "null",
        "telegramLink": "null",
        "userId": "string",
        "workModelId": 0
    });

    const getUserID = async () => {
        const data = await getListDepartment();
        const userid = data[0].user.id.toString();
        setFormNewEmployee(oldData => ({ ...oldData, userId: userid }));
    };

    const getDepartmentID = async () => {
        const data = await getListDepartment();
        const departmentid = data[0].id;
        setFormNewEmployee(oldData => ({ ...oldData, departmentId: Number(departmentid) }));
    };

    useEffect(()=>{
        getUserID();
        getDepartmentID();
    },[authLogin]);

    const handleCreateNewEmployee = async () => {
        try {
            console.log(formNewEmployee);
            setLoadingCreate(true);
            await postNewEmployee(formNewEmployee);
            setLoadingCreate(false);
        } catch (error) {
            console.log('Error Create New Employee: ',error);
            setLoadingCreate(false);
        }

    };

  return (
    <SafeAreaView>
      <View style = {styles.container}>
            <InputField
              label={'Ho ten: '}
              placeholder={'Ho ten:'}
              value={formNewEmployee.fullName}
              onChangeText={ (change) =>{
                setFormNewEmployee(oldData => ({ ...oldData, fullName: change }));
              }
              }
            />
            <InputField
              label={'SDT: '}
              placeholder={'SDT:'}
              value={formNewEmployee.phoneNumber}
              onChangeText={ (change) =>{
                setFormNewEmployee(oldData => ({ ...oldData, phoneNumber: change }));
              }
              }
            />
            <InputField
              label={'Email: '}
              placeholder={'Email:'}
              value={formNewEmployee.email}
              onChangeText={ (change) =>{
                setFormNewEmployee(oldData => ({ ...oldData, email: change }));
              }
              }
            />
            <InputField
              label={'Que quan: '}
              placeholder={'Que quan:'}
              value={formNewEmployee.countryside}
              onChangeText={ (change) =>{
                setFormNewEmployee(oldData => ({ ...oldData, countryside: change }));
              }
              }
            />
            <InputField
              label={'Noi thuong tru: '}
              placeholder={'Noi thuong tru:'}
              value={formNewEmployee.currentResidence}
              onChangeText={ (change) =>{
                setFormNewEmployee(oldData => ({ ...oldData, currentResidence: change }));
              }
              }
            />
            <InputField
              label={'Trinh do hoc van: '}
              placeholder={'Trinh do hoc van:'}
              value={formNewEmployee.education}
              onChangeText={ (change) =>{
                setFormNewEmployee(oldData => ({ ...oldData, education: change }));
              }
              }
            />
            <InputField
              label={'Muc tieu cong viec: '}
              placeholder={'Fullname:'}
              value={formNewEmployee.objectiveInCV}
              onChangeText={ (change) =>{
                setFormNewEmployee(oldData => ({ ...oldData, objectiveInCV: change }));
              }
              }
            />

            <Button title={'Submit form'} onPress={handleCreateNewEmployee}/>
      </View>
    </SafeAreaView>
  );
};

export default AddNewEmployee;

const styles = StyleSheet.create({
  container: {
    margin:20,
  },
});
