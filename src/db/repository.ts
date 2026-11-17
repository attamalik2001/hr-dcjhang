import { desc, eq } from 'drizzle-orm';
import { db } from './index.ts';
import {
  academicRecords,
  acrRecords,
  employees,
  leaveRecords,
  legalHeirs,
  serviceHistory,
} from './schema.ts';

export interface FullEmployeePayload {
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
  casualLeaveBalance?: number;
  earnedLeaveBalance?: number;
  medicalLeaveBalance?: number;
  createdByUid?: string;
  legalHeirs?: Array<{
    name: string;
    relation: string;
    cnicOrBForm?: string;
    dateOfBirth?: string;
    contactInfo: string;
    address?: string;
    sharePercentage?: number;
    isBenevolentNominee?: boolean;
    rule17ACandidate?: boolean;
  }>;
  academicRecords?: Array<{
    degreeTitle: string;
    majorSubjects: string;
    boardOrUniversity: string;
    passingYear: string;
    gradeOrDivision: string;
    verificationStatus?: string;
  }>;
  leaveRecords?: Array<{
    leaveType: string;
    startDate: string;
    endDate: string;
    totalDays: number;
    orderNo: string;
    sanctionedBy?: string;
    status?: string;
    remarks?: string;
  }>;
  acrRecords?: Array<{
    assessmentYear: string;
    postHeld: string;
    reportingOfficer: string;
    countersigningOfficer: string;
    overallGrading: string;
    integrity?: string;
    fitnessForPromotion?: string;
    dossierStatus?: string;
    penPictureRemarks?: string;
  }>;
  serviceHistory?: Array<{
    eventType: string;
    fromBranchOrPost: string;
    toBranchOrPost: string;
    effectiveDate: string;
    orderNumber: string;
    remarks?: string;
  }>;
}

