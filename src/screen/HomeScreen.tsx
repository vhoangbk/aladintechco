import React from "react";
import { StyleSheet, Text, View,SafeAreaView,ScrollView, Image, useWindowDimensions, TouchableOpacity, ImageComponent  } from "react-native";
import { fontBold, fontRegular } from '../types/typeFont';
import { imageResource } from "../assets/imageResource";
import { colorBlack, colorGreen, colorWhite } from "../assets/color";
import  NutBam  from '../components/NutBam'
import Line from "../components/Line";
import ViSao from "../components/ViSao";
import FloatingBtnChat from "../components/FloatingBtnChat";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "src/types/RootStackParamList";
import '../language/i18n';
import { useTranslation } from 'react-i18next'

type HomeScreenProps = NativeStackScreenProps<RootStackParamList,'HomeScreen'>

const HomeScreen = ( {navigation,route} : HomeScreenProps ) => {

    const heightScreen = useWindowDimensions().height
    const widthScreen = useWindowDimensions().width

    const { t } = useTranslation()

    const handleChat = () => {
        navigation.navigate('ChatScreen')
    }

    return (
        <SafeAreaView style={{flex:1}}>
            <ScrollView contentContainerStyle={{flexGrow:1}}>

                <View style={styles.container}>
                    
                    <View>
                        <Image 
                            source={imageResource.bgtrangchu}
                            style={[
                                styles.image,
                                {
                                    width:'100%',
                                    height:heightScreen*0.35
                                }
                            ]}
                        />

                        <Image 
                            source={imageResource.iconAladin}
                            style={styles.logo}/>

                        <View style={styles.viewNgongu}>
                            <TouchableOpacity>
                                <Image 
                                    source={imageResource.covietnam}
                                    style={styles.logo2}
                                    resizeMode="contain"/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image 
                                    source={imageResource.muitenxuong}
                                    style={styles.logo1}
                                    resizeMode="contain"/>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.text1}>
                            {t('tieude1')}
                        </Text>
                    </View>

                    <View style={[
                        styles.view2,
                        {
                            height:heightScreen*0.18,
                            width:'100%'
                        }
                        ]}>
                        <Text style={styles.text2}>{t('tieude2')}</Text>

                        <View style={styles.button}>
                            <TouchableOpacity>
                            <NutBam 
                                text={ t('lienhe') } 
                                colorBG = {colorGreen} 
                                colorTxt = {colorWhite}/>
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={styles.view3}>
                        <Text style = {styles.text3}>{t('tieude3')}</Text>
                        <Line />
                    </View>

                    <View style={{width:'100%',borderWidth:0}}>
                        <Image 
                            source={imageResource.bgtrangchu2}
                            style={styles.image1}
                            resizeMode="cover"/>
                        <View style={styles.view4}>
                            <Image 
                                source={imageResource.dichvu1}
                                style={styles.imageDichvu}
                                resizeMode="cover"/>
                            <Image 
                                source={imageResource.dichvu2}
                                style={styles.imageDichvu}
                                resizeMode="cover"/>
                            <Image 
                                source={imageResource.dichvu3}
                                style={styles.imageDichvu}
                                resizeMode="cover"/>
                        </View>
                    </View>

                    <View style={styles.view3}>
                        <Text style = {styles.text3}>{t('tieude4')}</Text>
                        <Line />
                    </View>

                    <View style={styles.view5}>
                        <ScrollView 
                            contentContainerStyle={{flexGrow:1}} 
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}>
                            <ViSao image={imageResource.visao1} text={t('visao1')}/>
                            <ViSao image={imageResource.visao2} text={t('visao2')}/>
                            <ViSao image={imageResource.visao3} text={t('visao3')}/>
                            <ViSao image={imageResource.visao4} text={t('visao4')}/>
                        </ScrollView>
                    </View>

                    <View style={styles.view3}>
                        <Text style = {styles.text3}>{t('tieude5')}</Text>
                        <Line />
                    </View>


                </View>

            </ScrollView>

                    <View style={styles.btnChat}>
                        <TouchableOpacity onPress={handleChat}>
                            <FloatingBtnChat/>
                        </TouchableOpacity>
                    </View>
                    
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    text1:{
        fontFamily : fontBold,
        position:'absolute',
        top:150,
        left:19,
        fontSize:30,
        color:colorWhite,
        textShadowColor: colorBlack,             
        textShadowOffset: { width: 4, height: 4 },
        textShadowRadius: 4,  
    },
    container:{
        flex:1,
        borderWidth:0,
        backgroundColor:colorWhite
    },
    image:{
        
    },
    logo:{
        position:'absolute',
        backgroundColor:colorWhite,
        borderRadius:10,
        width:65,
        height:65,
        top:15,
        left:15,
    },
    logo1:{
        height:15,
        width:15,
        marginLeft:5
    },
    logo2:{
        width:40,
        height:40,
    },
    viewNgongu:{
        position:'absolute',
        height:45,
        width:80,
        top:15,
        right:15,
        backgroundColor:colorWhite,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:"row"
    },
    view2:{
        justifyContent:'center',
    },
    text2:{
        fontFamily:fontRegular,
        fontSize:20,
        marginTop:15,
        marginHorizontal:30,
        alignSelf:'center'
    },
    button:{
        alignSelf:'flex-start',
        marginLeft:30,
        marginTop:10
    },
    text3:{
        fontFamily:fontBold,
        fontSize:20
    },
    view3:{
        width:'100%',
        alignItems:'center',
        marginTop:10
    },
    image1:{
        height:170,
        width:"100%"
    },
    view4:{
        position:'absolute',
        height:'100%',
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:20
    },
    imageDichvu:{
        height:150,
        width:70
    },
    view5:{
        borderWidth:0,
        width:"100%",
        flexDirection:'row',
        marginTop:15
    },
    btnChat:{
        position:'absolute',
        bottom:10,
        right:10
    }
})

export default HomeScreen;



