import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import useAxios from "../../utils/useAxios";
import { baseUrl } from "../../utils/routes";
import Toast from 'react-native-toast-message';
import AsyncStorage from "@react-native-async-storage/async-storage";


export const getUserWallets = createAsyncThunk(
  "user/wallet",
  async (data, thunkAPI) => {
    try {
      const response = await useAxios({
        url: `${baseUrl}/wallets`,
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


export const getCurrencies = createAsyncThunk(
  "user/currency",
  async (data, thunkAPI) => {
    try {
      const response = await useAxios({
        url: `${baseUrl}/currencies`,
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


export const createWallet = createAsyncThunk(
  "user/createWallet",
  async (data, thunkAPI) => {
    console.log(data)
    try {
      const response = await useAxios({
        url: `${baseUrl}/wallet/store`,
        method: "post",
        data: data
      })
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Wallet created succesfully'
      });

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



export const generateOTP = createAsyncThunk(
  "user/generate",
  async (data, thunkAPI) => {
    console.log(data)
    try {
      const response = await useAxios({
        url: `${baseUrl}/generate/otp`,
        method: "get",
      })
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: "We've sent and OTP to your email succesfully"
      });

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

export const setPin = createAsyncThunk(
  "user/setPin",
  async (data, thunkAPI) => {
    console.log(data)
    try {
      const response = await useAxios({
        url: `${baseUrl}/settings/pin`,
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



export const transfer = createAsyncThunk(
  "user/transfer",
  async (data, thunkAPI) => {
    console.log(data)
    try {
      const response = await useAxios({
        url: `${baseUrl}/wallet-transfer`,
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


export const withdraw = createAsyncThunk(
  "user/withdraw",
  async (data, thunkAPI) => {
    console.log(data)
    try {
      const response = await useAxios({
        url: `${baseUrl}/wallet-withdrawal`,
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


export const getWalletDetails = createAsyncThunk(
  "user/getWalletDetails",
  async (data, thunkAPI) => {
    console.log(data)
    try {
      const response = await useAxios({
        url: `${baseUrl}/wallet/details`,
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


export const getBankAccounts = createAsyncThunk(
  "user/getBankAccounts",
  async (data, thunkAPI) => {
    console.log(data)
    try {
      const response = await useAxios({
        url: `${baseUrl}/settings/accounts`,
        method: "get",
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


export const getAllBanks = createAsyncThunk(
  "user/getAllBanks",
  async (data, thunkAPI) => {
    console.log(data)
    try {
      const response = await useAxios({
        url: `${baseUrl}/banks`,
        method: "get",
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


export const createBankAccount = createAsyncThunk(
  "user/createBankAccount",
  async (data, thunkAPI) => {
    console.log(data)
    try {
      const response = await useAxios({
        url: `${baseUrl}/settings/accounts/store`,
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


export const deleteBankAccount = createAsyncThunk(
  "user/deleteBankAccount",
  async (data, thunkAPI) => {
    try {
      const response = await useAxios({
        url: `${baseUrl}/settings/accounts/delete`,
        method: "post",
        data: data
      })
    
      console.log('ressssssssss', response.data)
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

export const getRates = createAsyncThunk(
  "user/getRates",
  async (data, thunkAPI) => {
    try {
      const response = await useAxios({
        url: `${baseUrl}/rates`,
        method: "get",
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


export const generateReference = createAsyncThunk(
  "user/generateReference",
  async (data, thunkAPI) => {
    try {
      const response = await useAxios({
        url: `${baseUrl}/wallet-deposit`,
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



export const depositCallBack = createAsyncThunk(
  "user/depositCallBack",
  async (data, thunkAPI) => {
    try {
      const response = await useAxios({
        url: `${baseUrl}/wallet-deposit-callback`,
        method: "post",
        data: data
      })
    console.log('response', response.data, data)
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


export const exchange = createAsyncThunk(
  "user/exchange",
  async (data, thunkAPI) => {
    try {
      const response = await useAxios({
        url: `${baseUrl}/wallet-exchange`,
        method: "post",
        data: data
      })
    console.log('response', response.data, data)
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

export const getTransactions = createAsyncThunk(
  "user/getTransactions",
  async (data, thunkAPI) => {
    try {
      const response = await useAxios({
        url: `${baseUrl}/transactions`,
        method: "get",
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


export const walletSearch = createAsyncThunk(
  "user/walletSearch",
  async (data, thunkAPI) => {
    try {
      const response = await useAxios({
        url: `${baseUrl}/wallet-search`,
        method: "post",
        data: data
      })
      console.log('resss', response.data)
      return response.data
    } catch (error) {
      console.log(error.response.data)
      
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response);
      } else {
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);

export const getCharges = createAsyncThunk(
  "user/getCharges",
  async (data, thunkAPI) => {
    try {
      const response = await useAxios({
        url: `${baseUrl}/charges`,
        method: "get",
      })
      console.log('resss', response.data)
      return response.data.data
    } catch (error) {
      console.log(error.response.data)
      
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response);
      } else {
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);