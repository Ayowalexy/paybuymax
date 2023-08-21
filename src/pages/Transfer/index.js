import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from "../../utils/colors";
import { Avatar } from "../../utils/assets";
import { HStack } from "../../components/Custom";
import CheckBox from '@react-native-community/checkbox';
import { Button } from "../../components/Custom";
import Summary from "../../components/Summary";
import Pin from "../../components/Pin";
import { formatNumber } from "../../utils/numberFormatter";


export const Input = ({ 
    label, 
    type, 
    showType, 
    showFooter, 
    min, 
    max, 
    value,
    setValue,
    error,
    errorMsg,
    ...props }) => {
        
    return (
        <View>
            <View style={styles.flex}>
                <Text style={styles.text}>{label}</Text>
                {
                    label === 'Amount' && (
                        <HStack>
                            <Text style={styles.text}>Charge</Text>
                            <Text style={[styles.text, { color: colors.primary, fontWeight: '500', paddingLeft: 5 }]}>₦30</Text>
                        </HStack>
                    )
                }
                {
                    showType && (
                        <HStack>
                            <Text style={styles.text}>{type}</Text>
                        </HStack>
                    )
                }
            </View>
            <View>
                {
                    type === 'money' && (
                        <Text style={{
                            position: 'absolute',
                            zIndex: 10,
                            top: 20,
                            left: 10,
                            fontSize: 17,
                            fontFamily: "Poppins-SemiBold"
                        }}>
                            ₦
                        </Text>
                    )
                }
                <TextInput
                    value={value}
                    onChangeText={setValue}
                    style={styles.input}
                    keyboardType={type === 'number' ? 'number-pad' : 'default'}
                    {...props}
                />
                {
                    showFooter && (
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <Text style={styles.min}>Min: {min}</Text>
                            <Text style={styles.min}>Max: {max}</Text>
                        </View>
                    )
                }
                {
                    Boolean(error) && (
                        <Text style={styles.error}>{errorMsg}</Text>
                    )
                }
            </View>
        </View>
    )
}

const Transfer = ({ navigation }) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [isPanelActive, setIsPanelActive] = useState(false);
    const [isPinPanelActive, setPinIsPanelActive] = useState(false);



    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.icon}>
                            <Ionicons name="close-circle" color={colors.white} size={20} />
                        </TouchableOpacity>
                        <View style={styles.box_bg}>
                            <Text style={styles.receive}>Naira Wallet</Text>
                        </View>
                        <View style={{ width: 20 }} />
                    </View>

                    <Text style={styles.bene}>
                        Choose from saved Beneficiaries
                    </Text>
                    <View style={styles.images}>
                        {
                            [1, 2, 3, 4, 5].map(element => <Image key={element} source={Avatar} resizeMode='contain' />)
                        }
                    </View>

                    <View style={styles.flex}>
                        <Text style={[styles.bene, { fontSize: 12 }]}>From</Text>
                        <HStack>
                            <Text style={[styles.bene, { fontSize: 12 }]}>My Paybuymax Wallet - </Text>
                            <Text style={[styles.bene, { color: colors.primary, fontWeight: '500' }]}>₦12,306</Text>
                        </HStack>
                    </View>

                    <View style={styles.divider} />

                    <KeyboardAvoidingView>
                        <Input label='Account Number' type='number' />
                        <Input label='Account name' />
                        <Input label='Amount' type='number' />
                    </KeyboardAvoidingView>

                    <View style={styles.flex_1}>
                        <CheckBox
                            disabled={false}
                            boxType='square'
                            onCheckColor='#fff'
                            onTintColor="#000"
                            onFillColor='#000'
                            value={toggleCheckBox}
                            onValueChange={(newValue) => setToggleCheckBox(newValue)}
                        />
                        <Text style={[styles.text, { marginTop: Platform.OS === 'android' ? 0 : -5, paddingLeft: 10 }]}>
                            Add to benefeciaries
                        </Text>
                    </View>

                    <View style={{ display: 'flex', alignItems: 'center', width: '100%', marginTop: 30, marginBottom: 150 }}>
                        <Button style={{ width: '90%' }} onPress={() => setIsPanelActive(true)}>
                            Proceed
                        </Button>
                    </View>

                    <Summary
                        isPanelActive={isPanelActive}
                        setIsPanelActive={setIsPanelActive}
                        setPin={setPinIsPanelActive}
                        pin={isPinPanelActive}
                    />

                    <Pin
                        isPanelActive={isPinPanelActive}
                        setIsPanelActive={setPinIsPanelActive}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: colors.white,
        zIndex: 100000
    },
    icon: {
        width: 25,
        height: 25,
        borderRadius: 30,
        backgroundColor: colors.error,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    receive: {
        fontFamily: "Poppins-SemiBold",
        fontWeight: '500',
        fontSize: 14
    },
    box_bg: {
        width: 189,
        height: 45,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.bg_faded
    },
    header: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row'
    },
    bene: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        fontWeight: '400',
        paddingTop: 30
    },
    images: {
        width: '90%',
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    flex: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    divider: {
        width: '90%',
        marginTop: 10,
        marginBottom: 10,
        height: 1,
        backgroundColor: colors.divider
    },
    input: {
        backgroundColor: '#F4F4F4',
        height: 59,
        width: '100%',
        borderRadius: 10,
        paddingLeft: 25,
        marginTop: 5,
        fontFamily: "Poppins-SemiBold",
        fontWeight: '500'
    },
    text: {
        fontFamily: 'Poppins-Regular',
        fontWeight: '400',
        fontSize: 14,
        marginTop: 20
    },
    flex_1: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

        marginTop: 20
    },
    min: {
        fontFamily: 'ReadexPro-Light',
        fontSize: 10,
        color: colors.black
    },
    error: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        paddingTop: 10,
        color: colors.error
    }
})

export default Transfer