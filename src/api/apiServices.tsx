import axios from 'axios';
import {
  API_ACCOUNT,
  API_CANDIDATE,
  API_CREATE_NEW_EMPLOYEE,
  API_DEPARTMENT,
  API_DEPARTMENT_LIST,
  API_EMPLOYEES,
  API_PERSONAL_INFORMATION,
  GET_ACCESS_TOKEN,
  GET_ALL_RECRUITMENTS,
} from './apiConfig';
import {CandidateModel, NewEmployee, RecruitmentModel} from 'src/types/typeModel';
import {get_AccessKeyStorage} from '../commons/AsyncStorage';

export const getRecruitments = async () => {
  try {
    const response = await axios.get(GET_ALL_RECRUITMENTS);
    return response.data as RecruitmentModel[];
  } catch (error) {
    console.error('Error fetching recruitments:', error);
    return null;
  }
};

export const postNewCandidates = async (candidateModel: CandidateModel) => {
  try {
    const response = await axios.post(API_CANDIDATE, candidateModel);
    console.log('Post candidate success!', response.data);
  } catch (error) {
    console.error('Post candidate Failed!:', error);
    throw error;
  }
};

export const getEmployees = async () => {
  try {
    const token = await get_AccessKeyStorage();
    const response = await axios.get(API_EMPLOYEES, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching Employees:', error);
    return null;
  }
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
  try {
    const access_token = await get_AccessKeyStorage();
    const response = await axios.get(API_ACCOUNT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Account:', error);
    return null;
  }
};

export const getDepartmentByName = async (nameDepartment: string) => {
  try {
    const access_token = await get_AccessKeyStorage();
    const response = await axios.get(`${API_DEPARTMENT}/${nameDepartment}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching DepartmentByName:', error);
    return null;
  }
};

export const getListDepartment = async () => {
  try {
    const access_token = await get_AccessKeyStorage();
    const response = await axios.get(API_DEPARTMENT_LIST, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching ListDepartment:', error);
    return null;
  }
};

export const getPersonalInformation = async () => {
  try {
    const access_token = await get_AccessKeyStorage();
    const response = await axios.get(API_PERSONAL_INFORMATION, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const data = response.data;
    return data[0];
  } catch (error) {
    console.error('Error fetching PersonalInformation:', error);
    return null;
  }
};

export const postNewEmployee = async (newEmployee: NewEmployee) => {
  try {
    const access_token = await get_AccessKeyStorage();
    const response = await axios.post(API_CREATE_NEW_EMPLOYEE, newEmployee,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    console.log('Post new employee success!', response.data);
  } catch (error) {
    console.error('Post new employee Failed!:', error);
    throw error;
  }
};
