import axios from 'axios';
import {API_CANDIDATE, GET_ALL_RECRUITMENTS} from './apiConfig';
import { CandidateModel, RecruitmentModel } from 'src/types/typeModel';

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
