import React, { useEffect, useState } from "react";
import { Modal, Text, View, StyleSheet, TouchableOpacity, Dimensions, Image, ScrollView, ActivityIndicator } from "react-native";
import { colors } from "../../utils/colors";
import { useDispatch, useSelector } from "react-redux";
import { getCurrencies, createWallet, getUserWallets } from "../../redux/wallet/thunkActions";
import Ionicons from 'react-native-vector-icons/Ionicons'


const ModalWallet = ({visible, setVisible}) => {
    
    const { currencies, loading, isLoading, wallets } = useSelector(state => state.walletReducer);

    const dispatch = useDispatch();
    const [data, setData] = useState([])

    useEffect(() => {
        dispatch(getCurrencies())
    }, [])

    const handleCreateWallet = async (currency_id) => {
        setVisible(false)
        await dispatch(createWallet({currency_id})).then(res => {
            if(res.meta.requestStatus === 'fulfilled'){
                dispatch(getUserWallets())
                dispatch(getCurrencies())
            }
        })
    }


    useEffect(() => {
        const d = wallets.map(ele => ele.currency.code)
        const c = currencies.filter(ele => !d.includes(ele.code))
        setData(c)
    }, [currencies, wallets])


    return (
        <Modal
            visible={visible}
            onRequestClose={() => setVisible(!visible)}
            animationType='slide'
            transparent={true}
        >
            <View style={styles.container}>
                <View style={styles.box}>
                    <TouchableOpacity onPress={() => setVisible(false)} style={styles.close}>
                        <Ionicons name="close-circle-sharp" color={colors.error} size={20} />
                    </TouchableOpacity>
                    <ScrollView>
                        {
                            loading === 'pending' ? <ActivityIndicator size='small' color={colors.black} />
                                : (
                                    <>
                                        {
                                            Array.isArray(currencies) && Boolean(currencies.length) && (
                                                data?.map(((element, idx) => (
                                                    <TouchableOpacity onPress={() => handleCreateWallet(element.id.toString())} style={{ marginBottom: 15 }} key={element.id}>
                                                        {/* <Image source={{ uri: element.logo }} resizeMode='cover' style={{ width: 20, height: 20 }} /> */}
                                                        <View>
                                                            <Text style={styles.text_1}>{idx + 1}.{'   '}{element.name}
                                                            </Text>
                                                            <Text style={styles.text_2}>{element.name}</Text>
    
    
                                                        </View>
                                                    </TouchableOpacity>
                                                )))
                                            )
                                        }
                                    </>
                                )
                        }
                    </ScrollView>

                </View>
            </View>

        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        height: Dimensions.get('window').height,
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%'
    }, box: {
        height: 500,
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: colors.white,
        padding: 20,
        paddingTop: 60

    }, text_1: {
        fontFamily: "Poppins-Bold",
        fontSize: 17,
        color: colors.black
    }, text_2: {
        fontFamily: "Poppins-Regular",
        fontSize: 13,
        color: colors.black,
        paddingLeft: 27
    },
    close: {
        position: 'absolute',
        right: 20,
        top: 20
    }
})

export default ModalWallet