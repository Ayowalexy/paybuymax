import React from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, ScrollView, Text, SafeAreaView, Dimensions, StyleSheet, View } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { colors } from "../../utils/colors";
import { HStack } from "../../components/Custom";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const Layout = ({ header, children, head: Header }) => {

    const navigation = useNavigation();
    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                <HStack w='100%' j='space-between'>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name='keyboard-arrow-left' size={30} color={colors.black} />
                    </TouchableOpacity>
                    {
                        header === 'Login'
                            ? (
                                <Text style={styles.header}>
                                    {header}
                                </Text>
                            )
                            : (
                                <Header />
                            )
                    }
                    <View style={{ width: 30 }} />
                </HStack>

                {children}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width,
        padding: 20,
        height,
    },
    header: {
        fontFamily: "Poppins-SemiBold",
        fontWeight: '600',
        color: colors.black,
        fontSize: 18
    }

})

export default Layout