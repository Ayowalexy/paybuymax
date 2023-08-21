import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Text, Dimensions, TouchableOpacity } from "react-native";
import { Input } from "../Transfer";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { colors } from "../../utils/colors";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Button } from "../../components/Custom";
import AddBankModal from "../Wallet/AddBanksModal";
import { createBankAccount, getBankAccounts } from "../../redux/wallet/thunkActions";
import { useDispatch, useSelector } from "react-redux";

const validationSchema = Yup.object().shape({
    account_number: Yup.string().required('Account number is required'),
    bank_id: Yup.string().required('Select a bank'),
    branch_id: Yup.string(),
})

const AddBankAccount = ({ navigation }) => {

    const [visible, setVisible] = useState(false);
    const [selectedBank, setSelectedBank] = useState({});
    const dispatch = useDispatch();
    const { loading, walletDetails: { wallet : { currency_id} } } = useSelector(state => state.walletReducer)

    const {
        handleSubmit,
        handleChange,
        handleBlur,
        isSubmitting,
        errors,
        touched,
        setFieldValue,
        setFieldTouched
    } = useFormik({
        initialValues: {
            account_number: "",
            bank_id: "",
            branch_id: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            const data = {
                ...values,
                currency_id
            }
            await dispatch(createBankAccount(data)).then(async res => {
                if(res.meta.requestStatus === 'fulfilled') {
                    await dispatch(getBankAccounts()).then(res => {
                        if(res.meta.requestStatus === 'fulfilled'){
                            navigation.goBack();
                        }
                    })
                }
            })
        }

    });

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ padding: 20 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="ios-arrow-back-outline" color={colors.black} size={20} />
                </TouchableOpacity>
                <Text style={styles.header}>
                    Add a bank account
                </Text>

                <Input
                    label='Account number'
                    onBlur={handleBlur('account_number')}
                    setValue={handleChange('account_number')}
                    placeholder='Enter account number'
                    errorMsg={errors.account_number}
                    error={!!errors.account_number && touched.account_number}
                />
                <Input
                    label='Branch ID'
                    onBlur={handleBlur('branch_id')}
                    type='Optional'
                    showType={true}
                    setValue={handleChange('branch_id')}
                    placeholder='Enter branch id'
                    errorMsg={errors.branch_id}
                    error={!!errors.branch_id && touched.branch_id}
                />
                <TouchableOpacity onPress={() => setVisible(true)} style={styles.add}>
                    <Text style={styles.select}>
                        {Boolean(Object.keys(selectedBank).length) ? selectedBank.name : 'Select bank'}
                    </Text>
                </TouchableOpacity>
                <Button onPress={handleSubmit} 
                loading={loading === 'pending' ? true : false}
                style={{ width: '100%', marginTop: 20 }}>
                    Add account
                </Button>
                <AddBankModal
                    visible={visible}
                    setVisible={setVisible}
                    selectedBank={selectedBank}
                    setselectedBank={setSelectedBank}
                    setFieldValue={setFieldValue}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        width: '100%',
        backgroundColor: colors.white,
        padding: 20
    },
    header: {
        fontFamily: 'Poppins-Bold',
        fontSize: 20,
        color: colors.black,
        paddingTop: 30
    }, add: {
        width: '100%',
        height: 60,
        backgroundColor: '#F4F4F4',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 20,
    }, select: {
        fontFamily: "Poppins-SemiBold",
        color: 'rgba(0,0,0,0.5)',
        fontSize: 15,
        paddingLeft: 25
        
    }
})

export default AddBankAccount