const INITIAL_SEED_EMPLOYEES: FullEmployeePayload[] = [
  {
    personnelNumber: 'DCJ-EST-1994-001',
    name: 'Muhammad Tariq Mahmood Sial',
    fatherName: 'Haji Ghulam Muhammad Sial',
    husbandName: '',
    gender: 'Male',
    maritalStatus: 'Married',
    cnic: '33202-4189203-1',
    dateOfBirth: '1970-04-12',
    bloodGroup: 'O+',
    religion: 'Islam',
    domicile: 'Jhang',
    phone: '0300-6501842',
    email: 'tariq.supdt@dcojhang.punjab.gov.pk',
    permanentAddress: 'House No. 48, Street 4, Civil Lines, Satellite Town, Jhang Sadar',
    presentAddress: 'House No. 48, Street 4, Civil Lines, Satellite Town, Jhang Sadar',
    designation: 'Office Superintendent',
    bps: 'BPS-17',
    cadre: 'District Ministerial Cadre',
    branch: 'Establishment Branch (DC Office)',
    tehsil: 'Jhang',
    dateOfRecruitment: '1994-09-15',
    employmentStatus: 'Regular',
    dateOfRegularization: '1994-09-15',
    jobStatus: 'Active',
    dateOfRetirement: '2030-04-11',
    dateOfDeath: '',
    causeOfDeathOrRemarks: 'Senior-most Superintendent in District Establishment; holding charge of Character Roll & DPC Cell.',
    osdOrderNo: '',
    seniorityNo: 'SN-01 / Supdt',
    ddoCode: 'JH-4012',
    gpfNumber: 'JH-GA-11842',
    pensionStatus: 'In-Service',
    casualLeaveBalance: 17,
    earnedLeaveBalance: 312,
    medicalLeaveBalance: 90,
    legalHeirs: [
      {
        name: 'Suraiya Begum',
        relation: 'Wife',
        cnicOrBForm: '33202-8819204-2',
        dateOfBirth: '1974-08-20',
        contactInfo: '0300-6501843',
        address: 'House No. 48, Civil Lines, Jhang Sadar',
        sharePercentage: 50,
        isBenevolentNominee: true,
        rule17ACandidate: false,
      },
      {
        name: 'Bilal Tariq Sial',
        relation: 'Son',
        cnicOrBForm: '33202-9910283-5',
        dateOfBirth: '1999-02-14',
        contactInfo: '0321-6589012',
        address: 'House No. 48, Civil Lines, Jhang Sadar',
        sharePercentage: 25,
        isBenevolentNominee: false,
        rule17ACandidate: false,
      },
      {
        name: 'Ayesha Tariq',
        relation: 'Daughter',
        cnicOrBForm: '33202-7728190-6',
        dateOfBirth: '2002-11-03',
        contactInfo: '0300-6501842',
        address: 'House No. 48, Civil Lines, Jhang Sadar',
        sharePercentage: 25,
        isBenevolentNominee: false,
        rule17ACandidate: false,
      },
    ],
    academicRecords: [
      {
        degreeTitle: 'M.A Political Science',
        majorSubjects: 'Public Administration, Local Government, Constitutional Law',
        boardOrUniversity: 'University of the Punjab, Lahore',
        passingYear: '1993',
        gradeOrDivision: '2nd Division (58%)',
        verificationStatus: 'Verified',
      },
      {
        degreeTitle: 'B.A (Bachelor of Arts)',
        majorSubjects: 'Economics, Political Science',
        boardOrUniversity: 'Govt. Degree College Jhang / Punjab University',
        passingYear: '1990',
        gradeOrDivision: '1st Division (63%)',
        verificationStatus: 'Verified',
      },
      {
        degreeTitle: 'Matriculation',
        majorSubjects: 'Science Group',
        boardOrUniversity: 'BISE Faisalabad',
        passingYear: '1986',
        gradeOrDivision: '1st Division (A)',
        verificationStatus: 'Verified',
      },
    ],
    leaveRecords: [
      {
        leaveType: 'Casual Leave',
        startDate: '2026-03-10',
        endDate: '2026-03-14',
        totalDays: 5,
        orderNo: 'No. Estt/DCJ/2026-109',
        sanctionedBy: 'Additional Deputy Commissioner (General), Jhang',
        status: 'Availed',
        remarks: 'Family marriage ceremony at Shorkot',
      },
      {
        leaveType: 'Earned Leave (Full Pay)',
        startDate: '2025-08-01',
        endDate: '2025-08-15',
        totalDays: 15,
        orderNo: 'No. Estt/DCJ/2025-882',
        sanctionedBy: 'Deputy Commissioner, Jhang',
        status: 'Availed',
        remarks: 'Perform Umrah pilgrimage with family (Ex-Pakistan NOC issued)',
      },
    ],
    acrRecords: [
      {
        assessmentYear: '2025 (01-01-2025 to 31-12-2025)',
        postHeld: 'Office Superintendent (BPS-17)',
        reportingOfficer: 'Additional Deputy Commissioner (General), Jhang',
        countersigningOfficer: 'Deputy Commissioner, Jhang',
        overallGrading: 'Outstanding',
        integrity: 'Beyond Doubt',
        fitnessForPromotion: 'Fit for Accelerated Promotion',
        dossierStatus: 'Completed & Placed in Dossier',
        penPictureRemarks: 'An exceptionally diligent and well-versed officer in Punjab Civil Servants Act & Estacode rules.',
      },
      {
        assessmentYear: '2024 (01-01-2024 to 31-12-2024)',
        postHeld: 'Office Superintendent (BPS-17)',
        reportingOfficer: 'Additional Deputy Commissioner (Revenue), Jhang',
        countersigningOfficer: 'Deputy Commissioner, Jhang',
        overallGrading: 'Very Good',
        integrity: 'Beyond Doubt',
        fitnessForPromotion: 'Fit for Promotion',
        dossierStatus: 'Completed & Placed in Dossier',
        penPictureRemarks: 'Cleared 100% backlog of pension and Rule 17-A cases within stipulated timeline.',
      },
    ],
    serviceHistory: [
      {
        eventType: 'Initial Appointment',
        fromBranchOrPost: 'Direct Recruitment',
        toBranchOrPost: 'Junior Clerk (BPS-07) — AC Office Shorkot',
        effectiveDate: '1994-09-15',
        orderNumber: 'Order No. Estt/DCJ/94-312',
        remarks: 'Appointed on regular basis through District Selection Committee',
      },
      {
        eventType: 'Promotion / Upgradation',
        fromBranchOrPost: 'Assistant (BPS-16) — Revenue Branch',
        toBranchOrPost: 'Office Superintendent (BPS-17) — Establishment Branch',
        effectiveDate: '2019-06-01',
        orderNumber: 'Order No. Estt/DCJ/2019-1405',
        remarks: 'Promoted on recommendation of DPC-I',
      },
    ],
  },
  {
    personnelNumber: 'DCJ-REV-2014-018',
    name: 'Samina Kausar',
    fatherName: 'Chaudhry Abdul Majeed',
    husbandName: 'Malik Zahid Hussain',
    gender: 'Female',
    maritalStatus: 'Married',
    cnic: '33202-6748291-4',
    dateOfBirth: '1986-09-24',
    bloodGroup: 'B+',
    religion: 'Islam',
    domicile: 'Jhang',
    phone: '0333-6748291',
    email: 'samina.assistant@dcojhang.punjab.gov.pk',
    permanentAddress: 'Mohallah Gulshan-e-Madina, Gojra Road, Jhang Sadar',
    presentAddress: 'Mohallah Gulshan-e-Madina, Gojra Road, Jhang Sadar',
    designation: 'Assistant (Head Clerk)',
    bps: 'BPS-16',
    cadre: 'Ministerial / District Cadre',
    branch: 'HRA & Domicile Branch (DC Office)',
    tehsil: 'Jhang',
    dateOfRecruitment: '2014-03-10',
    employmentStatus: 'Regular',
    dateOfRegularization: '2017-05-12',
    jobStatus: 'Active',
    dateOfRetirement: '2046-09-23',
    dateOfDeath: '',
    causeOfDeathOrRemarks: 'Initially appointed on 3-year contract under Punjab Contract Appointment Policy 2004; regularized in 2017.',
    osdOrderNo: '',
    seniorityNo: 'SN-14 / Asstt',
    ddoCode: 'JH-4012',
    gpfNumber: 'JH-GA-29410',
    pensionStatus: 'In-Service',
    casualLeaveBalance: 20,
    earnedLeaveBalance: 168,
    medicalLeaveBalance: 60,
    legalHeirs: [
      {
        name: 'Malik Zahid Hussain',
        relation: 'Husband',
        cnicOrBForm: '33202-1928374-1',
        dateOfBirth: '1983-01-15',
        contactInfo: '0301-7612398',
        address: 'Mohallah Gulshan-e-Madina, Gojra Road, Jhang Sadar',
        sharePercentage: 50,
        isBenevolentNominee: true,
        rule17ACandidate: false,
      },
      {
        name: 'Zainab Zahid',
        relation: 'Daughter',
        cnicOrBForm: '33202-8837162-8',
        dateOfBirth: '2015-07-19',
        contactInfo: '0301-7612398',
        address: 'Mohallah Gulshan-e-Madina, Gojra Road, Jhang Sadar',
        sharePercentage: 25,
        isBenevolentNominee: false,
        rule17ACandidate: false,
      },
      {
        name: 'Hamza Zahid',
        relation: 'Son',
        cnicOrBForm: '33202-8837163-9',
        dateOfBirth: '2018-11-28',
        contactInfo: '0301-7612398',
        address: 'Mohallah Gulshan-e-Madina, Gojra Road, Jhang Sadar',
        sharePercentage: 25,
        isBenevolentNominee: false,
        rule17ACandidate: false,
      },
    ],
    academicRecords: [
      {
        degreeTitle: 'M.Sc Economics',
        majorSubjects: 'Development Economics, Public Finance, Econometrics',
        boardOrUniversity: 'Government College University, Faisalabad (GCUF)',
        passingYear: '2010',
        gradeOrDivision: '1st Division (CGPA 3.58/4.00)',
        verificationStatus: 'Verified',
      },
      {
        degreeTitle: 'B.Sc (Economics & Statistics)',
        majorSubjects: 'Economics, Statistics, Mathematics',
        boardOrUniversity: 'Govt. Post Graduate College for Women, Jhang',
        passingYear: '2008',
        gradeOrDivision: '1st Division (68%)',
        verificationStatus: 'Verified',
      },
    ],
    leaveRecords: [
      {
        leaveType: 'Maternity Leave',
        startDate: '2018-11-01',
        endDate: '2019-01-29',
        totalDays: 90,
        orderNo: 'No. Estt/DCJ/2018-914',
        sanctionedBy: 'Deputy Commissioner, Jhang',
        status: 'Availed',
        remarks: '90 days maternity leave with full pay under Revised Leave Rules 1981',
      },
      {
        leaveType: 'Casual Leave',
        startDate: '2026-06-02',
        endDate: '2026-06-06',
        totalDays: 5,
        orderNo: 'No. Estt/DCJ/2026-402',
        sanctionedBy: 'Additional Deputy Commissioner (General), Jhang',
        status: 'Approved',
        remarks: 'Domestic affairs',
      },
    ],
    acrRecords: [
      {
        assessmentYear: '2025 (01-01-2025 to 31-12-2025)',
        postHeld: 'Assistant (BPS-16)',
        reportingOfficer: 'Assistant Commissioner (HR & Coordination), Jhang',
        countersigningOfficer: 'Additional Deputy Commissioner (General), Jhang',
        overallGrading: 'Outstanding',
        integrity: 'Beyond Doubt',
        fitnessForPromotion: 'Fit for Promotion',
        dossierStatus: 'Completed & Placed in Dossier',
        penPictureRemarks: 'Maintains exemplary e-Khidmat & Domicile verification turnaround metrics.',
      },
    ],
    serviceHistory: [
      {
        eventType: 'Initial Appointment',
        fromBranchOrPost: 'PPSC Merit Recommendation',
        toBranchOrPost: 'Senior Clerk (BPS-14) — Contract',
        effectiveDate: '2014-03-10',
        orderNumber: 'No. Estt/DCJ/2014-209',
        remarks: 'Appointed via PPSC combined competitive exam',
      },
      {
        eventType: 'Regularization',
        fromBranchOrPost: 'Senior Clerk (Contract)',
        toBranchOrPost: 'Senior Clerk (Regular BPS-14)',
        effectiveDate: '2017-05-12',
        orderNumber: 'No. Estt/DCJ/2017-611',
        remarks: 'Regularized upon satisfactory completion of 3 years service',
      },
      {
        eventType: 'Promotion / Upgradation',
        fromBranchOrPost: 'Senior Clerk (BPS-14)',
        toBranchOrPost: 'Assistant (BPS-16) — HRA Branch',
        effectiveDate: '2022-09-01',
        orderNumber: 'No. Estt/DCJ/2022-1190',
        remarks: 'Promoted to BPS-16',
      },
    ],
  },
  {
    personnelNumber: 'DCJ-REV-1985-004',
    name: 'Rana Ghulam Mustafa Khan',
    fatherName: 'Rana Muhammad Din Khan',
    husbandName: '',
    gender: 'Male',
    maritalStatus: 'Married',
    cnic: '33203-1129485-7',
    dateOfBirth: '1965-05-15',
    bloodGroup: 'A+',
    religion: 'Islam',
    domicile: 'Jhang',
    phone: '0302-7194820',
    email: 'ghulam.mustafa.retd@dcojhang.punjab.gov.pk',
    permanentAddress: 'Chak No. 488/JB, Tehsil Shorkot, District Jhang',
    presentAddress: 'Housing Colony No. 1, Shorkot City, District Jhang',
    designation: 'Tehsildar / Senior Revenue Officer',
    bps: 'BPS-16',
    cadre: 'Subordinate Executive / Revenue Cadre',
    branch: 'AC Office Shorkot (Revenue Wing)',
    tehsil: 'Shorkot',
    dateOfRecruitment: '1985-11-04',
    employmentStatus: 'Regular',
    dateOfRegularization: '1985-11-04',
    jobStatus: 'Retired (After 60 Years)',
    dateOfRetirement: '2025-05-14',
    dateOfDeath: '',
    causeOfDeathOrRemarks: 'Retired cleanly upon attaining the age of superannuation (60 years) after 39 years 6 months of spotless service. PPO & Gratuity sanctioned.',
    osdOrderNo: '',
    seniorityNo: 'RETD-2025-09',
    ddoCode: 'JH-4018',
    gpfNumber: 'JH-REV-04912',
    pensionStatus: 'PPO Issued',
    casualLeaveBalance: 0,
    earnedLeaveBalance: 365,
    medicalLeaveBalance: 0,
    legalHeirs: [
      {
        name: 'Kaneez Fatima',
        relation: 'Wife',
        cnicOrBForm: '33203-4481920-4',
        dateOfBirth: '1969-10-10',
        contactInfo: '0302-7194821',
        address: 'Chak No. 488/JB, Tehsil Shorkot, District Jhang',
        sharePercentage: 60,
        isBenevolentNominee: true,
        rule17ACandidate: false,
      },
      {
        name: 'Rana Kashif Mustafa',
        relation: 'Son',
        cnicOrBForm: '33203-7748291-3',
        dateOfBirth: '1993-04-02',
        contactInfo: '0345-7819203',
        address: 'Chak No. 488/JB, Tehsil Shorkot, District Jhang',
        sharePercentage: 40,
        isBenevolentNominee: false,
        rule17ACandidate: false,
      },
    ],
    academicRecords: [
      {
        degreeTitle: 'B.A & Revenue Qualifying Exam (Tehsildari)',
        majorSubjects: 'Land Revenue Act 1967, Tenancy Act, Settlement Manual',
        boardOrUniversity: 'Board of Revenue Punjab / Punjab University',
        passingYear: '1992',
        gradeOrDivision: '1st Class Pass with Distinction in Revenue Law',
        verificationStatus: 'Verified',
      },
    ],
    leaveRecords: [
      {
        leaveType: 'LPR (Leave Preparatory to Retirement)',
        startDate: '2024-11-15',
        endDate: '2025-05-14',
        totalDays: 180,
        orderNo: 'No. BOR/Rev/DCJ/2024-771',
        sanctionedBy: 'Commissioner Faisalabad Division / DC Jhang',
        status: 'Availed',
        remarks: 'Encashment in lieu of LPR sanctioned upon superannuation at 60 years age',
      },
    ],
    acrRecords: [
      {
        assessmentYear: '2024 (01-01-2024 to 31-12-2024)',
        postHeld: 'Naib Tehsildar / Officiating Tehsildar Shorkot',
        reportingOfficer: 'Assistant Commissioner, Shorkot',
        countersigningOfficer: 'Deputy Commissioner, Jhang',
        overallGrading: 'Very Good',
        integrity: 'Beyond Doubt',
        fitnessForPromotion: 'Fit for Promotion',
        dossierStatus: 'Completed & Placed in Dossier',
        penPictureRemarks: 'Complete 39-year ACR synopsis verified for pension paper finalization.',
      },
    ],
    serviceHistory: [
      {
        eventType: 'Initial Appointment',
        fromBranchOrPost: 'Direct Selection',
        toBranchOrPost: 'Patwari (BPS-05) — Halqa Shorkot',
        effectiveDate: '1985-11-04',
        orderNumber: 'No. AC-SKT/85-118',
        remarks: 'Passed Patwar examination at Jhang',
      },
      {
        eventType: 'Retirement',
        fromBranchOrPost: 'Revenue Officer (BPS-16) — Tehsil Shorkot',
        toBranchOrPost: 'Superannuated upon attaining 60 years of age',
        effectiveDate: '2025-05-14',
        orderNumber: 'Notification No. Estt/DCJ/2025-510',
        remarks: 'Pension Payment Order (PPO) issued by District Accounts Office Jhang',
      },
    ],
  },
  {
    personnelNumber: 'DCJ-FLD-2006-042',
    name: 'Syed Ali Raza Shah (Late)',
    fatherName: 'Syed Nazar Hussain Shah',
    husbandName: '',
    gender: 'Male',
    maritalStatus: 'Married',
    cnic: '33204-5518294-9',
    dateOfBirth: '1979-02-18',
    bloodGroup: 'AB+',
    religion: 'Islam',
    domicile: 'Jhang',
    phone: '0312-6481920',
    email: '',
    permanentAddress: 'Mouza Garh Maharaja, Tehsil Ahmadpur Sial, District Jhang',
    presentAddress: 'Mouza Garh Maharaja, Tehsil Ahmadpur Sial, District Jhang',
    designation: 'Senior Clerk (Vernacular)',
    bps: 'BPS-14',
    cadre: 'Ministerial Cadre',
    branch: 'AC Office Ahmadpur Sial',
    tehsil: 'Ahmadpur Sial',
    dateOfRecruitment: '2006-07-01',
    employmentStatus: 'Regular',
    dateOfRegularization: '2009-07-01',
    jobStatus: 'Died During Service',
    dateOfRetirement: '2039-02-17',
    dateOfDeath: '2025-11-08',
    causeOfDeathOrRemarks: 'Expired during active flood relief duty due to sudden cardiac arrest. Financial Assistance Package, Group Insurance & Family Pension sanctioned.',
    osdOrderNo: '',
    seniorityNo: 'DECEASED-2025-03',
    ddoCode: 'JH-4024',
    gpfNumber: 'JH-GA-18923',
    pensionStatus: 'Family Pension Active',
    casualLeaveBalance: 14,
    earnedLeaveBalance: 194,
    medicalLeaveBalance: 90,
    legalHeirs: [
      {
        name: 'Syeda Rubab Zahra',
        relation: 'Widow',
        cnicOrBForm: '33204-8829104-6',
        dateOfBirth: '1984-06-12',
        contactInfo: '0312-6481920',
        address: 'Mouza Garh Maharaja, Tehsil Ahmadpur Sial, District Jhang',
        sharePercentage: 50,
        isBenevolentNominee: true,
        rule17ACandidate: false,
      },
      {
        name: 'Syed Hassan Raza Shah',
        relation: 'Son',
        cnicOrBForm: '33204-9948102-1',
        dateOfBirth: '2006-03-21',
        contactInfo: '0315-6481999',
        address: 'Mouza Garh Maharaja, Tehsil Ahmadpur Sial, District Jhang',
        sharePercentage: 25,
        isBenevolentNominee: false,
        rule17ACandidate: true,
      },
      {
        name: 'Syeda Dua Fatima',
        relation: 'Daughter',
        cnicOrBForm: '33204-9948103-2',
        dateOfBirth: '2011-09-10',
        contactInfo: '0312-6481920',
        address: 'Mouza Garh Maharaja, Tehsil Ahmadpur Sial, District Jhang',
        sharePercentage: 25,
        isBenevolentNominee: false,
        rule17ACandidate: false,
      },
    ],
    academicRecords: [
      {
        degreeTitle: 'B.Com (Bachelor of Commerce)',
        majorSubjects: 'Accounting, Auditing, Business Taxation',
        boardOrUniversity: 'Bahauddin Zakariya University, Multan',
        passingYear: '2004',
        gradeOrDivision: '2nd Division (59%)',
        verificationStatus: 'Verified',
      },
    ],
    leaveRecords: [
      {
        leaveType: 'Medical Leave',
        startDate: '2025-04-10',
        endDate: '2025-04-19',
        totalDays: 10,
        orderNo: 'No. AC-APS/2025-114',
        sanctionedBy: 'Assistant Commissioner, Ahmadpur Sial',
        status: 'Availed',
        remarks: 'Hospitalization at DHQ Hospital Jhang',
      },
    ],
    acrRecords: [
      {
        assessmentYear: '2024 (01-01-2024 to 31-12-2024)',
        postHeld: 'Senior Clerk (BPS-14)',
        reportingOfficer: 'Assistant Commissioner, Ahmadpur Sial',
        countersigningOfficer: 'Deputy Commissioner, Jhang',
        overallGrading: 'Good',
        integrity: 'Beyond Doubt',
        fitnessForPromotion: 'Fit for Promotion',
        dossierStatus: 'Completed & Placed in Dossier',
        penPictureRemarks: 'Dedicated official who served diligently during Chenab River flood relief operations.',
      },
    ],
    serviceHistory: [
      {
        eventType: 'Initial Appointment',
        fromBranchOrPost: 'Recruitment Committee',
        toBranchOrPost: 'Junior Clerk (BPS-07) — AC Office Ahmadpur Sial',
        effectiveDate: '2006-07-01',
        orderNumber: 'No. Estt/DCJ/2006-318',
        remarks: 'Appointed on contract basis',
      },
      {
        eventType: 'Regularization',
        fromBranchOrPost: 'Junior Clerk (Contract)',
        toBranchOrPost: 'Junior Clerk (Regular)',
        effectiveDate: '2009-07-01',
        orderNumber: 'No. Estt/DCJ/2009-440',
        remarks: 'Regularized by Government of the Punjab Notification',
      },
      {
        eventType: 'Demise in Service',
        fromBranchOrPost: 'Senior Clerk (BPS-14) — Ahmadpur Sial',
        toBranchOrPost: 'Deceased During Active Service',
        effectiveDate: '2025-11-08',
        orderNumber: 'Notification No. Estt/DCJ/2025-1204',
        remarks: 'OSD Post created for financial assistance package & family pension under Punjab Civil Servants Pension Rules',
      },
    ],
  },
  {
    personnelNumber: 'DCJ-OSD-2011-029',
    name: 'Mahr Mumtaz Ahmad Bharwana',
    fatherName: 'Mahr Sultan Ahmad Bharwana',
    husbandName: '',
    gender: 'Male',
    maritalStatus: 'Married',
    cnic: '33202-3391827-5',
    dateOfBirth: '1981-12-03',
    bloodGroup: 'B+',
    religion: 'Islam',
    domicile: 'Jhang',
    phone: '0300-7918234',
    email: 'mumtaz.bharwana@dcojhang.punjab.gov.pk',
    permanentAddress: 'Kot Shakir, Tehsil Athara Hazari (18-Hazari), District Jhang',
    presentAddress: 'Satellite Town Block-B, Jhang Sadar',
    designation: 'Naib Tehsildar (OSD — Establishment Pool)',
    bps: 'BPS-16',
    cadre: 'Revenue Executive Cadre',
    branch: 'Establishment Pool (OSD — DC Office Jhang)',
    tehsil: 'Athara Hazari',
    dateOfRecruitment: '2011-02-14',
    employmentStatus: 'Regular',
    dateOfRegularization: '2011-02-14',
    jobStatus: 'OSD',
    dateOfRetirement: '2041-12-02',
    dateOfDeath: '',
    causeOfDeathOrRemarks: 'Placed as Officer on Special Duty (OSD) in DC Office Jhang Establishment Pool awaiting fresh Circle posting after completion of deputation/settlement course.',
    osdOrderNo: 'Order No. Estt/DCJ/2026-218 dated 18-02-2026',
    seniorityNo: 'SN-08 / NT',
    ddoCode: 'JH-4012',
    gpfNumber: 'JH-REV-22819',
    pensionStatus: 'In-Service',
    casualLeaveBalance: 22,
    earnedLeaveBalance: 140,
    medicalLeaveBalance: 75,
    legalHeirs: [
      {
        name: 'Nusrat Bibi',
        relation: 'Wife',
        cnicOrBForm: '33202-3391828-6',
        dateOfBirth: '1985-05-10',
        contactInfo: '0300-7918235',
        address: 'Kot Shakir, Tehsil 18-Hazari, District Jhang',
        sharePercentage: 100,
        isBenevolentNominee: true,
        rule17ACandidate: false,
      },
    ],
    academicRecords: [
      {
        degreeTitle: 'LL.B (Bachelor of Laws)',
        majorSubjects: 'Civil Procedure Code, Land Laws, Constitutional Law',
        boardOrUniversity: 'University of Sargodha',
        passingYear: '2009',
        gradeOrDivision: '1st Division',
        verificationStatus: 'Verified',
      },
    ],
    leaveRecords: [],
    acrRecords: [
      {
        assessmentYear: '2025 (01-01-2025 to 31-12-2025)',
        postHeld: 'Naib Tehsildar — Halqa 18-Hazari',
        reportingOfficer: 'Assistant Commissioner, Athara Hazari',
        countersigningOfficer: 'Additional Deputy Commissioner (Revenue), Jhang',
        overallGrading: 'Good',
        integrity: 'Honest',
        fitnessForPromotion: 'Fit for Promotion',
        dossierStatus: 'Awaiting Countersignature',
        penPictureRemarks: 'Submitted to ADC(R) office for countersignature.',
      },
    ],
    serviceHistory: [
      {
        eventType: 'OSD Attachment',
        fromBranchOrPost: 'Naib Tehsildar Circle 18-Hazari',
        toBranchOrPost: 'OSD — Establishment Branch DC Office Jhang',
        effectiveDate: '2026-02-18',
        orderNumber: 'Order No. Estt/DCJ/2026-218',
        remarks: 'Reporting to ADC(G) / Establishment Pool pending field posting',
      },
    ],
  },
  {
    personnelNumber: 'DCJ-IT-2023-064',
    name: 'Rimsha Noor',
    fatherName: 'Muhammad Ashraf',
    husbandName: '',
    gender: 'Female',
    maritalStatus: 'Single',
    cnic: '33202-9182736-2',
    dateOfBirth: '1998-07-11',
    bloodGroup: 'O-',
    religion: 'Islam',
    domicile: 'Jhang',
    phone: '0334-9182736',
    email: 'rimsha.it@dcojhang.punjab.gov.pk',
    permanentAddress: 'Street No. 2, Yousaf Shah Road, Near Session Chowk, Jhang Sadar',
    presentAddress: 'Street No. 2, Yousaf Shah Road, Near Session Chowk, Jhang Sadar',
    designation: 'Junior Clerk / Data Entry Operator',
    bps: 'BPS-11',
    cadre: 'IT / Ministerial Wing',
    branch: 'General & e-Filing Branch (DC Office)',
    tehsil: 'Jhang',
    dateOfRecruitment: '2023-10-02',
    employmentStatus: 'Contract',
    dateOfRegularization: '',
    jobStatus: 'Active',
    dateOfRetirement: '2058-07-10',
    dateOfDeath: '',
    causeOfDeathOrRemarks: '3-year renewable contract under Punjab Contract Appointment Policy; eligible for regularization assessment in Oct 2026.',
    osdOrderNo: '',
    seniorityNo: 'CONT-2023-12',
    ddoCode: 'JH-4012',
    gpfNumber: 'N/A (Contract)',
    pensionStatus: 'In-Service',
    casualLeaveBalance: 21,
    earnedLeaveBalance: 45,
    medicalLeaveBalance: 90,
    legalHeirs: [
      {
        name: 'Muhammad Ashraf',
        relation: 'Father',
        cnicOrBForm: '33202-1182736-1',
        dateOfBirth: '1966-01-01',
        contactInfo: '0300-8812736',
        address: 'Yousaf Shah Road, Jhang Sadar',
        sharePercentage: 50,
        isBenevolentNominee: true,
        rule17ACandidate: false,
      },
      {
        name: 'Parveen Akhtar',
        relation: 'Mother',
        cnicOrBForm: '33202-1182737-2',
        dateOfBirth: '1970-03-15',
        contactInfo: '0300-8812736',
        address: 'Yousaf Shah Road, Jhang Sadar',
        sharePercentage: 50,
        isBenevolentNominee: false,
        rule17ACandidate: false,
      },
    ],
    academicRecords: [
      {
        degreeTitle: 'BS Computer Science (4-Year Hons)',
        majorSubjects: 'Database Systems, Software Engineering, Networks',
        boardOrUniversity: 'University of Jhang (UoJ)',
        passingYear: '2021',
        gradeOrDivision: '1st Division (CGPA 3.74/4.00)',
        verificationStatus: 'Verified',
      },
    ],
    leaveRecords: [
      {
        leaveType: 'Casual Leave',
        startDate: '2026-01-20',
        endDate: '2026-01-23',
        totalDays: 4,
        orderNo: 'No. Gen/DCJ/2026-31',
        sanctionedBy: 'Assistant Commissioner (General), Jhang',
        status: 'Availed',
        remarks: 'Personal work',
      },
    ],
    acrRecords: [
      {
        assessmentYear: '2025 (01-01-2025 to 31-12-2025)',
        postHeld: 'Junior Clerk / DEO (BPS-11)',
        reportingOfficer: 'Office Superintendent, General Branch',
        countersigningOfficer: 'Additional Deputy Commissioner (General), Jhang',
        overallGrading: 'Outstanding',
        integrity: 'Beyond Doubt',
        fitnessForPromotion: 'Fit for Promotion',
        dossierStatus: 'Completed & Placed in Dossier',
        penPictureRemarks: 'Digitized 4,200 historical revenue & domicile files with zero error rate.',
      },
    ],
    serviceHistory: [
      {
        eventType: 'Initial Appointment',
        fromBranchOrPost: 'Direct Contract Selection',
        toBranchOrPost: 'Junior Clerk / DEO (BPS-11) — General Branch',
        effectiveDate: '2023-10-02',
        orderNumber: 'No. Estt/DCJ/2023-890',
        remarks: 'Appointed on 3-year contract after 45 WPM typing proficiency test',
      },
    ],
  },
  {
    personnelNumber: 'DCJ-NAZ-2024-091',
    name: 'Allah Ditta',
    fatherName: 'Faqeer Muhammad',
    husbandName: '',
    gender: 'Male',
    maritalStatus: 'Married',
    cnic: '33202-5591028-3',
    dateOfBirth: '1995-03-05',
    bloodGroup: 'B+',
    religion: 'Islam',
    domicile: 'Jhang',
    phone: '0346-5591028',
    email: '',
    permanentAddress: 'Basti Loharan, Jhang City',
    presentAddress: 'Basti Loharan, Jhang City',
    designation: 'Naib Qasid / Dispatch Rider',
    bps: 'BPS-02',
    cadre: 'Support / Class-IV Staff',
    branch: 'District Nazarat Branch (DC Complex)',
    tehsil: 'Jhang',
    dateOfRecruitment: '2024-01-15',
    employmentStatus: 'Daily Wages',
    dateOfRegularization: '',
    jobStatus: 'Active',
    dateOfRetirement: '2055-03-04',
    dateOfDeath: '',
    causeOfDeathOrRemarks: 'Engaged on Deputy Commissioner Jhang approved Daily Wages / Contingent Schedule rate for Circuit House & Dak distribution.',
    osdOrderNo: '',
    seniorityNo: 'DW-2024-07',
    ddoCode: 'JH-4012',
    gpfNumber: 'N/A (Daily Wages)',
    pensionStatus: 'In-Service',
    casualLeaveBalance: 15,
    earnedLeaveBalance: 0,
    medicalLeaveBalance: 15,
    legalHeirs: [
      {
        name: 'Shahnaz Bibi',
        relation: 'Wife',
        cnicOrBForm: '33202-5591029-4',
        dateOfBirth: '1997-08-12',
        contactInfo: '0346-5591028',
        address: 'Basti Loharan, Jhang City',
        sharePercentage: 100,
        isBenevolentNominee: true,
        rule17ACandidate: false,
      },
    ],
    academicRecords: [
      {
        degreeTitle: 'Matriculation',
        majorSubjects: 'Arts Group',
        boardOrUniversity: 'BISE Faisalabad',
        passingYear: '2012',
        gradeOrDivision: '2nd Division',
        verificationStatus: 'Verified',
      },
    ],
    leaveRecords: [],
    acrRecords: [],
    serviceHistory: [
      {
        eventType: 'Initial Appointment',
        fromBranchOrPost: 'Nazarat Contingent Pool',
        toBranchOrPost: 'Naib Qasid / Dak Rider — District Nazarat Branch',
        effectiveDate: '2024-01-15',
        orderNumber: 'No. Nazarat/DCJ/2024-19',
        remarks: 'Sanctioned under Daily Wages head for District Complex dak operations',
      },
    ],
  },
];

