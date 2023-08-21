import React, { useState } from "react";
import { Text, View, Modal, StyleSheet, TouchableOpacity, Dimensions, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { colors } from "../../utils/colors";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Input } from "../Transfer";
import { Button } from "../../components/Custom";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { FlutterwaveInit } from 'flutterwave-react-native';
import { useSelector } from "react-redux";
import Payment from "./flutterwave";


const validationSchema = Yup.object().shape({
    amount: Yup.string().required('Amount is required'),
    pin: Yup.string().required('Pin is required')
})



const AmountModal = ({ visisble, setVisible, oneCurrency }) => {

    const { profile: { email, id, ...others } } = useSelector(state => state.authReducer);
    const { walletDetails: { wallet: { currency_id } } } = useSelector(state => state.walletReducer);
    const [loading, setLoading] = useState(false);

    console.log('others', others.pin_available)
    const {
        handleSubmit,
        handleChange,
        handleBlur,
        isSubmitting,
        errors,
        touched,
        values
    } = useFormik({
        initialValues: {
            amount: '',
            pin: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log(values)
            handlePaymment(values.amount)
        },
    });

    const handlePaymment = async (amount) => {
        try {
            setLoading(true)

            const paymentLink = await FlutterwaveInit({
                tx_ref: Math.random(),
                authorization: 'FLWPUBK_TEST-a8788092e91cd81002f7c6d06483802c-X',
                amount: amount,
                currency: 'NGN',
                customer: {
                    email: email
                },
                payment_options: 'card',
                meta: {
                    user_id: id,
                    email,
                    currency_id,
                    amount
                }
            });
            setLoading(false)
            console.log('Payment Link', paymentLink)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }
    return (
        <Modal
            visible={visisble}
            onRequestClose={() => setVisible(false)}
            animationType='slide'
            transparent={true}
        >
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.box}>
                            <TouchableOpacity onPress={() => setVisible(false)} style={styles.close}>
                                <Ionicons name="close-circle-sharp" color={colors.error} size={20} />
                            </TouchableOpacity>
                            <View style={styles.box_2}>
                                <Input
                                    label='Amount you want to deposit'
                                    onBlur={handleBlur('amount')}
                                    setValue={handleChange('amount')}
                                    placeholder='Enter your amount'
                                    errMsg={errors.amount}
                                    error={!!errors.amount && touched.amount}
                                />

                                <Input
                                    label='Transaction pin'
                                    onBlur={handleBlur('pin')}
                                    setValue={handleChange('pin')}
                                    placeholder='Enter your pin'
                                    errMsg={errors.pin}
                                    error={!!errors.pin && touched.pin}
                                />

                                <Payment
                                    amount={values.amount}
                                    setVisible={setVisible}
                                    pin={values.pin}
                                    currency_id={currency_id || oneCurrency?.currency?.id}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </Modal>
    )
}


const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    }, box: {
        height: 400,
        width: '100%',
        backgroundColor: colors.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        // height: Dimensions.get('window').height - 200

    }, close: {
        position: 'absolute',
        right: 20,
        top: 20,
        zIndex: 10
    }, box_2: {
        padding: 20,
        paddingTop: 40
    }
})

export default AmountModal