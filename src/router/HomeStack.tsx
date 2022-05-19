import React, { useState } from 'react'
import HomeScreen from '../screens/HomeScreen'
import { createStackNavigator, Header } from '@react-navigation/stack'
import ProductScreen from '../screens/ProductScreen'
import { Text, View,TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Feather from 'react-native-vector-icons/Feather'
const Stack = createStackNavigator()
interface HeaderComponentProps {
  searchValue:string,
  setSearchValue: () => void;
}
const HeaderComponent = ({searchValue,setSearchValue}: HeaderComponentProps) => {
  return (
    <View style={{backgroundColor: '#22e3dd'}} >
      <View style={{margin:10, padding: 5, backgroundColor:'white', flexDirection:'row', alignItems:'center'}}>
      <Feather name="search" size={20}/>
      <TextInput style={{height: 40, marginLeft:10}} placeholder="Search..." onChangeText={setSearchValue}/>
      </View>
    </View>
  )
}
const HomeStack = () => {
  const [searchValue,setSearchValue] = useState('');
  return (
      <Stack.Navigator screenOptions={{ header: () => <HeaderComponent searchValue={searchValue} setSearchValue={setSearchValue} /> }}>
        <Stack.Screen name="HomeScreen" options={{ title: 'Home' }} >
          {() => <HomeScreen searchValue={searchValue}/>}
          </Stack.Screen>
        <Stack.Screen component={ProductScreen} name="ProductDetails" />
      </Stack.Navigator>
  )
}

export default HomeStack