import React from "react";
import { Image, View, Text, StyleSheet, Dimensions, Platform } from "react-native";
import { Image6 } from "../../utils/assets";
import Layout from "./Layout";
import { ILogo } from "../../components/Custom";
import { colors } from "../../utils/colors";
import { Button } from "../../components/Custom";

const Page2 = ({navigation}) => {
    return (
        <Layout head={() => <ILogo />}>

            <View style={styles.container}>
                <Text
                    style={{
                        fontFamily: 'Poppins-SemiBold',
                        fontSize: 24,
                        fontWeight: '600',
                        color: colors.black,
                        textAlign: 'center',
                        lineHeight: 26,

                    }}
                >
                    Get started in 3 easy {"\n"}steps
                </Text>

                <Image source={Image6} style={styles.image} resizeMode='contain' />

                <View style={styles.cont_box}>
                    <View>
                        {
                            [1, 2, 3, 4, 5].map((el, idx) => (
                                <View key={idx} style={styles.cont}>
                                    {
                                        el % 2 !== 0
                                            ? (
                                                <View
                                                    key={el}
                                                    style={styles.box_1}
                                                >
                                                    <Text style={styles.text_1}>
                                                        {
                                                            el === 1
                                                                ? 1
                                                                : el === 3
                                                                    ? 2
                                                                    : el === 5
                                                                        ? 3
                                                                        : null
                                                        }
                                                    </Text>
                                                </View>
                                            ) : (
                                                <View style={styles.line} />
                                            )
                                    }
                                </View>
                            ))
                        }
                    </View>

                    <View style={styles.text}>
                        {[
                            'Create your account', 'Submit document', 'Selfie verification'
                        ].map(ele => (
                            <Text key={ele} style={styles.text_2}>
                                {ele}
                            </Text>
                        ))
                        }
                    </View>
                </View>

                <Button 
                onPress={() => navigation.push('Sign Up')}
                style={styles.box}>
                    Continue
                </Button>
            </View>
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: Platform.OS === 'ios' ? Dimensions.get('window').height - 150 : Dimensions.get('window').height
    },
    image: {
        width: '100%',
        height: 300,
    },
    box_1: {
        width: 22,
        height: 22,
        borderRadius: 20,
        backgroundColor: colors.primary,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text_1: {
        color: colors.white,

    },
    line: {
        width: 2,
        height: 34,
        backgroundColor: colors.primary
    },
    cont: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text_2: {
        fontFamily: 'Poppins-Regular',
        fontWeight: "400",
        fontSize: 16,
        color: colors.black,
        marginBottom: 31
    },
    cont_box: {
        display: 'flex',
        flexDirection: 'row',
        width: '60%',
        justifyContent: 'space-between'
    },
    box: {
        width: '100%',
        marginBottom: 40
        // bottom: 0,
        // position: 'absolute'
    }
})

export default Page2