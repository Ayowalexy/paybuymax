import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Dimensions } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from "../../utils/colors";
import DropDownPicker from "react-native-dropdown-picker";
import { Input } from "../Transfer";
import { Button } from "../../components/Custom";
import { useSelector, useDispatch } from "react-redux";
import { getRates } from "../../redux/wallet/thunkActions";
import Spinner from "../Wallet/Preloader";
// import { getTargetAmount, getCharges } from "../Wallet/f"
import { getTargetAmount, getCharge } from "../Wallet/f2";
import { formatNumber } from "../../utils/numberFormatter";
import { useUser } from "../../context/userContext";
import { getCharges } from "../../redux/wallet/thunkActions";

const Exchange = ({ navigation }) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);
    const [items_, setItems_] = useState([]);
    const [selectedTarget, setSelectedTarget] = useState(null);
    const dispatch = useDispatch();
    const [convertedAmount, setConvertedAmount] = useState('')
    const [charge, setCharge] = useState('')
    const { loading, rates } = useSelector(state => state.walletReducer);
    const [exchangeAmount, setExchangeAmount] = useState('')
    const [total_receive, setTotalReceive] = useState("")
    const [e_open, setOpen_] = useState(false);
    const { setSendSummary, setActionType } = useUser();

    const { profile: { pin_available } } = useSelector(state => state.authReducer);

    const { wallets, oneWallet, charges } = useSelector(state => state.walletReducer);

    useEffect(() => {
        if (rates.length) {
            const data = rates.map((ele, idx) => {
                return {
                    label: ele?.basecurrency?.name,
                    value: ele.base_currency.concat(' ', idx)
                }
            })

            setItems(data)
            const selected = data.find(ele => ele.label === oneWallet.currency.name)
            setValue(selected.value)
        }
    }, [rates])


    useEffect(() => {
        if (rates.length) {
            const data = rates.map((ele, idx) => {
                return {
                    label: ele?.targetcurrency?.name,
                    value: ele.target_currency.concat(' ', idx)
                }
            })

            setItems_(data)
            
        }
    }, [rates, items])


    useEffect(() => {
        dispatch(getCharges())
        dispatch(getRates())
    }, [])

    useEffect(() => {
        if(rates.length && selectedTarget && exchangeAmount) {

            const t_amount = getTargetAmount(rates, value.split(' ')[0], selectedTarget.split(' ')[0], exchangeAmount);
            setConvertedAmount(t_amount)


            const t_charge = getCharge(rates, value.split(' ')[0], selectedTarget.split(' ')[0], exchangeAmount, charges?.exchange_charges)
            setCharge(t_charge)
            console.log('charges', t_amount, t_charge)

           
        }
    }, [rates, selectedTarget, exchangeAmount])



    const handleExchange = async () => {
        const data = {
            'base_currency': value.toString(),
            'base_amount': exchangeAmount,
            'target_currency': selectedTarget.toString(),
            'target_amount': convertedAmount
        }

        setActionType('Exchange')
        setSendSummary(data)
        if (pin_available) {
            setTimeout(() => {
                navigation.push('PIN CONFIRM')
            }, 400)
        } else {
            await dispatch(generateOTP()).then(res => {
                if (res.meta.requestStatus === 'fulfilled') {
                    navigation.push('PIN OTP')
                }
            })
        }
        
    }

    return (
        <SafeAreaView style={{ backgroundColor: colors.white, height: Dimensions.get('window').height }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrow}>
                <Ionicons name="arrow-back" color={colors.black} size={25} />
            </TouchableOpacity>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.header}>Enter the amount you want to sell</Text>
                    <Text style={styles.header_1}>
                        $5 is the minimum trade amount accepted.
                    </Text>
                    <Text style={styles.text}>Base wallet</Text>
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        style={styles.input}
                        placeholder=''
                        onChangeValue={(ele) => {
                            setConvertedAmount('')
                            setCharge('')
                            console.log('Element', ele)
                        }}
                        placeholderStyle={{
                            color: 'rgba(0,0,0,0.5)',
                            fontFamily: "Poppins-Regular",
                            fontSize: 13
                        }}
                        arrowIconStyle={{
                            // backgroundColor: colors.primary,
                            padding: 15,
                            borderRadius: 20,
                        }}
                        closeIconStyle={{
                            color: colors.white
                        }}
                    />

                    <View style={{ width: '100%' }}>
                        <Text style={[styles.text, { paddingTop: 20, marginBottom: 0 }]}>
                            Target wallet
                        </Text>
                        <DropDownPicker
                            open={e_open}
                            value={selectedTarget}
                            items={items_}
                            setOpen={setOpen_}
                            setValue={setSelectedTarget}
                            setItems={setItems_}
                            style={styles.input}
                            placeholder=''
                            onChangeValue={(ele) => {
                                
                                setConvertedAmount('')
                                setCharge('')

                            }}
                            placeholderStyle={{
                                color: 'rgba(0,0,0,0.5)',
                                fontFamily: "Poppins-Regular",
                                fontSize: 13
                            }}
                            arrowIconStyle={{
                                // backgroundColor: colors.primary,
                                padding: 15,
                                borderRadius: 20,
                            }}
                            closeIconStyle={{
                                color: colors.white
                            }}
                        />

                        <Text style={[styles.text, { paddingTop: 20, marginBottom: -30 }]}>
                            Exchange amount
                        </Text>
                        <Input
                            value={formatNumber(exchangeAmount)}
                            setValue={setExchangeAmount}
                        />

                        <Text style={[styles.text, { paddingTop: 20, marginBottom: -30 }]}>
                            Converted amount
                        </Text>
                        <Input
                            value={convertedAmount}
                            editable={false}
                        />

                        <Text style={[styles.text, { paddingTop: 20, marginBottom: -30 }]}>
                            Charges
                        </Text>
                        <Input
                            editable={false}
                            value={charge.toString()}
                        />

                        <Text style={[styles.text, { paddingTop: 20, marginBottom: -30 }]}>
                            Total Receive
                        </Text>
                        <Input

                            value={(Number(convertedAmount) - Number(charge || 0 )).toString() }
                            editable={false}
                        />

                        <Button onPress={handleExchange} style={{ width: '100%', marginTop: 30 }}>
                            Exchange now
                        </Button>
                    </View>
                </View>
                <Spinner
                    visible={loading === 'pending' ? true : false}
                    loading="Getting rates, please wait..."
                />
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    arrow: {
        padding: 20
    }, header: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 14,
        fontWeight: '500',
        color: colors.black,
    },
    header_1: {
        fontFamily: "Poppins-Regular",
        fontSize: 11,
        fontWeight: '300',
        color: colors.black,
        textAlign: 'center',
        paddingBottom: 30
        // width: '70%'
    }, container: {
        alignItems: 'center',
        padding: 20,
    }, input: {
        borderWidth: 0,
        backgroundColor: '#F4F4F4',
        height: 59,
        width: '100%',
        borderRadius: 10,
        paddingLeft: 20,
        marginTop: 5,
        // marginTop: 40
    }, text: {
        fontFamily: "Poppins-Regular",
        fontSize: 14,
        color: colors.black,
        alignSelf: 'flex-start'
    }
})


export default Exchange