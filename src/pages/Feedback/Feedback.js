import React from "react";
import { Image, Text, StyleSheet, SafeAreaView, Dimensions, View } from "react-native";
import { CheckImg, DeleteImg } from "../../utils/assets";
import { colors } from "../../utils/colors";
import { Button } from "../../components/Custom";


const FeedBack = ({ navigation }) => {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Image source={CheckImg} style={{marginTop: 70}} resizeMode='contain' />

                <Text style={styles.res}>
                    Transaction
                    {"\n"}Successful
                </Text>
                <Text style={styles.text}>
                    You have successfully trasnsacted
                </Text>
                <Button onPress={() => navigation.push('Tabs', { screen: 'Wallet'})} style={{width: '80%'}}>Continue</Button>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    res: {
        fontFamily: 'Poppins-SemiBold',
        fontWeight: '600',
        fontSize: 24,
        color: colors.black,
        textAlign: 'center',
        paddingTop: 40
    },
    text: {
        fontFamily: 'Poppins-Regular',
        fontWeight: '400',
        fontSize: 12,
        color: colors.black,
        paddingTop: 60,
        paddingBottom: 60
    }
})

export default FeedBack