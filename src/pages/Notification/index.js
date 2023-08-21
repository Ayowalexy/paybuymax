import React from "react";
import { SafeAreaView, ScrollView, Text, View, StyleSheet, Dimensions, Image } from "react-native";
import { colors } from "../../utils/colors";
import { CloseBtn } from "../Transactions";
import { Header } from "../Transactions";
import { BG, IMG1, IMG2, IMG3, IMG4, IMG5 } from "../../utils/assets";

const Notification = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <CloseBtn action={() => navigation.goBack()} />
                <Header name='Notification' />
                <View style={{ width: 20 }} />
            </View>

            <View style={styles.divider} />
            <Image source={BG} resizeMode='contain'
                style={{
                    position: 'absolute',
                    zIndex: -10
                }}
            />
            <ScrollView>
                <View style={{ padding: 20 }}>
                    {
                        [
                            {
                                image: IMG1,
                                title: 'Suspicious Activity',
                                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elitdolor sit amet, consectetur adipiscing elit.  ',
                                time: '1m ago.'
                            }, {
                                image: IMG2,
                                title: 'Sale is live',
                                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elitdolor sit amet, consectetur adipiscing elit.  ',
                                time: '1m ago.'
                            }, {
                                image: IMG3,
                                title: 'Price Alert',
                                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elitdolor sit amet, consectetur adipiscing elit.  ',
                                time: '1m ago.'
                            }, {
                                image: IMG4,
                                title: 'Upcoming news',
                                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elitdolor sit amet, consectetur adipiscing elit.  ',
                                time: '10 Hrs ago.'
                            }, {
                                image: IMG5,
                                title: 'Price Alert',
                                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elitdolor sit amet, consectetur adipiscing elit.  ',
                                time: '15 Hrs ago.'
                            },
                        ].map((element, idx) => (
                            <View key={idx}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    width: '100%',
                                    marginTop: 20
                                }}
                            >
                                <View style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}>
                                    <Image source={element.image} resizeMode='contain' />
                                    <View style={{ paddingLeft: 10 }}>
                                        <Text style={[styles.text, { fontWeight: '700', fontSize: 14}]}>{element.title}</Text>
                                        <Text style={[styles.text, { width: 200, fontSize: 11, paddingTop: 10}]}>{element.text}</Text>
                                    </View>
                                </View>
                                <Text style={styles.text}>{element.time}</Text>
                            </View>
                        ))

                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    header: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20
    },
    container: {
        height: Dimensions.get('window').height,
        width: '100%',
        backgroundColor: colors.white
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: colors.divider,
        paddingLeft: 20

    },
    text: {
        fontFamily: "Poppins-Regular",
        fontWeight: '400',
        fontSize: 13,
        color: colors.black
    }
})

export default Notification