import { View, Text, StyleSheet, Image, FlatList } from 'react-native'
import React, {useState, useEffect} from 'react'
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome'
import ProductItem from '../../components/ProductItem'
import products from '../../data/products'
import {DataStore} from 'aws-amplify'
import {Product} from '../../models'
const HomeScreen = ({searchValue}: {searchValue:string}) => {
    const [products,setProducts] = useState<Product[]>([])
    useEffect(() => {
         DataStore.query(Product).then(setProducts);
    },[])
    return (
        <View style={styles.page}>
            <FlatList
                data={products}
                renderItem={({ item }) => <ProductItem item={item} />}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    page: {
        padding: 10,
    }
})


export default HomeScreen