let isSeeding = false;

export async function ensureSeededIfEmpty() {
  if (isSeeding) return;
  try {
    const existing = await db.select({ id: employees.id }).from(employees).limit(1);
    if (existing.length > 0) {
      return;
    }
    isSeeding = true;
    for (const item of INITIAL_SEED_EMPLOYEES) {
      await createFullEmployee(item);
    }
  } catch (error) {
    console.error('Error seeding initial DC Office Jhang HR records:', error);
  } finally {
    isSeeding = false;
  }
}

export async function getAllEmployeesWithDetails() {
  try {
    await ensureSeededIfEmpty();
    const result = await db.query.employees.findMany({
      orderBy: [desc(employees.id)],
      with: {
        legalHeirs: true,
        academicRecords: true,
        leaveRecords: true,
        acrRecords: true,
        serviceHistory: true,
      },
    });
    return result;
  } catch (error) {
    console.error('Database query failed in getAllEmployeesWithDetails:', error);
    throw new Error('Failed to load employee records from database.', { cause: error });
  }
}

export async function getEmployeeByIdWithDetails(id: number) {
  try {
    const result = await db.query.employees.findFirst({
      where: eq(employees.id, id),
      with: {
        legalHeirs: true,
        academicRecords: true,
        leaveRecords: true,
        acrRecords: true,
        serviceHistory: true,
      },
    });
    return result || null;
  } catch (error) {
    console.error('Database query failed in getEmployeeByIdWithDetails:', error);
    throw new Error('Failed to retrieve employee profile.', { cause: error });
  }
}

