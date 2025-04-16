import React, { useState } from "react";
import { StyleSheet, Text, View,SafeAreaView,ScrollView, Image, useWindowDimensions, TouchableOpacity, ImageComponent, FlatList  } from "react-native";
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
import CongNgheSuDung from "src/components/CongNgheSuDung";
import ChangeLanguageBox from "src/components/ChangeLanguageBox";
import LinearGradient from "react-native-linear-gradient";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList,'HomeScreen'>

const HomeScreen = ( {navigation} : HomeScreenProps ) => {

    const heightScreen = useWindowDimensions().height;
    const widthScreen = useWindowDimensions().width;

    const { t } = useTranslation();
    const { i18n } = useTranslation();

    const handleChat = () => {
        navigation.navigate('ChatScreen')
    }

    const [showChangeLanguageBox, setShowChangeLanguageBox] = useState(false)

    const openSelectLanguage = () => {
        setShowChangeLanguageBox(true)
    }

    const DATA1 = [
        {
            name: "Platform",
            iconService : require('../assets/image/service1.png')
        },
        {
            name: "System Integration Service",
            iconService : require('../assets/image/service2.png')
        },
        {
            name: "Outsource",
            iconService : require('../assets/image/service3.png')
        },
        {
            name: "Automotive",
            iconService : require('../assets/image/service4.png')
        },
    ];

    const serviceItem = (item:any) => {
        return(
            <TouchableOpacity>
                <View style={styles.view3}>
                    <Image source={item.iconService} style={styles.image}/>
                    <Text style={styles.txt5}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }


    return (
        <SafeAreaView style={{flex:1}}>
            <ScrollView contentContainerStyle={{flexGrow:1}}>

                <View style = {styles.container}>
                    {/* Frame 1 */}
                    <LinearGradient
                            colors={['#31B44A', '#238035']}
                            style={[styles.frame1,{width:widthScreen}]}
                        >
                        
                        <View style={{
                            borderWidth:0,
                            flexDirection:"row",
                            alignItems:'center',
                            justifyContent:'space-between'
                        }}>
                            <Image 
                                source={imageResource.iconAladin}
                                style={styles.logo}
                            />

                            <TouchableOpacity onPress={openSelectLanguage}>
                                <View style={styles.chonngongu}>
                                    <Text>{t('chonngongu')}: </Text>
                                    {
                                        i18n.language==='vi'
                                        ?
                                        <Image 
                                        source={imageResource.covietnam}
                                        style={{width:40,height:30}}/>
                                        :
                                        <Image 
                                        source={imageResource.coanh}
                                        style={{width:40,height:30}}/>
                                    }
                                    
                                </View>
                            </TouchableOpacity>
                        </View>

                        <Image 
                            source={imageResource.imagehome1}
                            style={{width:widthScreen*0.9,alignSelf:'center'}}
                            resizeMode="contain"/>

                        <View style={styles.view}>
                            <Text style={styles.txt2}>{t('tieude1')}</Text>
                            <Text style={styles.txt3}>{t('tieude2')}</Text>
                            <Text></Text>
                            <TouchableOpacity onPress={()=>navigation.navigate("ContactUs")}>
                                <NutBam text={t('lienhe')} colorBG={colorGreen} colorTxt={colorWhite} widthbtn={120}/>
                            </TouchableOpacity>
                        </View>


                    </LinearGradient>

                    <View style={styles.view1}>
                        <Text style={styles.txt4}>{t('tieude3')}</Text>
                    </View>

                    <View style={styles.view2}>
                        <FlatList
                            data={DATA1}
                            renderItem={({item})=>serviceItem(item)}
                            keyExtractor={(item,index)=> index.toString()}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>

                    <Image 
                        source={require('../assets/image/imageservice1.png')}
                        style={styles.image1}
                        resizeMode="contain"/>

                    <View style={styles.view}>
                        <Text style={styles.txt6}>{t('noidungservice1')}</Text>
                        <Text></Text>
                        <Text style={styles.txt7}>{t('noidungservice2')}</Text>
                        <Text></Text>
                        <Text style={styles.txt7}>{t('noidungservice3')}</Text>
                        <Text></Text>
                        <NutBam text={t('duancuachungtoi')} colorBG={colorGreen} colorTxt={colorWhite} widthbtn={240}/>
                    </View>

                </View>

                {/* Tai sao nen chon aladin */}
                <Frame2 />

                {/* Tech we use */}
                <Frame3 /> 

                {/* Tong quan nhan su */}
                <Frame4 />

            </ScrollView>

                    <View style={styles.btnChat}>
                        <TouchableOpacity onPress={handleChat}>
                            <FloatingBtnChat/>
                        </TouchableOpacity>
                    </View>

        <ChangeLanguageBox 
            showModal={showChangeLanguageBox} 
            setShowModal={setShowChangeLanguageBox}/>            
        </SafeAreaView>

        
    )
}

export const Frame2 = () => {
    const screenwidth = useWindowDimensions().width
    const screenheight = useWindowDimensions().height
    const { t } = useTranslation()
    return(
        <View style={{flex:1,borderWidth:0}}>
            <Text></Text>
            <Text style={styles.text1}>{t('whytitle')}</Text>
            <View>
                <Image source={imageResource.visao1} resizeMode="contain" style={{width:screenwidth,height:screenwidth*0.6}}/>
                <View style={styles.container1}>
                    <View style={[styles.greenBox, { width: screenwidth, height:screenwidth*0.6,backgroundColor:'#00BF85'}]}>
                        <View style={[styles.line,{alignSelf:'flex-end'}]} />
                        <Text style={styles.text}>{t('why1')}</Text>
                        <View style={styles.line} />
                    </View>
                </View>
            </View>

            <View>
                <Image source={imageResource.visao2} resizeMode="contain" style={{width:screenwidth,height:screenwidth*0.6}}/>
                <View style={styles.container1}>
                    <View style={[styles.greenBox, { width: screenwidth, height:screenwidth*0.6,backgroundColor:'#044D3A'}]}>
                        <View style={[styles.line,{alignSelf:'flex-end'}]} />
                        <Text style={styles.text}>{t('why2')}</Text>
                        <View style={styles.line} />
                    </View>
                </View>
            </View>

            <View>
                <Image source={imageResource.visao3} resizeMode="contain" style={{width:screenwidth,height:screenwidth*0.6}}/>
                <View style={styles.container1}>
                    <View style={[styles.greenBox, { width: screenwidth, height:screenwidth*0.6,backgroundColor:'#001A13'}]}>
                        <View style={[styles.line,{alignSelf:'flex-end'}]} />
                        <Text style={styles.text}>{t('why3')}</Text>
                        <View style={styles.line} />
                    </View>
                </View>
            </View>

            <View>
                <Image source={imageResource.visao4} resizeMode="contain" style={{width:screenwidth,height:screenwidth*0.6}}/>
                <View style={styles.container1}>
                    <View style={[styles.greenBox, { width: screenwidth, height:screenwidth*0.6,backgroundColor:'#96EA9A'}]}>
                        <View style={[styles.line,{alignSelf:'flex-end'}]} />
                        <Text style={styles.text}>{t('why4')}</Text>
                        <View style={styles.line} />
                    </View>
                </View>
            </View>
        </View>
    )
}

export const Frame3 = () => {
    const {t} = useTranslation()
    return(
        <View style={{borderWidth:0,}}>
            <Text></Text>
            <Text style={styles.text1}>TECHNOLOGY WE USE</Text>
            <CongNgheSuDung 
                tieude={t('tieudecongnghe1')}
                anh1={imageResource.congnghe1a}
                anh2={imageResource.congnghe1b}
                anh3={imageResource.congnghe1c}
                anh4={imageResource.congnghe1d}/>
            <CongNgheSuDung 
                tieude={t('tieudecongnghe2')}
                anh1={imageResource.congnghe2a}
                anh2={imageResource.congnghe2b}
                anh3={imageResource.congnghe2c}
                anh4={imageResource.congnghe2d}/>
            <CongNgheSuDung 
                tieude={t('tieudecongnghe3')}
                anh1={imageResource.congnghe3a}
                anh2={imageResource.congnghe3b}
                anh3={imageResource.congnghe3c}
                anh4={imageResource.congnghe3d}/>
                <Text></Text>
        </View>
    )
}

export const Frame4 =() => {
    const {t} = useTranslation()
    return(
        <LinearGradient
            colors={['#31B44A', '#238035']}
        >
            <View style={{margin:15,borderWidth:0}}>
                <Text></Text>
                <Text style={styles.txt8}>{t('tieudenhanluc')}</Text>
                <Text style={styles.txt9}>{t('noidungnhanluc')}</Text>
                <Text style={styles.txt8}>{t('tieudedoitac')}</Text>
                <Text style={styles.txt9}>{t('noidungdoitac')}</Text>
                <Text></Text>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    txt9:{
        color:colorWhite,
        fontFamily:fontRegular,
        fontSize:20
    },
    txt8:{
        fontFamily:fontBold,
        fontSize:36,
        color:colorWhite
    },
    container1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    greenBox: {
        paddingVertical: 30,
        justifyContent:'center'
    },
    text: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
        fontFamily:fontBold
    },
    line: {
        height: 2,
        width: '40%',
        backgroundColor: 'white',
        marginVertical: 5,
    },
    view4:{
        backgroundColor:'#00BF85'
    },
    text1:{
        fontFamily:fontBold,
        fontSize:25,
        alignSelf:'center',
        textAlign:'center',
        marginHorizontal:10
    },
    txt5:{
        fontWeight:500,
        fontSize:18,
        marginLeft:10,
        fontFamily:fontRegular
    },
    view2:{
        borderWidth:0
    },
    container:{
        flex:1,
    },
    txt1:{
        fontFamily:fontRegular,
        color:colorWhite,
        fontSize:13
    },
    
    btnChat:{
        position:'absolute',
        bottom:10,
        right:10
    },

    frame1:{
        // flex:1
    },
    logo:{
        width:60,
        height:60,
        margin:10,
        backgroundColor:colorWhite,
        borderRadius:6
    },
    chonngongu:{
        height:35,
        width:150,
        borderWidth:0,
        backgroundColor:colorWhite,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginRight:10,
        borderRadius:7
    },
    view:{
        borderWidth:0,
        flex:1,
        margin:10,
        justifyContent:'space-around',
    },
    txt2:{
        color:colorWhite,
        fontSize:30,
        fontFamily:fontBold
    },
    txt3:{
        color:colorWhite,
        marginTop:10,
        fontFamily:fontRegular,
        fontSize:16
    },
    view1:{
        borderWidth:0,
        margin:10,
        flexDirection:'row',
        justifyContent:'center'
    },
    txt4:{
        fontSize:25,
        fontFamily:fontRegular
    },
    view3:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:10
    },
    image:{
        width:40,
        height:40,
        tintColor:'#98A2B3',
    },
    image1:{
        height:280,
        justifyContent:'flex-start',
        borderWidth:0,
        width:330,
        marginTop:10
    },
    txt6:{
        color:colorBlack,
        fontSize:30,
        fontFamily:fontRegular,
        alignSelf:'center'
    },
    txt7:{
        color:colorBlack,
        fontSize:17,
        fontFamily:fontRegular,
        marginHorizontal:10
    },
})

export default HomeScreen;



