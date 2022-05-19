import {StyleSheet} from 'react-native'
const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        marginVertical:5,
        borderWidth: 1,
        borderColor: '#d1d1d1',
        borderRadius: 10,
        backgroundColor: '#fff'
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
    }
})
export default styles