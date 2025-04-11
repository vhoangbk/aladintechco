import { StyleSheet, Text, View } from "react-native"
import { colorBlack, colorGreen, colorWhite } from "../assets/color"
import { fontRegular } from "src/types/typeFont"

const NutBam = ({text, colorBG , colorTxt, widthbtn}:any) => {
    return(
        <View style={[styles.container,{backgroundColor:colorBG,width:widthbtn}]}>
            <Text style={[styles.text, {color: colorTxt}]}>
                {text}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        borderRadius:6,
        
        shadowColor: colorBlack,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,

        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        marginVertical:10,
        marginHorizontal:15,
        fontSize:17,
        fontWeight:500,
        fontFamily:fontRegular,
        alignSelf:'center',
        borderWidth:0
    }
})

export default NutBam