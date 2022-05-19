import React from 'react'
import HomeScreen from '../screens/HomeScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ShoppingCartStack from './ShoppingCartStack'
import Entypo from 'react-native-vector-icons/Entypo'
import HomeStack from './HomeStack'
import MenuScreen from '../screens/MenuScreen'
const Tab = createBottomTabNavigator()
const BottomTabNav = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false,tabBarShowLabel: false, tabBarInactiveTintColor: "#ffbd7d", tabBarActiveTintColor: "#e47911" }}>
            <Tab.Screen component={HomeStack} name="Home"
                options={{
                    tabBarIcon: ({ color }) => (<Entypo name="home" color={color} size={19} />)
                }}
            />

            <Tab.Screen component={HomeScreen} name="profile"
                options={{
                    tabBarIcon: ({ color }) => (<Entypo name="user" color={color} size={19} />)
                }} />
            <Tab.Screen component={ShoppingCartStack} name="shoppingCart"
                options={{
                    tabBarIcon: ({ color }) => (<Entypo name="shopping-cart" color={color} size={19} />)
                }} />
            <Tab.Screen component={MenuScreen} name="more"
                options={{
                    tabBarIcon: ({ color }) => (<Entypo name="menu" color={color} size={19} />)
                }} />
        </Tab.Navigator>
    )
}

export default BottomTabNav