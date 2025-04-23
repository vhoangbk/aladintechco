import {RecruitmentModel} from './typeModel';

export type RootStackParamList = {
  HomeScreen: undefined;
  SplashScreen: undefined;
  TabNavigator: undefined;
  ChatScreen: undefined;
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
};
