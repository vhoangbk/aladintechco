import { NavigationProp } from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { t } from 'i18next';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colorGreen, colorWhite } from 'src/assets/color';
import {imageResource} from 'src/assets/imageResource';
import NutBam from 'src/components/NutBam';
import {RootStackParamList} from 'src/types/RootStackParamList';
import { fontBold } from 'src/types/typeFont';

type DetailRecruitmentProps = NativeStackScreenProps<
  RootStackParamList,
  'DetailRecruitment'
>;

const DetailRecruitment = ({navigation,route}: DetailRecruitmentProps) => {
  const {recruitmentModel} = route.params;
  return (
    <SafeAreaView style={styles.container}>
    {/* Header */}
        <Header navigation={navigation}/>
    {/* Body */}
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={{flex: 1,margin:15}}>

          {/* Title */}
          <Text style={styles.title1}>{recruitmentModel.job}</Text>
          {/* 3 cai icon */}
          <View style={{flexDirection:'row'}}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <IconHeader icon={imageResource.tabnhanvien} title={t('quantity')} data={`${recruitmentModel.amount} ${t('people')}`}/>
              <IconHeader icon={imageResource.iconuser} title={t('position')} data={recruitmentModel.position}/>
              <IconHeader icon={imageResource.positionicon} title={t('address')} data={recruitmentModel.location}/>
            </ScrollView>
          </View>
          {/* Noi dung */}
          <View style={{flex:1,marginTop:10}}>
            <Text style={styles.title2}>{t('job_description')}</Text>
            <Text>{recruitmentModel.description}</Text>
            <Text> </Text>
            <Text style={styles.title2}>{t('benefit')}</Text>
            <Text>{recruitmentModel.benefit}</Text>
            <Text> </Text>
            <Text style={styles.title2}>{t('requirement')}</Text>
            <Text>{recruitmentModel.require}</Text>
          </View>

        </View>
      </ScrollView>
      <View style={{backgroundColor:colorWhite,elevation:10}}>
        <TouchableOpacity style={{margin:10}} onPress={()=>navigation.navigate('ApplyScreen',{recruitment : recruitmentModel})}>
          <NutBam text={t('ungtuyenngay')} colorBG={colorGreen} colorTxt={colorWhite}/>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

type HeaderProps = {
    navigation: NavigationProp<RootStackParamList>;
};

const Header = ({navigation}: HeaderProps) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={styles.containBack}>
          <Image
            source={imageResource.backbtn}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
      <View style={styles.title}>
        <Text style={styles.txt}>{t('detail_recruitment')}</Text>
      </View>
    </View>
  );
};

const IconHeader = ({icon, title, data}:any) => {
    return(
      <View style={{height:60,flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        <View style={{height:45,width:45,backgroundColor:colorGreen,justifyContent:'center',alignItems:'center',borderRadius:50,elevation:5}}>
          <Image source={icon} style={{height:30,width:30,tintColor:colorWhite}}/>
        </View>
        <View style={{margin:10}}>
          <Text style={{fontFamily:fontBold}}>{title}</Text>
          <Text>{data}</Text>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 50,
    backgroundColor: colorGreen,
    flexDirection: 'row',
  },
  containBack: {
    width: 50,
    height: 50,
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 20,
    height: 20,
    tintColor: colorWhite,
  },
  title: {
    flex: 1,
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
  },
  txt: {
    fontFamily: fontBold,
    color: colorWhite,
    fontSize: 17,
  },
  title1:{
    fontFamily:fontBold,
    fontSize:23,
  },
  title2:{
    fontFamily:fontBold,
    fontSize:17,
  }
});

export default DetailRecruitment;
