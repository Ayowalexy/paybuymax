import React, { useEffect } from "react";
import { Modal, Text, View, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView, FlatList, ActivityIndicator } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from "../../utils/colors";
import { useDispatch, useSelector } from "react-redux";
import { getAllBanks } from "../../redux/wallet/thunkActions";


const AddBankModal = ({ setVisible, setselectedBank, selectedBank, visible, setFieldValue }) => {

    const dispatch = useDispatch();
    const { loading, allBanks } = useSelector(state => state.walletReducer);

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    setFieldValue('bank_id', item.id)
                    setselectedBank(item)
                    setVisible(false)
                }}
                style={[styles.select_box, {
                    backgroundColor: selectedBank.name === item.name ? colors.primary : 'rgba(242,68,5,0.1)'
                }]}>
                <Text style={[styles.done, {
                    color: selectedBank.name === item.name ? colors.white : colors.primary
                }]}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    useEffect(() => {
        dispatch(getAllBanks())
    }, [])
    return (
        <Modal
            visible={visible}
            onRequestClose={() => setVisible(false)}
            animationType='slide'
            transparent={true}
        >
            <SafeAreaView>
                <View style={styles}>
                    <View style={styles.box}>
                        <View style={styles.header}>
                            <Text style={styles.select}>Select a bank</Text>
                            <TouchableOpacity>
                                <Text style={styles.done}>Done</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ alignItems: 'center' }}>
                            {
                                loading === 'pending'
                                    ? <ActivityIndicator size='small' color={colors.black} />
                                    : (
                                        <FlatList
                                            data={allBanks}
                                            renderItem={renderItem}
                                            keyExtractor={({ item }) => item}
                                        />
                                    )
                            }
                        </View>
                    </View>
                </View>
            </SafeAreaView>

        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        width: '100%',
        backgroundColor: 'rgba(0, 0,0, 0.5)',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        display: 'flex'
    },
    box: {
        width: '100%',
        height: Dimensions.get('window').height,
        backgroundColor: colors.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginBottom: 20

    }, close: {
        position: 'absolute',
        top: 20,
        right: 20
    }, header: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
        backgroundColor: colors.white

    },
    select: {
        fontFamily: "Poppins-Regular",
        fontSize: 12,
        color: colors.primary,
    },
    done: {
        fontFamily: "Poppins-Bold",
        fontSize: 13,
        color: colors.primary,
    }, select_box: {
        width: Dimensions.get('screen').width - 40,
        height: 50,
        borderRadius: 10,
        alignItems: 'flex-start',
        paddingLeft: 20,
        color: colors.primary,
        backgroundColor: 'rgba(242,68,5,0.1)',
        marginTop: 20,
        justifyContent: 'center'
    }
})

export default AddBankModal