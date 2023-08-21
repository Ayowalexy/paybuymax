import React from "react";
import { Image, StyleSheet, Text, View, Dimensions, SafeAreaView } from "react-native";
import { colors } from '../../utils/colors'
import { Logo, Image1 } from "../../utils/assets";
import { ILogo } from "../../components/Custom";
import { Button } from "../../components/Custom";
import { useNavigation } from "@react-navigation/native";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;8111

const OnBoarding = () => {
    const navigation = useNavigation()

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <ILogo />
                <Image source={Image1} style={styles.image} resizeMode='contain' />
                <Text
                    style={styles.text}
                >
                    Welcome To{"\n"}
                    <Text style={{ color: colors.primary }}>Paybuymax</Text>
                </Text>

                <Button onPress={() => navigation.push('Slider')}>
                    Next
                </Button>

            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        height,
        width,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 10
    },
    image: {
        width: '80%',
        height: 400,
        marginTop: 30
    },
    text: {
        fontFamily: "Poppins-SemiBold",
        fontWeight: '600',
        lineHeight: 35,
        marginTop: 30,
        marginBottom: 40,
        // fontWeight: 600,
        color: colors.black,
        fontSize: 32
    }
})

export default OnBoarding