import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {getKIInfor} from 'src/api/apiServices';
import {colorGreen, colorWhite} from 'src/assets/color';
import {HeaderBar} from 'src/components/HeaderBar';
import {RootStackParamList} from 'src/types/RootStackParamList';
import {DetailKI} from 'src/types/typeModel';
import {RowInformation} from './PersonalInformation';
import {URL_SERVER} from 'src/api/apiConfig';
import {fontBold} from 'src/types/typeFont';

type Props = NativeStackScreenProps<RootStackParamList, 'DetailKIScreen'>;

const DetailKIScreen = ({navigation, route}: Props) => {
  const {idKI} = route.params;
  const [loading, setLoading] = useState<boolean>(false);
  const [KIData, setKIData] = useState<DetailKI>();
  const {t} = useTranslation();

  const fetchData = async () => {
    setLoading(true);
    const data = await getKIInfor(idKI.toString());
    if (data) {
      setKIData(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colorWhite}}>
      <Modal visible={loading} transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <ActivityIndicator size="large" color={colorGreen} />
        </View>
      </Modal>

      <HeaderBar
        text={t('detail_ki.title')}
        onPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={{flexGrow: 1, margin: 15}}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={{uri: `${URL_SERVER}${KIData?.employee.avatar}`}}
            style={{width: 100, height: 100, margin: 10}}
            resizeMode="contain"
          />
          <Text style={{margin: 10, fontSize: 20}}>
            {KIData?.employee.fullName}
          </Text>
        </View>

        <Text style={styles.titleTxt}>{t('detail_ki.section1')}</Text>
        <RowInformation title={t('detail_ki.review_id')} infor={KIData?.id} />
        <RowInformation
          title={t('detail_ki.review_date')}
          infor={KIData?.date_time}
        />
        <RowInformation
          title={t('detail_ki.assigned_work')}
          infor={KIData?.assigned_work}
        />
        <RowInformation
          title={t('detail_ki.other_work')}
          infor={KIData?.other_work}
        />
        <RowInformation
          title={t('detail_ki.completed_work')}
          infor={KIData?.completed_work}
        />
        <RowInformation
          title={t('detail_ki.uncompleted_work')}
          infor={KIData?.uncompleted_work}
        />
        <RowInformation
          title={t('detail_ki.favourite_work')}
          infor={KIData?.favourite_work}
        />
        <RowInformation
          title={t('detail_ki.unfavourite_work')}
          infor={KIData?.unfavourite_work}
        />

        <Text style={styles.titleTxt}>{t('detail_ki.section2')}</Text>
        <RowInformation
          title={t('detail_ki.work_quantity')}
          infor={KIData?.work_quantity}
        />
        <RowInformation
          title={t('detail_ki.work_quantity_comment')}
          infor={KIData?.work_quantity_comment}
        />
        <RowInformation
          title={t('detail_ki.work_quality')}
          infor={KIData?.work_quality}
        />
        <RowInformation
          title={t('detail_ki.work_quality_comment')}
          infor={KIData?.work_quality_comment}
        />
        <RowInformation
          title={t('detail_ki.work_progress')}
          infor={KIData?.work_progress}
        />
        <RowInformation
          title={t('detail_ki.work_progress_comment')}
          infor={KIData?.work_progress_comment}
        />
        <RowInformation
          title={t('detail_ki.work_attitude')}
          infor={KIData?.work_attitude}
        />
        <RowInformation
          title={t('detail_ki.work_attitude_comment')}
          infor={KIData?.work_attitude_comment}
        />
        <RowInformation
          title={t('detail_ki.work_discipline')}
          infor={KIData?.work_discipline}
        />
        <RowInformation
          title={t('detail_ki.work_discipline_comment')}
          infor={KIData?.work_discipline_comment}
        />

        <Text style={styles.titleTxt}>{t('detail_ki.section3')}</Text>
        <RowInformation
          title={t('detail_ki.employee_ki_point')}
          infor={KIData?.employee_ki_point}
        />
        <RowInformation
          title={t('detail_ki.leader_ki_point')}
          infor={KIData?.leader_ki_point}
        />
        <RowInformation
          title={t('detail_ki.leader_comment')}
          infor={KIData?.leader_comment}
        />
        <RowInformation
          title={t('detail_ki.boss_ki_point')}
          infor={KIData?.boss_ki_point}
        />
        <RowInformation
          title={t('detail_ki.boss_comment')}
          infor={KIData?.boss_comment}
        />
        <RowInformation
          title={t('detail_ki.mm_description')}
          infor={KIData?.mm_description}
        />

        <Text></Text>
        <Text></Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailKIScreen;

const styles = StyleSheet.create({
  titleTxt: {
    fontSize: 17,
    fontFamily: fontBold,
    color: colorGreen,
    marginTop: 10,
    marginBottom: 5,
  },
});
