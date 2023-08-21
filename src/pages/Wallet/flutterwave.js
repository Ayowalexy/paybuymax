import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";
import { PayWithFlutterwave } from 'flutterwave-react-native';
import { colors } from "../../utils/colors";
import { Button } from "../../components/Custom";
import { useSelector } from "react-redux";
import { formatNumber } from "../../utils/numberFormatter";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { generateReference, depositCallBack, getUserWallets } from "../../redux/wallet/thunkActions";



const Payment = ({ amount, setVisible, pin, currency_id }) => {
    const navigation = useNavigation();
    const { profile: { email, id } } = useSelector(state => state.authReducer);
    const { walletDetails: { wallet }, loading } = useSelector(state => state.walletReducer);
    const [ref, setRef] = useState("");

    const dispatch = useDispatch();


    const getRef = async () => {
        const data = { amount: amount.toString(), pin, currency_id:  currency_id.toString() }
        await dispatch(generateReference(data)).then(res => {
            if (res.meta.requestStatus === 'fulfilled') {
                console.log('refff', res.payload)
                setRef(res.payload)
            }
        })
    }

    return (
        <PayWithFlutterwave
            options={{
                tx_ref: ref,
                authorization: 'FLWPUBK_TEST-f69bc6766e79adf703b20b7c20b6514e-X',
                customer: {
                    email
                },

                amount: Number(amount),
                currency: 'NGN',
                payment_options: 'card',
            }}
            onRedirect={async (data) => {
                if (data.status === 'successful') {
                    console.log(data)
                    setVisible(false)

                    navigation.push('Feedback')
                    await dispatch(depositCallBack({ reference: data.tx_ref })).then(res => {
                        if (res.meta.requestStatus === 'fulfilled') {
                            dispatch(getUserWallets())
                        }
                    })
                }

            }}
            meta={{
                user_id: id,
                email,
                currency_id: currency_id.toString(),
                amount
            }}

            customButton={(props) => (
                <TouchableOpacity
                    style={styles.paymentButton}
                    onPress={async () => {
                        await getRef().then(() => props.onPress())
                    }}
                    isBusy={props.isInitializing}
                    disabled={props.disabled}
                >
                    {
                        loading === 'pending'
                            ? <ActivityIndicator color={colors.white} size={20} />
                            : <Text style={styles.paymentButtonText}>Deposit ₦{formatNumber(amount)}</Text>
                    }
                </TouchableOpacity>
            )}
        />
    )
}

const styles = StyleSheet.create({
    paymentButton: {
        borderRadius: 12,
        backgroundColor: colors.primary,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 222,
        height: 48,
        borderColor: colors.primary,
        opacity: 1,
        width: '100%',
        marginTop: 20
    }, paymentButtonText: {
        fontFamily: "Poppins-Regular",
        color: colors.white,
        fontSize: 13
    }
})

export default Payment