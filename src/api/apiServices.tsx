import axios from 'axios';
import {BASE_URL} from './apiConfig';
import { RecruitmentModel } from 'src/types/typeModel';

export const getRecruitments = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/recruitments`);
    return response.data as RecruitmentModel[];
  } catch (error) {
    console.error('Error fetching recruitments:', error);
    return null;
  }
};
