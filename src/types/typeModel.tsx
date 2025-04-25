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

