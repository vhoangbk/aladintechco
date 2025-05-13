import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { colorGreen, colorWhite } from "src/assets/color";

export const HeaderBar = ({text,onPress}:{text:string;onPress:()=>void}) => {
    return(
        <View style={{
                height:50,
                alignItems:'center',
                flexDirection:'row',
                backgroundColor:colorGreen,
                elevation:10}}>
            <TouchableOpacity onPress={onPress}>
                <Image 
                    source={require('../assets/image/icons8back48.png')}
                    style={{width:30,height:30,justifyContent:'flex-start',margin:10}}/>
            </TouchableOpacity>
            <View style={{alignItems:'center',flex:1,marginRight:40}}>
                <Text style={{fontSize:17,color:colorWhite}}>{text}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    
})