import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, Image, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SwipeablePanel } from 'rn-swipeable-panel';
import { Button } from "../../components/Custom";
import { Kuda, BNB, BTC, USDT, } from "../../utils/assets";
import { colors } from "../../utils/colors";
import { Input } from "../Transfer";
import DropDownPicker from 'react-native-dropdown-picker';
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useUser } from "../../context/userContext";
import { formatNumber } from "../../utils/numberFormatter";





const SendFiat = ({ isPanelActive, setIsPanelActive, type, showSummary }) => {

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
    const [value, setValue] = useState('');
    const [items, setItems] = useState([
        { label: 'USDT', value: 'usdt', icon: () => <Image source={USDT} resizeMode='contain' /> },
        { label: 'Binance', value: 'bnb', icon: () => <Image source={BNB} resizeMode='contain' /> },
        { label: 'Bitcoin', value: 'dodge', icon: () => <Image source={BTC} resizeMode='contain' /> },
    ]);
    const { oneWallet } = useSelector(state => state.walletReducer);
    const { setSendSummary } = useUser();

    const validationSchema = Yup.object().shape({
        amount: Yup
            .number()
            // .min(Number(oneWallet.currency.minimum_transfer), `Amount must not be less than ${oneWallet.currency.minimum_transfer}`)
            // .max(Number(oneWallet.currency.maximum_transfer), `Amount cannot be higher than ${oneWallet.currency.minimum_transfer}`)
            .required('Amount is required'),
        address: Yup.string().required('Enter address')
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
    } = useFormik({
        initialValues: {
            amount: "",
            address: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsPanelActive(!isPanelActive)
            setTimeout(() => {
                setSendSummary({
                    ...values,
                    type
                })
                showSummary(true)
            }, 300)
        }
    });
    return (
        <>
            <SwipeablePanel {...panelProps} isActive={isPanelActive}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>

                    <ScrollView >
                        <View style={styles.container}>
                            <Text style={styles.header}>Enter the amount you want to send</Text>
                            <Text style={styles.header_1}>
                                {oneWallet.currency.minimum_transfer} is the minimum trade amount. Your wallet
                                will be credited immediately after every
                                transaction.
                            </Text>

                            <View style={styles.divider} />

                            <View style={{ width: '90%' }}>

                                <Input
                                    label='You are sending'
                                    showType={true}
                                    type={type}
                                    showFooter={true}
                                    min={oneWallet.currency.minimum_transfer}
                                    max={oneWallet.currency.minimum_transfer}
                                    keyboardType='number-pad'
                                    onBlur={handleBlur('amount')}
                                    setValue={handleChange('amount')}
                                    placeholder='Enter amount'
                                    errorMsg={errors.amount}
                                    error={!!errors.amount && touched.amount}

                                />


                                <Input
                                    label='Receipient wallet address'
                                    type={type}
                                    onBlur={handleBlur('address')}
                                    setValue={handleChange('address')}
                                    placeholder='Enter address'
                                    errorMsg={errors.address}
                                    error={!!errors.address && touched.address}
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
    },
    header: {
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
    }

})

export default SendFiat