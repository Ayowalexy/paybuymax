import React, { useState } from "react";
import { Text, TouchableOpacity, StyleSheet, View, SafeAreaView, ScrollView, Image, Dimensions } from "react-native";
import { HStack } from "../../components/Custom";
import { colors } from "../../utils/colors";
import { PieChart, LineChart, Grid } from 'react-native-svg-charts'
import data_1 from "./data";
import { BTC } from "../../utils/assets";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { formatNumber } from "../../utils/numberFormatter";
import { setOneWallet } from "../../redux/wallet";
import Ionicons from 'react-native-vector-icons/Ionicons'
import ModalWallet from "./ModalWallet";
import Spinner from "./Preloader";
import { useUser } from "../../context/userContext";
import { getWalletDetails } from "../../redux/wallet/thunkActions";

const height = Dimensions.get('window').height


const data_2 = [50, 10, 40, 95, -4, -24, 85, 91]

const data = [
    '#D8D8D8',
    '#0FA958',
    '#311D05',
    '#6D75B6',
    '#FFCC40'
]

const Card = ({ element, address, balance, rate, amount, image, bgColor, id, address_uid }) => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleClick = async () => {
        await dispatch(getWalletDetails({address_uid})).then(res => {
            if(res.meta.requestStatus === 'fulfilled'){
                navigation.push('Coin', { type: address, bg: bgColor, id  })
            }
        })
    }

    return (
        <TouchableOpacity
            onPress={() => {
                    dispatch(setOneWallet({id}))

                    handleClick()
                }}
                
            style={[styles.box, { backgroundColor: bgColor }]}>
            <View style={styles.flex}>
                <View>
                    <Text style={styles.coin}>{element}</Text>
                    <Text style={styles.address}>{address}</Text>
                </View>
                <View style={styles.flex_end}>
                    <Text style={styles.amount}>{amount === 0 ? '0.00' : formatNumber(amount)}</Text>
                    {/* <Text style={[styles.address, { color: colors.success }]}>{rate}</Text> */}
                </View>
            </View>

            <View style={{ width: 70, height: 50, marginTop: -10 }}>
                <LineChart
                    style={{ height: 63 }}
                    data={data_2}
                    contentInset={{ top: 20, bottom: 20 }}
                    svg={{
                        strokeWidth: 2,
                        stroke: 'red',
                    }}
                >

                </LineChart>
            </View>

            <View style={styles.flex}>
                <Image source={image} resizeMode='contain' />
                <View style={styles.flex_end}>
                    <Text style={styles.address}>Balance</Text>
                    <Text style={[styles.amount, { color: colors.white }]}>{balance}</Text>
                </View>
            </View>

        </TouchableOpacity>
    )
}


const Wallet = () => {
    const { wallets, isLoading , loading} = useSelector(state => state.walletReducer);
    const [visible, setVisible] = useState(false)

    const color = [
        '#D8D8D8',
        '#0FA958',
        '#311D05',
        '#6D75B6',
        '#FFCC40'
    ]
    
    return (
        <SafeAreaView style={{height: Dimensions.get('window').height}}>
            <ModalWallet  visible={visible} setVisible={setVisible} />
            <Spinner visible={
                isLoading === 'pending' ? true 
                : false} 
            loading='Creating wallet, please wait...' />
            <Spinner visible={
                loading === 'pending' ? true 
                : false} 
            loading='Getting wallet, please wait...' />
            <ScrollView style={{ backgroundColor: colors.white }}>
                <View style={styles.container}>
                    <View style={styles.wallet}>
                        <View>
                            <Text style={styles.total}>Total Balance</Text>
                            <HStack j='flex-start' style={{ marginTop: 5 }}>
                                <Text style={styles.total}>${wallets.reduce((a, b) => a + Number(b.balance), 0).toFixed(1)}</Text>
                                <HStack style={styles.usd}>
                                    <Text style={styles.total}>USD</Text>
                                </HStack>
                            </HStack>
                        </View>

                        <TouchableOpacity onPress={() => setVisible(true)} style={{ height: 63, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons name="add-circle-outline" color={colors.black} size={20}/>
                            <Text style={styles.total}>Add Wallet</Text>
                            {/* <PieChart
                                style={{ height: 63 }}
                                valueAccessor={({ item }) => item.amount}
                                data={data}
                                spacing={0}
                                outerRadius={'95%'}
                            >
                            </PieChart> */}
                        </TouchableOpacity>
                    </View>


                    <View style={styles.flex_container}>


                        {wallets.map((data, idx) => (
                            <Card
                                key={idx}
                                address_uid={data.address_uid}
                                id={data.id.toString()}
                                element={data.currency.code}
                                address={data.currency.name}
                                balance={data.balance}
                                rate={'+0$(0.8%)'}
                                amount={data.balance}
                                image={BTC}
                                bgColor={color[Math.floor(Math.random() * 4)]}
                            />
                        ))}

                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    wallet: {
        backgroundColor: colors.wallet,
        borderRadius: 20,
        width: '100%',
        height: 100,
        padding: 10,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row'
    },
    total: {
        fontWeight: '600',
        fontFamily: 'Poppins-SemiBold',
        color: colors.black,
        fontSize: 14
    },
    usd: {
        backgroundColor: '#0F9F26',
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 5
    },
    box: {
        width: '45%',
        height: 145,
        borderRadius: 20,
        backgroundColor: '#EDEDED',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30
    },
    flex: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        flexDirection: 'row',
        padding: 10
    },
    coin: {
        fontFamily: "Poppins-Bold",
        fontSize: 12,
        fontWeight: '700',
        color: colors.white
    },
    address: {
        fontFamily: 'Poppins-Regular',
        fontSize: 9,
        fontWeight: '400',
        color: colors.white
    },
    amount: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 12,
        fontWeight: '500',
        color: colors.white
    },
    flex_end: {
        alignItems: 'flex-end'
    },
    flex_container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        padding: 10,
        width: '100%',
        marginBottom: 100
    },

})


export default Wallet