import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    root: {
        padding:10,
        backgroundColor:'white'
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },
    oldPrice: {
        fontSize: 12,
        fontWeight: 'normal',
        textDecorationLine: 'line-through',
    },
    description:{
        marginVertical: 10,
        lineHeight: 20,
        fontWeight: "400",
        color:"black",
    },
    title:{
    
    }
});

export default styles