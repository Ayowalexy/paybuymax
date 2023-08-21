import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, Image, ActivityIndicator } from "react-native";
import Layout from "../Onboarding/Layout";
import { colors } from "../../utils/colors";
import { Mail } from "../../utils/assets";

import { Header } from "../Onboarding/SignUp";
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { Button, HStack } from "../../components/Custom";
import { useRoute } from "@react-navigation/native";
import { useUser } from "../../context/userContext";
import SmoothPinCodeInput from 'react-native-smooth-pincode-input'
import { verifyOtp, resendOtp } from "../../redux/auth/thunkActions";
import { setPin } from "../../redux/wallet/thunkActions";

import { useSelector, useDispatch } from "react-redux";


const PIN_OTP = ({ navigation }) => {

    const [code, setCode] = useState('')
    const route = useRoute();
    const dispatch = useDispatch();
    const { loading, sendingOtp, profile: { email } } = useSelector(state => state.authReducer);

    const handleVerify = async() => {
        navigation.push('Transaction Pin', { code })
    }

    const handleResend = () => {
        dispatch(resendOtp({email}))
    }

    return (
        <Layout head={() => null}>

            <View style={styles.container}>
                <Text style={styles.signup}>
                    Please enter the code
                </Text>
                <Text style={styles.email}>
                    We sent email to {email}
                </Text>

                <Image source={Mail} resizeMode='contain' style={styles.image} />

                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', paddingTop: 40, paddingBottom: 20 }}>
                   
                    <SmoothPinCodeInput
                        value={code}
                        cellStyle={styles.input}
                        style={{ width: '100%', height: 120, }}
                        codeLength={6}
                        onTextChange={code => setCode(code)}
                    />
                   
                </View>

                <HStack style={styles.footer}>
                    <Text style={styles.text}>
                        Didn't get a mail?
                    </Text>
                    <TouchableOpacity
                        onPress={handleResend}
                    >
                        <Text style={[styles.text, { color: colors.primary, paddingLeft: 5 }]}>
                            {
                                sendingOtp === 'pending'
                                ? <ActivityIndicator size={'small'} color={colors.black} />
                                : 'Send again'
                            }
                        </Text>
                    </TouchableOpacity>
                </HStack>

                <Button loading={loading === 'pending' ? true : false} disabaled={code.length !== 6 ? true : false} onPress={() => {
                    handleVerify()
                }} style={{ width: '80%', marginTop: 40 }}>
                    Verify
                </Button>
            </View>

        </Layout>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 57,
        height: 60,
        marginTop: 50
    },
    signup: {
        color: colors.black,
        fontSize: 24,
        fontWeight: '600',
        fontFamily: 'ReadexPro-Bold'
    },
    container: {
        display: 'flex',
        width: '100%',
        // justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        height: Dimensions.get('screen').height - 180
        // borderWidth: 1
    },
    email: {
        fontSize: 12,
        fontWeight: '400',
        fontFamily: 'Poppins-Regular',
        color: colors.black,
        paddingTop: 10
    },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: colors.black,
        color: colors.borderColor
    },
    text: {
        fontFamily: "Poppins-Regular",
        fontWeight: "400",
        color: colors.text,
        fontSize: 14
    },

})

export default PIN_OTP