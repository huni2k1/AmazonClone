import { View, Text, TextInput, Alert, ScrollView, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import styles from './styles'
import countryList from 'country-list';
import { Auth, DataStore } from 'aws-amplify';
import {Order,OrderProduct,CartProduct} from '../../models'
import Button from '../../components/Button'
import { useNavigation } from '@react-navigation/native';
const countries = countryList.getData();
const AddressScreen = () => {
    const [country, setCountry] = useState(String(countries[0].code));
    const [fullname, setFullname] = useState('');
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [city,setCity] = useState('')
    const [addressError, setAddressError] = useState('Invalid Address')
    const navigation = useNavigation()
    const saveOrder = async () => {
        const userData = await Auth.currentAuthenticatedUser()
        const newOrder = await DataStore.save(
            new Order({
                userSub:userData.attributes.sub,
                fullName: fullname,
                phoneNumber: phone,
                country,
                city,
                address,
            })
        )
        const cartItems = await DataStore.query(CartProduct, cp => cp.userSub('eq', userData.attributes.sub))

        await Promise.all(
            cartItems.map(cartItem => DataStore.save(new OrderProduct({
                quantity: cartItem.quantity,
                option: cartItem.option,
                productID: cartItem.productID,
                orderID: newOrder.id,
            })))
        )

        await Promise.all(
            cartItems.map(cartItem => DataStore.delete(cartItem))
        )
        navigation.navigate('Home')
    }
    const onCheckout = () => {
        if (!fullname) {
            Alert.alert("Please fill in the fullname field")
            return;
        }
        else if (!phone) {
            Alert.alert("Please fill in the phone number field")
            return;
        }
        saveOrder()
    }
    const validateAddress = () => {
        if (address.length < 3){
            setAddressError('Address is too short');
        }
    }
    return (
        <KeyboardAvoidingView>
        <ScrollView style={styles.root}>
            <View style={styles.row}>
                <Picker selectedValue={country} onValueChange={setCountry}>
                    {countries.map(country => (<Picker.Item value={country.code} label={country.name} />))}
                </Picker>
            </View>
            {/* Full name */}
            <View style={styles.row}>
                <Text style={styles.label}> Full name (First and Last name)</Text>
                <TextInput style={styles.input} placeholder="Full name" value={fullname} onChangeText={setFullname} />
            </View>
            {/* Phone number */}
            <View style={styles.row}>
                <Text style={styles.label}> Phone number</Text>
                <TextInput keyboardType='numeric' style={styles.input} placeholder="Phone number" value={phone} onChangeText={setPhone} />
            </View>
            {/* Address*/}
            <View style={styles.row}>
                <Text style={styles.label}> Address</Text>
                <TextInput style={styles.input} placeholder="Address" value={address}
                    onChangeText={(text) => {
                        setAddress(text)
                        setAddressError('')
                        if(text.length==0)
                            setAddressError('Invalid Address')
                    }}
                    onEndEditing={validateAddress} />
                {!!addressError && <Text style={styles.errorLabel}>{addressError}</Text>}
            </View>
            {/* City*/}
            <View style={styles.row}>
                <Text style={styles.label}> City</Text>
                <TextInput style={styles.input} placeholder="City" value={city} onChangeText={setCity} />
            </View>

            <Button text='Checkout' onPress={onCheckout}></Button>
        </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default AddressScreen
