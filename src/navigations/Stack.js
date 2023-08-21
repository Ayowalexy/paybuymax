import React from "react";
import { Text, View } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnBoarding from "../pages/Onboarding";
import Slider from "../pages/Onboarding/Slider";
import Page1 from "../pages/Onboarding/Page1";
import Page2 from "../pages/Onboarding/Page2";
import Page3 from "../pages/Onboarding/Page3";
import Login from "../pages/Onboarding/Login";
import SignUp from "../pages/Onboarding/SignUp";
import OTP from "../pages/Onboarding/otp";
import Documents from "../pages/Onboarding/Documents";
import ScanDocuments from "../pages/Onboarding/ScanDocuments";
import ScanDocument2 from "../pages/Onboarding/ScanDocuments2";
import SelfieVerifcation from "../pages/Onboarding/SelfieVerifcation";
import SelfieVerifcation2 from "../pages/Onboarding/SelfieVerification2";
import Page4 from "../pages/Onboarding/Page 4";
import ResetPassword from "../pages/Onboarding/forgotPassword";
import NewPassword from "../pages/Onboarding/newPassword";
import Page5 from "../pages/Onboarding/Page 5";
import TabNavigation from './Tabs'
import ReceiveBTC from "../pages/ReceiveBTC";
import Transfer from "../pages/Transfer";
import FeedBack from '../pages/Feedback/Feedback.js'
import Coin from "../pages/Wallet/Coin";
import Settings from "../pages/Settings";
import ChangePassword from "../pages/Settings/ChangePassword";
import ChangeWithdrawalPin from "../pages/Settings/ChangeWithdrawalPin";
import Notification from "../pages/Notification";
import TransactionPin from "../pages/SetPin";
import PIN_OTP from "../pages/Wallet/otp";
import PIN_CONFIRM from "../pages/Wallet/confirm";
import AddBankAccount from "../pages/AddBank";
import Exchange from "../pages/Exchange";

const Stack = createStackNavigator();


export default function StackNavigations () {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="OnBoarding"component={OnBoarding} />
            <Stack.Screen name='Slider' component={Slider} />
            
            <Stack.Group>
                <Stack.Screen name="Page1" component={Page1} />
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name="Page2" component={Page2} />
                <Stack.Screen name='Sign Up' component={SignUp} />
                <Stack.Screen name="Page 3" component={Page3} />
                <Stack.Screen name="OTP" component={OTP} />
                <Stack.Screen name="Documents" component={Documents} />
                <Stack.Screen name='Scan 1' component={ScanDocuments} />
                <Stack.Screen name="Scan 2" component={ScanDocument2} />
                <Stack.Screen name="Selfie Verification" component={SelfieVerifcation} />
                <Stack.Screen name="Selfie Verification 2" component={SelfieVerifcation2} />
                <Stack.Screen name="Page 4" component={Page4} />
            </Stack.Group>
            <Stack.Screen name="Reset Password" component={ResetPassword} />
            <Stack.Screen name="New Password" component={NewPassword} />
            <Stack.Screen name="Page 5" component={Page5} />

            <Stack.Screen name="Tabs" component={TabNavigation} />

            <Stack.Group>
                <Stack.Screen name="Receive BTC" component={ReceiveBTC} />
                <Stack.Screen name="Transfer" component={Transfer} />
                <Stack.Screen name='Feedback' component={FeedBack} />
                <Stack.Screen name='Add Bank' component={AddBankAccount} />
            </Stack.Group>

            <Stack.Group>
                <Stack.Screen name="Coin" component={Coin} />
                <Stack.Screen name='Transaction Pin' component={TransactionPin} />
                <Stack.Screen name='PIN OTP' component={PIN_OTP} />
                <Stack.Screen name='PIN CONFIRM' component={PIN_CONFIRM} />
            </Stack.Group>

            <Stack.Group>
                <Stack.Screen name='Settings' component={Settings} />
                <Stack.Screen name='Change Password' component={ChangePassword} />
                <Stack.Screen name="Change Withdrawal Pin" component={ChangeWithdrawalPin} />
                <Stack.Screen name="Notification" component={Notification} />
                <Stack.Screen name='Exchange' component={Exchange} />
            </Stack.Group>
        </Stack.Navigator>
    )
}