import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { t } from 'i18next';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScrollView } from 'react-native';
import { colorGreen, colorWhite } from 'src/assets/color';
import { imageResource } from 'src/assets/imageResource';
import {RootStackParamList} from 'src/types/RootStackParamList';
import { fontBold } from 'src/types/typeFont';

type EditPersonalInforProps = NativeStackScreenProps<
  RootStackParamList,
  'EditPersonalInfor'
>;

const EditPersonalInfor = ({navigation,route}: EditPersonalInforProps) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header navigation={navigation} route={route}/>
      <ScrollView contentContainerStyle={{flexGrow:1,borderWidth:1}}>
        <View>
            <Text>asdsd</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Header = ({navigation}: EditPersonalInforProps) => {
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
        <Text style={styles.txt}>{t('edit_personal_info')}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default EditPersonalInfor;
