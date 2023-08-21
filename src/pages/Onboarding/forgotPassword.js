import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, Image } from "react-native";
import Layout from "./Layout";
import { colors } from "../../utils/colors";
import { Mail } from "../../utils/assets";
import { Header } from "./SignUp";
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { Button, HStack } from "../../components/Custom";
import { Input } from "../../components/Custom";
import * as Yup from 'yup'
import { useFormik } from "formik";
import { Input2 } from "../../components/Custom";


const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('Enter your email'),
})



const ResetPassword = ({ navigation }) => {

    const {
        handleSubmit,
        handleChange,
        handleBlur,
        isSubmitting,
        errors,
        touched,
    } = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema,
        onSubmit: async (values) => {
        },
    });

    return (
        <Layout head={() => <Header stats='1 half' />}>

            <View style={styles.container}>
                <Text style={styles.signup}>
                    Password reset
                </Text>
                <Text style={styles.email}>
                    Please enter your registered email address to
                    {"\n"}reset your password
                </Text>

                <View style={{width: '100%', marginTop: 20}}>
                    <Input2
                        label='Email'
                        onBlur={handleBlur('email')}
                        setValue={handleChange('email')}
                        placeholder='Enter your email address'
                        error={errors.email}

                    />
                </View>

                <Button onPress={() => navigation.push('OTP', { screen: 'New Password'})} style={{ width: '80%', marginTop: 150 }}>
                    Continue
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
        paddingTop: 10,
        textAlign: 'center'
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

export default ResetPassword