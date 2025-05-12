export interface RecruitmentModel {
  id: number;
  position: string;
  description: string;
  require: string;
  benefit: string;
  amount: number;
  job: string;
  location: string;
  level: string;
  duration: string;
  searchField: string;
  responseField: string;
}

export interface CandidateModel {
  phone: string;
  email: string;
  position: string;
  location: string;
  preference: string;
  education: string;
  experience: string;
  target: string;
  fullname: string;
  sex: string;
  cv: string; // base64-encoded string
  cvContentType: string; // e.g., "application/pdf"
  birthday: string; // ISO date string
  relationship: string;
  dateRegister: string; // ISO date string
  recruitment: RecruitmentModel;
}

export interface Employee {
  id: number;
  fullName: string;
  email: string;
  dateOfBirth: string;
  firstDayWork: string;
  phoneNumber: string;
  avatar: string;
  countryside: string;
  status: string;
  employeeStatus: string;
  level: string;
  workModel: string;
  searchField: string;
  responseField: string;
}

export interface Account {
  id: string;
  login: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string | null;
  activated: boolean;
  langKey: string;
  createdBy: string | null;
  createdDate: string; // ISO date string
  lastModifiedBy: string | null;
  lastModifiedDate: string; // ISO date string
  authorities: string[];
}

export interface Department {
  id: number;
  departmentName: string;
  isleader: string;
  mail: string;
  datetime: string | null;
  user: User
}

export interface User {
  id: string;
  login: string;
  firstName: string;
  lastName: string;
  email: string;
  activated: boolean;
  langKey: string;
  imageUrl: string | null;
};

export interface PersonalInformationModel {
  id: number;
  avatar: string;
  fullName: string;
  firstDayWork: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  countryside: string;
  currentResidence: string;
  family: string;
  identificationNumber: string;
  email: string;
  emergencyContact: string;
  favourite: string;
  foreignLanguage: string;
  education: string;
  english: string;
  experience: string;
  objectiveInCV: string;
  employeeStatus: string;
  status: string;
  level: string;
  facebookLink: string;
  telegramLink: string;
  linkedInLink: string;
  skypeLink: string;
  contractInfo: any | null;
  probationStartDate: string | null;
  probationEndDate: string | null;
  officialContractStartDate: string | null;
  officialContractEndDate: string | null;
  jobPosition: JobPosition | null;
  jobTitle: JobTitle | null;
  workModel: WorkModel | null;
  employeeDocuments: any | null;
  user: User
  department: {
    id: number,
    departmentName: string,
    isleader: string,
    mail: string,
    datetime: string | null,
  }
}

export interface NewEmployee {
  avatar: string;
  contractInfo: string;
  countryside: string;
  currentResidence: string;
  dateOfBirth: string;
  departmentId: number;
  education: string;
  email: string;
  emergencyContact: string;
  employeeDocuments: EmployeeDocuments[] | null;
  employeeStatus: string;
  english: string;
  experience: string;
  facebookLink: string;
  family: string;
  favourite: string;
  firstDayWork: string;
  foreignLanguage: string;
  fullName: string;
  gender: string;
  identificationNumber: string;
  jobPositionId: number;
  jobTitleId: number;
  level: string;
  linkedInLink: string;
  objectiveInCV: string;
  officialContractEndDate: string;
  officialContractStartDate: string;
  phoneNumber: string;
  probationEndDate: string;
  probationStartDate: string;
  skypeLink: string;
  status: string;
  telegramLink: string;
  userId: string;
  workModelId: number;
}

export interface UpdateEmployee extends NewEmployee {
  id: number;
}

export interface JobPosition {
  id: number;
  name: string;
}

export interface JobTitle {
  id: number;
  name: string;
}

export interface WorkModel {
  id: number;
  name: string;
}

export interface EmployeeDocuments {
  documentType: string;
  documentUrl: string;
  id: number;
}[]

export interface NewKI {
  assigned_work: string;
  boss_comment: string;
  boss_ki_point: number;
  completed_work: string;
  date_time: string;
  employee: {
    id: number;
    avatar: string;
    fullName: string;
    firstDayWork: string;
    phoneNumber: string;
    dateOfBirth: string;
    gender: string;
    countryside: string;
    currentResidence: string;
    family: string | null;
    identificationNumber: string | null;
    email: string;
    emergencyContact: string | null;
    favourite: string | null;
    foreignLanguage: string | null;
    education: string;
    english: string | null;
    experience: string | null;
    objectiveInCV: string;
    employeeStatus: string;
    status: string;
    level: string | null;
    facebookLink: string | null;
    telegramLink: string | null;
    linkedInLink: string | null;
    skypeLink: string | null;
    contractInfo: any;
    probationStartDate: string;
    probationEndDate: string;
    officialContractStartDate: string;
    officialContractEndDate: string;
    jobPosition: any;
    jobTitle: any;
    workModel: any;
    employeeDocuments: any;
    user: {
      id: string;
      login: string;
      firstName: string;
      lastName: string;
      email: string;
      activated: boolean;
      langKey: string;
      imageUrl: string | null;
    };
    department: {
      id: number;
      departmentName: string;
      isleader: string;
      mail: string;
      datetime: string | null;
    };
  };
  employee_ki_point: number;
  favourite_work: string;
  leader_comment: string;
  leader_ki_point: number;
  mm_acceptanced: number;
  mm_description: string;
  other_work: string;
  status: string;
  uncompleted_work: string;
  unfavourite_work: string;
  work_attitude: number;
  work_attitude_comment: string;
  work_discipline: number;
  work_discipline_comment: string;
  work_progress: number;
  work_progress_comment: string;
  work_quality: number;
  work_quality_comment: string;
  work_quantity: number;
  work_quantity_comment: string;
}

export interface DetailKI {
  id: number;
  date_time: string;
  work_quantity: number;
  work_quantity_comment: string;
  work_quality: number;
  work_quality_comment: string;
  work_progress: number;
  work_progress_comment: string;
  work_attitude: number;
  work_attitude_comment: string;
  work_discipline: number;
  work_discipline_comment: string;
  assigned_work: string;
  other_work: string;
  completed_work: string;
  uncompleted_work: string;
  favourite_work: string;
  unfavourite_work: string;
  mm_acceptanced: number;
  mm_description: string;
  employee_ki_point: number;
  leader_ki_point: number;
  leader_comment: string;
  boss_ki_point: number;
  boss_comment: string;
  status: string;
  employee: Employee;
  searchField: string;
  responseField: string;
}









