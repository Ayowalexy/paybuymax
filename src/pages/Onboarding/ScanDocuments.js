import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, Image, ScrollView } from "react-native";
import Layout from "./Layout";
import { colors } from "../../utils/colors";
import { Header } from "./SignUp";
import { Button, HStack } from "../../components/Custom";
import { Contact } from "../../utils/assets";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const ScanDocuments = ({ navigation }) => {
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

            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.signup}>
                        Scan document
                    </Text>
                    <Text style={[styles.email, { width: '90%' }]}>
                        Place the document in the frame until all 4 edges align around the document and turn blue
                    </Text>

                    <Image source={Contact} style={styles.image} resizeMode='contain' />

                    <View style={styles.box}>
                        <MaterialIcons
                            name="lock-outline"
                            color={colors.text}
                            size={20}
                        />
                        <Text style={styles.text} >
                            The data you share will be encrypted, stored securely, and only used to verify your identity
                        </Text>
                    </View>


                    <Button onPress={() => navigation.push('Scan 2')} style={{ width: '80%', marginTop: 40 }} >
                        Open Camera
                    </Button>
                    <TouchableOpacity>
                        <Text style={styles.skip}>
                            Skip
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </Layout>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 323,
        height: 184,
        marginTop: 80
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

    text: {
        fontFamily: "Poppins-Regular",
        fontWeight: "400",
        color: colors.text,
        fontSize: 13.5,
        width: '90%'

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
        paddingLeft: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#D7D9E4',
        height: 80,
        borderRadius: 14,
        marginTop: 50
    },

    text_2: {
        fontFamily: "Poppins-Regular",
        fontWeight: "400",
        color: colors.text,
        fontSize: 16,
        marginLeft: 7
    },

    skip: {
        fontFamily: "Poppins-SemiBold",
        fontWeight: "500",
        color: colors.primary,
        fontSize: 18,
        marginTop: 20

    }

})

export default ScanDocuments