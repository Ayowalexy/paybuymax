import { createSlice } from '@reduxjs/toolkit'
import {
    createAccount,
    login,
    logout,
    getUserprofile,
    updateUserprofile,
    resendOtp,
    verifyOtp
} from './thunkActions'

const data = [
    {
        state: 'ongoing',
        id: 1
    }, {
        state: 'half',
        id: 2
    }, {
        state: 'idle',
        id: 3
    }, {
        state: 'idle',
        id: 4
    }, {
        state: 'idle',
        id: 5
    },
]

const initialState = {
    loading: false,
    isLoadingProfile: false,
    data: {},
    nofitications: [],
    authHeaders: data,
    profile: {},
    sendingOtp: 'idle'
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authHeader: (state, action) => {
            return {
                ...state,
                authHeaders: action.payload
            }
        }
    },

    extraReducers: (builder) => {

        builder.addCase(createAccount.pending, (state) => {
            return { ...state, loading: 'pending' }
        });

        builder.addCase(createAccount.fulfilled, (state, action) => {
            return {
                ...state,
                loading: 'successful',
                data: action.payload
            }
        })

        builder.addCase(createAccount.rejected, (state, action) => {
            return { ...state, loading: 'failed' }
        })

        //login

        builder.addCase(login.pending, (state) => {
            return { ...state, loading: 'pending' }
        });

        builder.addCase(login.fulfilled, (state, action) => {
            return {
                ...state,
                loading: 'successful',
                data: action.payload
            }
        })

        builder.addCase(login.rejected, (state, action) => {
            return { ...state, loading: 'failed' }
        })

        //logout

        builder.addCase(logout.pending, (state) => {
            return { ...state, loading: 'pending' }
        });

        builder.addCase(logout.fulfilled, (state, action) => {
            return {
                ...state,
                loading: 'successful',
                data: action.payload
            }
        })

        builder.addCase(logout.rejected, (state, action) => {
            return { ...state, loading: 'failed' }
        })

        //get user profile

        builder.addCase(getUserprofile.pending, (state) => {
            return { ...state, isLoadingProfile: 'pending' }
        });

        builder.addCase(getUserprofile.fulfilled, (state, action) => {
            return {
                ...state,
                isLoadingProfile: 'successful',
                profile: action.payload
            }
        })

        builder.addCase(getUserprofile.rejected, (state, action) => {
            return { ...state, isLoadingProfile: 'failed' }
        })

        //get update user profile

        builder.addCase(updateUserprofile.pending, (state) => {
            return { ...state, loading: 'pending' }
        });

        builder.addCase(updateUserprofile.fulfilled, (state, action) => {
            return {
                ...state,
                loading: 'successful',
            }
        })

        builder.addCase(updateUserprofile.rejected, (state, action) => {
            return { ...state, loading: 'failed' }
        })

         //resend OTP

         builder.addCase(resendOtp.pending, (state) => {
            return { ...state, sendingOtp: 'pending' }
        });

        builder.addCase(resendOtp.fulfilled, (state, action) => {
            return {
                ...state,
                sendingOtp: 'successful',
            }
        })

        builder.addCase(resendOtp.rejected, (state, action) => {
            return { ...state, sendingOtp: 'failed' }
        })

        //verify otp

         builder.addCase(verifyOtp.pending, (state) => {
            return { ...state, loading: 'pending' }
        });

        builder.addCase(verifyOtp.fulfilled, (state, action) => {
            return {
                ...state,
                loading: 'successful',
            }
        })

        builder.addCase(verifyOtp.rejected, (state, action) => {
            return { ...state, loading: 'failed' }
        })
    },

})

export const authReducer = authSlice.reducer;
export default authSlice.reducer;
export const { authHeader } = authSlice.actions