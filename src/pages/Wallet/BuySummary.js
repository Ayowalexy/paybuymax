import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";
import { SwipeablePanel } from 'rn-swipeable-panel';
import { Button, HStack } from "../../components/Custom";
import { Kuda, BNB, BTC, USDT, } from "../../utils/assets";
import { colors } from "../../utils/colors";
import { Input } from "../Transfer";



const BuySummary = ({ isPanelActive, setIsPanelActive, type, setPin }) => {

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
                    <HStack j='space-between' w='90%'>
                        <Text style={styles.header}>Available Balance</Text>
                        <Text style={styles.header}>₦0.00</Text>
                    </HStack>
                    <View style={styles.divider} />

                    <Text style={styles.header_1}>
                        $5 is the minumu trade amount. Your wallet
                        will be credited immediately after every
                        transaction.
                    </Text>


                    <View style={{ width: '90%' }}>

                        <Input label='You are buying' showType={true} value='$100.00' type={type} />
                        <View style={styles.flex_1}>
                            <View style={{ flexGrow: 1, marginRight: 10 }}>
                                <Input label='Charge fee' value='$2.00' />
                            </View>
                            <View style={{ flexGrow: 1, }}>
                                <Input label='Rate' value='707/$' type='money' />
                            </View>
                        </View>

                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: 10 }}>
                            <Text style={styles.text}>Total Amount</Text>
                            <View style={styles.boxe}>
                                <Text style={[styles.text, { fontSize: 30, fontWeight: '700' }]}>$98</Text>
                            </View>
                        </View>

                        <Text style={[styles.header_1, { textAlign: 'center', width: '100%', fontSize: 12, fontWeight: '400', marginBottom: 10}]}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor ullamcorper cursus.
                        </Text>


                    </View>



                    <Button style={{ width: '85%' }}
                        onPress={() => {
                            setIsPanelActive(!isPanelActive)
                            setTimeout(() => {
                                setPin(true)
                            }, 300)

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
        fontFamily: "Poppins-SemiBold",
        fontSize: 14,
        fontWeight: '500',
        color: colors.black,
        paddingTop: 20
    },
    header_1: {
        fontFamily: 'Poppins-Regular',
        fontSize: 11,
        fontWeight: '300',
        color: colors.black,
        paddingTop: 20,
        textAlign: 'center',
        width: '70%'
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
        fontFamily: 'Poppins-Regular',
        fontWeight: '400',
        fontSize: 14,
        color: colors.black
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: colors.divider,
        marginTop: 10,
        marginBottom: 10
    },
    input: {
        borderWidth: 0,
        backgroundColor: '#F4F4F4',
        height: 59,
        width: '100%',
        borderRadius: 10,
        paddingLeft: 20,
        marginTop: 5
    },
    flex_1: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: '100%'
    },
    boxe: {
        width: '80%',
        height: 94,
        backgroundColor: '#F9B384',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10
    }

})

export default BuySummary