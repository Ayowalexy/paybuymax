import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, Image } from "react-native";
import * as Yup from 'yup';
import { useFormik } from "formik";
import Layout from "./Layout";
import { colors } from "../../utils/colors";
import { Input } from "../../components/Custom";
import { HStack } from "../../components/Custom";
import { Button } from "../../components/Custom";
import { Image7 } from "../../utils/assets";
import { Header } from "./SignUp";
import { useUser } from "../../context/userContext";

const Page3 = ({ navigation }) => {

    const { email } =  useUser()

    return (
        <Layout head={() => <Header stats='1 half' />}>

            <View style={styles.container}>
                <Image source={Image7} resizeMode='contain' style={styles.image} />
                <Text
                    style={styles.confirm}
                >
                    Confirm your email
                </Text>
                <Text
                    style={styles.text}
                >
                    We just sent you an email to {email}
                </Text>

                <Button style={styles.btn} onPress={() => navigation.push('OTP')}>
                    Continue
                </Button>
                <HStack style={{marginTop: 20}}>
                    <Text style={styles.text}>
                        I
                    </Text>
                    <TouchableOpacity>
                        <Text style={[styles.text, { color: colors.primary}]}>
                            {" "}didn’t receive
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.text}>
                        {" "}my email
                    </Text>
                </HStack>
            </View>

        </Layout>
    )
}

const styles = StyleSheet.create({

    container: {
        display: 'flex',
        width: '100%',
        // justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        height: Dimensions.get('screen').height - 180
    },
    btn: {
        width: '80%',
        marginTop: 30
    },
    image: {
        width: '100%',
        height: 350,
    },
    confirm: {
        fontSize: 24,
        fontWeight: '600',
        fontFamily: 'Poppins-SemiBold',
        color: colors.black,
        paddingTop: 30
    },
    text: {
        fontSize: 12,
        fontWeight: '400',
        fontFamily: 'Poppins-Regular',
        color: colors.black,
        textAlign: 'center',
        paddingTop: 10
    }
})

export default Page3