import {NavigatorScreenParams} from '@react-navigation/native';
import {Employee, RecruitmentModel} from './typeModel';

export type RootStackParamList = {
  HomeScreen: undefined;
  SplashScreen: undefined;
  TabNavigator: NavigatorScreenParams<RootTabParamList>;
  ChatScreen: {
    isFromSplash: boolean;
  };
  TuyenDungScreen: undefined;
  PersonScreen: undefined;
  EmployeeScreen: undefined;
  LoginScreen: undefined;
  ContactUs: undefined;
  AboutUs: undefined;
  PersonalInformation: undefined;
  EditPersonalInfor: undefined;
  DetailRecruitment: {
    recruitmentModel: RecruitmentModel;
  };
  ApplyScreen: {
    recruitment: RecruitmentModel;
  };
  AddNewEmployee: undefined;
  DetailEmployeeScreen: {
    employeeDetail: Employee;
  };
  KIEmployeeScreen: undefined;
  CreateKIScreen: undefined;
  DetailKIScreen: {idKI: number};
};

export type RootTabParamList = {
  HomeScreen: undefined;
  PersonScreen: undefined;
  TuyenDungScreen: undefined;
  EmployeeScreen: undefined;
};
