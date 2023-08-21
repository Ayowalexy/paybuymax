import React, { useState } from "react";
import { View, StyleSheet, Text, Dimensions, Modal, Image, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { colors } from "../../utils/colors";
import { CloseBtn } from "../Transactions";
import EditProfile from "./EditProfile";
import AddBank from "./AddBank";
import SecuritySettings from "./SecuritySettings";


export const Input = ({ name, paddingLeft, value, setValue, editable, error, ...others }) => {
    return (
        <View>
            <Text
                style={styles.textInput}
            >{name}</Text>
            <TextInput
                onChangeText={setValue}
                style={[styles.input, { paddingLeft, backgroundColor: name == 'BVN' ? '#BBC2E7' : colors.wallet }]}
                value={value}
                editable={editable ? true : false}
                {...others}
            />
            {
                Boolean(error) && (<Text style={styles.error}>{error}</Text>)
            }
        </View>
    )
}

const UserSetting = ({ visible, setVisible, type }) => {
    return (
        <Modal
            visible={visible}
            onRequestClose={() => setVisible(!visible)}
            animationType='slide'
            transparent={true}
        >
            <View style={styles.container}>
                <View style={[styles.box, {
                    height: type === 'Add Bank' || type === 'Security Setting'
                        ? 550

                        : 670,
                    paddingBottom: 30
                }]}>
                    <View style={styles.header}>
                        <View style={{ width: 30 }} />
                        <Text style={styles.text}>{type}</Text>
                        <CloseBtn action={() => setVisible(false)} />
                    </View>

                    <ScrollView style={{ paddingLeft: 20, paddingRight: 20 }}>



                        {
                            type === 'Edit Profile' && (
                                <EditProfile
                                    setVisible={setVisible}
                                />
                            )
                        }

                        {
                            type === 'Add Bank' && (
                                <AddBank
                                    setVisible={setVisible}
                                />
                            )
                        }

                        {
                            type === 'Security Setting' && (
                                <SecuritySettings
                                    setVisible={setVisible}
                                />
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
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    box: {
        width: '100%',
        height: 580,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        backgroundColor: colors.white
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
    error: {
        fontFamily: "Poppins-Regular",
        fontSize: 9,
        color: 'red'
    }
})

export default UserSetting