import { NavigationProp } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {getRecruitments} from 'src/api/apiServices';
import {colorBlack, colorGreen, colorWhite} from 'src/assets/color';
import {imageResource} from 'src/assets/imageResource';
import NutBam from 'src/components/NutBam';
import { RootStackParamList } from 'src/types/RootStackParamList';
import {fontBold, fontRegular} from 'src/types/typeFont';
import {RecruitmentModel} from 'src/types/typeModel';

type TuyenDungScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'TuyenDungScreen'
>;

const TuyenDungScreen = ({navigation}:TuyenDungScreenProps) => {
  const [recruitmentDATA, setRecruitmentDATA] = useState<RecruitmentModel[]>();
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const {t} = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRecruitments();
      setRecruitmentDATA(data as RecruitmentModel[]);
      setLoadingData(false);
    };
    fetchData();
  }, [recruitmentDATA]);

  if (loadingData) {
    return (
      <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
        <View style={{borderWidth: 0, flex: 1}}>
            <View style={styles.container}>
              <FlatList
                ListHeaderComponent={
                  <Header t={t} />
                }
                data={recruitmentDATA}
                renderItem={({item}: any) => (
                  <RecruitmentItem item={item} t={t} navigation={navigation}/>
                )}
                keyExtractor={item => item.id.toString()}
                ListEmptyComponent={
                  <View style={{justifyContent:'center', alignItems: 'center', margin:20}}>
                    <Text>null</Text>
                  </View>
                }
              />
            </View>
        </View>
    </SafeAreaView>
  );
};

type RecruitmentItemProps = {
  item: RecruitmentModel;
  t: any;
  navigation: NavigationProp<RootStackParamList, 'TuyenDungScreen'>;
};

const RecruitmentItem: React.FC<RecruitmentItemProps> = ({item , t , navigation}) => {
  return (
    <View style={styles.recruitmentItem}>
      <View style={{flex: 1, margin: 17}}>
        <Text style={styles.txt4}>{item.job}</Text>
        <Text style={styles.txt3}>
          <Text style={styles.txt5}>{t('level')}: </Text>
          {item.level}
        </Text>
        <Text style={styles.txt3}>
          <Text style={styles.txt5}>{t('address')}: </Text>
          {item.location}
        </Text>
        <Text style={styles.txt3}>
          <Text style={styles.txt5}>{t('quantity')}: </Text>
          {item.amount} {t('people')}
        </Text>
        <Text style={styles.txt3}>
          <Text style={styles.txt5}>{t('deadline')}: </Text>
          {item.duration}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 10,
          }}>
          <TouchableOpacity onPress={ ()=>navigation.navigate('ApplyScreen',{ recruitment : item }) }>
            <NutBam
              text={t('apply')}
              colorTxt={colorWhite}
              colorBG={colorGreen}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('DetailRecruitment',{ recruitmentModel:item })}>
            <NutBam
              text={t('details')}
              colorTxt={colorBlack}
              colorBG={'#ededed'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const Header = ({t}: any) => {
  const screenHeight = useWindowDimensions().height;
  const screenWidth = useWindowDimensions().width;
  return (
    <View style={{height: screenHeight * 0.15}}>
      <View style={styles.headFrame1}>
        <View style={{margin: 16, flex: 1}}>
          <Text style={styles.txt1}>{t('jobTitle')}</Text>
          <Text style={styles.txt2}>{t('intro')}</Text>
        </View>
      </View>
      <Image
        source={imageResource.bg1}
        style={{
          width: screenWidth,
          height: screenHeight * 0.147,
          position: 'absolute',
        }}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headFrame1: {
    flex: 1,
    borderWidth: 0,
    position: 'absolute',
    zIndex: 1,
  },
  txt1: {
    fontFamily: fontBold,
    fontSize: 25,
  },
  txt2: {
    fontFamily: fontRegular,
    fontSize: 17,
  },
  container: {
    borderWidth: 0,
    flex: 1,
  },
  recruitmentItem: {
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 0,
    backgroundColor: colorWhite,
    marginTop: 12,
    elevation: 8,
    marginHorizontal: 10,
  },
  txt3: {
    fontFamily: fontRegular,
  },
  txt4: {
    fontFamily: fontBold,
    fontSize: 20,
  },
  txt5: {
    fontFamily: fontBold,
  },
});

export default TuyenDungScreen;
