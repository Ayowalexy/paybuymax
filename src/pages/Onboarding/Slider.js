import React, { useRef, useState } from "react";
import { Text, FlatList, View, StyleSheet, Image, SafeAreaView, Animated, Dimensions } from "react-native";
import { Image2, Image3, Image4 } from "../../utils/assets";
import { Button } from "../../components/Custom";
import { ILogo } from "../../components/Custom";
import { colors } from "../../utils/colors";
import { useNavigation } from "@react-navigation/native";


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const data = [
    {
        header: 'Financial \nSecurity',
        img: Image2,
        id: 1,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget mauris massa pharetra.',
    }, {
        header: 'Fast and Reliable \nMarket Update',
        img: Image3,
        id: 2,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget mauris massa pharetra.',
    }, {
        header: 'Invest in the future',
        img: Image4,
        id: 3,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget mauris massa pharetra.',
    },
]



const Slider = () => {
    const navigation = useNavigation()

    const anim = useRef(new Animated.Value(12)).current;
    const anim2 = useRef(new Animated.Value(12)).current;
    const anim3 = useRef(new Animated.Value(12)).current;

    // const color_1 = useRef(new Animated.Value()).current;
    // const color_2 = useRef(new Animated.Value(696F8C')).current;
    // const color_3 = useRef(new Animated.Value('#696F8C')).current;


    const animate = (num, color) => {

        Animated.parallel([
            Animated.timing(anim, {
                toValue: num,
                duration: 300,
                useNativeDriver: false
            }),
            // Animated.timing(color_1, {
            //     toValue: color,
            //     duration: 300,
            //     useNativeDriver: false
            // }),
        ]).start()
    }

    const animate2 = (num, color) => {
        Animated.parallel([
            Animated.timing(anim2, {
                toValue: num,
                duration: 300,
                useNativeDriver: false
            }),
            // Animated.timing(color_2, {
            //     toValue: color,
            //     duration: 300,
            //     useNativeDriver: false
            // }),
        ]).start()
    }

    const animat3 = (num, color) => {
        Animated.parallel([
            Animated.timing(anim3, {
                toValue: num,
                duration: 300,
                useNativeDriver: false
            }),
            // Animated.timing(color_3, {
            //     toValue: color,
            //     duration: 300,
            //     useNativeDriver: false
            // }),
        ]).start()
    }

    const viewAbleItemsChanged = ({ viewableItems, changed }) => {
        console.log(viewableItems[0].key)
        const key = viewableItems[0].key

        if (key === 1) {
            animate(24)
            animate2(12)
            animat3(12)
        }
         else if (key === 2) {
            animate(12)
            animate2(24)
            animat3(12)
        } else if (key === 3) {
            animate(12)
            animate2(12)
            animat3(24)
        }
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <ILogo />

                <View style={{ height: 520 }}>
                    <FlatList
                        data={data}
                        horizontal={true}
                        onViewableItemsChanged={viewAbleItemsChanged}
                        viewabilityConfig={{
                            itemVisiblePercentThreshold: 50
                        }}
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled={true}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.list}>
                                <Image source={item.img} style={styles.image} resizeMode='contain' />

                                <Text
                                    style={styles.text}
                                >
                                    {item.header}
                                </Text>
                                <Text style={styles.text_1}>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Ut eget mauris massa pharetra.
                                </Text>
                            </View>
                        )}
                    />
                </View>

                <View style={[styles.box_cont,]}>
                    <Animated.View
                        style={[styles.box, {
                            width: anim,
                            backgroundColor: anim !== 24 ? colors.primary : colors.box
                        }]}
                    />
                    <Animated.View
                        style={[styles.box, {
                            width: anim2,
                            backgroundColor: anim2 === 24 ? colors.primary : colors.box
                        }]}
                    />
                    <Animated.View
                        style={[styles.box, {
                            width: anim3,
                            backgroundColor: anim3 === 24 ? colors.primary : colors.box
                        }]}
                    />
                </View>

                <Button onPress={() => navigation.push('Page1')}>
                    Next
                </Button>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height,
        width,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 10
    },
    image: {
        width: '80%',
        height: 400,
    },
    text: {
        fontFamily: "Poppins-SemiBold",
        fontWeight: '600',
        lineHeight: 35,
        marginBottom: 10,
        color: colors.black,
        fontSize: 32,
        textAlign: 'center'
    },
    text_1: {
        fontFamily: "Poppins-Regular",
        fontWeight: '400',
        lineHeight: 16,
        marginBottom: 15,
        color: colors.black,
        width: '80%',
        fontSize: 12,
        textAlign: 'center'
    },
    box: {
        backgroundColor: colors.box,
        width: 12,
        height: 4,
        borderRadius: 2,

    },
    box_cont: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 40,
        width: 50,
        // marginTop: -100
    },
    list: {
        width,
        height: 500,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Slider