import { FlatList, Image, StyleSheet, Text, View } from "react-native"
import { colorGreen } from "src/assets/color"
import { imageResource } from "src/assets/imageResource";
import { fontBold, fontRegular } from "src/types/typeFont"



const CongNgheSuDung = ({tieude,anh1,anh2,anh3,anh4}:any) => {

    const DATA = [
        {
            image: anh1,
        },
        {
            image: anh2,
        },
        {
            image: anh3,
        },
        {
            image: anh4,
        },
      ];
    
    const Item = ({image}:any) => (
        <View style={styles.item}>
            <Image 
                source={image}
                style={styles.imagestyles}/>
        </View>
      );

    return(
        <View style = {styles.container}>
            <View style={{flexDirection:"row",alignItems:'center'}}>
                <View style={styles.line}></View>
                <Text style= {styles.text} >{tieude}</Text>
            </View>

            <FlatList
                data={DATA}
                renderItem={
                    ({item}) => <Item image={item.image} />
                }
                horizontal={true}
                style={styles.flatlist}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width:"auto",
        marginTop:20,
        borderWidth:0,
        marginHorizontal:10
    },
    text:{
        fontFamily: fontRegular,
        marginLeft:10
    
    },
    line:{
        height:40,
        width:3,
        backgroundColor:colorGreen
    },
    imagestyles:{
        height:100,
        width:188
    },
    flatlist:{
        marginTop:10
    },
    item:{
        marginRight:10
    }
})

export default CongNgheSuDung