import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";
import { SwipeablePanel } from 'rn-swipeable-panel';
import { Button, HStack } from "../../components/Custom";
import { Kuda, BNB, BTC, USDT, } from "../../utils/assets";
import { colors } from "../../utils/colors";
import { Input } from "../Transfer";
import { CloseBtn } from ".";
import DropDownPicker from 'react-native-dropdown-picker';



const Filter = ({ isPanelActive, setIsPanelActive, type, setPin }) => {

    const [panelProps, setPanelProps] = useState({
        fullWidth: true,
        openLarge: true,
        showCloseButton: true,
        noBackgroundOpacity: false,
        onClose: () => closePanel(),
        onPressCloseButton: () => closePanel(),
        // ...or any prop you want
    });

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Giftcard buy', value: 'giftcard buy' },
        { label: 'Giftcard sell', value: 'giftcard sell' },
        { label: 'Airtime Buy', value: 'airtime buy' },
        { label: 'Fund Deposit', value: 'fund deposit' },
        { label: 'Withdrawal', value: 'withdrawl' },
    ]);




    const openPanel = () => {
        setIsPanelActive(true);
    };

    const closePanel = () => {
        setIsPanelActive(false);
    };
    return (
        <>
            <SwipeablePanel
                {...panelProps}
                isActive={isPanelActive}
                showCloseButton={false}
            >
                <View style={styles.container}>
                    <HStack j='space-between' a="center" w='90%'>
                        <CloseBtn action={() => setIsPanelActive(false)} />
                        <Text style={styles.header}>Transaction Filter</Text>
                        <Text style={[styles.header, { color: colors.primary, fontSize: 10 }]}>Reset</Text>
                    </HStack>
                    <View style={styles.divider} />


                    <View style={{ width: '90%' }}>

                        <Text style={[styles.text, { paddingBottom: 5 }]}>
                            Products
                        </Text>

                        <DropDownPicker
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            style={styles.input}
                            arrowIconStyle={{
                                backgroundColor: colors.primary,
                                padding: 15,
                                borderRadius: 20,
                            }}
                            closeIconStyle={{
                                color: colors.white
                            }}
                        />

                        <Text style={[styles.text, { paddingBottom: 5, marginTop: 10 }]}>
                            Status
                        </Text>
                        <View style={styles.status}>
                            <View style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
                                <Text style={styles.text}>Successful</Text>
                                <Text>Q</Text>
                            </View>
                             <View style={{marginTop: 15, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
                                <Text style={styles.text}>Pending</Text>
                                <Text>Q</Text>
                            </View>
                             <View style={{ marginTop: 15, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
                                <Text style={styles.text}>Failed</Text>
                                <Text>Q</Text>
                            </View>

                        </View>


                    </View>



                    <Button style={{ width: '85%', }}
                        onPress={() => {
                            setIsPanelActive(!isPanelActive)
                            setTimeout(() => {
                                setPin(true)
                            }, 300)

                        }}
                    >
                        Apply
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
        fontFamily: "Poppins-Regular",
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
    },
    status: {
        backgroundColor: '#F4F4F4',
        height: 139,
        width: '100%',
        borderRadius: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        marginTop: 5,
        marginBottom: 70
    }

})

export default Filter