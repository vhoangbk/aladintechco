import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Button,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getKIAll} from 'src/api/apiServices';
import {colorWhite} from 'src/assets/color';
import {imageResource} from 'src/assets/imageResource';
import {HeaderBar} from 'src/components/HeaderBar';
import {RootStackParamList} from 'src/types/RootStackParamList';

type KIEmployeeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'KIEmployeeScreen'
>;

const KIEmployeeScreen = ({navigation}: KIEmployeeScreenProps) => {
  const {t} = useTranslation();
  const [DATA, setDATA] = useState<any[]>([]);

  const fetchData = async () => {
    const data = await getKIAll();
    if (data) {
      setDATA(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <HeaderBar
          text={t('ki_list_title')}
          onPress={() => navigation.goBack()}
        />
        <FlatList
          ListHeaderComponent={
            <TouchableOpacity
              onPress={() => navigation.navigate('CreateKIScreen')}
              style={{
                height: 50,
                marginHorizontal: 20,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colorWhite,
                elevation: 10,
                borderRadius: 10,
                marginVertical: 5,
              }}>
              <Image
                source={imageResource.plus}
                style={{width: 40, height: 40}}
              />
            </TouchableOpacity>
          }
          data={DATA}
          renderItem={({item}) => <Item item={item} navigation={navigation} />}
          keyExtractor={item => item.id.toString()}
          ListEmptyComponent={
            <SafeAreaView
              style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
              <Text>{t('data_empty')}</Text>
            </SafeAreaView>
          }
        />
      </View>
    </SafeAreaView>
  );
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'KIEmployeeScreen'
>;

const Item = ({item, navigation}: {item: any; navigation: NavigationProp}) => {
  const {t} = useTranslation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('DetailKIScreen', {idKI: item.id})}
      style={{
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 12,
        padding: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 3,
      }}>
      <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 6}}>
        {item.full_name}
      </Text>

      <Text style={{color: '#555', marginBottom: 4}}>ID: {item.id}</Text>

      <Text style={{marginBottom: 4}}>
        {t('status_ki')}:
        <Text
          style={{
            color: item.status === '0' ? '#d9534f' : '#5cb85c',
            fontWeight: '600',
          }}>
          {' '}
          {item.status === '0' ? t('not_approved') : t('approved')}
        </Text>
      </Text>

      <Text style={{color: '#555', marginBottom: 4}}>
        {t('review_date')}: {item.date_time}
      </Text>

      <Text style={{color: '#555', marginBottom: 4}}>
        {t('self_point')}: {item.employee_ki_point}
      </Text>

      <Text style={{color: '#555', marginBottom: 4}}>
        {t('leader_point')}: {item.leader_ki_point}
      </Text>

      <Text style={{color: '#555'}}>
        {t('boss_point')}: {item.boss_ki_point}
      </Text>
    </TouchableOpacity>
  );
};

export default KIEmployeeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
