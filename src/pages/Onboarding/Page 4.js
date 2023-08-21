import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, Image, ScrollView } from "react-native";
import * as Yup from 'yup';
import { useFormik } from "formik";
import Layout from "./Layout";
import { colors } from "../../utils/colors";
import { Input } from "../../components/Custom";
import { HStack } from "../../components/Custom";
import { Button } from "../../components/Custom";
import { Image7, Profile } from "../../utils/assets";
import { Header } from "./SignUp";

const Page4 = ({ navigation }) => {


    return (
        <Layout head={() => <Header stats='1 half' />}>

            <ScrollView>
                <View style={styles.container}>
                    <Image source={Profile} resizeMode='contain' style={styles.image} />
                    <Text
                        style={styles.confirm}
                    >
                        Verification Success
                    </Text>
                    <Text
                        style={[styles.text, { width: '90%' }]}
                    >
                        Congratulations your account is ready to use, now you can start trading cryptocurrency                </Text>

                    <Button style={styles.btn} onPress={() => navigation.push('Tabs')}>
                        Start now
                    </Button>

                </View>
            </ScrollView>

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
        height: 320,
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

export default Page4