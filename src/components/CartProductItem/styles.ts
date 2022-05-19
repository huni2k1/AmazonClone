import {StyleSheet} from 'react-native'
const styles = StyleSheet.create({
    root: {
        marginVertical:5,
        borderWidth: 1,
        borderColor: '#d1d1d1',
        borderRadius: 10,
        backgroundColor: '#fff',
        padding: 5,
    },
    row: {
        flexDirection: 'row',
    },
    image: {
        width: 150,
        height: 150,
        flex: 2,
        resizeMode: "contain",
    },
    rightContainer: {
        padding: 10,
        flex: 3
    },
    title: {
        fontSize: 18,
        color: 'black'
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },
    oldPrice:{
        fontSize:12,
        fontWeight:'normal',
        textDecorationLine: 'line-through',
    },
    ratingsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    star: {
        margin: 2,
    },
    quantityContainer: {
        margin:5,
    }
})
export default styles