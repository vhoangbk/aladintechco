import { Image, StyleSheet, Text, View } from "react-native"
import { colorGreen } from "../assets/color"
import { imageResource } from "../assets/imageResource"

const FloatingBtnChat = () => {
    return(
        <View style={styles.container}>
            <Image 
                source={imageResource.chat}
                style={styles.image}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:60,
        height:60,
        backgroundColor:colorGreen,
        borderRadius:30,
        justifyContent:'center',
        alignItems:'center',
        margin:20,
        elevation:10
    },
    image:{
        width:40,
        height:40
    }
})

export default FloatingBtnChat