export async function createFullEmployee(payload: FullEmployeePayload) {
  try {
    const [inserted] = await db
      .insert(employees)
      .values({
        personnelNumber: payload.personnelNumber,
        name: payload.name,
        fatherName: payload.fatherName,
        husbandName: payload.husbandName || null,
        gender: payload.gender,
        maritalStatus: payload.maritalStatus || 'Married',
        cnic: payload.cnic,
        dateOfBirth: payload.dateOfBirth,
        bloodGroup: payload.bloodGroup || 'B+',
        religion: payload.religion || 'Islam',
        domicile: payload.domicile || 'Jhang',
        phone: payload.phone,
        email: payload.email || null,
        permanentAddress: payload.permanentAddress,
        presentAddress: payload.presentAddress || payload.permanentAddress,
        designation: payload.designation,
        bps: payload.bps,
        cadre: payload.cadre || 'Ministerial / District Cadre',
        branch: payload.branch,
        tehsil: payload.tehsil || 'Jhang',
        dateOfRecruitment: payload.dateOfRecruitment,
        employmentStatus: payload.employmentStatus,
        dateOfRegularization: payload.dateOfRegularization || null,
        jobStatus: payload.jobStatus,
        dateOfRetirement: payload.dateOfRetirement || null,
        dateOfDeath: payload.dateOfDeath || null,
        causeOfDeathOrRemarks: payload.causeOfDeathOrRemarks || null,
        osdOrderNo: payload.osdOrderNo || null,
        seniorityNo: payload.seniorityNo || null,
        ddoCode: payload.ddoCode || 'JH-4012',
        gpfNumber: payload.gpfNumber || null,
        pensionStatus: payload.pensionStatus || 'In-Service',
        casualLeaveBalance: payload.casualLeaveBalance ?? 25,
        earnedLeaveBalance: payload.earnedLeaveBalance ?? 120,
        medicalLeaveBalance: payload.medicalLeaveBalance ?? 90,
        createdByUid: payload.createdByUid || null,
      })
      .returning();

    const empId = inserted.id;

    if (payload.legalHeirs && payload.legalHeirs.length > 0) {
      await db.insert(legalHeirs).values(
        payload.legalHeirs.map((h) => ({
          employeeId: empId,
          name: h.name,
          relation: h.relation,
          cnicOrBForm: h.cnicOrBForm || '',
          dateOfBirth: h.dateOfBirth || '',
          contactInfo: h.contactInfo,
          address: h.address || payload.permanentAddress,
          sharePercentage: h.sharePercentage ?? 100,
          isBenevolentNominee: h.isBenevolentNominee ?? true,
          rule17ACandidate: h.rule17ACandidate ?? false,
        }))
      );
    }

    if (payload.academicRecords && payload.academicRecords.length > 0) {
      await db.insert(academicRecords).values(
        payload.academicRecords.map((a) => ({
          employeeId: empId,
          degreeTitle: a.degreeTitle,
          majorSubjects: a.majorSubjects,
          boardOrUniversity: a.boardOrUniversity,
          passingYear: a.passingYear,
          gradeOrDivision: a.gradeOrDivision,
          verificationStatus: a.verificationStatus || 'Verified',
        }))
      );
    }

    if (payload.leaveRecords && payload.leaveRecords.length > 0) {
      await db.insert(leaveRecords).values(
        payload.leaveRecords.map((l) => ({
          employeeId: empId,
          leaveType: l.leaveType,
          startDate: l.startDate,
          endDate: l.endDate,
          totalDays: l.totalDays,
          orderNo: l.orderNo,
          sanctionedBy: l.sanctionedBy || 'Deputy Commissioner, Jhang',
          status: l.status || 'Approved',
          remarks: l.remarks || '',
        }))
      );
    }

    if (payload.acrRecords && payload.acrRecords.length > 0) {
      await db.insert(acrRecords).values(
        payload.acrRecords.map((r) => ({
          employeeId: empId,
          assessmentYear: r.assessmentYear,
          postHeld: r.postHeld,
          reportingOfficer: r.reportingOfficer,
          countersigningOfficer: r.countersigningOfficer,
          overallGrading: r.overallGrading,
          integrity: r.integrity || 'Beyond Doubt',
          fitnessForPromotion: r.fitnessForPromotion || 'Fit for Promotion',
          dossierStatus: r.dossierStatus || 'Completed & Placed in Dossier',
          penPictureRemarks: r.penPictureRemarks || '',
        }))
      );
    }

    if (payload.serviceHistory && payload.serviceHistory.length > 0) {
      await db.insert(serviceHistory).values(
        payload.serviceHistory.map((s) => ({
          employeeId: empId,
          eventType: s.eventType,
          fromBranchOrPost: s.fromBranchOrPost,
          toBranchOrPost: s.toBranchOrPost,
          effectiveDate: s.effectiveDate,
          orderNumber: s.orderNumber,
          remarks: s.remarks || '',
        }))
      );
    }

    return await getEmployeeByIdWithDetails(empId);
  } catch (error) {
    console.error('Database query failed in createFullEmployee:', error);
    throw new Error('Failed to create employee record in database.', { cause: error });
  }
}

