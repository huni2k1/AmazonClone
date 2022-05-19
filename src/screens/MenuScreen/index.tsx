import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Auth} from 'aws-amplify'
import Button from '../../components/Button'
const MenuScreen = () => {
    const onLogout = () =>{
        Auth.signOut()
    }
    return (
        <SafeAreaView>
            <Button text="Sign out" onPress={onLogout} />
            <Pressable onPress={onLogout}>
            </Pressable>
        </SafeAreaView>
    )
}

export default MenuScreen
