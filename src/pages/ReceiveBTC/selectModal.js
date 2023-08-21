import React, { useState, useEffect } from "react";
import { Text, View, Modal, StyleSheet, TouchableOpacity, Dimensions, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { colors } from "../../utils/colors";
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Yup from 'yup';
import { useSelector, useDispatch } from "react-redux";
import { getUserWallets } from "../../redux/wallet/thunkActions";



const SelectWalletModal = ({ visisble, setVisible, setSelected }) => {
    
    const { wallets, loading } = useSelector(state => state.walletReducer);
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getUserWallets())
    }, [])

    useEffect(() => {
        if(wallets.length){
            setSelected(wallets[0])
        }
    }, [wallets])
   
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
                <View>
                    <View style={styles.container}>
                        <View style={styles.box}>
                            <TouchableOpacity onPress={() => setVisible(false)} style={styles.close}>
                                <Ionicons name="close-circle-sharp" color={colors.error} size={20} />
                            </TouchableOpacity>

                            <View style={styles.box_2}>
                                <Text style={[styles.text, { color: colors.black, paddingBottom: 20}]}>
                                    Select wallet
                                </Text>
                                <ScrollView>
                                    {
                                        wallets?.map(data => (
                                            <TouchableOpacity onPress={() => {
                                                setSelected(data)
                                                setVisible(false)
                                            }} style={styles.boxx}>
                                                <Text style={styles.text}>{data.currency.name}</Text>
                                            </TouchableOpacity>
                                        ))
                                    }
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                </View>
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
        height: 300,
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
    }, text: {
        fontFamily: 'Poppins-Regular',
        color: colors.white,
        fontSize: 14,
        paddingLeft: 15
    }, boxx: {
        width: '100%',
        height: 60,
        borderRadius: 8,
        backgroundColor: colors.primary_faded,
        marginBottom: 15,
        justifyContent: 'center',

    }
})

export default SelectWalletModal