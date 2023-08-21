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
import { Switch } from 'react-native-switch';


const validationSchema = Yup.object().shape({
    password: Yup.string()
        .min(6, ({ min }) => `Password must be at least ${min} characters`)
        .required("Password is required"),
    confirm_password: Yup.string().test(
        "passwords-match",
        "Passwords must match",
        function (value) {
            return this.parent.password === value;
        }
    ),
})



const NewPassword = ({ navigation }) => {

    const [val, setVal] = useState(false)

    const {
        handleSubmit,
        handleChange,
        handleBlur,
        errors,
        values
    } = useFormik({
        initialValues: {
            password: "",
            confirm_password: ''
        },
        validationSchema,
        onSubmit: async (values) => {
        },
    });

    return (
        <Layout head={() => <Header stats='1 half' />}>

            <View style={styles.container}>
                <Text style={styles.signup}>
                    Create a password
                </Text>
                <Text style={styles.email}>
                    The password must be 8 characters, including 1 {"\n"}uppercase letter, 1 number and 1 special character.
                </Text>

                <View style={{ width: '100%', marginTop: 20 }}>
                    <Input2
                        label='Password'
                        onBlur={handleBlur('password')}
                        setValue={handleChange('password')}
                        placeholder='Enter your email address'
                        error={errors.password}
                        type={"password"}
                        element={'password'}
                        values={values}

                    />
                    <Input2
                        label='New password'
                        onBlur={handleBlur('confirm_password')}
                        setValue={handleChange('confirm_password')}
                        error={errors.confirm_password}
                        type={"password"}
                        element={'confirm_password'}
                        values={values}


                    />
                </View>

                <HStack w='90%' j='space-between' style={{marginTop: 15}}>
                    <Text style={styles.email}>
                        Unlock with Touch ID?
                    </Text>
                    <Switch
                        value={val}
                        onValueChange={(val) => setVal(val)}
                        renderActiveText={false}
                        renderInActiveText={false}
                        backgroundActive={colors.primary}

                    />
                </HStack>

                <Button onPress={() => navigation.push('Page 5')} style={{ width: '80%', marginTop: 150 }}>
                    Continue
                </Button>

                <Text style={[styles.email, { fontSize: 10, paddingTop: 20 }]}>
                    By registering you accept our Terms & Conditions and
                    {"\n"}Privacy Policy. Your data will be security encrypted with TLS
                </Text>
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

export default NewPassword