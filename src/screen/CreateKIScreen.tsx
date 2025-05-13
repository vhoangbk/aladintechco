import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {t} from 'i18next';
import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {getPersonalInformation, postNewKI} from 'src/api/apiServices';
import {colorGreen, colorWhite} from 'src/assets/color';
import FormInputBig from 'src/components/FormInputBig';
import {HeaderBar} from 'src/components/HeaderBar';
import QuantitySelect from 'src/components/QuantitySelect';
import {RootStackParamList} from 'src/types/RootStackParamList';
import {NewKI, PersonalInformationModel} from 'src/types/typeModel';

type CreateKIScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'CreateKIScreen'
>;

const CreateKIScreen = ({navigation}: CreateKIScreenProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [CurrentEmployeeInfor, setCurrentEmployeeInfor] =
    useState<PersonalInformationModel>();
  const [formCreateKI, setFormCreateKI] = useState<NewKI>({
    assigned_work: '',
    boss_comment: '',
    boss_ki_point: 2,
    completed_work: '',
    date_time: '2025-05-09',
    employee: {
      id: 101122,
      avatar:
        '/services/aladintechcobackend-test/upload/images/1746434813759.jpg',
      fullName: 'Khang Huy 2k33',
      firstDayWork: '2025-04-30',
      phoneNumber: '0943185411',
      dateOfBirth: '2003-10-27',
      gender: 'Nam',
      countryside: 'Ha noi',
      currentResidence: 'Ha noi',
      family: 'doc than',
      identificationNumber: 'string',
      email: 'huy333@gmail.com',
      emergencyContact: 'fghjghjghj',
      favourite: 'xem phim',
      foreignLanguage: 'normal',
      education: 'dai hoc',
      english: 'string',
      experience: 'intern',
      objectiveInCV: 'thang tien trong cong viec',
      employeeStatus: 'Chờ phê duyệt',
      status: 'Chờ phê duyệt',
      level: 'null',
      facebookLink: 'string',
      telegramLink: 'string',
      linkedInLink: 'string',
      skypeLink: 'string',
      contractInfo: null,
      probationStartDate: '2025-05-01',
      probationEndDate: '2025-05-01',
      officialContractStartDate: '2025-05-01',
      officialContractEndDate: '2025-05-01',
      jobPosition: {
        id: 97551,
        name: 'DEV FE',
      },
      jobTitle: {
        id: 97602,
        name: 'Intern',
      },
      workModel: {
        id: 97503,
        name: 'remote',
      },
      employeeDocuments: null,
      user: {
        id: '6633746345988905',
        login: 'huytest9',
        firstName: 'huytest9',
        lastName: 'huytest9',
        email: 'huytest9@gmail.com',
        activated: true,
        langKey: 'en',
        imageUrl: null,
      },
      department: {
        id: 1526855,
        departmentName: 'BackendTeam',
        isleader: '1',
        mail: 'huytest9@gmail.com',
        datetime: null,
      },
    },
    employee_ki_point: 2,
    favourite_work: '',
    leader_comment: '',
    leader_ki_point: 2,
    mm_acceptanced: 0,
    mm_description: '',
    other_work: '',
    status: 'Chưa duyệt',
    uncompleted_work: '',
    unfavourite_work: '',
    work_attitude: 2,
    work_attitude_comment: '',
    work_discipline: 2,
    work_discipline_comment: '',
    work_progress: 2,
    work_progress_comment: '',
    work_quality: 2,
    work_quality_comment: '',
    work_quantity: 2,
    work_quantity_comment: '',
  });

  const validateForm = () => {
    const {
      assigned_work,
      completed_work,
      uncompleted_work,
      other_work,
      favourite_work,
      unfavourite_work,
      work_quantity_comment,
      work_quality_comment,
      work_progress_comment,
      work_attitude_comment,
      work_discipline_comment,
      leader_comment,
    } = formCreateKI;

    const requiredFields = [
      {label: t('ki.assigned_work'), value: assigned_work},
      {label: t('ki.completed_work'), value: completed_work},
      {label: t('ki.uncompleted_work'), value: uncompleted_work},
      {label: t('ki.other_work'), value: other_work},
      {label: t('ki.favourite_work'), value: favourite_work},
      {label: t('ki.unfavourite_work'), value: unfavourite_work},
      {label: t('ki.work_quantity_comment'), value: work_quantity_comment},
      {label: t('ki.work_quality_comment'), value: work_quality_comment},
      {label: t('ki.work_progress_comment'), value: work_progress_comment},
      {label: t('ki.work_attitude_comment'), value: work_attitude_comment},
      {label: t('ki.work_discipline_comment'), value: work_discipline_comment},
      {label: t('ki.leader_comment'), value: leader_comment},
    ];

    for (let field of requiredFields) {
      if (!field.value || field.value.trim().length < 20) {
        Alert.alert(
          t('common.input_error_title'),
          t('common.input_error_message', {
            field: field.label,
          }),
        );
        return false;
      }
    }
    return true;
  };

  const fetchDataPersonal = async () => {
    setLoading(true);
    const data = await getPersonalInformation();
    setCurrentEmployeeInfor(data);
    setFormCreateKI({...formCreateKI, employee: data});
    console.log(data);
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      await postNewKI(formCreateKI);
      Alert.alert('Thành công', 'Biểu mẫu đã được gửi đi!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể gửi biểu mẫu.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataPersonal();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar
        text={t('evaluation_form_title')}
        onPress={() => navigation.goBack()}
      />

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

      <View style={styles.contentWrapper}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.sectionTitle}>{t('section_1_title')}</Text>
          <Text style={styles.infoText}>
            • {t('employee_name')}: {CurrentEmployeeInfor?.fullName ?? 'null'}
          </Text>
          <Text style={styles.infoText}>
            • {t('department')}:{' '}
            {CurrentEmployeeInfor?.department.departmentName ?? 'null'}
          </Text>
          <Text style={styles.infoText}>
            • {t('evaluation_date')}: {formCreateKI.date_time}
          </Text>
          <Text style={styles.infoText}>
            • {t('evaluation_status')}: {formCreateKI.status}
          </Text>

          <Text style={styles.sectionTitle}>{t('section_2_title')}</Text>
          <Text style={styles.subTitle}>{t('section_2_1')}</Text>

          <FormInputBig
            label={t('assigned_work')}
            value={formCreateKI?.assigned_work}
            onChangeText={change =>
              setFormCreateKI({...formCreateKI, assigned_work: change})
            }
            placeholder={t('enter_content')}
          />
          <FormInputBig
            label={t('completed_work')}
            value={formCreateKI.completed_work}
            onChangeText={change =>
              setFormCreateKI({...formCreateKI, completed_work: change})
            }
            placeholder={t('enter_content')}
          />
          <FormInputBig
            label={t('uncompleted_work')}
            value={formCreateKI.uncompleted_work}
            onChangeText={change =>
              setFormCreateKI({...formCreateKI, uncompleted_work: change})
            }
            placeholder={t('enter_content')}
          />
          <FormInputBig
            label={t('other_work')}
            value={formCreateKI.other_work}
            onChangeText={change =>
              setFormCreateKI({...formCreateKI, other_work: change})
            }
            placeholder={t('enter_content')}
          />

          <Text style={styles.subTitle}>{t('section_2_2')}</Text>
          <FormInputBig
            label={t('favourite_work')}
            value={formCreateKI.favourite_work}
            onChangeText={change =>
              setFormCreateKI({...formCreateKI, favourite_work: change})
            }
            placeholder={t('enter_content')}
          />
          <FormInputBig
            label={t('unfavourite_work')}
            value={formCreateKI.unfavourite_work}
            onChangeText={change =>
              setFormCreateKI({...formCreateKI, unfavourite_work: change})
            }
            placeholder={t('enter_content')}
          />

          <Text style={styles.sectionTitle}>{t('section_3_title')}</Text>

          {/* Repeat for all subsections: quantity, quality, progress, attitude, discipline */}
          <Text style={styles.subTitle}>{t('section_3_1')}</Text>
          <QuantitySelect
            label={t('score')}
            value={formCreateKI.work_quantity}
            onChange={val =>
              setFormCreateKI({...formCreateKI, work_quantity: val})
            }
          />
          <FormInputBig
            label={t('comment')}
            value={formCreateKI.work_quantity_comment}
            onChangeText={text =>
              setFormCreateKI({...formCreateKI, work_quantity_comment: text})
            }
            placeholder={t('comment_placeholder')}
          />

          {/* Quality */}
          <Text style={styles.subTitle}>{t('section_3_2')}</Text>
          <QuantitySelect
            label={t('score')}
            value={formCreateKI.work_quality}
            onChange={val =>
              setFormCreateKI({...formCreateKI, work_quality: val})
            }
          />
          <FormInputBig
            label={t('comment')}
            value={formCreateKI.work_quality_comment}
            onChangeText={text =>
              setFormCreateKI({...formCreateKI, work_quality_comment: text})
            }
            placeholder={t('comment_placeholder')}
          />

          {/* Progress */}
          <Text style={styles.subTitle}>{t('section_3_3')}</Text>
          <QuantitySelect
            label={t('score')}
            value={formCreateKI.work_progress}
            onChange={val =>
              setFormCreateKI({...formCreateKI, work_progress: val})
            }
          />
          <FormInputBig
            label={t('comment')}
            value={formCreateKI.work_progress_comment}
            onChangeText={text =>
              setFormCreateKI({...formCreateKI, work_progress_comment: text})
            }
            placeholder={t('comment_placeholder')}
          />

          {/* Attitude */}
          <Text style={styles.subTitle}>{t('section_3_4')}</Text>
          <QuantitySelect
            label={t('score')}
            value={formCreateKI.work_attitude}
            onChange={val =>
              setFormCreateKI({...formCreateKI, work_attitude: val})
            }
          />
          <FormInputBig
            label={t('comment')}
            value={formCreateKI.work_attitude_comment}
            onChangeText={text =>
              setFormCreateKI({...formCreateKI, work_attitude_comment: text})
            }
            placeholder={t('comment_placeholder')}
          />

          {/* Discipline */}
          <Text style={styles.subTitle}>{t('section_3_5')}</Text>
          <QuantitySelect
            label={t('score')}
            value={formCreateKI.work_discipline}
            onChange={val =>
              setFormCreateKI({...formCreateKI, work_discipline: val})
            }
          />
          <FormInputBig
            label={t('comment')}
            value={formCreateKI.work_discipline_comment}
            onChangeText={text =>
              setFormCreateKI({...formCreateKI, work_discipline_comment: text})
            }
            placeholder={t('comment_placeholder')}
          />

          <Text style={styles.sectionTitle}>{t('section_4_title')}</Text>
          <QuantitySelect
            label={t('self_evaluation')}
            value={formCreateKI.employee_ki_point}
            onChange={val =>
              setFormCreateKI({...formCreateKI, employee_ki_point: val})
            }
          />
          <QuantitySelect
            label={t('leader_evaluation')}
            value={formCreateKI.leader_ki_point}
            onChange={val =>
              setFormCreateKI({...formCreateKI, leader_ki_point: val})
            }
          />
          <FormInputBig
            label={t('leader_comment')}
            value={formCreateKI.leader_comment}
            onChangeText={text =>
              setFormCreateKI({...formCreateKI, leader_comment: text})
            }
            placeholder={t('comment_placeholder')}
          />
          <QuantitySelect
            label={t('boss_evaluation')}
            value={formCreateKI.boss_ki_point}
            onChange={val =>
              setFormCreateKI({...formCreateKI, boss_ki_point: val})
            }
          />
          <FormInputBig
            label={t('boss_comment')}
            value={formCreateKI.boss_comment}
            onChangeText={text =>
              setFormCreateKI({...formCreateKI, boss_comment: text})
            }
            placeholder={t('comment_placeholder')}
          />

          <Text style={styles.sectionTitle}>{t('section_5_title')}</Text>
          <FormInputBig
            label={t('mm_note')}
            value={formCreateKI.mm_description}
            onChangeText={text =>
              setFormCreateKI({...formCreateKI, mm_description: text})
            }
            placeholder={t('enter_note')}
          />

          <Button title={t('submit_button')} onPress={handleSubmit} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CreateKIScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorWhite,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 3,
    color: '#1C1C1E',
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 6,
    color: '#3A3A3C',
  },
  infoText: {
    fontSize: 14,
    color: '#6E6E73',
    marginVertical: 2,
    paddingLeft: 10,
  },
});
