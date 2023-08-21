import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, Image } from "react-native";
import Layout from "./Layout";
import { colors } from "../../utils/colors";
import { Mail } from "../../utils/assets";
import { Header } from "./SignUp";
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { Button, HStack } from "../../components/Custom";
import CountryPicker, { getAllCountries, getCallingCode } from 'react-native-country-picker-modal';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const Documents = ({ navigation }) => {
    const [countryCode, setCountryCode] = useState('NG')
    const [country, setCountry] = useState(null)
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState(1)

    const onSelect = (country) => {
        setCountryCode(country.cca2)
        setCountry(country)
        setVisible(!visible)
    }

    return (
        <Layout head={() => <Header stats='1 half' />}>

            <View style={styles.container}>
                <Text style={styles.signup}>
                    Submit documents
                </Text>
                <Text style={styles.email}>
                    We are required by law to verify your identity by {"\n"} collecting your ID and selfie
                </Text>

                <View style={styles.view}>
                    <Text style={styles.email}>
                        Enter your location
                    </Text>

                    <TouchableOpacity onPress={() => setVisible(!visible)} style={styles.box}>
                        <CountryPicker
                            countryCode={countryCode}
                            withFilter
                            withFlag
                            withCountryNameButton
                            withAlphaFilter
                            withCallingCode
                            withEmoji
                            visible={visible}
                            onSelect={onSelect}
                        />
                        <Ionicons
                            name="ios-chevron-down-outline"
                            color={colors.black}
                            size={25}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.view}>
                    <Text style={styles.email}>
                        Choose verification method
                    </Text>

                    <View style={{ width: '100%' }}>
                        {
                            [{ name: 'National ID Card', icon: 'contact-mail' },
                            { name: 'Passport', icon: 'briefcase' },
                            { name: 'Driver license', icon: 'ios-newspaper' }
                            ].map((element, idx) => (
                                <TouchableOpacity key={idx} style={styles.box} onPress={() => setSelected(idx)}>
                                    <HStack w={'50%'} j='flex-start'>
                                        {
                                            idx === 0
                                                ?
                                                (
                                                    <MaterialIcons
                                                        name={element.icon}
                                                        color={selected === idx ? colors.primary : colors.box}
                                                        size={24}
                                                    />
                                                )
                                                :
                                                (
                                                    <Ionicons
                                                        name={element.icon}
                                                        color={selected === idx ? colors.primary : colors.box}
                                                        size={24}
                                                    />
                                                )
                                        }
                                        <View style={styles.divider} />
                                        <Text style={styles.text_2}>{element.name}</Text>
                                    </HStack>

                                    <View style={styles.radio_1}>
                                        <View style={[styles.radio_2, { backgroundColor: selected === idx ? colors.primary : colors.white }]} />
                                    </View>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </View>


                <Button onPress={() => navigation.push('Scan 1')} style={{ width: '80%', marginTop: 40 }}>
                    Continue
                </Button>
                <TouchableOpacity>
                    <Text style={styles.skip}>
                        Skip
                    </Text>
                </TouchableOpacity>
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
    view: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
        marginTop: 30
    },
    box: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 12,
        backgroundColor: colors.white,
        elevation: 0.5,
        shadowColor: colors.black,
        shadowOpacity: 0.1,
        shadowOffset: 20,
        shadowRadius: 3,
        width: '100%',
        height: 60,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10
    },
    divider: {
        backgroundColor: '#D7D9E4',
        height: 30,
        width: 1,
        marginLeft: 7
    },
    text_2: {
        fontFamily: "Poppins-Regular",
        fontWeight: "400",
        color: colors.text,
        fontSize: 16,
        marginLeft: 7
    },
    radio_1: {
        width: 16,
        height: 16,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: colors.primary,
        borderWidth: 1
    },
    radio_2: {
        width: 12,
        height: 12,
        borderRadius: 10,
        backgroundColor: colors.primary,
    },
    skip: {
        fontFamily: "Poppins-SemiBold",
        fontWeight: "500",
        color: colors.primary,
        fontSize: 18,
        marginTop: 20

    }

})

export default Documents