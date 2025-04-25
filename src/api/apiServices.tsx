import axios from 'axios';
import {API_CANDIDATE, API_EMPLOYEES, GET_ACCESS_TOKEN, GET_ALL_RECRUITMENTS} from './apiConfig';
import { CandidateModel, RecruitmentModel } from 'src/types/typeModel';
import { get_AccessKeyStorage } from './AsyncStorage';

export const getRecruitments = async () => {
  try {
    const response = await axios.get(GET_ALL_RECRUITMENTS);
    return response.data as RecruitmentModel[];
  } catch (error) {
    console.error('Error fetching recruitments:', error);
    return null;
  }
};

export const postNewCandidates = async (candidateModel : CandidateModel) => {
  try {
    const response = await axios.post(API_CANDIDATE,candidateModel);
    console.log('Post candidate success!', response.data);
  } catch (error) {
    console.error('Post candidate Failed!:', error);
    throw error;
  }
};

export const getEmployees = async () => {
  try {
    const token = await get_AccessKeyStorage();
    console.log('Fetching employee...with token:',token);
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

export const getAccessToken = async (username:string,password:string) => {
  const data = new URLSearchParams();

  data.append('client_id', 'web_app');
  data.append('grant_type', 'password');
  data.append('username', username);
  data.append('password', password);

  try {
    const response = await axios.post(
      GET_ACCESS_TOKEN,
      data.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const accessToken = response.data.access_token;

    return accessToken;
  } catch (error:any) {
    console.error('Login failed:', error.response);
    return null;
  }
};
