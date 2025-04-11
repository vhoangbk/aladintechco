import { useTranslation } from "react-i18next"
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { colorWhite } from "src/assets/color"
import { imageResource } from "src/assets/imageResource"
import i18n from "src/language/i18n"
import { fontBold, fontRegular } from "src/types/typeFont"

const ChangeLanguageBox = ({ showModal, setShowModal }: any) => {

    const { t } = useTranslation()

    const ChangeToVN = () => {
        i18n.changeLanguage('vi')
    }

    const ChangeToEN = () => {
        i18n.changeLanguage('en')
    }

    const handleClose = () => {
        setShowModal(false);
    };

    return(
        <Modal
            transparent={true}
            visible={showModal}
            animationType="fade"
            >
            <View style={styles.container}>
                <View style={styles.alert}>
                    <View style = {styles.insideAlert}>

                        <Text style={styles.title1}>{t('chonngongu')}</Text>
                        
                        <View style={styles.view1}>
                            <TouchableOpacity onPress={ChangeToVN}>
                                <Image 
                                    style={styles.image} 
                                    source={imageResource.covietnam} 
                                    resizeMode="contain"/>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={ChangeToEN}>
                                <Image 
                                    style={styles.image} 
                                    source={imageResource.coanh} 
                                    resizeMode="contain"/>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={handleClose}>
                            <View style = {styles.view2}>
                                <Text style={styles.text}>OK</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </Modal>

    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        borderWidth:0,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    alert:{
        width:240,
        height:160,
        backgroundColor:colorWhite,
        borderWidth:0,
        borderRadius:10
    },
    insideAlert:{
        flex:1,
        borderWidth:0,
        margin:10
    },
    title1:{
        fontFamily:fontBold,
        fontSize:17,
        alignSelf:'center'
    },
    view1:{
        borderWidth:0,
        height:75,
        width:170,
        alignSelf:'center',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    image:{
        borderWidth:0,
        width:75,
        height:75
    },
    view2:{
        height:30,
        width:50,
        borderWidth:0,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'flex-end'
    },
    text:{
        fontFamily:fontRegular,
        fontSize:15,
    }
})

export default ChangeLanguageBox