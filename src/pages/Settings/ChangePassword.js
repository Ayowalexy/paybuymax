import React from "react";
import { CloseBtn } from "../Transactions";
import { Header } from "../Transactions";
import { SafeAreaView, ScrollView, View, Text, StyleSheet, Dimensions } from "react-native";
import { colors } from "../../utils/colors";
import { Input } from "../Transfer";
import { Button } from "../../components/Custom";


const ChangePassword = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <CloseBtn action={() => navigation.goBack()} />
                <Header name='Reset Password' />
                <View style={{ width: 20 }} />
            </View>
            <ScrollView>
                <View style={{ padding: 20 }}>
                    <Input label='Old password' />
                    <Input label='New password' />
                    <Input label='Confirm password' />
                </View>


            </ScrollView>
            <View style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                position: 'absolute',
                bottom: 30
            }}>
                <Button style={{width: '40%'}}>
                    Save
                </Button>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        padding: 20
    },
    container: {
        width: '100%',
        height: Dimensions.get('window').height,
        backgroundColor: colors.white
    }
})

export default ChangePassword