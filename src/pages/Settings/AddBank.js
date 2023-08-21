import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, FlatList, Dimensions, ActivityIndicator } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { colors } from "../../utils/colors";
import { Input } from "../Transfer";
import { Kuda } from "../../utils/assets";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Button } from "../../components/Custom";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { deleteBankAccount, createBankAccount, getBankAccounts, getAllBanks } from "../../redux/wallet/thunkActions";



const validationSchema = Yup.object().shape({
    bank_id: Yup.string().required('Select a bank'),
    account_number: Yup.string().required('Enter your account number')
})


const AddBank = ({ setVisible }) => {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);
    const dispatch = useDispatch();


    const { banksAccounts, isDeleting, allBanks, loading } = useSelector(state => state.walletReducer);

    const {
        handleSubmit,
        handleChange,
        handleBlur,
        isSubmitting,
        errors,
        touched,
        setFieldValue
    } = useFormik({
        initialValues: {
            bank_id: "",
            account_number: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            const data = {
                ...values,
                currency_id: 1
            }
            await dispatch(createBankAccount(data)).then(res => {
                if (res.meta.requestStatus === 'fulfilled') {
                    console.log('success', res)
                    dispatch(getBankAccounts())
                }
            })
        }
    })
    useEffect(() => {
        dispatch(getBankAccounts())
        dispatch(getAllBanks())
    }, [])


    const handleDelete = async (item) => {
        await dispatch(deleteBankAccount({ bankaccount_id: Number(item) })).then(res => {
            if (res.meta.requestStatus === 'fulfilled') {
                dispatch(getBankAccounts())
            }
        })
    }

    useEffect(() => {
        if (allBanks.length) {
            let data = [];
            for (let bank of allBanks) {
                data.push({
                    label: bank.name,
                    value: bank.id
                })
            }
            setItems(data)
        }
    }, [allBanks])



    return (
        <KeyboardAvoidingView
            style={{ width: '100%' }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}

        >
            <ScrollView style={{ width: '100%' }}>
                <View style={{ paddingTop: 40 }} />
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    style={styles.input}
                    onChangeValue={(value) => setFieldValue('bank_id', value)}
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
                {
                    !!errors.bank_id && touched.bank_id && <Text style={styles.error}>Select a bank</Text>

                }

                <Input
                    placeholder='Enter your account number'
                    onBlur={handleBlur('account_number')}
                    setValue={handleChange('account_number')}
                    errMsg={errors.account_number}
                    error={!!errors.account_number && touched.account_number}
                   
                />

                <View style={{ width: '100%' }}>
                    <Text style={styles.header}>
                        Available Bank Accounts
                    </Text>
                    <View style={{ width: '100%' }}>
                        <FlatList
                            data={banksAccounts}
                            renderItem={({ item }) => (
                                <View
                                    style={styles.box}
                                >

                                    <View >
                                        <Text style={[styles.header, { paddingTop: 0, textAlign: 'left' }]}>
                                            {item.bank.name}
                                        </Text>
                                        <Text style={[styles.header, { paddingTop: 0, textAlign: 'left', fontWeight: '300' }]}>
                                            {item.account_number}
                                        </Text>
                                    </View>
                                    {
                                        isDeleting === 'pending'
                                            ? <ActivityIndicator size='small' color={colors.black} />
                                            : (
                                                <TouchableOpacity
                                                    onPress={async() => {
                                                         handleDelete(item.bank_id)
                                                    }}
                                                >
                                                    <Ionicons name="trash" color={colors.error} size={30} />
                                                </TouchableOpacity>
                                            )
                                    }

                                </View>
                            )}
                            horizontal={false}
                            keyExtractor={({ item }) => Math.random()}
                        />
                    </View>

                    <View style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 30
                    }}>
                        <Button loading={loading === 'pending' ? true : false} onPress={handleSubmit} style={{ width: '30%' }}>
                            Save
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
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
        marginTop: -30,
        marginBottom: -20
    },
    box: {
        width: Dimensions.get('window').width - 40,
        height: 70,
        backgroundColor: '#FFE1D680',
        borderRadius: 10,
        marginTop: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 30,
        marginRight: 30
    },
    header: {
        fontFamily: "Poppins-SemiBold",
        fontWeight: '500',
        fontSize: 12,
        textAlign: 'right',
        width: '100%',
        paddingTop: 30
    },
    error: {
        fontFamily: "Poppins-SemiBold", 
        color: 'red',
        fontSize: 12
    }
})

export default AddBank