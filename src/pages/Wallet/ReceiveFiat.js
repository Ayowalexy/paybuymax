import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, Image, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SwipeablePanel } from 'rn-swipeable-panel';
import { Button } from "../../components/Custom";
import { Kuda, BNB, BTC, USDT, } from "../../utils/assets";
import { colors } from "../../utils/colors";
import { Input } from "../Transfer";
import DropDownPicker from 'react-native-dropdown-picker';
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useUser } from "../../context/userContext";
import { formatNumber } from "../../utils/numberFormatter";
import { getBankAccounts } from "../../redux/wallet/thunkActions";
import Ionicons from 'react-native-vector-icons/Ionicons'
import AddBankModal from "./AddBanksModal";
import { useNavigation } from "@react-navigation/native";
import { BanksDropdown } from "../../components/Banks";


const ReceiveFiat = ({ isPanelActive, setIsPanelActive, type, showSummary }) => {

    const [panelProps, setPanelProps] = useState({
        fullWidth: true,
        openLarge: true,
        showCloseButton: true,
        noBackgroundOpacity: false,
        onClose: () => closePanel(),
        onPressCloseButton: () => closePanel(),
        // ...or any prop you want
    });

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [items, setItems] = useState([]);
    const { oneWallet, banksAccounts, gettingbanks, walletDetails: { wallet: { id } } } = useSelector(state => state.walletReducer);
    const { setSendSummary } = useUser();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);

    const validationSchema = Yup.object().shape({
        amount: Yup
            .number()
            .min(Number(oneWallet.currency.minimum_withdrawal), `Amount must not be less than ${oneWallet.currency.minimum_transfer}`)
            .max(Number(oneWallet.currency.maximum_withdrawal), `Amount cannot be higher than ${oneWallet.currency.minimum_transfer}`)
            .required('Amount is required'),
        wallet_id: Yup.string().required('Enter your  wallet'),
        bankaccount_id: Yup.string().required('Select an account number'),
    })

    const openPanel = () => {
        setIsPanelActive(true);
    };

    const closePanel = () => {
        setIsPanelActive(false);
    };

    const {
        handleSubmit,
        handleChange,
        handleBlur,
        isSubmitting,
        errors,
        touched,
        setFieldValue,
        setFieldTouched,
        setFieldError
    } = useFormik({
        initialValues: {
            amount: "",
            wallet_id: "",
            bankaccount_id: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsPanelActive(!isPanelActive)
            setTimeout(() => {
                setSendSummary({
                    ...values,
                    type,
                })
                showSummary(true)
            }, 300)
        }
    });


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

    return (
        <>
            <SwipeablePanel {...panelProps} isActive={isPanelActive}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>

                    <ScrollView >
                        <View style={styles.container}>
                            <Text style={styles.header}>Enter the amount you want to withdraw</Text>
                            <Text style={styles.header_1}>
                                {oneWallet.currency.code}{formatNumber(oneWallet.currency.minimum_withdrawal)} is the minimum withdrawal amount. Your wallet
                                will be debited immediately after every
                                transaction.
                            </Text>

                            <View style={styles.divider} />

                            <View style={{ width: '90%' }}>

                                <Input
                                    label='You want to withdraw'
                                    showType={true}
                                    type={type}
                                    showFooter={true}
                                    min={oneWallet.currency.minimum_withdrawal}
                                    max={oneWallet.currency.maximum_withdrawal}
                                    keyboardType='number-pad'
                                    onBlur={handleBlur('amount')}
                                    setValue={handleChange('amount')}
                                    placeholder='Enter amount'
                                    errorMsg={errors.amount}
                                    error={!!errors.amount && touched.amount}

                                />

                               <BanksDropdown
                                    setFieldValue={setFieldValue}
                               />
                            </View>
                            <Button style={{ width: '90%', marginTop: 40 }}
                                onPress={() => {

                                    handleSubmit()
                                }}
                            >
                                Send
                            </Button>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
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
        marginTop: -50,
        height: Dimensions.get('window').height

        // paddingTop: 20
    },
    header: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 14,
        fontWeight: '500',
        color: colors.black,
        // paddingTop: 20
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
        marginTop: 30,
        marginBottom: 30
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
    add: {
        width: '100%',
        height: 60,
        backgroundColor: '#F4F4F4',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,

    }, error: {
        fontFamily: 'Poppins-Regular',
        color: colors.error,
        fontSize: 12
    }

})

export default ReceiveFiat