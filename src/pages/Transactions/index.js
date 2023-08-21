import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, SafeAreaView, ScrollView, Image, TouchableOpacity, TextInput, ActivityIndicator, FlatList } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from "../../utils/colors";
import { BTC } from "../../utils/assets";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Filter from "./Filter";
import { getTransactions } from "../../redux/wallet/thunkActions";
import { useDispatch, useSelector } from "react-redux";


export const CloseBtn = ({ action }) => (
    <TouchableOpacity
        onPress={action}
        style={{
            width: 25,
            height: 25, borderRadius: 20, backgroundColor: colors.error,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}
    >
        <Ionicons name="close-circle-sharp" color={colors.white} size={20} />
    </TouchableOpacity>
)


export const Header = ({ name }) => (
    <View style={styles.header_box}>
        <Text style={styles.text}>{name}</Text>
    </View>
)


const Transactions = ({ navigation }) => {

    const [value, setValue] = useState("");
    const [showFilter, setShowFilter] = useState(false);
    const dispatch = useDispatch();
    const { transactions, isLoading } = useSelector(state => state.walletReducer)


    useEffect(() => {
        dispatch(getTransactions())
    }, [])
    useEffect(() => {
        if (showFilter) {
            navigation.setOptions({ tabBarStyle: { ...styles.tab, opacity: 0 } });
        } else {
            navigation.setOptions({ tabBarStyle: { ...styles.tab, opacity: 1 } });
        }
    }, [showFilter])


    const Card = ({ element }) => (
        <View style={styles.flex}>
            <Text style={styles.text}>{element.currency}</Text>
            <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', display: 'flex', width: 130 }}>
                <Text style={styles.text}>{element.type}</Text>
                <Text style={[styles.text, { fontSize: 10 }]}>{new Date(element.created_at).toLocaleTimeString()}</Text>
            </View>
            <View>
                <Text style={styles.text}>{element.amount}</Text>
                <Text style={[styles.text,
                {
                    fontSize: 10,
                    color: element.status === 'success' ? colors.success : '#FFCC29'
                }]}>{element.status}</Text>
            </View>
        </View>
    )
    return (
        <SafeAreaView style={{ backgroundColor: colors.white }}>
            <Filter
                isPanelActive={showFilter}
                setIsPanelActive={setShowFilter}
            />
            <View style={styles.header}>
                <CloseBtn action={() => navigation.goBack()} />
                <Header name='Transactions' />
                <TouchableOpacity onPress={() => setShowFilter(true)}>
                    <MaterialIcons name="filter-list" color={colors.black} size={20} />
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View style={styles.conatiner}>
                    <View style={{ position: 'absolute', left: 30 }}>
                        <Ionicons name="search" color={'#AEB6CF'} size={20} />
                    </View>
                    <TextInput
                        value={value}
                        onChangeText={setValue}
                        style={styles.input}
                        placeholder='Search'
                    />

                    {
                        isLoading === 'pending'
                            ? <ActivityIndicator size='small' color={colors.primary} />
                            : (
                                <View style={{ width: '100%', marginTop: 20 }}>
                                    {/* <Text style={styles.text}>Today</Text> */}
                                    <View style={styles.box}>
                                        <FlatList
                                            data={transactions}
                                            renderItem={({ item }) => <Card
                                                element={item}
                                            />}
                                            keyExtractor={({ item }) => item}
                                        />
                                    </View>

                                    {/* <Text style={[styles.text, { marginTop: 20 }]}>01 jul, 2021</Text> */}
                                    <View style={styles.box}>
                                       
                                    </View>

                                </View>
                            )
                    }

                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    conatiner: {
        padding: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    header_box: {
        width: 201,
        height: 38,
        borderRadius: 30,
        backgroundColor: colors.wallet,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: colors.black,
        elevation: 10,
        shadowOffset: {
            width: 2,
            height: 3
        },
        shadowOpacity: .2,
        shadowRadius: 4
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20
    },
    text: {
        fontFamily: 'Poppins-Regular',
        fontWeight: '400',
        fontSize: 13,
        color: colors.black
    },
    input: {
        borderColor: '#AEB6CF',
        borderWidth: 1,
        borderRadius: 5,
        width: '100%',
        height: 40,
        paddingLeft: 40
    }, box: {
        backgroundColor: colors.wallet,
        width: '100%',
        borderRadius: 10
    }, flex: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 20
    },
    tab: {
        height: 60,
        // borderWidth: 1,

        marginBottom: 30,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 30,
        backgroundColor: colors.white,
        shadowColor: colors.primary,
        shadowOpacity: 0.5,
        shadowOffset: "30",
        shadowRadius: 7,
    }
})

export default Transactions