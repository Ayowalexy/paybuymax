import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView } from "react-native";
import { colors } from "../../utils/colors";
import Ionicons from 'react-native-vector-icons/Ionicons'
import PINCode from '@haskkor/react-native-pincode'
import { useRoute } from "@react-navigation/native";
import { setPin } from "../../redux/wallet/thunkActions";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Wallet/Preloader";
import { getUserprofile } from "../../redux/auth/thunkActions";


const TransactionPin = ({ navigation }) => {
    const { loading } = useSelector(state => state.walletReducer);
    const { isLoadingProfile } = useSelector(state => state.authReducer)
    const dispatch = useDispatch();
    const route = useRoute();

    const handleSetPin = async (pin) => {
        const otp = route?.params?.code;
        await dispatch(setPin({pin,otp })).then(async res => {
            if(res.meta.requestStatus === 'fulfilled'){
                await dispatch(getUserprofile()).then(res => {
                    if(res.meta.requestStatus === 'fulfilled'){
                        navigation.push('Tabs', { screen: 'Wallet'})
                    }
                })
            }
        })
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
                            titleChoose='Create Transaction Pin'
                            finishProcess={(code) => handleSetPin(code)}
                            styleLockScreenMainContainer={{ backgroundColor: 'red' }}
                            status={'choose'} />
                    </View>
                </View>
            </View>
            <Spinner
                loading="Creating your PIN, please wait..."
                visible={loading === 'pending' || isLoadingProfile === 'pending'  ? true : false}
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
        paddingTop: 40,
        height: Dimensions.get('window').height - 300
    }
})

export default TransactionPin