export async function updateFullEmployee(id: number, payload: FullEmployeePayload) {
  try {
    await db
      .update(employees)
      .set({
        personnelNumber: payload.personnelNumber,
        name: payload.name,
        fatherName: payload.fatherName,
        husbandName: payload.husbandName || null,
        gender: payload.gender,
        maritalStatus: payload.maritalStatus || 'Married',
        cnic: payload.cnic,
        dateOfBirth: payload.dateOfBirth,
        bloodGroup: payload.bloodGroup || 'B+',
        religion: payload.religion || 'Islam',
        domicile: payload.domicile || 'Jhang',
        phone: payload.phone,
        email: payload.email || null,
        permanentAddress: payload.permanentAddress,
        presentAddress: payload.presentAddress || payload.permanentAddress,
        designation: payload.designation,
        bps: payload.bps,
        cadre: payload.cadre || 'Ministerial / District Cadre',
        branch: payload.branch,
        tehsil: payload.tehsil || 'Jhang',
        dateOfRecruitment: payload.dateOfRecruitment,
        employmentStatus: payload.employmentStatus,
        dateOfRegularization: payload.dateOfRegularization || null,
        jobStatus: payload.jobStatus,
        dateOfRetirement: payload.dateOfRetirement || null,
        dateOfDeath: payload.dateOfDeath || null,
        causeOfDeathOrRemarks: payload.causeOfDeathOrRemarks || null,
        osdOrderNo: payload.osdOrderNo || null,
        seniorityNo: payload.seniorityNo || null,
        ddoCode: payload.ddoCode || 'JH-4012',
        gpfNumber: payload.gpfNumber || null,
        pensionStatus: payload.pensionStatus || 'In-Service',
        casualLeaveBalance: payload.casualLeaveBalance ?? 25,
        earnedLeaveBalance: payload.earnedLeaveBalance ?? 120,
        medicalLeaveBalance: payload.medicalLeaveBalance ?? 90,
        updatedAt: new Date(),
      })
      .where(eq(employees.id, id));

    if (payload.legalHeirs) {
      await db.delete(legalHeirs).where(eq(legalHeirs.employeeId, id));
      if (payload.legalHeirs.length > 0) {
        await db.insert(legalHeirs).values(
          payload.legalHeirs.map((h) => ({
            employeeId: id,
            name: h.name,
            relation: h.relation,
            cnicOrBForm: h.cnicOrBForm || '',
            dateOfBirth: h.dateOfBirth || '',
            contactInfo: h.contactInfo,
            address: h.address || payload.permanentAddress,
            sharePercentage: h.sharePercentage ?? 100,
            isBenevolentNominee: h.isBenevolentNominee ?? true,
            rule17ACandidate: h.rule17ACandidate ?? false,
          }))
        );
      }
    }

    if (payload.academicRecords) {
      await db.delete(academicRecords).where(eq(academicRecords.employeeId, id));
      if (payload.academicRecords.length > 0) {
        await db.insert(academicRecords).values(
          payload.academicRecords.map((a) => ({
            employeeId: id,
            degreeTitle: a.degreeTitle,
            majorSubjects: a.majorSubjects,
            boardOrUniversity: a.boardOrUniversity,
            passingYear: a.passingYear,
            gradeOrDivision: a.gradeOrDivision,
            verificationStatus: a.verificationStatus || 'Verified',
          }))
        );
      }
    }

    if (payload.leaveRecords) {
      await db.delete(leaveRecords).where(eq(leaveRecords.employeeId, id));
      if (payload.leaveRecords.length > 0) {
        await db.insert(leaveRecords).values(
          payload.leaveRecords.map((l) => ({
            employeeId: id,
            leaveType: l.leaveType,
            startDate: l.startDate,
            endDate: l.endDate,
            totalDays: l.totalDays,
            orderNo: l.orderNo,
            sanctionedBy: l.sanctionedBy || 'Deputy Commissioner, Jhang',
            status: l.status || 'Approved',
            remarks: l.remarks || '',
          }))
        );
      }
    }

    if (payload.acrRecords) {
      await db.delete(acrRecords).where(eq(acrRecords.employeeId, id));
      if (payload.acrRecords.length > 0) {
        await db.insert(acrRecords).values(
          payload.acrRecords.map((r) => ({
            employeeId: id,
            assessmentYear: r.assessmentYear,
            postHeld: r.postHeld,
            reportingOfficer: r.reportingOfficer,
            countersigningOfficer: r.countersigningOfficer,
            overallGrading: r.overallGrading,
            integrity: r.integrity || 'Beyond Doubt',
            fitnessForPromotion: r.fitnessForPromotion || 'Fit for Promotion',
            dossierStatus: r.dossierStatus || 'Completed & Placed in Dossier',
            penPictureRemarks: r.penPictureRemarks || '',
          }))
        );
      }
    }

    if (payload.serviceHistory) {
      await db.delete(serviceHistory).where(eq(serviceHistory.employeeId, id));
      if (payload.serviceHistory.length > 0) {
        await db.insert(serviceHistory).values(
          payload.serviceHistory.map((s) => ({
            employeeId: id,
            eventType: s.eventType,
            fromBranchOrPost: s.fromBranchOrPost,
            toBranchOrPost: s.toBranchOrPost,
            effectiveDate: s.effectiveDate,
            orderNumber: s.orderNumber,
            remarks: s.remarks || '',
          }))
        );
      }
    }

    return await getEmployeeByIdWithDetails(id);
  } catch (error) {
    console.error('Database query failed in updateFullEmployee:', error);
    throw new Error('Failed to update employee record in database.', { cause: error });
  }
}

export async function deleteEmployeeRecord(id: number) {
  try {
    await db.delete(employees).where(eq(employees.id, id));
    return { deleted: true, id };
  } catch (error) {
    console.error('Database query failed in deleteEmployeeRecord:', error);
    throw new Error('Failed to delete employee record from database.', { cause: error });
  }
}
