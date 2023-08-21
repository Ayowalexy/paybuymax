import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from "../../utils/colors";
import { Switch } from 'react-native-switch';
import { Button } from "../../components/Custom";
import { useNavigation } from "@react-navigation/native";


const SecuritySettings = ({setVisible}) => {

    const [twoFactor, setTwoFactor] = useState(false);
    const [biometrics, setbiometrics] = useState(false);
    const navigation = useNavigation();


    return (
        <>
            <View style={{ paddingTop: 20 }} />
            <TouchableOpacity style={styles.box}
                onPress={() =>{
                    setVisible(false)
                    navigation.push('Change Withdrawal Pin')
                }}
            >
                <Text style={styles.text}>
                    Change withdrawal pin
                </Text>
                <Ionicons name="ios-arrow-forward-outline" color={colors.error} size={15} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                setVisible(false)
                navigation.push('Change Password')
            }} style={styles.box}>
                <Text style={styles.text}>
                    Reset Password
                </Text>
                <Ionicons name="ios-arrow-forward-outline" color={colors.error} size={15} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.box}>
                <Text style={styles.text}>
                    Enable 2FA
                </Text>
                <Switch
                    value={twoFactor}
                    renderActiveText={false}
                    renderInActiveText={false}
                    barHeight={15}
                    circleSize={14}
                    onValueChange={(val) => setTwoFactor(val)}
                />
            </TouchableOpacity>

            <TouchableOpacity style={styles.box}>
                <Text style={styles.text}>
                    Biometrics
                </Text>
                <Switch
                    value={biometrics}
                    renderActiveText={false}
                    renderInActiveText={false}
                    barHeight={15}
                    circleSize={14}
                    onValueChange={(val) => setbiometrics(val)}
                />
            </TouchableOpacity>

            <View style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20
            }}>
                <Button onPress={() => setVisible(false)} style={{ width: '30%' }}>
                    Save
                </Button>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    box: {
        width: '100%',
        height: 54,
        backgroundColor: colors.wallet,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        marginBottom: 20
    },
    text: {
        fontFamily: 'Poppins-Regular',
        fontWeight: '400',
        fontSize: 13,
        color: colors.black
    }
})

export default SecuritySettings