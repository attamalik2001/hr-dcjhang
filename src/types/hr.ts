export interface LegalHeir {
  id?: number;
  employeeId?: number;
  name: string;
  relation: string;
  cnicOrBForm?: string;
  dateOfBirth?: string;
  contactInfo: string;
  address?: string;
  sharePercentage?: number;
  isBenevolentNominee?: boolean;
  rule17ACandidate?: boolean;
}

export interface AcademicRecord {
  id?: number;
  employeeId?: number;
  degreeTitle: string;
  majorSubjects: string;
  boardOrUniversity: string;
  passingYear: string;
  gradeOrDivision: string;
  verificationStatus?: string;
}

export interface LeaveRecord {
  id?: number;
  employeeId?: number;
  leaveType: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  orderNo: string;
  sanctionedBy?: string;
  status?: string;
  remarks?: string;
}

export interface AcrRecord {
  id?: number;
  employeeId?: number;
  assessmentYear: string;
  postHeld: string;
  reportingOfficer: string;
  countersigningOfficer: string;
  overallGrading: string;
  integrity?: string;
  fitnessForPromotion?: string;
  dossierStatus?: string;
  penPictureRemarks?: string;
}

export interface ServiceHistoryItem {
  id?: number;
  employeeId?: number;
  eventType: string;
  fromBranchOrPost: string;
  toBranchOrPost: string;
  effectiveDate: string;
  orderNumber: string;
  remarks?: string;
}

export interface Employee {
  id: number;
  personnelNumber: string;
  name: string;
  fatherName: string;
  husbandName?: string | null;
  gender: string;
  maritalStatus: string;
  cnic: string;
  dateOfBirth: string;
  bloodGroup?: string;
  religion?: string;
  domicile: string;
  phone: string;
  email?: string | null;
  permanentAddress: string;
  presentAddress?: string | null;
  designation: string;
  bps: string;
  cadre: string;
  branch: string;
  tehsil: string;
  dateOfRecruitment: string;
  employmentStatus: string;
  dateOfRegularization?: string | null;
  jobStatus: string;
  dateOfRetirement?: string | null;
  dateOfDeath?: string | null;
  causeOfDeathOrRemarks?: string | null;
  osdOrderNo?: string | null;
  seniorityNo?: string | null;
  ddoCode?: string;
  gpfNumber?: string | null;
  pensionStatus?: string;
  casualLeaveBalance: number;
  earnedLeaveBalance: number;
  medicalLeaveBalance: number;
  legalHeirs: LegalHeir[];
  academicRecords: AcademicRecord[];
  leaveRecords: LeaveRecord[];
  acrRecords: AcrRecord[];
  serviceHistory: ServiceHistoryItem[];
}

export const DC_JHANG_BRANCHES = [
  'Establishment Branch (DC Office)',
  'Revenue Branch (DC Office)',
  'HRA & Domicile Branch (DC Office)',
  'General & e-Filing Branch (DC Office)',
  'District Nazarat Branch (DC Complex)',
  'Colony & Consolidation Branch',
  'Local Govt & Community Dev Wing',
  'AC Office Jhang Saddar',
  'AC Office Shorkot',
  'AC Office Ahmadpur Sial',
  'AC Office Athara Hazari (18-Hazari)',
  'Establishment Pool (OSD — DC Office Jhang)',
];

export const DC_JHANG_DESIGNATIONS = [
  'Additional Deputy Commissioner (Revenue)',
  'Additional Deputy Commissioner (General)',
  'Assistant Commissioner',
  'Office Superintendent',
  'Tehsildar / Senior Revenue Officer',
  'Naib Tehsildar',
  'Assistant (Head Clerk)',
  'Stenographer',
  'Senior Clerk',
  'Junior Clerk / Data Entry Operator',
  'Qanungo / Field Kanungo',
  'Patwari',
  'Official Driver',
  'Daftri / Record Lifter',
  'Naib Qasid / Dispatch Rider',
  'Chowkidar / Sanitary Worker',
];

export const BPS_SCALES = [
  'BPS-18',
  'BPS-17',
  'BPS-16',
  'BPS-15',
  'BPS-14',
  'BPS-12',
  'BPS-11',
  'BPS-09',
  'BPS-07',
  'BPS-05',
  'BPS-04',
  'BPS-02',
  'BPS-01',
];

export function calculateSuperannuationDate(dob: string): string {
  if (!dob) return '';
  const parts = dob.split('-');
  if (parts.length !== 3) return '';
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  if (isNaN(year) || isNaN(month) || isNaN(day)) return '';
  const date60 = new Date(Date.UTC(year + 60, month, day));
  date60.setUTCDate(date60.getUTCDate() - 1);
  return date60.toISOString().split('T')[0];
}

export function calculateAgeYears(dob: string, referenceDateStr?: string): number {
  if (!dob) return 0;
  const birth = new Date(dob);
  const ref = referenceDateStr ? new Date(referenceDateStr) : new Date();
  if (isNaN(birth.getTime()) || isNaN(ref.getTime())) return 0;
  let age = ref.getFullYear() - birth.getFullYear();
  const m = ref.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && ref.getDate() < birth.getDate())) {
    age--;
  }
  return Math.max(0, age);
}

export function calculateServiceLength(recruitmentDate: string, endDateStr?: string | null): string {
  if (!recruitmentDate) return '—';
  const start = new Date(recruitmentDate);
  const end = endDateStr ? new Date(endDateStr) : new Date();
  if (isNaN(start.getTime()) || isNaN(end.getTime()) || end < start) return '—';
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  if (months < 0) {
    years--;
    months += 12;
  }
  if (years === 0) return `${months} mos`;
  return `${years} yrs ${months} mos`;
}
