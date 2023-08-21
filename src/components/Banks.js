import React, { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { Text, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { colors } from "../utils/colors";
import { useSelector, useDispatch } from "react-redux";
import { getBankAccounts, getWalletDetails } from "../redux/wallet/thunkActions";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from "@react-navigation/native";

export const BanksDropdown = ({ setFieldValue }) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const { banksAccounts, gettingbanks, oneWallet, walletDetails } = useSelector(state => state.walletReducer)

    useEffect(() => {
        dispatch(getBankAccounts())
    }, [])

    useEffect(() => {
        if (banksAccounts.length) {
            const data = banksAccounts.map(ele => {
                return {
                    label: ele.bank.name,
                    value: ele.id
                }
            })

            setItems(data)
        }
    }, [banksAccounts])

    useEffect(() => {
        if (Object.keys(walletDetails).length) {
            setFieldValue('wallet_id', walletDetails?.wallet?.id)
        }
    }, [walletDetails])

    console.log('vvv', banksAccounts)

    return (
        <>
            <Text style={[styles.text, { paddingTop: 20 }]}>Select a bank</Text>
            {
                gettingbanks === 'pending'
                    ? <ActivityIndicator size={'small'} color={colors.primary} />
                    : (
                        <>
                            {
                                banksAccounts.length ?
                                    (
                                        <DropDownPicker
                                            open={open}
                                            value={value}
                                            items={items}
                                            setOpen={setOpen}
                                            setValue={setValue}
                                            setItems={setItems}
                                            onSelectItem={(value) => setFieldValue("bankaccount_id", value.value)}
                                            style={styles.input}
                                            placeholder='Choose Bank'
                                            placeholderStyle={{
                                                color: 'rgba(0,0,0,0.5)',
                                                fontFamily: "Poppins-Regular",
                                                fontSize: 13
                                            }}
                                            arrowIconStyle={{
                                                backgroundColor: colors.primary,
                                                padding: 15,
                                                borderRadius: 20,
                                            }}
                                            closeIconStyle={{
                                                color: colors.white
                                            }}
                                        />
                                    )
                                    :
                                    (
                                        <TouchableOpacity onPress={() => navigation.push('Add Bank')} style={styles.box}>
                                            <Ionicons name='add-circle' color={colors.black} size={30} />
                                        </TouchableOpacity>
                                    )
                            }
                        </>
                    )
            }
        </>
    )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 0,
        backgroundColor: '#F4F4F4',
        height: 59,
        width: '100%',
        borderRadius: 10,
        paddingLeft: 20,
        marginTop: 5
    },
    text: {
        fontFamily: 'Poppins-Regular',
        fontWeight: '400',
        fontSize: 14,
        color: colors.black
    }, box: {
        width: '100%',
        height: 59,
        borderColor: colors.black,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})