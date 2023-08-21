import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, TouchableOpacity, View, SafeAreaView, StyleSheet, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from '../utils/colors';
import { height } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import { HStack } from '../components/Custom';
import Dashboard from '../pages/Dashboard';
import Wallet from '../pages/Wallet';
import Transactions from '../pages/Transactions';


const Tab = createBottomTabNavigator();

const Home = () => <Text>Helo</Text>
const Hom2 = () => <Text>Helo</Text>



const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName='Dashboard'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, colors, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused
              ? 'ios-home-sharp'
              : 'ios-home-outline';
          } else if (route.name === 'Giftcard') {
            iconName = focused ? 'card' : 'card-outline';
          } else if (route.name === 'Wallet') {
            iconName = focused ? 'wallet' : 'wallet-outline';
          } else if (route.name === 'Transactions') {
            iconName = focused ? 'newspaper' : 'newspaper-outline';
          }

          return (
            <>
              {
                iconName === 'ios-home-sharp'
                  ?
                  <TouchableOpacity style={[styles.container, {marginLeft: 70}]}>
                    <HStack style={styles.card}>
                      <Ionicons name={'ios-home-sharp'} size={16} color={'#fff'} />
                    </HStack>
                    <Text style={styles.text}>{route.name}</Text>
                  </TouchableOpacity>

                  : iconName === 'wallet'
                    ?
                    <TouchableOpacity style={[styles.container]}>
                      <HStack style={styles.card}>
                        <Ionicons name={'wallet'} size={16} color={'#fff'} />
                      </HStack>
                      <Text style={styles.text}>{route.name}</Text>
                    </TouchableOpacity>
                    : iconName === 'card'
                      ?
                      <TouchableOpacity style={styles.container}>
                        <HStack style={styles.card}>
                          <Ionicons name={'card'} size={16} color={'#fff'} />
                        </HStack>
                        <Text style={styles.text}>{route.name}</Text>
                      </TouchableOpacity>
                      : iconName === 'newspaper'
                        ?
                        <TouchableOpacity style={styles.container}>
                          <HStack style={styles.card}>
                            <Ionicons name={'newspaper'} size={16} color={'#fff'} />
                          </HStack>
                          <Text style={styles.text}>{route.name}</Text>
                        </TouchableOpacity>
                        :
                        <View style={{height: 40, marginTop: Platform.OS === 'ios' ? 45 : 20,}}>
                          <Ionicons name={iconName} size={20} color={'#000'} />
                        </View>

              }
            </>

          )


        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'red',

        tabBarStyle: {
          height: 60,
          // borderWidth: 1,

          marginBottom: 30,
          marginLeft: 10,
          marginRight: 10,
          borderRadius: 30,
          backgroundColor: colors.white,
          shadowColor: colors.primary,
          shadowOpacity: 0.5,
          shadowOffset: "30",
          shadowRadius: 7,

        },
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false
      })}

    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      {/* <Tab.Screen name="Giftcard" component={Hom2} /> */}
      <Tab.Screen name="Transactions" component={Transactions} />
      <Tab.Screen name='Wallet' component={Wallet} />


    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FFB397',
    height: 40,
    width: 120,
    borderRadius: 50,
    marginTop: Platform.OS === 'ios' ? 30 : 0,
    // marginLeft: 70

  },
  card: {
    width: 29,
    height: 29,
    borderRadius: 50,
    backgroundColor: '#FFA40B',
    marginRight: 5,
  },
  text: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 11,
    color: colors.black,

  }
})

export default TabNavigation