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
}

export interface DepartmentMember {
  id: number;
  departmentName: string;
  isleader: string;
  mail: string;
  datetime: string | null;
  user: {
    id: string;
    login: string;
    firstName: string | null;
    lastName: string | null;
    email: string;
    activated: boolean;
    langKey: string;
    imageUrl: string | null;
  };
}

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
  jobPosition: {
    id: number;
    name: string;
  };
  jobTitle: {
    id: number;
    name: string;
  };
  workModel: {
    id: number;
    name: string;
  };
  employeeDocuments: any | null;
  user: {
    id: string;
    login: string;
    firstName: string | null;
    lastName: string | null;
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
  employeeDocuments: {
    documentType: 'CERTIFICATE' | string;
    documentUrl: string;
    id: number;
  }[];
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





