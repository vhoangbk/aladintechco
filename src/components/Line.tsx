import { StyleSheet, View } from "react-native"

const Line = () => {
    return(
        <View style={{flexDirection:'row',height:3,width:100}}>
            <View style = {[styles.view1,{backgroundColor:'#26207a'}]}></View>
            <View style = {[styles.view1,{backgroundColor:'#4e46c7'}]}></View>
            <View style = {[styles.view1,{backgroundColor:'#32a852'}]}></View>
        </View>
    )
}
const styles = StyleSheet.create({
    view1:{
        flex:1
    }
})

export default Line