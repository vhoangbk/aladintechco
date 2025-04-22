import axios from 'axios';
import {GET_ALL_RECRUITMENTS} from './apiConfig';
import { RecruitmentModel } from 'src/types/typeModel';

export const getRecruitments = async () => {
  try {
    const response = await axios.get(GET_ALL_RECRUITMENTS);
    return response.data as RecruitmentModel[];
  } catch (error) {
    console.error('Error fetching recruitments:', error);
    return null;
  }
};
