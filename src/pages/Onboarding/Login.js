import React, { useState } from "react";
import { Text, View, Image, SafeAreaView, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import { Button, HStack } from "../../components/Custom";
import { Logo1 } from "../../utils/assets";
import LinearGradient from 'react-native-linear-gradient';
import Layout from "./Layout";
import { Input } from "../../components/Custom";
import { colors } from "../../utils/colors";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { login, getUserprofile } from "../../redux/auth/thunkActions";
import { getUserWallets } from "../../redux/wallet/thunkActions";
import { useUser } from "../../context/userContext";


const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('Enter your email'),
    password: Yup.string().required('Password is required')
})


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


const Login = ({ navigation }) => {
    const dispatch = useDispatch();
    const { loading, isLoadingProfile } = useSelector(state => state.authReducer);
    const { } = useSelector(state => state.walletReducer)
    const { setEmail } = useUser();


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
            password: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            await dispatch(login(values)).then(async res => {
                if (res.meta.requestStatus === 'fulfilled') {
                    await dispatch(getUserprofile()).then(async res => {
                        if (res.meta.requestStatus === 'fulfilled') {
                            await dispatch(getUserWallets()).then(res => {
                                if (res.meta.requestStatus === 'fulfilled') {
                                    navigation.push('Tabs')
                                }
                            })
                        }
                    })
                } else if(res.payload.data?.message === 'Please verify your email') {
                    setEmail(values.email)
                    navigation.push('OTP')
                }
            })
        },
    });

    return (
        <SafeAreaView>
            <Layout header={"Login"}>
                <View style={{ height: height - 100 }}>
                    <View style={{ marginTop: 50 }}>
                        <Input
                            label='Email'
                            onBlur={handleBlur('email')}
                            setValue={handleChange('email')}
                            placeholder='Enter your email address'
                            errMsg={errors.email}
                            error={!!errors.email && touched.email}

                        />
                        <Input
                            style={{ marginTop: 20 }}
                            label='Password'
                            onBlur={handleBlur('password')}
                            setValue={handleChange('password')}
                            placeholder='Enter your password'
                            errMsg={errors.password}
                            error={!!errors.password && touched.password}
                            type='password'
                        />

                        <TouchableOpacity onPress={() => navigation.push('Reset Password')}>
                            <Text
                                style={styles.pwd}
                            >
                                Forgot password?
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.container}>
                        <Button style={{ width: '85%' }}
                            onPress={handleSubmit} loading={loading === 'pending' || isLoadingProfile === 'pending' ? true : false}
                        >
                            Log in
                        </Button>

                        <TouchableOpacity>
                            <LinearGradient style={styles.fg} colors={[colors.primary, colors.primary_faded]}>
                                <Ionicons name='finger-print-outline' color={colors.white} size={40} />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    <HStack style={styles.footer}>
                        <Text style={styles.text}>
                            New to Paybuymax?
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.push('Page2')}
                        >
                            <Text style={[styles.text, { color: colors.primary, paddingLeft: 5 }]}>
                                Create an account
                            </Text>
                        </TouchableOpacity>
                    </HStack>
                </View>
            </Layout>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 60,
    },
    logo: {
        width: 60,
        height: 60,
        marginTop: 40
    },
    pwd: {
        fontWeight: "400",
        color: colors.black,
        fontSize: 15,
        marginTop: 20,
        fontFamily: 'Poppins-Regular'
    },
    fg: {
        height: 74,
        width: 74,
        borderRadius: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 60
    },
    text: {
        fontFamily: "Poppins-Regular",
        fontWeight: "400",
        color: colors.text,
        fontSize: 15
    },
    footer: {
        // position: 'absolute',
        // bottom: 30,
        marginTop: 20,
        width: '100%'
    }
})

export default Login