import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Share, ToastAndroid, SafeAreaView, ScrollView, Platform, Dimensions } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from "../../utils/colors";
import QRCode from 'react-native-qrcode-svg';
import { HStack } from "../../components/Custom";
import Clipboard from '@react-native-clipboard/clipboard';
import { useSelector, useDispatch } from "react-redux";
import { getUserWallets } from "../../redux/wallet/thunkActions";
import DropDownPicker from "react-native-dropdown-picker";
import SelectWalletModal from "./selectModal";
import { useRoute } from "@react-navigation/native";



const ReceiveBTC = ({ navigation }) => {
    const [copiedText, setCopiedText] = useState('');
    const route = useRoute();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState({});

    const copyToClipboard = () => {
        Clipboard.setString(selected.address);
        if (Platform.OS === 'android') {
            ToastAndroid.showWithGravityAndOffset(
                'Wallet Address copied',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
    };

    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    selected?.address,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <SafeAreaView style={{ backgroundColor: colors.white, height: Dimensions.get('window').height }}>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.icon}>
                            <Ionicons name="close-circle" color={colors.white} size={20} />
                        </TouchableOpacity>
                        <View style={styles.box_bg}>
                            <Text style={styles.receive}>Receive {route.params?.name}</Text>
                        </View>
                        <View style={{ width: 20 }} />
                    </View>
                </View>

                <View style={styles.flex}>
                    <View style={styles.qr}>
                        <QRCode
                            size={189}
                            value={selected?.address}
                        />
                    </View>

                    <TouchableOpacity onPress={onShare}>
                        <HStack w={160} style={{ marginTop: 15 }} j='space-between'>
                            <Text style={[styles.receive, { fontSize: 17, fontWeight: '300' }]}>
                                Share QR Code
                            </Text>
                            <Ionicons name="md-arrow-redo-sharp" color={colors.black} size={20} />
                        </HStack>
                    </TouchableOpacity>

                    <HStack w='100%' style={{ marginTop: 10 }}>
                        <View style={styles.arrow} />
                        <Text style={styles.scan}>Scan QR code to send BTC To this wallet</Text>
                        <View style={styles.arrow} />
                    </HStack>

{/* 

                    <View style={styles.box_parent}>
                        <Text style={styles.wallet}>Select wallet</Text>
                        <View style={styles.b_1}>
                            <TouchableOpacity onPress={() => setOpen(true)} style={styles.input}>
                                <Text style={styles.select}>
                                    {
                                        Boolean(Object.keys(selected).length) ? selected.currency.name : 'Select wallet'
                                    }
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View> */}

                    <View style={styles.box_parent}>
                        <Text style={styles.wallet}>Wallet Address</Text>
                        <HStack style={styles.box}>
                            <Text style={styles.address}>
                                {selected?.address}
                            </Text>
                            <TouchableOpacity onPress={copyToClipboard}>
                                <Ionicons name="copy-outline" color={colors.black} size={20} />
                            </TouchableOpacity>
                        </HStack>
                    </View>


                    <View style={styles.divider} />

                    <View style={{ alignSelf: 'flex-start', paddingLeft: 20 }}>
                        <View>
                            <Text style={styles.text_1}>Minimum Deposit</Text>
                            <Text style={[styles.text_1, { color: colors.primary, fontWeight: '600', paddingTop: 5 }]}>
                                {selected?.currency?.minimum_deposit}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.text_1}>Minimum Transfer</Text>
                            <Text style={[styles.text_1, { color: colors.primary, fontWeight: '600', paddingTop: 5 }]}>
                                {selected?.currency?.minimum_transfer}
                            </Text>
                        </View>
                    </View>
                </View>
                <SelectWalletModal
                    visisble={open}
                    setVisible={setOpen}
                    setSelected={setSelected}
                />
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 20
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
    flex: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    qr: {
        width: 190,
        height: 190,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    arrow: {
        width: 100,
        height: 1,
        backgroundColor: '#DADADA'
    },
    scan: {
        fontSize: 12,
        fontWeight: '400',
        fontFamily: 'Poppins-Regular',
    },
    wallet: {
        fontFamily: "Poppins-SemiBold",
        fontWeight: '500',
        fontSize: 14,
        color: colors.black,
        alignSelf: 'flex-start',
        paddingLeft: 20,
        paddingTop: 30,
        paddingBottom: 10
    },
    box: {
        width: '90%',
        height: 45,
        borderRadius: 10,
        backgroundColor: colors.bg_faded,
        justifyContent: 'space-around'

    },
    box_parent: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    address: {
        fontFamily: 'Poppins-Regular',
        fontWeight: '100',
        fontSize: 13
    },
    divider: {
        width: '90%',
        marginTop: 50,
        marginBottom: 30,
        height: 1,
        backgroundColor: colors.divider
    },
    text_1: {
        fontFamily: 'Poppins-Regular',
        fontWeight: '400',
        fontSize: 14,
        color: colors.black,
        paddingTop: 20
    },
    input: {
        borderWidth: 0,
        backgroundColor: '#F4F4F4',
        height: 59,
        alignItems: 'flex-start',
        width: '90%',
        borderRadius: 10,
        paddingLeft: 20,
        marginTop: 5,
        justifyContent: 'center'
    }, b_1 : {
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center'
    }, select: {
        fontFamily: 'Poppins-Regular',
        fontWeight: '400',
        fontSize: 12,
        color: colors.black,
    }

})


export default ReceiveBTC