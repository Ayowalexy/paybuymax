import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";
import { SwipeablePanel } from 'rn-swipeable-panel';
import { Button } from "../../components/Custom";
import { Kuda } from "../../utils/assets";
import { colors } from "../../utils/colors";
import { BTC } from "../../utils/assets";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useUser } from "../../context/userContext";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { formatNumber } from "../../utils/numberFormatter";
import { generateOTP } from "../../redux/wallet/thunkActions";




const SendSummary = ({ isPanelActive, setIsPanelActive, setPin, pin }) => {

    const [panelProps, setPanelProps] = useState({
        fullWidth: true,
        openLarge: true,
        showCloseButton: true,
        noBackgroundOpacity: false,
        onClose: () => closePanel(),
        onPressCloseButton: () => closePanel(),
        // ...or any prop you want
    });

    const { sendSummary: { type, amount, address, ...otherData }, action_type } = useUser();
    const { oneWallet: { available_balance,...others  }, loading } = useSelector(state => state.walletReducer);
    const { profile: { pin_available } } = useSelector(state => state.authReducer);
    const navigation = useNavigation();
    const dispatch = useDispatch();

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
                    <Text style={styles.header}>{action_type} Summary</Text>

                    <View style={styles.box}>
                        <View>
                            <Text style={[styles.header, { fontWeight: '700' }]}>Available Balance</Text>
                            <Text style={[styles.header, { fontSize: 12 }]}>{available_balance}</Text>
                        </View>
                        <Image source={{
                            uri: `https://app.paybuymax.com${others.currency.logo}`
                        }} style={{ width: 60, height: 60 }} resizeMode='contain' />
                    </View>

                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                        {
                            [
                                {
                                    name: 'From',
                                    value: type
                                }, {
                                    name: 'Amount',
                                    value: formatNumber(amount)
                                }, others.currency?.type !== 'fiat' && {
                                    name: 'Receipient Address',
                                    value: address
                                },
                            ].map((element, idx) => (
                                <>
                                    {element.name === 'Total' && <View key={9} style={styles.divider} />}
                                    <View key={idx} style={[styles.flex, {
                                        marginTop: element.name === 'Total' ? 50 : 0,
                                        marginBottom: element.name === 'Total' ? 40 : 20,
                                    }]}>

                                        <Text style={styles.text}>{element.name}</Text>
                                        <View style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', width: 100 }}>
                                            <Text style={[styles.text, { fontSize: element.name === 'Receipient Address' ? 10 : 14 }]}>{element.value}</Text>
                                        </View>
                                    </View>
                                </>
                            ))
                        }
                    </View>

                    <View style={styles.divider} />

                    <View>
                        <Ionicons name='ios-information-circle' color={colors.primary} size={25} />
                    </View>
                    <Text style={[styles.text, { textAlign: 'center', fontSize: 12, paddingTop: 20, paddingBottom: 30 }]}>
                        Once transaction is confirmed it can’t be reversed, so
                        we advice our users to check properly before confirming
                    </Text>

                    <Button style={{ width: '85%' }}
                        loading={loading === 'pending' ? true : false}
                        onPress={async () => {
                            if (pin_available) {
                                setIsPanelActive(!isPanelActive)
                                setTimeout(() => {
                                    navigation.push('PIN CONFIRM', {
                                        amount, address
                                    })
                                }, 400)
                            } else {
                                await dispatch(generateOTP()).then(res => {
                                    if (res.meta.requestStatus === 'fulfilled') {
                                        navigation.push('PIN OTP')
                                    }
                                })
                            }
                        }}
                    >
                        {pin_available ? 'Confirm' : 'Setup PIN'}
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
        fontFamily: 'Poppins-Regular',
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
        marginBottom: 30
    }

})

export default SendSummary