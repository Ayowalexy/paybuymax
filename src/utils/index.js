import AsyncStorage from "@react-native-async-storage/async-storage";



export const getToken = async () => {
    const userDetails = await AsyncStorage.getItem('userDetails');
    const parsed = JSON.parse(userDetails) || {};
    return parsed['token']
}