import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
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
import {fontBold, fontRegular} from 'src/types/typeFont';
import {RecruitmentModel} from 'src/types/typeModel';

const TuyenDungScreen = () => {
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
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1, backgroundColor: colorWhite}}>
        <View style={{borderWidth: 0, flex: 1}}>
          {/* Header */}
          <Header t={t} />
          {/* Body */}
          {loadingData ? (
            <View
              style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
              <ActivityIndicator size={'large'} />
            </View>
          ) : (
            <View style={styles.container}>
              <FlatList
                data={recruitmentDATA}
                renderItem={({item}: any) => (
                  <RecruitmentItem item={item} t={t} />
                )}
                keyExtractor={item => item.id.toString()}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

type RecruitmentItemProps = {
  item: RecruitmentModel;
  t: any;
};

const RecruitmentItem: React.FC<RecruitmentItemProps> = ({item, t}) => {
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
          <TouchableOpacity>
            <NutBam
              text={t('apply')}
              colorTxt={colorWhite}
              colorBG={colorGreen}
            />
          </TouchableOpacity>
          <TouchableOpacity>
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
    marginHorizontal: 20,
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
