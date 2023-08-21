import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";
import { SwipeablePanel } from 'rn-swipeable-panel';
import { Button } from "../../components/Custom";
import { Kuda, BNB, BTC, USDT, } from "../../utils/assets";
import { colors } from "../../utils/colors";
import { Input } from "../Transfer";
import DropDownPicker from 'react-native-dropdown-picker';


const Sell = ({ isPanelActive, setIsPanelActive, type, showSummary }) => {

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
        { label: 'USDT', value: 'usdt', icon: () => <Image source={USDT} resizeMode='contain' /> },
        { label: 'Binance', value: 'bnb', icon: () => <Image source={BNB} resizeMode='contain' /> },
        { label: 'Bitcoin', value: 'dodge', icon: () => <Image source={BTC} resizeMode='contain' /> },
    ]);

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
                    <Text style={styles.header}>Enter the amount you want to sell</Text>
                    <Text style={styles.header_1}>
                        $5 is the minimum trade amount accepted.
                    </Text>

                    <View style={styles.divider} />

                    <View style={{ width: '90%' }}>
                        <View style={styles.flex_1}>

                            <Button style={{ height: 59, width: 100 }}>
                                Sell Max
                            </Button>
                            <View style={{ marginLeft: 10, width: '65%' }}>
                                <Input
                                    showType={true}
                                    type={type}
                                    placeholder='Amount'
                                />
                            </View>

                        </View>
                        <Text style={[styles.text, { paddingTop: 10, fontSize: 10, color: colors.primary, textAlign: 'right' }]}>
                            Available Balance - $ 800.00
                        </Text>

                        <View style={styles.divider} />

                        <View style={[styles.flex, { width: '100%', marginBottom: -40 }]}>
                            <Text style={styles.text}>
                                Receive
                            </Text>
                            <Text style={[styles.text, { fontWeight: '500' }]}>
                                NGN ₦
                            </Text>
                        </View>

                        <Input placeholder='Amount' />
                        <Text style={[styles.text, { paddingTop: 10, fontSize: 10, color: colors.primary, textAlign: 'right' }]}>
                            Available Balance - $ 800.00
                        </Text>

                        <View style={[styles.flex, { width: '100%', marginTop: 40}]}>
                            <Text style={styles.text}>
                                Below $500 at 670/$
                            </Text>
                            <Text style={[styles.text]}>
                                Above $500 at 680/$
                            </Text>
                        </View>


    
                    </View>



                    <Button style={{ width: '85%', marginTop: 30 }}
                        onPress={() => {
                            setIsPanelActive(!isPanelActive)
                           
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
        fontFamily: "Poppins-Regular",
        fontSize: 11,
        fontWeight: '300',
        color: colors.black,
        paddingTop: 10,
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
        marginTop: 30,
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
    }

})

export default Sell