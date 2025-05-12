import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
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

const formatDate = (dateInput: Date | string | undefined | null): string => {
  if (!dateInput) return '1990-01-01';
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return '1990-01-01';
  return date.toISOString().split('T')[0];
};

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

  const fetchDataPersonal = async () => {
    setLoading(true);
    const data = await getPersonalInformation();
    setCurrentEmployeeInfor(data);
    setFormCreateKI({...formCreateKI, employee: data});
    console.log(data);
    setLoading(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    await postNewKI(formCreateKI);
    setLoading(false);
  };

  useEffect(() => {
    fetchDataPersonal();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar
        text="BIỂU MẪU ĐÁNH GIÁ KI"
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
          <Text style={styles.sectionTitle}>1. Thông tin chung</Text>
          <Text style={styles.infoText}>
            • Họ tên nhân viên: {CurrentEmployeeInfor?.fullName ?? 'null'}
          </Text>
          <Text style={styles.infoText}>
            • Bộ phận:{' '}
            {CurrentEmployeeInfor?.department.departmentName ?? 'null'}
          </Text>
          <Text style={styles.infoText}>
            • Ngày đánh giá: {formCreateKI.date_time}
          </Text>
          <Text style={styles.infoText}>
            • Trạng thái bản đánh giá: {formCreateKI.status}
          </Text>

          <Text style={styles.sectionTitle}>2. Công việc và hiệu suất</Text>
          <Text style={styles.subTitle}>2.1 Tổng hợp công việc:</Text>
          <FormInputBig
            label="Công việc đã giao:"
            value={formCreateKI?.assigned_work}
            onChangeText={change =>
              setFormCreateKI({...formCreateKI, assigned_work: change})
            }
            placeholder="Nhập nội dung..."
          />
          <FormInputBig
            label="Công việc đã hoàn thành:"
            value={formCreateKI.completed_work}
            onChangeText={change =>
              setFormCreateKI({...formCreateKI, completed_work: change})
            }
            placeholder="Nhập nội dung..."
          />
          <FormInputBig
            label="Công việc chưa hoàn thành:"
            value={formCreateKI.uncompleted_work}
            onChangeText={change =>
              setFormCreateKI({...formCreateKI, uncompleted_work: change})
            }
            placeholder="Nhập nội dung..."
          />
          <FormInputBig
            label="Công việc phát sinh khác:"
            value={formCreateKI.other_work}
            onChangeText={change =>
              setFormCreateKI({...formCreateKI, other_work: change})
            }
            placeholder="Nhập nội dung..."
          />

          <Text style={styles.subTitle}>2.2 Sở thích công việc:</Text>
          <FormInputBig
            label="Công việc yêu thích:"
            value={formCreateKI.favourite_work}
            onChangeText={change =>
              setFormCreateKI({...formCreateKI, favourite_work: change})
            }
            placeholder="Nhập nội dung..."
          />
          <FormInputBig
            label="Công việc không yêu thích:"
            value={formCreateKI.unfavourite_work}
            onChangeText={change =>
              setFormCreateKI({...formCreateKI, unfavourite_work: change})
            }
            placeholder="Nhập nội dung..."
          />

          <Text style={styles.sectionTitle}>3. Đánh giá hiệu suất</Text>
          <Text style={styles.subTitle}>3.1 Khối lượng công việc:</Text>
          <QuantitySelect
            label="Điểm:"
            value={formCreateKI.work_quantity}
            onChange={val =>
              setFormCreateKI({...formCreateKI, work_quantity: val})
            }
          />
          <FormInputBig
            label="Nhận xét:"
            value={formCreateKI.work_quantity_comment}
            onChangeText={text =>
              setFormCreateKI({...formCreateKI, work_quantity_comment: text})
            }
            placeholder="Nhận xét..."
          />

          <Text style={styles.subTitle}>3.2 Chất lượng công việc:</Text>
          <QuantitySelect
            label="Điểm:"
            value={formCreateKI.work_quality}
            onChange={val =>
              setFormCreateKI({...formCreateKI, work_quality: val})
            }
          />
          <FormInputBig
            label="Nhận xét:"
            value={formCreateKI.work_quality_comment}
            onChangeText={text =>
              setFormCreateKI({...formCreateKI, work_quality_comment: text})
            }
            placeholder="Nhận xét..."
          />

          <Text style={styles.subTitle}>3.3 Tiến độ công việc:</Text>
          <QuantitySelect
            label="Điểm:"
            value={formCreateKI.work_progress}
            onChange={val =>
              setFormCreateKI({...formCreateKI, work_progress: val})
            }
          />
          <FormInputBig
            label="Nhận xét:"
            value={formCreateKI.work_progress_comment}
            onChangeText={text =>
              setFormCreateKI({...formCreateKI, work_progress_comment: text})
            }
            placeholder="Nhận xét..."
          />

          <Text style={styles.subTitle}>3.4 Thái độ làm việc:</Text>
          <QuantitySelect
            label="Điểm:"
            value={formCreateKI.work_attitude}
            onChange={val =>
              setFormCreateKI({...formCreateKI, work_attitude: val})
            }
          />
          <FormInputBig
            label="Nhận xét:"
            value={formCreateKI.work_attitude_comment}
            onChangeText={text =>
              setFormCreateKI({...formCreateKI, work_attitude_comment: text})
            }
            placeholder="Nhận xét..."
          />

          <Text style={styles.subTitle}>3.5 Tính kỷ luật:</Text>
          <QuantitySelect
            label="Điểm:"
            value={formCreateKI.work_discipline}
            onChange={val =>
              setFormCreateKI({...formCreateKI, work_discipline: val})
            }
          />
          <FormInputBig
            label="Nhận xét:"
            value={formCreateKI.work_discipline_comment}
            onChangeText={text =>
              setFormCreateKI({...formCreateKI, work_discipline_comment: text})
            }
            placeholder="Nhận xét..."
          />

          <Text style={styles.sectionTitle}>4. Đánh giá tổng thể</Text>
          <QuantitySelect
            label="Tự đánh giá:"
            value={formCreateKI.employee_ki_point}
            onChange={val =>
              setFormCreateKI({...formCreateKI, employee_ki_point: val})
            }
          />
          <QuantitySelect
            label="Trưởng phòng:"
            value={formCreateKI.leader_ki_point}
            onChange={val =>
              setFormCreateKI({...formCreateKI, leader_ki_point: val})
            }
          />
          <FormInputBig
            label="Nhận xét trưởng phòng:"
            value={formCreateKI.leader_comment}
            onChangeText={text =>
              setFormCreateKI({...formCreateKI, leader_comment: text})
            }
            placeholder="Nhận xét..."
          />
          <QuantitySelect
            label="Sếp đánh giá:"
            value={formCreateKI.boss_ki_point}
            onChange={val =>
              setFormCreateKI({...formCreateKI, boss_ki_point: val})
            }
          />
          <FormInputBig
            label="Nhận xét của sếp:"
            value={formCreateKI.boss_comment}
            onChangeText={text =>
              setFormCreateKI({...formCreateKI, boss_comment: text})
            }
            placeholder="Nhận xét..."
          />

          <Text style={styles.sectionTitle}>5. Ghi chú từ cấp cao (MM)</Text>
          <FormInputBig
            label="Ghi chú:"
            value={formCreateKI.mm_description}
            onChangeText={text =>
              setFormCreateKI({...formCreateKI, mm_description: text})
            }
            placeholder="Nhập ghi chú..."
          />

          <Button title="Gửi đánh giá" onPress={handleSubmit} />
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
