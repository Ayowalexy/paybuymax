import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import useAxios from "../../utils/useAxios";
import { baseUrl } from "../../utils/routes";
import Toast from 'react-native-toast-message';
import AsyncStorage from "@react-native-async-storage/async-storage";



export const createAccount = createAsyncThunk(
  "signUp",
  async (data, thunkAPI) => {

    const url = `${baseUrl}/register`

    try {
      const response = await useAxios({
        url: url,
        method: "post",
        data: data
      });

      return response.data;
    } catch (error) {
      console.log(error.response.data.errors.email)
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: `${error.response.data.errors.email[0]}` || 'Something went wrong'
      });
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response);
      } else {
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);



export const login = createAsyncThunk(
  "login",
  async (data, thunkAPI) => {
    try {
      const response = await useAxios({
        url: `${baseUrl}/login`,
        method: "post",
        data: data
      })
      
      if(response.status === 200){
        await AsyncStorage.setItem('userDetails', JSON.stringify(response.data));
      }

      return response.data;
    } catch (error) {
      console.log(error.response.data)
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: `${error.response.data.message}` || 'Something went wrong'
      });
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response);
      } else {
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);

export const resendOtp = createAsyncThunk(
  "auth/resendOtp",
  async (data, thunkAPI) => {
    try {
      const response = await useAxios({
        url: `${baseUrl}/email/resend/otp`,
        method: "post",
        data: data
      })
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: "Check your email, we've sent you another OTP"
      });

      return response.data;
    } catch (error) {
      console.log(error.response.data)
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: `${error.response.data.message}` || 'Something went wrong'
      });
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response);
      } else {
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);



export const logout = createAsyncThunk(
  "logout",
  async (data, thunkAPI) => {
    try {
      const response = await useAxios({
        url: `${baseUrl}/logout`,
        method: "post",
      })

      return response.data;
    } catch (error) {
      console.log(error)
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: `${error.response.data.message}` || 'Something went wrong'
      });
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response);
      } else {
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);



export const getUserprofile = createAsyncThunk(
  "user/getUserprofile",
  async (data, thunkAPI) => {
    try {
      const response = await useAxios({
        url: `${baseUrl}/settings/profile`,
        method: "get",
      })

      return response.data.data
    } catch (error) {
      console.log(error)
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: `${error.response.data.message}` || 'Something went wrong'
      });
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response);
      } else {
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);


export const updateUserprofile = createAsyncThunk(
  "user/updateUserprofile",
  async (data, thunkAPI) => {
    try {
      const response = await useAxios({
        url: `${baseUrl}/settings/profile`,
        method: "post",
        data: data
      })

      return response.data.data
    } catch (error) {
      console.log(error)
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: `${error.response.data.message}` || 'Something went wrong'
      });
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response);
      } else {
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);


export const verifyOtp = createAsyncThunk(
  "user/verifyOtp",
  async (data, thunkAPI) => {
    try {
      const response = await useAxios({
        url: `${baseUrl}/email/verification`,
        method: "post",
        data: data
      })

      return response.data.data
    } catch (error) {
      console.log(error.response.data)
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: `${error.response.data.message}` || 'Something went wrong'
      });
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response);
      } else {
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);