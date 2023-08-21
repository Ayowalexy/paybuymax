import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";
import { SwipeablePanel } from 'rn-swipeable-panel';
import { colors } from "../utils/colors";
import { useNavigation } from '@react-navigation/native'
import SmoothPinCodeInput from 'react-native-smooth-pincode-input'
import { Button } from "./Custom";



const Pin = ({ isPanelActive, setIsPanelActive }) => {
    const [code, setCode] = useState('')
    const [panelProps, setPanelProps] = useState({
        fullWidth: true,
        openLarge: true,
        showCloseButton: true,
        noBackgroundOpacity: false,
        onClose: () => closePanel(),
        onPressCloseButton: () => closePanel(),
        // ...or any prop you want
    });
    const navigation = useNavigation()
    const openPanel = () => {
        setIsPanelActive(true);
    };

    const closePanel = () => {
        setIsPanelActive(false);
    };
    return (
        <SwipeablePanel {...panelProps} isActive={isPanelActive}>
            <View style={styles.container}>
                <Text style={styles.header}>Enter Pin</Text>

                <View style={styles.pin}>
                    <SmoothPinCodeInput
                        // ref={this.pinInput}
                        value={code}
                        cellStyle={{
                            borderRadius: 24,
                            backgroundColor: colors.white,
                            borderRadius: 10
                        }}
                        cellSpacing={20}
                        onTextChange={code => {
                           
                            setCode(code)
                        }}
                    // onFulfill={this._checkCode}
                    // onBackspace={this._focusePrevInput}
                    />
                </View>

                <Button onPress={() => navigation.push('Feedback')} style={{ width: '90%', marginTop: 40}}>
                    Confirm
                </Button>
            </View>
        </SwipeablePanel>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30
    },
    header: {
        fontFamily: "Poppins-Rugular",
        fontSize: 14,
        fontWeight: '400',
        color: colors.black
    },
    pin: {
        backgroundColor: '#F4F4F4',
        width: '90%',
        height: 70,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginTop: 30
    }
})

export default Pin