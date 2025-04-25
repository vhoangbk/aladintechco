import {createSlice} from '@reduxjs/toolkit';
import { get_AccessKeyStorage } from 'src/commons/AsyncStorage';

interface AuthState {
  auth: boolean;
}

export const check_access_key = async () => {
  const access_key = await get_AccessKeyStorage();
  if(access_key === null){
    return false;
  }
  return true;
};

const initialState: AuthState = {
  auth: false,
};

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: state => {
      state.auth = true;
    },
    logout: state => {
      state.auth = false;
    },
  },
});

export const {login, logout} = AuthSlice.actions;
export default AuthSlice.reducer;
