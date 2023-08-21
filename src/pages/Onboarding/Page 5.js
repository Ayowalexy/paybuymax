import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, Image } from "react-native";
import * as Yup from 'yup';
import { useFormik } from "formik";
import Layout from "./Layout";
import { colors } from "../../utils/colors";
import { Input } from "../../components/Custom";
import { HStack } from "../../components/Custom";
import { Button } from "../../components/Custom";
import { Image7, Profile } from "../../utils/assets";
import { Header } from "./SignUp";
import { Image6 } from "../../utils/assets";

const Page5 = ({ navigation }) => {


    return (
        <Layout head={() => <Header stats='1 half' />}>

            <View style={styles.container}>
                <Image source={Image6} resizeMode='contain' style={styles.image} />
                <Text
                    style={styles.confirm}
                >
                    Congratulations!
                </Text>
                <Text
                    style={styles.text}
                >
                    You have successfully created a new password, click {"\n"}continue to enter the application
                </Text>

                <Button style={styles.btn} onPress={() => navigation.push('Tabs')}>
                    Continue
                </Button>

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
        marginTop: 60
    },
    image: {
        width: '100%',
        height: 380,
    },
    confirm: {
        fontSize: 24,
        fontWeight: '600',
        fontFamily: 'Poppins-SemiBold',
        color: colors.black,
        paddingTop: 10
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

export default Page5