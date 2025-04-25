import AsyncStorage from '@react-native-async-storage/async-storage';

export const save_AccessKeyStorage = async (token : string) => {
    try {
        await AsyncStorage.setItem('access_token', token);
    } catch (error) {
        console.log('Error save access_key',error);
    }
};

export const get_AccessKeyStorage = async () => {
    try {
        const token = await AsyncStorage.getItem('access_token');
        return token;
    } catch (error) {
        console.error('Failed to fetch the token:', error);
        return null;
    }
};

export const save_Account = async (username:string, password:string) => {
    try {
        await AsyncStorage.setItem('username', username);
        await AsyncStorage.setItem('password', password);
    } catch (error) {
        console.log('Error save account',error);
    }
};

export const get_Field_Saved = async (fieldWantToGet:string) => {
    try {
        const field = await AsyncStorage.getItem(fieldWantToGet);
        return field;
    } catch (error) {
        console.log('Error to get field saved' ,error);
        return null;
    }
};
