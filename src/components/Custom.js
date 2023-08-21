import React, { useState, useRef, useEffect } from "react";
import { Logo } from '../utils/assets'
import { Text, Image, TouchableOpacity, View, TextInput, StyleSheet, Animated, ActivityIndicator } from "react-native";
import { colors } from "../utils/colors";
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'



export const ILogo = () => <Image source={Logo} style={{ width: 138, height: 32 }} resizeMode='contain' />

export const HStack = ({ children, style, w, j = 'center', a = 'center' }) => (
    <View
        style={{
            display: 'flex',
            justifyContent: j,
            alignItems: a,
            flexDirection: 'row',
            width: w,

            ...style
        }}
    >
        {children}
    </View>
)


export const Button = ({ children, style, onPress, outline, loading, disabaled = false }) => (
    <TouchableOpacity
        onPress={onPress}
        disabled={disabaled}
        style={{
            borderRadius: 12,
            backgroundColor: outline ? '' : colors.primary,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 222,
            height: 48,
            borderWidth: outline ? 1 : 0,
            borderColor: colors.primary,
            opacity: loading ? 0.6 : 1,
            ...style
        }}
    >
        {
            loading === true
                ? <ActivityIndicator size='small' color={colors.white} />
                : (
                    <Text
                        style={{
                            fontFamily: "ReadexPro-SemiBold",
                            fontWeight: '500',
                            color: outline ? colors.primary : colors.white,
                            fontSize: 16
                        }}
                    >
                        {children}
                    </Text>
                )
        }
    </TouchableOpacity>
)

export const Input = ({ label, value, setValue, placeholder, style, onBlur, error, type, paddingLeft, errMsg }) => {

    const [show, setShow] = useState(false);

    return (
        <View style={[styles.container, { ...style }]}>
            <Text
                style={{
                    fontFamily: "Poppins-SemiBold",
                    fontWeight: '500',
                    color: colors.black,
                    fontSize: 14
                }}
            >
                {label}
            </Text>

            <TextInput
                placeholderTextColor='rgba(0, 0, 0, 0.3)'
                value={value}
                onChangeText={setValue}
                onBlur={onBlur}
                placeholder={placeholder}
                style={[styles.input, { paddingLeft: paddingLeft ? paddingLeft : 40 }]}
                secureTextEntry={show}

            />

            {type === 'password' && (
                <TouchableOpacity
                    onPress={() => setShow(!show)}
                    style={{
                        position: 'absolute',
                        top: 50,
                        right: 15
                    }}
                >
                    <Ionicons name={show ? "eye" : 'eye-off'} color={colors.black} size={20} />
                </TouchableOpacity>
            )}
            {error && (
                <Text
                    style={{
                        fontFamily: "Poppins-Regular",
                        fontWeight: '400',
                        color: colors.error,
                        fontSize: 10
                    }}
                >
                    {errMsg}
                </Text>
            )}
        </View>
    )
}


export const Input2 = ({ label, value, setValue, placeholder, style, onBlur, error, type, element, values }) => {
    const [show, setShow] = useState(false);
    const [focused, setFocused] = useState({});

    const anim = useRef(new Animated.Value(1)).current;
    const anim1 = useRef(new Animated.Value(40)).current;

    const animate = (a, b) => {

        Animated.timing(anim, {
            toValue: a,
            duration: 200,
            useNativeDriver: false
        }).start()

        Animated.timing(anim1, {
            toValue: b,
            duration: 200,
            useNativeDriver: false
        }).start()
    }

    useEffect(() => {

        const password = values?.password;
        const confirm_password = value?.confirm_password;

        if (!password) {
            if (focused[element]) {
                animate(0.7, -10)
            } else if (password) {
                animate(1, 40)
            }
        }


        if (!confirm_password) {
            if (focused[element]) {
                animate(0.7, -10)
            } else if (confirm_password) {
                animate(1, 40)
            }
        }
    }, [focused, values])


    return (
        <View style={[styles.container, { ...style }]}>


            <View style={{ width: '100%' }}>
                <View style={{ position: 'absolute', top: 23, left: 14 }}>
                    {
                        type === 'password'
                            ? <MaterialIcons name="lock-outline" color={colors.box} size={20} />
                            : <Ionicons name='mail-outline' color={colors.primary} size={20} />
                    }
                </View>
                <Animated.View style={{
                    transform: [{
                        scale: anim
                    }],
                    left: anim1
                }}>
                    <Text
                        style={{
                            fontFamily: "Poppins-SemiBold",
                            fontWeight: '500',
                            color: colors.black,
                            fontSize: 14,
                            position: 'absolute',
                            top: 23,
                            // left: 40
                        }}
                    >
                        {label}
                    </Text>
                </Animated.View>
                <TextInput
                    placeholderTextColor='rgba(0, 0, 0, 0.3)'
                    value={value}
                    onChangeText={setValue}
                    onBlur={() => {
                        // onBlur()
                        setFocused({ ...focused, [element]: false })
                    }}
                    // placeholder={placeholder}
                    style={styles.input}
                    onFocus={() => setFocused({ ...focused, [element]: true })}
                    secureTextEntry={show}
                />
                {
                    type !== 'password' && (
                        <View style={{ position: 'absolute', top: 22, right: 10 }}>
                            <Ionicons name={Boolean(error) ? 'close-circle-outline' : 'checkmark-circle'} color={Boolean(error) ? colors.error : colors.success} size={20} />
                        </View>
                    )
                }

                {type === 'password' && (
                    <TouchableOpacity
                        onPress={() => setShow(!show)}
                        style={{
                            position: 'absolute',
                            top: 23,
                            right: 15
                        }}
                    >
                        <Ionicons name={show ? "eye" : 'eye-off'} color={colors.black} size={20} />
                    </TouchableOpacity>
                )}
            </View>

            {error && (
                <Text
                    style={{
                        fontFamily: "Poppins-Regular",
                        fontWeight: '400',
                        color: colors.error,
                        fontSize: 10
                    }}
                >
                    {error}
                </Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    input: {
        width: '100%',
        height: 55,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        paddingLeft: 40,
        // paddingTop: 5,
        marginTop: 10,
        fontFamily: "Poppins-SemiBold",
        color: colors.black,
        fontSize: 14

    }
})