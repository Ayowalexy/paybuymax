import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Share, Image, TouchableOpacity, Dimensions } from "react-native";
import { CloseBtn } from "../Transactions";
import { Header } from "../Transactions";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from "../../utils/colors";
import { Avatar } from "../../utils/assets";
import { Switch } from 'react-native-switch';
import UserSetting from "./UserSetting";
import { useSelector } from "react-redux";

const height = Dimensions.get('window').height


const Settings = ({ navigation }) => {
    const [value, setValue] = useState(false);
    const [editProfile, setEditProfile] = useState(false);
    const [type, setType] = useState('')
    const { profile: { name, slug, bvn_verified, } } = useSelector(state => state.authReducer)


    const onShare = async () => {
        try {
            const result = await Share.share({
                message: `Sign up to PayBuyMax using my referral code ${slug}`,
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
        <SafeAreaView style={{ backgroundColor: colors.white, height }}>
            <View style={styles.header}>
                <CloseBtn action={() => navigation.goBack()} />
                <Header name='Settings' />
                <TouchableOpacity
                    style={{
                        width: 44,
                        height: 44,
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                        backgroundColor: colors.wallet,
                        borderRadius: 10
                    }}
                >
                    <Ionicons name="notifications-outline" size={20} color={colors.black} />
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View style={styles.container}>

                    <View style={styles.header_box}>
                        <View style={styles.user_box}>
                            <Image source={Avatar} resizeMode='contain' />
                            <View style={{ paddingLeft: 10 }}>
                                <Text style={[styles.text, { fontWeight: '700', fontSize: 15 }]}>{name}</Text>
                                <Text style={[styles.text, { fontSize: 12 }]}>{slug}</Text>
                            </View>
                        </View>
                        {
                            bvn_verified ?
                                (
                                    <View style={styles.verified}>
                                        <Ionicons name="checkmark-circle-outline" color={colors.success} size={25} />
                                        <Text style={[styles.text, { fontSize: 13 }]}>Verified</Text>
                                    </View>
                                )
                                : (
                                    <View style={[styles.verified, { backgroundColor: 'rgba(255, 0, 0, 0.2)'}]}>
                                        <Ionicons name="ios-close-circle-outline" color={colors.error} size={25} />
                                        <Text style={[styles.text, { fontSize: 13 }]}>Verified</Text>
                                    </View>
                                )
                        }

                    </View>

                    <View style={styles.divider} />

                    <View>
                        {
                            [
                                {
                                    name: 'Edit Profile',
                                    icon: 'ios-person-add-outline'
                                }, {
                                    name: 'Add Bank',
                                    icon: 'add'
                                }, {
                                    name: 'Security Setting',
                                    icon: 'lock-closed'
                                }, {
                                    name: 'Privacy Policy',
                                    icon: 'flag-outline'
                                }, {
                                    name: 'Theme',
                                    icon: 'color-filter-outline'
                                }, {
                                    name: 'Share app using referal code',
                                    icon: 'ios-share-social'
                                }, {
                                    name: 'Logout',
                                    icon: 'power'
                                }, {
                                    name: 'Delete Account',
                                    icon: 'trash-bin'
                                },

                            ].map((element, idx) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        if (
                                            element.name === 'Edit Profile'
                                            || element.name === 'Add Bank'
                                            || element.name === 'Security Setting'
                                        ) {
                                            setType(element.name)
                                            setEditProfile(true)
                                        } else if (element.name === 'Logout') {
                                            navigation.push("Login")
                                        } else if( element.name === 'Share app using referal code'){
                                            onShare()
                                        }

                                    }}
                                    style={[styles.box, {
                                        backgroundColor: element.name === 'Logout'
                                            ? '#BBC2E7'
                                            : element.name === 'Delete Account'
                                                ? '#FCBCA5'
                                                : colors.wallet
                                    }]}
                                    key={idx}>
                                    <View style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        flexDirection: 'row'
                                    }}>
                                        <View style={styles.icon}>
                                            <Ionicons name={element.icon} color={colors.white} size={15} />
                                        </View>
                                        <Text style={[styles.text, { marginLeft: 15, fontSize: 12 }]}>{element.name}</Text>
                                    </View>

                                    {
                                        element.name === 'Theme'
                                            ? (
                                                <View style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    flexDirection: 'row'
                                                }}>
                                                    <Text style={[styles.text, { fontSize: 11, marginRight: 5 }]}>Dark Mode</Text>
                                                    <Switch
                                                        value={value}
                                                        renderActiveText={false}
                                                        renderInActiveText={false}
                                                        barHeight={15}
                                                        circleSize={14}
                                                        onValueChange={(val) => setValue(val)}
                                                    />

                                                </View>
                                            )
                                            : (
                                                <Ionicons name="ios-arrow-forward-outline" color={colors.error} size={14} />
                                            )
                                    }
                                </TouchableOpacity>
                            ))
                        }
                    </View>


                </View>
            </ScrollView>
            <UserSetting
                visible={editProfile}
                setVisible={setEditProfile}
                type={type}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20
    },
    container: {
        padding: 20
    },
    header_box: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'row'
    },
    user_box: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'Poppins-Regular',
        fontWeight: '400',
        fontSize: 14,
        color: colors.black
    },
    verified: {
        width: 94,
        height: 36,
        backgroundColor: '#CDFFC5',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: 20
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: colors.divider,
        marginTop: 20,
        marginBottom: 20
    },
    icon: {
        width: 25,
        height: 25,
        backgroundColor: colors.error,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
    box: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: colors.wallet,
        marginBottom: 15,
        borderRadius: 10,
        height: 42
    }
})

export default Settings