import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Image, Dimensions } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from "../../utils/colors";
import { BTC, Invoice } from "../../utils/assets";
import { useRoute } from "@react-navigation/native";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Buy from "./Buy";
import BuySummary from "./BuySummary";
import Pin from "../../components/Pin";
import Send from "./Send";
import Receive from "./Receive";
import SendSummary from "./SendSummary";
import Sell from "./Sell";
import { useSelector } from "react-redux";
import { formatNumber } from "../../utils/numberFormatter";
import TypeModal from "./TypeModal";
import { useUser } from "../../context/userContext";
import AmountModal from "./AmountModal";
import ReceiveFiat from "./ReceiveFiat";
import { generateOTP } from "../../redux/wallet/thunkActions";
import { useDispatch } from "react-redux";
import Spinner from "./Preloader";



const Coin = ({ navigation }) => {
    const route = useRoute();
    const { type, bg } = route.params;
    const dispatch = useDispatch()
    const [isBuyPanel, setIsBuyPanelActive] = useState(false);
    const [showBuySummary, setShowBuySummary] = useState(false);
    const [showPin, setShowPin] = useState(false);
    const [receiveVisible, setReceiveVisible] = useState(false);
    const [receiveVisibleFiat, setReceiveVisibleFiat] = useState(false);
    const [showDeposit, setShowDeposit] = useState(false);

    const [showSend, setShowSend] = useState(false);
    const [showSendSummary, setSendSummary] = useState(false);
    const [showSell, setShowSell] = useState(false)
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState("");
    const { setActionType } = useUser();
    const [data, setData] = useState([])
    const { profile: { pin_available } } = useSelector(state => state.authReducer)
    const { oneWallet, wallets, loading } = useSelector(state => state.walletReducer)

    const d_1 = [
        {
            icon: 'long-arrow-up',
            name: 'Withdraw',
            colors: '#1BA64B',
        }, {
            icon: 'send-o',
            name: 'Send',
            color: '#F24405'
        }, {
            icon: 'money',
            name: 'Deposit',
            color: '#0F9F26',

        }, {
            icon: 'handshake-o',
            name: 'Exchange',
            color: '#F24405'
        }
    ]

    const d_2 = [
        {
            icon: 'send-o',
            name: 'Send',
            color: '#F24405'
        }, {
            icon: 'handshake-o',
            name: 'Exchange',
            color: '#F24405'
        }
    ]

    useEffect(() => {

        if (oneWallet?.currency?.type === 'fiat') {
            setData(d_1)
        } else {
            setData(d_2)
        }
    }, [oneWallet])

    return (
        <SafeAreaView style={{ backgroundColor: colors.white, height: Dimensions.get('window').height }}>
            <TypeModal
                setSelected={setSelected}
                visible={visible}
                setVisible={setVisible}
                setShowSend={setShowSend} />

            {loading === 'pending' && <Spinner />}
            <View style={[styles.flex]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="ios-chevron-back-outline" color={colors.black} size={20} />
                </TouchableOpacity>
                <View style={styles.header}>
                    <Text style={[styles.bold, { color: colors.black }]}>
                        {type}
                    </Text>
                </View>
                <View style={{ width: 30 }} />
            </View>
            <ScrollView>
                <View style={styles.container}>
                    <View style={[styles.header_box, { backgroundColor: bg }]}>
                        <View style={styles.flex_3}>
                            <View style={styles.flex_1}>
                                <Image style={{ width: 40, height: 40 }}
                                    source={{
                                        uri: `https://app.paybuymax.com${oneWallet?.currency?.logo}`
                                    }}
                                    resizeMode='contain' />
                                <View style={{ paddingLeft: 10 }}>
                                    <Text style={styles.tiny}>{oneWallet?.currency.code} Balance</Text>
                                    <Text style={styles.bold}>{oneWallet.available_balance}</Text>
                                </View>
                            </View>
                            <View style={{ alignItems: 'flex-end' }}>
                                <Text style={styles.bold}>{oneWallet.currency.code}{" "}{wallets.reduce((a, b) => a + Number(b.available_balance), 0).toFixed(2)}</Text>
                                <Text style={[styles.tiny, { color: colors.success }]}></Text>
                            </View>
                        </View>


                        <View style={styles.flex_2}>
                            <View>
                                <Text style={styles.min}>Min. Transfer</Text>
                                <View style={[styles.box_1, { backgroundColor: '#A3DFAD' }]}>
                                    <Text style={styles.box_text}>{oneWallet.currency.code}{formatNumber(oneWallet.currency.minimum_transfer)}</Text>
                                </View>
                            </View>
                            <View style={{ marginLeft: 10 }}>
                                <Text style={styles.min}>Min. Deposit</Text>
                                <View style={[styles.box_1, { backgroundColor: '#FFB397' }]}>
                                    <Text style={styles.box_text}>{oneWallet.currency.code}{formatNumber(oneWallet.currency.minimum_deposit)}</Text>
                                </View>
                            </View>
                        </View>
                    </View>


                    <View style={styles.box_parent}>
                        {
                            data.map((element, idx) => (
                                <TouchableOpacity
                                    onPress={async () => {
                                        if (element.name === 'Buy') {
                                            setIsBuyPanelActive(true)
                                        } else if (element.name === 'Send') {
                                            setActionType('Send')
                                            if (oneWallet?.currency?.type === 'fiat') {
                                                setShowSend(true)
                                            } else {
                                                setVisible(true)
                                            }
                                        } else if (element.name === 'Exchange') {
                                            // setShowSell(true)
                                            navigation.push('Exchange')
                                        } else if (element.name === 'Withdraw') {
                                            setActionType('Withdraw')
                                            if (oneWallet.currency.type === 'fiat') {
                                                setReceiveVisibleFiat(true)
                                            } else {
                                                setReceiveVisible(true)
                                            }
                                        } else if (element.name === 'Deposit') {
                                            if (!pin_available) {
                                                await dispatch(generateOTP()).then(res => {
                                                    if (res.meta.requestStatus === 'fulfilled') {
                                                        navigation.push('PIN OTP')
                                                    }
                                                })
                                            } else {
                                                setShowDeposit(true)
                                            }
                                        }
                                    }} key={idx} style={styles.box}>
                                    <FontAwesome name={element.icon} color={element.color} size={20} />
                                    <Text style={styles.text}>{element.name}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>

                    <View style={styles.divider} />

                    <View style={[styles.header, { width: '80%' }]}>
                        <Text style={[styles.bold, { color: colors.black }]}>Transactions</Text>
                    </View>

                    <View style={{ width: '100%', justifyContent: 'space-around', flexDirection: 'row', marginTop: 30 }}>
                        {
                            ['Type', 'Transaction ID', 'Status', 'Time']
                                .map((element, idx) => <Text style={[styles.bold, { fontSize: 10, fontWeight: '500' }]} key={idx + 4}>{element}</Text>)
                        }
                    </View>

                    <Text style={[styles.tiny, { marginTop: 50, fontStyle: 'italic' }]}>No Histroy</Text>
                    <Image source={Invoice} resizeMode='contain' />
                </View>


            </ScrollView>
            <Buy
                isPanelActive={isBuyPanel}
                setIsPanelActive={setIsBuyPanelActive}
                type={type}
                showSummary={setShowBuySummary}
            />
            <BuySummary
                isPanelActive={showBuySummary}
                setIsPanelActive={setShowBuySummary}
                type={type}
                setPin={setShowPin}
            />
            <Pin
                isPanelActive={showPin}
                setIsPanelActive={setShowPin}
            />

            <Send
                isPanelActive={showSend}
                setIsPanelActive={setShowSend}
                showSummary={setSendSummary}
                type={type}
            />

            <Receive
                isPanelActive={receiveVisible}
                setIsPanelActive={setReceiveVisible}
                showSummary={setSendSummary}
                type={type}
            />

            <ReceiveFiat
                isPanelActive={receiveVisibleFiat}
                setIsPanelActive={setReceiveVisibleFiat}
                showSummary={setSendSummary}
                type={type}
            />

            <SendSummary
                isPanelActive={showSendSummary}
                setIsPanelActive={setSendSummary}
                type={type}
                setPin={setShowPin}

            />

            <Sell
                isPanelActive={showSell}
                setIsPanelActive={setShowSell}
                type={type}
            />

            <AmountModal
                visisble={showDeposit}
                setVisible={setShowDeposit}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        width: 201,
        height: 38,
        backgroundColor: colors.wallet,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        shadowColor: colors.black,
        elevation: 10,
        shadowOffset: {
            width: 3,
            height: 3
        },
        shadowOpacity: 0.3,
        shadowRadius: 4

    },
    flex: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        padding: 20
    },
    header_box: {
        width: '100%',
        height: 103,
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: 20
    },
    flex_1: {
        display: 'flex',
        flexDirection: 'row'
    },
    bold: {
        fontWeight: '500',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 14,
        color: colors.white
    },
    tiny: {
        fontWeight: '300',
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: colors.white
    },
    box_1: {
        height: 21,
        // width: 74,
        paddingLeft: 5,
        paddingRight: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7
    },
    box_text: {
        fontWeight: '300',
        fontFamily: 'Poppins-Regular',
        fontSize: 11,
        color: colors.black
    },
    flex_2: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 5
        // width: 160
    },
    flex_3: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%'
    },
    box: {
        width: 63,
        height: 58,
        backgroundColor: colors.white,
        shadowOffset: {
            width: 2,
            height: 3
        },
        shadowColor: colors.black,
        elevation: 4,
        shadowOpacity: .3,
        shadowRadius: 3,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    }, box_parent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        marginTop: 20
    }, text: {
        fontWeight: '500',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 11,
        color: colors.black
    }, divider: {
        width: '100%',
        height: 1,
        backgroundColor: colors.divider,
        marginTop: 40, marginBottom: 40
    }, transaction: {

    },
    min: {
        fontFamily: 'Poppins-Regular',
        fontSize: 10,
        color: colors.white
    }
})

export default Coin