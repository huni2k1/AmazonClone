import { View, Text, StyleSheet, Image, FlatList, Button, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import CartProductItem from '../../components/CartProductItem'
import { useNavigation } from '@react-navigation/native'
import { Auth, DataStore } from 'aws-amplify';
import { Product, CartProduct } from '../../models';
import products from '../../data/products';
const ShoppingCartScreen = () => {
    const navigation = useNavigation()
    const [cartProducts, setCartProducts] = useState<CartProduct[]>([])
    const totalPrice = cartProducts.reduce(
        (summedPrice, product) => summedPrice + (product?.product?.price || 0) * product.quantity, 0,
    )
    const onCheckout = () => {
        navigation.navigate("Address")
    }
    const fetchCartProducts = async () => {
        const userData = await Auth.currentAuthenticatedUser()
        DataStore.query(CartProduct, (cp => cp.userSub('eq',userData.attributes.sub))).then(setCartProducts);
    };
    useEffect(() => {
        fetchCartProducts();
    }, []);
    useEffect(() => {
        if(cartProducts.filter(cp=> !cp.product).length===0){
            return ;
        }
        const fetchProducts = async () => {
            const product = await Promise.all(
                cartProducts.map(cartProduct => DataStore.query(Product, cartProduct.productID))
                )
            setCartProducts(currentCartProducts => (cartProducts.map(cartProduct=> ({
                ...cartProduct,
                product: products.find(p=>p.id === cartProduct.productID)}))))
            }
        fetchProducts()
    }, [cartProducts])
    useEffect(() => {
        const subcription = DataStore.observe(CartProduct).subscribe(msg => fetchCartProducts())
        return subcription.unsubscribe;
    },[])
    useEffect(() => {
        const subcriptions = cartProducts.map(cp=>
            DataStore.observe(CartProduct,cp.id).subscribe(msg => {
                if(msg.opType === 'UPDATE'){
                    setCartProducts(currCartProducts => currCartProducts.map(cp => {
                        if(cp.id !== msg.element.id){
                            return cp;
                        }
                        return {
                            ...cp,
                            ...msg.element
                        }
                    }))
                }
            }))
    })
    if(cartProducts.filter(cp=> !cp.product).length!==0){
        return <ActivityIndicator/>
    }
    return (
        <View style={styles.page}>
            <FlatList
                data={cartProducts}
                renderItem={({ item }) => <CartProductItem cartItem={item} />}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => (
                    <View >
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>Subtotal ({cartProducts.length} items):
                            <Text style={{ color: '#e47911' }}>${totalPrice.toFixed(2)}</Text>
                        </Text>
                        <Button
                            title='Proceed to checkout'
                            onPress={onCheckout}
                            color="#f7e300"
                        />
                    </View>
                )}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    page: {
        padding: 10,
    }
})


export default ShoppingCartScreen