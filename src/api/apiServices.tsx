import axios from 'axios';
import {
  API_ACCOUNT,
  API_CANDIDATE,
  API_CREATE_NEW_EMPLOYEE,
  API_DEPARTMENT,
  API_DEPARTMENT_LIST,
  API_EMPLOYEES,
  API_KI,
  API_ONE_DEPARTMENT,
  API_PERSONAL_INFORMATION,
  API_UPDATE_EMPLOYEE,
  API_UPLOAD_CV,
  API_UPLOAD_IMAGE,
  GET_ACCESS_TOKEN,
  GET_ALL_RECRUITMENTS,
} from './apiConfig';
import {CandidateModel, NewEmployee, NewKI, RecruitmentModel, UpdateEmployee} from 'src/types/typeModel';
import {get_AccessKeyStorage} from '../commons/AsyncStorage';
import {getRequest, postRequest, putRequest} from './apiRequest';

export const getRecruitments = async () => {
    const response = await getRequest(GET_ALL_RECRUITMENTS);
    return response as RecruitmentModel[];
};

export const postNewCandidates = async (candidateModel: CandidateModel) => {
  const response = await postRequest(API_CANDIDATE, candidateModel);
  return response;
};

export const getEmployees = async () => {
  const response = await getRequest(API_EMPLOYEES);
  return response?.data ?? null;
};

export const getAccessToken = async (username: string, password: string) => {
  const data = new URLSearchParams();

  data.append('client_id', 'web_app');
  data.append('grant_type', 'password');
  data.append('username', username);
  data.append('password', password);

  try {
    const response = await axios.post(GET_ACCESS_TOKEN, data.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const accessToken = response.data.access_token;

    return accessToken;
  } catch (error: any) {
    console.error('Login failed:', error.response);
    return null;
  }
};

export const getAccount = async () => {
  const response = await getRequest(API_ACCOUNT);
    return response;
};

export const getDepartmentByName = async (nameDepartment: string) => {
  const response = await getRequest(`${API_DEPARTMENT}/${nameDepartment}`);
    return response;
};

export const getListDepartment = async () => {
  const response = await getRequest(API_DEPARTMENT_LIST);
  return response;
};

export const getOneDepartment = async () => {
  const response = await getRequest(API_ONE_DEPARTMENT);
  return response;
};

export const getPersonalInformation = async () => {
  const response = await getRequest(API_PERSONAL_INFORMATION);
  return response[0];
};

export const postNewEmployee = async (newEmployee: NewEmployee) => {
  const response = await postRequest(API_CREATE_NEW_EMPLOYEE, newEmployee);
  return response;
};

export const postNewKI = async (newKI: NewKI) => {
  const response = await postRequest(API_KI, newKI);
  return response;
};

export const upLoadImageToServer = async (uri:string) => {
    const fomData = new FormData();
    const fileName = uri.split('/').pop() || 'photo.jpg';
    const file = {
      uri,
      type: 'image/jpeg',
      name:fileName,
    } as any;

    fomData.append('file', file);

    try {
      const access_token = await get_AccessKeyStorage();
      const response = await axios.post (API_UPLOAD_IMAGE,fomData,{
        headers:{
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${access_token}`,
        }
      })
      console.log('Upload Image success!!!:', response.data);
      return response.data;
    } catch (error) {
      console.error('Upload image error:', error);
    }
}

export const upLoadCVToServer = async (uri:string) => {
  const fomData = new FormData();
  const fileName = uri.split('/').pop() || 'cv.pdf';
  const file = {
    uri,
    type: 'file/pdf',
    name:fileName,
  } as any;

  fomData.append('file', file);

  try {
    const access_token = await get_AccessKeyStorage();
    const response = await axios.post (API_UPLOAD_CV,fomData,{
      headers:{
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${access_token}`,
      }
    })
    console.log('Upload CV success!!!:', response.data);
    return response.data;
  } catch (error) {
    console.error('Upload CV error:', error);
  }
}

export const putUpdateEmployee = async (idEmpl : any , updatedData: UpdateEmployee) => {
  const response = await putRequest(`${API_UPDATE_EMPLOYEE}/${idEmpl}`, updatedData);
  return response;
}

export const getKIInfor = async (id:string) => {
  const response = await getRequest(`${API_KI}/${id}`);
  return response;
};

export const getKIAll = async () => {
  const response = await getRequest(API_KI);
  return response;
};
