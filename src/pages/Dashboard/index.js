import React, { useState } from "react";
import { Text, View, SafeAreaView, TouchableOpacity, FlatList, ScrollView, Image, StyleSheet, ImageBackground } from "react-native";
import { Avatar, USA, NGN, Vector, Airtime, Data, Bills, Crypto } from "../../utils/assets";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from "../../utils/colors";
import LinearGradient from "react-native-linear-gradient";
import { useSelector } from "react-redux";
import { formatNumber } from "../../utils/numberFormatter";
import AmountModal from "../Wallet/AmountModal";
import { getWalletDetails } from "../../redux/wallet/thunkActions";
import { useDispatch } from "react-redux";
import Spinner from "../Wallet/Preloader";
import { setOneWallet } from "../../redux/wallet";

const data = [
    {
        country: 'Nigeria',
        balance: '0.00',
        Image: NGN,
        id: 1,
        bgColor: '#F24405',
        type: "Naira balance"
    }, {
        country: 'USA',
        balance: '0.00',
        Image: USA,
        id: 2,
        bgColor: '#FFCC29',
        type: "USD balance"

    },
]

const data_2 = [
    {
        image: Airtime,
        name: 'Airtime',
        id: 1,
        fromColor: '#D975BB',
        toColor: '#FFB397'
    }, {
        image: Crypto,
        name: 'Sell crypto',
        id: 2,
        fromColor: '#7056B2',
        toColor: '#F097FF'
    }, {
        image: Data,
        name: 'Data',
        id: 3,
        fromColor: '#63B3FD',
        toColor: '#C2E0FC'
    }, {
        image: Bills,
        name: 'Bills',
        id: 4,
        fromColor: '#FFCC29',
        toColor: '#FFB397'
    }
]

const Dashboard = ({ navigation }) => {

    const { profile } = useSelector(state => state.authReducer);
    const { wallets, loading } = useSelector(state => state.walletReducer);
    
    const [showDeposit, setShowDeposit] = useState(false);
    const dispatch = useDispatch();
    const [oneCurrency, setCurrency] = useState({})


    const RenderItem = ({ item }) => {

        const { address_uid, address, id } = item;

        const handleClick = async () => {
            dispatch(setOneWallet({id}))
            await dispatch(getWalletDetails({ address_uid })).then(res => {
                if (res.meta.requestStatus === 'fulfilled') {
                    navigation.push('Coin', { type: item.currency.name, bg: '#D8D8D8', id })
                }
            })
        }

        return (

            <View style={
                {
                    borderRadius: 20,
                    backgroundColor: '#FFCC29',
                    width: 303,
                    height: 202,
                    marginRight: 20,
                    marginTop: 20
                }}>
                <ImageBackground style={styles.card} source={Vector} >
                    <View style={styles.card_header}>
                        <Image source={{
                            uri: `https://app.paybuymax.com${item.currency.logo}`
                        }} resizeMode='contain' style={{ width: 40, height: 40 }} />
                        <Text style={[styles.text, { fontWeight: "400" }]}>
                            {item.currency.name}
                        </Text>
                        <TouchableOpacity onPress={handleClick} style={styles.icons}>
                            <Ionicons name="eye" size={20} color={colors.black} />
                        </TouchableOpacity>

                    </View>

                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <Text style={[styles.text]}>{item.currency.code} {" "}{item.available_balance ? formatNumber(item.available_balance) : item.balance}</Text>
                    </View>

                    {
                        item.currency.type === 'crypto' ? (
                            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity style={styles.arrow} onPress={() => navigation.push('Receive BTC', { name: item.currency.code })}>
                                    <Ionicons name="md-swap-horizontal-outline" color={colors.white} size={20} />
                                </TouchableOpacity>
                                <Text style={[styles.text, { fontWeight: '400', fontSize: 12, paddingTop: 3 }]}>Receive</Text>
                            </View>
                        ) : (
                            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity style={[styles.arrow, { backgroundColor: colors.success }]}
                                    onPress={() => {
                                        setCurrency(item)
                                        setShowDeposit(true)
                                    }}>
                                    <Ionicons name="md-swap-horizontal-outline" color={colors.white} size={20} />
                                </TouchableOpacity>
                                <Text style={[styles.text, { fontWeight: '400', fontSize: 12, paddingTop: 3 }]}>
                                    Deposit
                                </Text>
                            </View>
                        )
                    }
                    <View style={styles.card_footer}>

                        {/* <View style={{ backgroundColor: '#C4C4C4', width: 1, height: 44 }} /> */}
                        {/* <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => navigation.push('Transfer')} style={styles.actions}>
                            <Ionicons name="md-swap-horizontal-outline" color={colors.white} size={20} />
                        </TouchableOpacity>
                        <Text style={[styles.text, { fontWeight: '400', fontSize: 12, paddingTop: 3 }]}>Transfer</Text>
                    </View> */}
                    </View>
                </ImageBackground>
            </View>
        )
    }
    return (
        <SafeAreaView>
            <Spinner visible={
                loading === 'pending' ? true
                    : false}
                loading='Getting wallet, please wait...' />
            <View style={styles.header}>
                <Image source={Avatar} style={styles.avatar} resizeMode='contain' />
                <View style={styles.header_box}>
                    <TouchableOpacity onPress={() => navigation.push('Settings')}>
                        <Ionicons name="settings-outline" color={colors.black} size={25} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.push('Notification')} style={styles.bell}>
                        <Ionicons name="notifications-outline" color={colors.black} size={23} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={[styles.text, { fontSize: 14, fontWeight: '500' }]}>
                        Hello, {profile?.name?.split(' ')[0]}
                    </Text>
                    <Text style={[styles.text, { fontSize: 23 }]}>
                        Welcome Back!
                    </Text>

                    <FlatList
                        data={wallets}
                        keyExtractor={(item) => item.id}
                        renderItem={RenderItem}
                        horizontal={true}
                        // pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                    />

                    <View style={styles.boxes}>
                        {data_2.map(element => (
                            <TouchableOpacity key={element.id}>
                                <LinearGradient
                                    style={styles.fg}
                                    colors={[element.fromColor, element.toColor]}>
                                    <Image source={element.image} resizeMode='contain' />
                                    <Text style={[styles.text, { color: colors.white, fontWeight: '500' }]}>{element.name}</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
                <AmountModal
                    visisble={showDeposit}
                    oneCurrency={oneCurrency}
                    setVisible={setShowDeposit}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20
    },
    avatar: {
        width: 44,
        height: 44
    },
    bell: {
        width: 44,
        height: 44,
        backgroundColor: '#EFF0F7',
        borderRadius: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15
    },
    header_box: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    },
    header: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 20
    },
    text: {
        fontFamily: 'Poppins-Bold',
        color: colors.black,
        fontWeight: "700"
    },
    card: {
        height: '100%',
        width: '100%',
        borderRadius: 20,
        marginRight: 40,
        display: 'flex',
        justifyContent: 'space-between'
    },
    card_header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        padding: 15
    },
    icons: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 55,
        flexDirection: 'row'
    },
    card_footer: {
        width: '100%',
        height: 10,
        backgroundColor: colors.white,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        flexDirection: 'row'
    },
    actions: {
        width: 30,
        height: 30,
        borderRadius: 5,
        backgroundColor: '#F24405',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    fg: {
        width: 151,
        height: 151,
        borderRadius: 20,
        marginBottom: 30,
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    }, boxes: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        flexWrap: 'wrap',
        marginTop: 40,
        marginBottom: 100
    },
    arrow: {
        backgroundColor: colors.primary,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    }
})

export default Dashboard