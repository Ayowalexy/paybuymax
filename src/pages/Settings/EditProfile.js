import React, { useState } from "react";
import { Button } from "../../components/Custom";
import { Input } from "./UserSetting";
import { View, StyleSheet, TouchableOpacity, Platform, Image, Text, KeyboardAvoidingView } from "react-native";
import { colors } from "../../utils/colors";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Avatar } from "../../utils/assets";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from 'react-native-date-picker'
import { updateUserprofile, getUserprofile } from "../../redux/auth/thunkActions";
import { useFormik } from "formik";
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Full name is required'),
    email: Yup.string().email().required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    country: Yup.string().required('Country is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('city is required'),
    dob: Yup.string()

})

const EditProfile = ({ setVisible }) => {

    const dispatch = useDispatch();
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false)
    const { profile:
        { id, name, phone, email, bvn_verified, address, country, state, city },
        loading, isLoadingProfile
    } = useSelector(state => state.authReducer)

    const {
        handleSubmit,
        handleChange,
        handleBlur,
        isSubmitting,
        errors,
        touched,
        values,
        setFieldValue
    } = useFormik({
        initialValues: {
            email: email || '',
            name: name || '',
            phone: phone || '',
            country: country || '',
            address: address || '',
            state: state || '',
            city: city || '',
            dob: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            await dispatch(updateUserprofile(values)).then(async res => {
                if (res.meta.requestStatus === 'fulfilled') {
                    await dispatch(getUserprofile()).then(res => {
                        if (res.meta.requestStatus === 'fulfilled') {
                            setVisible(false)
                        }
                    })
                }
            })
        },
    });

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}

        >

            <View style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row'
            }}>
                <View>
                    <TouchableOpacity style={styles.edit}>
                        <MaterialCommunityIcons name="image-edit" color={colors.white} size={20} />
                    </TouchableOpacity>
                    <Image source={Avatar} resizeMode='contain' />
                </View>
                <Text style={[styles.text, { paddingLeft: 10 }]}>Edit Profile Photo</Text>
            </View>
            <Input
                name='User ID'
                value={id.toString()}
                paddingLeft={60}
                editable={false}
            />
            <Input
                name='Full Name'
                value={values.name.toString()}
                paddingLeft={80}
                editable={true}
                onBlur={handleBlur('name')}
                setValue={handleChange('name')}
                error={errors.name}
            />

            <Input
                name='Tel'
                value={values.phone}
                paddingLeft={36}
                editable={true}
                onBlur={handleBlur('phone')}
                setValue={handleChange('phone')}
                error={errors.phone}
            />

            <Input
                name='Email'
                value={values.email}
                paddingLeft={55}
                editable={true}
                onBlur={handleBlur('email')}
                setValue={handleChange('email')}
                error={errors.email}
            />

            <TouchableOpacity onPress={() => setOpen(true)}>
                <Input
                    name='Date of birth'
                    value={values.dob}
                    paddingLeft={89}
                    onBlur={handleBlur('dob')}
                    setValue={handleChange('dob')}
                    error={errors.dob}
                    editable={false}
                />
            </TouchableOpacity>


            <Input
                name='Address'
                value={values.address || ''}
                paddingLeft={69}
                editable={true}
                onBlur={handleBlur('address')}
                setValue={handleChange('address')}
                error={errors.address}
            />
            <Input
                name='Country'
                value={values.country}
                paddingLeft={68}
                editable={true}
                onBlur={handleBlur('country')}
                setValue={handleChange('country')}
                error={errors.country}
            />
            <Input
                name='State'
                value={values.state}
                paddingLeft={48}
                editable={true}
                onBlur={handleBlur('state')}
                setValue={handleChange('state')}
                error={errors.state}
            />


            <DatePicker
                modal
                open={open}
                date={date}
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                    setFieldValue('dob', new Date(date).toLocaleDateString())
                }}
                onCancel={() => {
                    setOpen(false)
                }}

            />

            <Input
                name='City'
                value={values.city}
                paddingLeft={48}
                editable={true}
                onBlur={handleBlur('city')}
                setValue={handleChange('city')}
                error={errors.city}
            />

            <View style={[styles.input, { backgroundColor: '#BBC2E7', flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }]}>
                <Text
                    style={{
                        fontFamily: "Poppins-SemiBold",
                        fontWeight: '600',
                        fontSize: 12,
                        color: 'rgba(0, 0, 0, 0.5)',
                    }}
                >
                    BVN
                </Text>
                <Text style={styles.val}>
                    {"   "}{bvn_verified ? 'Verified' : 'Not verified'}
                </Text>
            </View>


            <View style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 30
            }}>
                <Button loading={
                    isLoadingProfile === 'pending' || loading === 'pending' ? true : false
                } onPress={handleSubmit} style={{ width: '30%' }}>
                    Save
                </Button>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({

    input: {
        width: '100%',
        height: 43,
        backgroundColor: colors.wallet,
        borderRadius: 10,
        marginTop: 20,
        fontFamily: "Poppins-Regular",
        fontSize: 11,
        fontWeight: '300',
        color: 'rgba(0, 0, 0, 0.5)'
    },
    textInput: {
        position: 'absolute',
        zIndex: 10,
        fontFamily: "Poppins-SemiBold",
        fontWeight: '600',
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.5)',
        top: 33,
        left: 10,

    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 30
    },
    text: {
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
        fontWeight: '400',
        color: colors.black
    },
    edit: {
        position: 'absolute',
        zIndex: 10,
        top: 10,
        left: 10
    },
    val: {
        fontFamily: "Poppins-Regular",
        fontSize: 11,
        fontWeight: '300',
        color: 'rgba(0, 0, 0, 0.5)'
    }
})

export default EditProfile