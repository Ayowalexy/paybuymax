import React, { useRef, useEffect } from "react";
import { Modal, TouchableOpacity, Image, View, Animated, ActivityIndicator, StyleSheet, Text } from "react-native";
import { colors } from "../../utils/colors";


const Spinner = ({ visible, loading = 'Loading Data, Please wait....' }) => {

    const anim = useRef(new Animated.Value(1)).current;


    const _start = () => {
        Animated.loop(Animated.sequence([
            Animated.timing(anim, {
                toValue: 1.2,
                duration: 1000,
                useNativeDriver: true
            }),
            Animated.timing(anim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true
            })

        ]),

            { iterations: 1000 }
        ).start()
    }

    useEffect(() => {
        _start()
    }, [])


    return <Modal
        visible={visible}
        // onRequestClose={() => setVisible(true)}
        animationType='fade'
        transparent={true}
    >
        <View
            style={style.container}
        >
            <Animated.View
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transform: [
                        {
                            scale: anim
                        }
                    ]
                }}
            >


                <View
                    style={{
                        position: 'absolute'
                    }}
                >
                    {/* <ActivityIndicator size={120} color={colors.white} /> */}
                </View>
                
                <Text
                    style={style.text}

                >{loading} </Text>
            </Animated.View>


        </View>
    </Modal>
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: 60,
        marginTop: 40,
        height: 60,
        borderRadius: 70
    },
    text: {
        color: colors.white,
        fontSize: 14,
        marginTop: 22,
        fontFamily: 'Poppins-Bold',
        textAlign: 'center'
    }
})

export default Spinner