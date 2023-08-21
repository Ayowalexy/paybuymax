import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView } from "react-native";
import { colors } from "../../utils/colors";
import Ionicons from 'react-native-vector-icons/Ionicons'
import PINCode, {
    hasUserSetPinCode,
    deleteUserPinCode
} from '@haskkor/react-native-pincode'
import { useRoute } from "@react-navigation/native";
import { setPin } from "../../redux/wallet/thunkActions";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Wallet/Preloader";
import { transfer, withdraw, getUserWallets, exchange } from "../../redux/wallet/thunkActions";
import { getUserprofile } from "../../redux/auth/thunkActions";
import { useUser } from "../../context/userContext";


const PIN_CONFIRM = ({ navigation }) => {
    const { loading, oneWallet, isLoading } = useSelector(state => state.walletReducer);
    const { isLoadingProfile } = useSelector(state => state.authReducer)
    const dispatch = useDispatch();
    const route = useRoute();
    const { sendSummary: { type, amount, address, ...otherData }, action_type } = useUser();


    const handleSetPin = async (pin) => {
        const data = {
            ...route.params,
            pin,
            currency_id: oneWallet.currency.id.toString()
        }
        if (action_type === 'Send') {
            await dispatch(transfer(data)).then(res => {
                if (res.meta.requestStatus === 'fulfilled') {
                    navigation.push('Feedback')
                    dispatch(getUserWallets())
                }
            })
        } else if(action_type === 'Withdraw') {
            const useData = {
                pin,
                wallet_id: otherData.wallet_id.toString(),
                bankaccount_id: otherData.bankaccount_id.toString(),
                amount: amount
            }
            console.log('data', useData)
            await dispatch(withdraw(useData)).then(res => {
                if (res.meta.requestStatus === 'fulfilled') {
                    navigation.push('Feedback')
                }
            })
        } else if(action_type === 'Exchange'){
            await dispatch(exchange({...otherData, pin})).then(res => {
                if (res.meta.requestStatus === 'fulfilled') {
                    navigation.push('Feedback')
                    dispatch(getUserWallets())
                }
            })
        }
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name='arrow-back' color={colors.black} size={20} />
                </TouchableOpacity>
                <View style={styles.content}>
                    <Text style={styles.text_1}></Text>
                    <Text style={styles.text_2}></Text>
                    <View>
                        <PINCode
                            stylePinCodeTextTitle={styles.text_1}
                            stylePinCodeTextSubtitle={styles.text_2}
                            stylePinCodeColorTitle={colors.black}
                            titleConfirm='Confirm your PIN code'
                            colorPassword={colors.primary}
                            numbersButtonOverlayColor={colors.primary}
                            stylePinCodeColorSubtitle={colors.black}
                            subtitleChoose='Enter Your Pin'
                            touchIDDisabled={true}
                            titleChoose='Confirm this Transaction'
                            finishProcess={(code) => handleSetPin(code)}
                            disableLockScreen={true}
                            styleLockScreenMainContainer={{ backgroundColor: 'red' }}
                            status={'enter'}
                        />
                    </View>
                </View>
            </View>
            <Spinner
                loading={
                    `${action_type === 'Withdraw' 
                        ? "Withdrawing" 
                        : action_type === 'Exchange'
                        ? "Exchanging"
                        : 'Transfering'}, please wait...`}
                visible={loading === 'pending' ? true : isLoading === 'pending' ? true : false}
            />
        </SafeAreaView>

    )
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: Dimensions.get('window').height,
        backgroundColor: colors.white,
        padding: 20
    },
    text_1: {
        fontFamily: "Poppins-Bold",
        fontSize: 20,
        color: colors.black
    },
    text_2: {
        fontFamily: "ReadexPro-Light",
        fontSize: 15,
        color: colors.black,
        paddingTop: 10
    },
    content: {
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
        // paddingTop: 40,
        height: Dimensions.get('window').height ,
        marginTop: -80

    }
})

export default PIN_CONFIRM