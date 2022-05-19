import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome'
import styles from './styles'
import {useNavigation} from '@react-navigation/native'
interface ProductItemProps {
    item: {
        id: string,
        title: string,
        image: string,
        avgRating: number,
        ratings: number,
        price: number,
        oldPrice?: number,
    }
}
const ProductItem = (props: ProductItemProps) => {
    const navigation = useNavigation()
    const { item } = props;
    const onPress = () => {
        navigation.navigate('ProductDetails', {id: item.id})
    }
    return (
        <Pressable style={styles.root} onPress={onPress}>
            <Image style={styles.image} source={{ uri: item.image }} />
            <View style={styles.rightContainer}>
                <Text style={styles.title} numberOfLines={3}>{item.title}</Text>
                <View style={styles.ratingsContainer}>
                    {
                       [0,0,0,0,0].map((el,i) => ( 
                       <FontAwesome key={`${item.id}-${i}`} style={styles.star} name={i < Math.floor(item.avgRating)? 'star': 'star-o' } size={18} color={"#e47911"} />
                       ))
                    }
                    <Text>{item.ratings}</Text>
                </View>
                <Text style={styles.price}>
                    from ${item.price.toFixed(2)}
                    {item.oldPrice && <Text style={styles.oldPrice}>${item.oldPrice.toFixed(2)}</Text>}
                </Text>
            </View>
        </Pressable>
    )
}

export default ProductItem