import React, { useState } from "react";
import { Modal, Text, View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { colors } from "../../utils/colors";
import Ionicons from 'react-native-vector-icons/Ionicons'



const TypeModal = ({visible, setVisible, setSelected, setShowSend}) => {

    return (
        <Modal
            visible={visible}
            onRequestClose={() => setVisible(!visible)}
            animationType='slide'
            transparent={true}
        >
            <View style={styles.conatiner}>

                <View style={styles.box}>
                    <TouchableOpacity onPress={() => setVisible(false)} style={styles.close}>
                        <Ionicons name="close-circle-sharp" color={colors.error} size={20} />
                    </TouchableOpacity>
                    {
                        ['External Transfer', 'Internal Transfer'].map((ele, idx) => (
                            <TouchableOpacity style={styles.type} key={idx} onPress={() => {
                                setSelected(ele)
                                setVisible(false)
                                setShowSend(true)
                            }}>
                                <Text style={styles.text}>{idx + 1}.{'  '} {ele}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    conatiner: {
        height: Dimensions.get('window').height,
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)'
    }, box: {
        width: '100%',
        height: 230,
        backgroundColor: colors.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 30,
        paddingTop: 50
    }, text: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 15,
        color: colors.white,
        marginBottom: 20
    },  close: {
        position: 'absolute',
        right: 20,
        top: 20
    },
    type: {
        height: 60,
        width: '100%',
        backgroundColor: '#959695',
        marginBottom: 10,
        justifyContent: 'center',
        borderRadius: 10,
        paddingLeft: 20,
        paddingTop: 15
    }
})

export default TypeModal