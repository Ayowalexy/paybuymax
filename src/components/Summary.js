import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";
import { SwipeablePanel } from 'rn-swipeable-panel';
import { colors } from "../utils/colors";
import { Kuda } from "../utils/assets";
import { Button } from "./Custom";



const Summary = ({ isPanelActive, setIsPanelActive, setPin, pin }) => {

    const [panelProps, setPanelProps] = useState({
        fullWidth: true,
        openLarge: true,
        showCloseButton: true,
        noBackgroundOpacity: false,
        onClose: () => closePanel(),
        onPressCloseButton: () => closePanel(),
        // ...or any prop you want
    });

    const openPanel = () => {
        setIsPanelActive(true);
    };

    const closePanel = () => {
        setIsPanelActive(false);
    };
    return (
        <>
            <SwipeablePanel {...panelProps} isActive={isPanelActive}>
                <View style={styles.container}>
                    <Text style={styles.header}>Withdrawal Summary</Text>

                    <View style={styles.box}>
                        <View>
                            <Text style={[styles.header, { fontWeight: '700' }]}>Kolade David Kolawole</Text>
                            <Text style={[styles.header, { fontSize: 12 }]}>Kuda Microfinance Bank</Text>
                        </View>
                        <Image source={Kuda} resizeMode='contain' />
                    </View>

                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                        {
                            [
                                {
                                    name: 'From',
                                    value: 'Wallet'
                                }, {
                                    name: 'Amount',
                                    value: '₦2,000'
                                }, {
                                    name: 'Fee',
                                    value: '₦20'
                                }, {
                                    name: 'Total',
                                    value: '₦2,040'
                                },
                            ].map((element, idx) => (
                                <>
                                    {element.name === 'Total' && <View key={9} style={styles.divider} />}
                                    <View key={idx} style={[styles.flex, {
                                        marginTop: element.name === 'Total' ? 50 : 0,
                                        marginBottom: element.name === 'Total' ? 40 : 20,
                                    }]}>

                                        <Text style={styles.text}>{element.name}</Text>
                                        <View style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', width: 50 }}>
                                            <Text style={styles.text}>{element.value}</Text>
                                        </View>
                                    </View>
                                </>
                            ))
                        }
                    </View>

                    <Button style={{width: '85%'}}
                        onPress={() => {
                            setIsPanelActive(!isPanelActive)
                            setTimeout(() => {
                                setPin(!pin)
                            }, 400)
                        }}
                    >
                        Confirm
                    </Button>
                </View>
            </SwipeablePanel>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingTop: 20
    },
    header: {
        fontFamily: "Poppins-Regular",
        fontSize: 14,
        fontWeight: '400',
        color: colors.black
    },
    box: {
        width: '85%',
        height: 70,
        backgroundColor: colors.bg_faded,
        borderRadius: 10,
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 30
    },
    flex: {
        width: '85%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 25
    },
    text: {
        fontFamily: "Poppins-Regular",
        fontWeight: '400',
        fontSize: 14,
        color: colors.black
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: colors.divider,
        marginTop: 30
    }

})

export default Summary