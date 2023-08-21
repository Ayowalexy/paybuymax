import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import * as Yup from 'yup';
import { useFormik } from "formik";
import Layout from "./Layout";
import { colors } from "../../utils/colors";
import { Input } from "../../components/Custom";
import { HStack } from "../../components/Custom";
import { Button } from "../../components/Custom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createAccount } from "../../redux/auth/thunkActions";
import { useUser } from "../../context/userContext";

export const Header = () => {
    const { authHeaders } = useSelector(state => state.authReducer)
    return (
        <View style={styles.box_cont}>
            {
                authHeaders.map(el => (
                    <View key={el.id}>
                        {el.id % 2 === 1 ? (
                            <View
                                key={el.id}
                                style={[styles.box_1, {
                                    backgroundColor: el.state === 'done' ? colors.primary : colors.white,
                                    borderColor: el.state === 'ongoing' ? colors.primary : colors.line
                                }]}
                            >
                                <Text style={[styles.text_1, {
                                    color: el.state === 'ongoing'
                                        ? colors.primary
                                        : el.state === 'done'
                                            ? colors.white : colors.line
                                }]}>
                                    {
                                        el.id === 1
                                            ? 1
                                            : el.id === 3
                                                ? 2
                                                : el.id === 5
                                                    ? 3
                                                    : null
                                    }
                                </Text>
                            </View>
                        ) : (
                            <View style={styles.line_p}>
                                <View style={[styles.line, { 
                                    width: el.state === 'half' ? 20 : el.state === 'full' ? 40: 0
                                }]} />
                            </View>
                        )
                        }
                    </View>
                ))
            }
        </View>
    )
}


const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('Enter your email'),
    name: Yup.string().required('Enter your name'),
    referer: Yup.string(),
    password: Yup.string()
        .matches(/\d/, "Password must have a number")
        .min(8, ({ min }) => `Password must be at least ${min} characters`)
        .required("Password is required"),
})

const SignUp = ({ navigation }) => {

    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.authReducer)
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
            name: '',
            referer: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            await dispatch(createAccount(values)).then(res => {
                if(res.meta.requestStatus === 'fulfilled'){
                    setEmail(values.email)
                    navigation.push('Page 3')
                }
            })
        },
    });

    return (
        <Layout head={() => <Header stats='1 half' />}>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.text_p}>
                        <Text style={styles.signup}>
                            Sign Up
                        </Text>
                    </View>

                    <View>
                        <Input
                            style={{ marginTop: 20 }}
                            label='Name'
                            onBlur={handleBlur('name')}
                            setValue={handleChange('name')}
                            placeholder='Enter your full name'
                            error={!!errors.name && touched.name}
                            paddingLeft={20}
                            errMsg={errors.name}

                        />
                        <Input
                            style={{ marginTop: 20 }}

                            label='Email'
                            onBlur={handleBlur('email')}
                            setValue={handleChange('email')}
                            placeholder='Enter your email address'
                            error={!!errors.email && touched.email}
                            paddingLeft={20}
                            errMsg={errors.email}

                        />
                        <Input
                            style={{ marginTop: 20 }}

                            label='Referer'
                            onBlur={handleBlur('referer')}
                            setValue={handleChange('referer')}
                            placeholder='Enter your referer code'
                            error={!!errors.referer && touched.referer}
                            paddingLeft={20}
                            errMsg={errors.referer}

                        />

                        <Input
                            style={{ marginTop: 20 }}
                            label='Password'
                            onBlur={handleBlur('password')}
                            setValue={handleChange('password')}
                            placeholder='Enter your password'
                            error={!!errors.password && touched.password}
                            type='password'
                            paddingLeft={20}
                            errMsg={errors.password}
                        />

                        <HStack style={{ marginTop: 80 }}>
                            <Text style={styles.accept}>
                                Accept
                            </Text>
                            <TouchableOpacity>
                                <Text style={[styles.accept, { color: colors.primary }]}>

                                    {" "}Terms of Use
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={[styles.accept, { color: colors.primary }]}>
                                    {" "} & Privacy Policy
                                </Text>
                            </TouchableOpacity>
                        </HStack>

                        <View style={styles.text_p}>
                            <Button onPress={handleSubmit} loading={loading === 'pending' ? true : false} style={{ width: '80%', marginTop: 30 }}>
                                Continue
                            </Button>
                        </View>
                    </View>

                    <HStack
                        style={styles.footer}
                    >
                        <Text style={styles.accept}>
                            Already have an account?
                        </Text>
                        <TouchableOpacity onPress={() => navigation.push('Login')}>
                            <Text style={[styles.accept, { color: colors.primary }]}>
                                {" "}Login
                            </Text>
                        </TouchableOpacity>
                    </HStack>


                </View>
            </ScrollView>

        </Layout>
    )
}

const styles = StyleSheet.create({
    box_1: {
        width: 22,
        height: 22,
        borderRadius: 20,
        display: 'flex',
        borderWidth: 1,
        borderColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text_1: {
        color: colors.primary,
        fontFamily: "Poppins-Regular",
        textAlign: 'center'
    },
    text_p: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20
    },
    line: {
        width: 20,
        height: 2,
        backgroundColor: colors.primary,
        position: 'absolute'
    },
    line_p: {
        width: 40,
        height: 2,
        backgroundColor: colors.line
    },
    box_cont: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    signup: {
        color: colors.black,
        fontSize: 32,
        fontWeight: '600',
        fontFamily: 'ReadexPro-Bold'
    },
    container: {
        display: 'flex',
        width: '100%',
        // justifyContent: 'center',
        // alignItems: 'center',
        marginTop: 40,
        // height: Dimensions.get('screen').height - 180,
        marginBottom: 200,
        // borderWidth: 1
    },
    accept: {
        fontSize: 15,
        fontWeight: '400',
        fontFamily: 'Poppins-Regular',
        color: colors.black
    },
    footer: {
        marginTop: 20
    }
})

export default SignUp