import { createSlice } from '@reduxjs/toolkit'
import {
    getUserWallets,
    getCurrencies,
    createWallet,
    generateOTP,
    setPin,
    transfer,
    withdraw,
    getWalletDetails,
    getBankAccounts,
    getAllBanks,
    createBankAccount,
    deleteBankAccount,
    getRates,
    generateReference,
    depositCallBack,
    exchange,
    getTransactions,
    walletSearch,
    getCharges
} from './thunkActions'


const initialState = {
    loading: false,
    wallets: [],
    oneWallet: {},
    currencies: [],
    isLoading: false,
    walletDetails: {
        wallet: {
            currency_id: ""
        }
    },
    gettingbanks: 'idle',
    banksAccounts: [],
    allBanks: [],
    isDeleting: 'idle',
    rates: [],
    data: {},
    transactions:[],
    walletName: {},
    charges: {}
}

export const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        setOneWallet: (state, action) => {
            const wallet = state.wallets.find(element => element.id.toString() === action.payload.id.toString());
            return {
                ...state,
                oneWallet: wallet
            }
        }
    },

    extraReducers: (builder) => {

        builder.addCase(getUserWallets.pending, (state) => {
            return { ...state, loading: 'pending' }
        });

        builder.addCase(getUserWallets.fulfilled, (state, action) => {
            
            return {
                ...state,
                loading: 'successful',
                wallets: action.payload
            }
        })

        builder.addCase(getUserWallets.rejected, (state, action) => {
            return { ...state, loading: 'failed' }
        })

        // currency
        builder.addCase(getCurrencies.pending, (state) => {
            return { ...state, loading: 'pending' }
        });

        builder.addCase(getCurrencies.fulfilled, (state, action) => {
           
            return {
                ...state,
                loading: 'successful',
                currencies: action.payload
            }
        })

        builder.addCase(getCurrencies.rejected, (state, action) => {
            return { ...state, loading: 'failed' }
        })

        // create wallet
        builder.addCase(createWallet.pending, (state) => {
            return { ...state, isLoading: 'pending' }
        });

        builder.addCase(createWallet.fulfilled, (state, action) => {
            return {
                ...state,
                isLoading: 'successful',
            }
        })

        builder.addCase(createWallet.rejected, (state, action) => {
            return { ...state, isLoading: 'failed' }
        })

        // generate OTP
        builder.addCase(generateOTP.pending, (state) => {
            return { ...state, loading: 'pending' }
        });

        builder.addCase(generateOTP.fulfilled, (state, action) => {
            return {
                ...state,
                loading: 'successful',
            }
        })

        builder.addCase(generateOTP.rejected, (state, action) => {
            return { ...state, loading: 'failed' }
        })

         // set otp
         builder.addCase(setPin.pending, (state) => {
            return { ...state, loading: 'pending' }
        });

        builder.addCase(setPin.fulfilled, (state, action) => {
            return {
                ...state,
                loading: 'successful',
            }
        })

        builder.addCase(setPin.rejected, (state, action) => {
            return { ...state, loading: 'failed' }
        })

         // transfer
        builder.addCase(transfer.pending, (state) => {
            return { ...state, loading: 'pending' }
        });

        builder.addCase(transfer.fulfilled, (state, action) => {
            return {
                ...state,
                loading: 'successful',
            }
        })

        builder.addCase(transfer.rejected, (state, action) => {
            return { ...state, loading: 'failed' }
        })

         // withdraw
         builder.addCase(withdraw.pending, (state) => {
            return { ...state, loading: 'pending' }
        });

        builder.addCase(withdraw.fulfilled, (state, action) => {
            return {
                ...state,
                loading: 'successful',
            }
        })

        builder.addCase(withdraw.rejected, (state, action) => {
            return { ...state, loading: 'failed' }
        })


         // get wallet details
         builder.addCase(getWalletDetails.pending, (state) => {
            return { ...state, loading: 'pending' }
        });

        builder.addCase(getWalletDetails.fulfilled, (state, action) => {
            return {
                ...state,
                loading: 'successful',
                walletDetails: action.payload
            }
        })

        builder.addCase(getWalletDetails.rejected, (state, action) => {
            return { ...state, loading: 'failed' }
        })

        // get bank accounts
        builder.addCase(getBankAccounts.pending, (state) => {
            return { ...state, gettingbanks: 'pending' }
        });

        builder.addCase(getBankAccounts.fulfilled, (state, action) => {
            return {
                ...state,
                gettingbanks: 'successful',
                banksAccounts: action.payload
            }
        })

        builder.addCase(getBankAccounts.rejected, (state, action) => {
            return { ...state, gettingbanks: 'failed' }
        })


        // get all banks
        builder.addCase(getAllBanks.pending, (state) => {
            return { ...state, loading: 'pending' }
        });

        builder.addCase(getAllBanks.fulfilled, (state, action) => {
            return {
                ...state,
                loading: 'successful',
                allBanks: action.payload
            }
        })

        builder.addCase(getAllBanks.rejected, (state, action) => {
            return { ...state, loading: 'failed' }
        })


         // create bank account
         builder.addCase(createBankAccount.pending, (state) => {
            return { ...state, loading: 'pending' }
        });

        builder.addCase(createBankAccount.fulfilled, (state, action) => {
            return {
                ...state,
                loading: 'successful',
            }
        })

        builder.addCase(createBankAccount.rejected, (state, action) => {
            return { ...state, loading: 'failed' }
        })


         // delete bank account
         builder.addCase(deleteBankAccount.pending, (state) => {
            return { ...state, isDeleting: 'pending' }
        });

        builder.addCase(deleteBankAccount.fulfilled, (state, action) => {
            return {
                ...state,
                isDeleting: 'successful',
            }
        })

        builder.addCase(deleteBankAccount.rejected, (state, action) => {
            return { ...state, isDeleting: 'failed' }
        })

        // get rates
         builder.addCase(getRates.pending, (state) => {
            return { ...state, loading: 'pending' }
        });

        builder.addCase(getRates.fulfilled, (state, action) => {
            return {
                ...state,
                loading: 'successful',
                rates: action.payload
            }
        })

        builder.addCase(getRates.rejected, (state, action) => {
            return { ...state, loading: 'failed' }
        })

        // generate reference
        builder.addCase(generateReference.pending, (state) => {
            return { ...state, loading: 'pending' }
        });

        builder.addCase(generateReference.fulfilled, (state, action) => {
            return {
                ...state,
                loading: 'successful',
                data: action.payload
            }
        })

        builder.addCase(generateReference.rejected, (state, action) => {
            return { ...state, loading: 'failed' }
        })

        // depsit callback
        builder.addCase(depositCallBack.pending, (state) => {
            return { ...state, loading: 'pending' }
        });

        builder.addCase(depositCallBack.fulfilled, (state, action) => {
            return {
                ...state,
                loading: 'successful',
            }
        })

        builder.addCase(depositCallBack.rejected, (state, action) => {
            return { ...state, loading: 'failed' }
        })

        // exchange
        builder.addCase(exchange.pending, (state) => {
            return { ...state, isLoading: 'pending' }
        });

        builder.addCase(exchange.fulfilled, (state, action) => {
            return {
                ...state,
                isLoading: 'successful',
            }
        })

        builder.addCase(exchange.rejected, (state, action) => {
            return { ...state, isLoading: 'failed' }
        })

        // transactions
        builder.addCase(getTransactions.pending, (state) => {
            return { ...state, isLoading: 'pending' }
        });

        builder.addCase(getTransactions.fulfilled, (state, action) => {
            return {
                ...state,
                isLoading: 'successful',
                transactions:action.payload
            }
        })

        builder.addCase(getTransactions.rejected, (state, action) => {
            return { ...state, isLoading: 'failed' }
        })

        // wallet search
        builder.addCase(walletSearch.pending, (state) => {
            return { ...state, isLoading: 'pending' }
        });

        builder.addCase(walletSearch.fulfilled, (state, action) => {
            return {
                ...state,
                isLoading: 'successful',
                walletName:action.payload
            }
        })

        builder.addCase(walletSearch.rejected, (state, action) => {
            return { ...state, isLoading: 'failed' }
        })

         // charges
         builder.addCase(getCharges.pending, (state) => {
            return { ...state, loading: 'pending' }
        });

        builder.addCase(getCharges.fulfilled, (state, action) => {
            return {
                ...state,
                loading: 'successful',
                charges:action.payload
            }
        })

        builder.addCase(getCharges.rejected, (state, action) => {
            return { ...state, loading: 'failed' }
        })
    },

})

export const walletReducer = walletSlice.reducer;
export default walletSlice.reducer;
export const { setOneWallet } = walletSlice.actions;
