import { Text, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import styles from './styles'
import { Picker } from '@react-native-picker/picker';
import { Auth, DataStore } from 'aws-amplify';
import { Product, CartProduct } from '../../models';
import QuantitySelector from '../../components/QuantitySelector';
import Button from '../../components/Button';
import ImageCarousel from '../../components/ImageCarousel';
import { useNavigation, useRoute } from '@react-navigation/native';
const ProductScreen = () => {
    const [product, setProduct] = useState<Product | undefined>(undefined);
    const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined);
    const [quantity, setQuantity] = useState(1);
    const route = useRoute();
    const navigation = useNavigation()
    useEffect(() => {
        if (!route.params?.id) {
            return;
        }
        DataStore.query(Product, route.params.id).then(setProduct)
    }, [route.params?.id])
    useEffect(() => {
        if (product?.options) {
            setSelectedOption(product.options[0]);
        }
    }, [product])
    if (!product) {
        return <ActivityIndicator />
    }
    const onAddToCart = async () => {
        const userData= await Auth.currentAuthenticatedUser()
        if(!product || !userData){
            return ;
        }
        const newCartProduct = new CartProduct({
            userSub: userData.attributes.sub,
            quantity,
            option: selectedOption,
            productID: product.id
        });
        await DataStore.save(newCartProduct)
        navigation.navigate('shoppingCart')
    }
    return (
        <ScrollView contentContainerStyle={styles.root}>
            <Text style={styles.title}>{product.title}</Text>

            {/* Image Carousel */}
            <ImageCarousel images={product.images} />

            {/* Option selector */}
            <Picker selectedValue={selectedOption} onValueChange={(itemValue) => setSelectedOption(itemValue)}>
                {
                    product.options.map(option => (
                        <Picker.Item label={option} value={option} />
                    ))
                }
            </Picker>
            {/* Price */}
            <Text style={styles.price}>
                from ${product.price.toFixed(2)}
                {product.oldPrice && <Text style={styles.oldPrice}> ${product.oldPrice.toFixed(2)}</Text>}
            </Text>
            {/* Description */}
            <Text style={styles.description}>
                {product.description}
            </Text>
            {/* Quantity Selector */}
            <QuantitySelector quantity={quantity} setQuantity={setQuantity} />

            {/* Button */}
            <Button text={'Add to cart'} onPress={onAddToCart} containerStyles={{ backgroundColor: '#e3c905' }}
            />
            <Button text={'Buy now'} onPress={() => { console.warn('Buy now') }} />

        </ScrollView>
    )
}

export default ProductScreen