import React from "react";
import { Image, Text, StyleSheet, View, SafeAreaView, Dimensions } from "react-native";
import { Image5 } from "../../utils/assets";
import { colors } from "../../utils/colors";
import { Button } from "../../components/Custom";
import { HStack } from "../../components/Custom";


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const Page1 = ({navigation}) => {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Image source={Image5} style={styles.image} resizeMode='contain' />
                <Text
                    style={styles.text}
                >
                    Fast and{"\n"}
                    Flexible Exchange
                </Text>

                <HStack w='80%' j='space-around'>
                    <Button onPress={() => navigation.push('Page2')} outline={true} style={styles.btn}>
                        Sign Up
                    </Button>
                    <Button 
                    onPress={() => navigation.push("Login")}
                    outline={false} style={styles.btn}>
                        Log In
                    </Button>
                </HStack>
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
        alignItems: 'center'
    },
    image: {
        width: '90%',
        height: 400,
        marginTop: 50,
    },
    text: {
        fontFamily: "Poppins-SemiBold",
        fontWeight: '600',
        lineHeight: 38,
        marginTop: 30,
        textAlign: 'center',
        marginBottom: 40,
        color: colors.black,
        fontSize: 32
    },
    btn: {
        width: 120
    }
})

export default Page1