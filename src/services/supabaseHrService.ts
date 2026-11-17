import { supabase } from '../lib/supabase';
import { Employee } from '../types/hr';

const LOCAL_CACHE_KEY = 'dc_jhang_hrms_supabase_cache_v1';

export const INITIAL_DISTRICT_JHANG_EMPLOYEES: Omit<Employee, 'id'>[] = [
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
    causeOfDeathOrRemarks:
      'Senior-most Superintendent in District Establishment; holding charge of Character Roll & DPC Cell.',
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
        penPictureRemarks:
          'An exceptionally diligent and well-versed officer in Punjab Civil Servants Act & Estacode rules.',
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
    causeOfDeathOrRemarks:
      'Initially appointed on 3-year contract under Punjab Contract Appointment Policy 2004; regularized in 2017.',
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
        sharePercentage: 50,
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
        remarks: '90 days maternity leave with full pay',
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
        penPictureRemarks: 'Maintains exemplary Domicile verification turnaround metrics.',
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
        remarks: 'Regularized upon completion of 3 years contract service',
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
    causeOfDeathOrRemarks:
      'Retired cleanly upon attaining the age of superannuation (60 years) after 39 years 6 months of spotless service. PPO & Gratuity sanctioned.',
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
        penPictureRemarks: 'Complete 39-year ACR synopsis verified for pension finalization.',
      },
    ],
    serviceHistory: [
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
    causeOfDeathOrRemarks:
      'Expired during active flood relief duty due to sudden cardiac arrest. Financial Assistance Package, Group Insurance & Family Pension sanctioned.',
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
    leaveRecords: [],
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
        penPictureRemarks:
          'Dedicated official who served diligently during Chenab River flood relief operations.',
      },
    ],
    serviceHistory: [
      {
        eventType: 'Demise in Service',
        fromBranchOrPost: 'Senior Clerk (BPS-14) — Ahmadpur Sial',
        toBranchOrPost: 'Deceased During Active Service',
        effectiveDate: '2025-11-08',
        orderNumber: 'Notification No. Estt/DCJ/2025-1204',
        remarks:
          'OSD Post created for financial assistance package & family pension under Punjab Civil Servants Pension Rules',
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
    causeOfDeathOrRemarks:
      'Placed as Officer on Special Duty (OSD) in DC Office Jhang Establishment Pool awaiting fresh Circle posting after completion of deputation/settlement course.',
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
    causeOfDeathOrRemarks:
      '3-year renewable contract under Punjab Contract Appointment Policy; eligible for regularization assessment in Oct 2026.',
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
        sharePercentage: 100,
        isBenevolentNominee: true,
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
    leaveRecords: [],
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
        penPictureRemarks:
          'Digitized 4,200 historical revenue & domicile files with zero error rate.',
      },
    ],
    serviceHistory: [],
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
    causeOfDeathOrRemarks:
      'Engaged on Deputy Commissioner Jhang approved Daily Wages / Contingent Schedule rate for Circuit House & Dak distribution.',
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
    serviceHistory: [],
  },
];

function mapSupabaseRowToEmployee(row: any): Employee {
  return {
    id: row.id,
    personnelNumber: row.personnel_number,
    name: row.name,
    fatherName: row.father_name,
    husbandName: row.husband_name,
    gender: row.gender,
    maritalStatus: row.marital_status || 'Married',
    cnic: row.cnic,
    dateOfBirth: row.date_of_birth,
    bloodGroup: row.blood_group || 'B+',
    religion: row.religion || 'Islam',
    domicile: row.domicile || 'Jhang',
    phone: row.phone,
    email: row.email,
    permanentAddress: row.permanent_address,
    presentAddress: row.present_address,
    designation: row.designation,
    bps: row.bps,
    cadre: row.cadre || 'Ministerial / District Cadre',
    branch: row.branch,
    tehsil: row.tehsil || 'Jhang',
    dateOfRecruitment: row.date_of_recruitment,
    employmentStatus: row.employment_status,
    dateOfRegularization: row.date_of_regularization,
    jobStatus: row.job_status,
    dateOfRetirement: row.date_of_retirement,
    dateOfDeath: row.date_of_death,
    causeOfDeathOrRemarks: row.cause_of_death_or_remarks,
    osdOrderNo: row.osd_order_no,
    seniorityNo: row.seniority_no,
    ddoCode: row.ddo_code || 'JH-4012',
    gpfNumber: row.gpf_number,
    pensionStatus: row.pension_status || 'In-Service',
    casualLeaveBalance: row.casual_leave_balance ?? 25,
    earnedLeaveBalance: row.earned_leave_balance ?? 120,
    medicalLeaveBalance: row.medical_leave_balance ?? 90,
    legalHeirs: (row.legal_heirs || []).map((h: any) => ({
      id: h.id,
      employeeId: h.employee_id,
      name: h.name,
      relation: h.relation,
      cnicOrBForm: h.cnic_or_bform,
      dateOfBirth: h.date_of_birth,
      contactInfo: h.contact_info,
      address: h.address,
      sharePercentage: h.share_percentage,
      isBenevolentNominee: h.is_benevolent_nominee,
      rule17ACandidate: h.rule_17a_candidate,
    })),
    academicRecords: (row.academic_records || []).map((a: any) => ({
      id: a.id,
      employeeId: a.employee_id,
      degreeTitle: a.degree_title,
      majorSubjects: a.major_subjects,
      boardOrUniversity: a.board_or_university,
      passingYear: a.passing_year,
      gradeOrDivision: a.grade_or_division,
      verificationStatus: a.verification_status,
    })),
    leaveRecords: (row.leave_records || []).map((l: any) => ({
      id: l.id,
      employeeId: l.employee_id,
      leaveType: l.leave_type,
      startDate: l.start_date,
      endDate: l.end_date,
      totalDays: l.total_days,
      orderNo: l.order_no,
      sanctionedBy: l.sanctioned_by,
      status: l.status,
      remarks: l.remarks,
    })),
    acrRecords: (row.acr_records || []).map((r: any) => ({
      id: r.id,
      employeeId: r.employee_id,
      assessmentYear: r.assessment_year,
      postHeld: r.post_held,
      reportingOfficer: r.reporting_officer,
      countersigningOfficer: r.countersigning_officer,
      overallGrading: r.overall_grading,
      integrity: r.integrity,
      fitnessForPromotion: r.fitness_for_promotion,
      dossierStatus: r.dossier_status,
      penPictureRemarks: r.pen_picture_remarks,
    })),
    serviceHistory: (row.service_history || []).map((s: any) => ({
      id: s.id,
      employeeId: s.employee_id,
      eventType: s.event_type,
      fromBranchOrPost: s.from_branch_or_post,
      toBranchOrPost: s.to_branch_or_post,
      effectiveDate: s.effective_date,
      orderNumber: s.order_number,
      remarks: s.remarks,
    })),
  };
}

function getLocalFallbackEmployees(): Employee[] {
  try {
    const raw = localStorage.getItem(LOCAL_CACHE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Error reading local cache:', e);
  }
  const seeded: Employee[] = INITIAL_DISTRICT_JHANG_EMPLOYEES.map((item, idx) => ({
    ...item,
    id: idx + 1,
  }));
  localStorage.setItem(LOCAL_CACHE_KEY, JSON.stringify(seeded));
  return seeded;
}

function saveLocalFallbackEmployees(list: Employee[]) {
  try {
    localStorage.setItem(LOCAL_CACHE_KEY, JSON.stringify(list));
  } catch (e) {
    console.warn('Error saving local cache:', e);
  }
}

export async function insertEmployeeToSupabase(payload: Omit<Employee, 'id'>): Promise<Employee> {
  const { data: empRow, error: empErr } = await supabase
    .from('employees')
    .insert({
      personnel_number: payload.personnelNumber,
      name: payload.name,
      father_name: payload.fatherName,
      husband_name: payload.husbandName || null,
      gender: payload.gender,
      marital_status: payload.maritalStatus || 'Married',
      cnic: payload.cnic,
      date_of_birth: payload.dateOfBirth,
      blood_group: payload.bloodGroup || 'B+',
      religion: payload.religion || 'Islam',
      domicile: payload.domicile || 'Jhang',
      phone: payload.phone,
      email: payload.email || null,
      permanent_address: payload.permanentAddress,
      present_address: payload.presentAddress || payload.permanentAddress,
      designation: payload.designation,
      bps: payload.bps,
      cadre: payload.cadre || 'Ministerial / District Cadre',
      branch: payload.branch,
      tehsil: payload.tehsil || 'Jhang',
      date_of_recruitment: payload.dateOfRecruitment,
      employment_status: payload.employmentStatus,
      date_of_regularization: payload.dateOfRegularization || null,
      job_status: payload.jobStatus,
      date_of_retirement: payload.dateOfRetirement || null,
      date_of_death: payload.dateOfDeath || null,
      cause_of_death_or_remarks: payload.causeOfDeathOrRemarks || null,
      osd_order_no: payload.osdOrderNo || null,
      seniority_no: payload.seniorityNo || null,
      ddo_code: payload.ddoCode || 'JH-4012',
      gpf_number: payload.gpfNumber || null,
      pension_status: payload.pensionStatus || 'In-Service',
      casual_leave_balance: payload.casualLeaveBalance ?? 25,
      earned_leave_balance: payload.earnedLeaveBalance ?? 120,
      medical_leave_balance: payload.medicalLeaveBalance ?? 90,
    })
    .select()
    .single();

  if (empErr) throw empErr;
  const empId = empRow.id;

  if (payload.legalHeirs?.length) {
    await supabase.from('legal_heirs').insert(
      payload.legalHeirs.map((h) => ({
        employee_id: empId,
        name: h.name,
        relation: h.relation,
        cnic_or_bform: h.cnicOrBForm || '',
        date_of_birth: h.dateOfBirth || '',
        contact_info: h.contactInfo,
        address: h.address || payload.permanentAddress,
        share_percentage: h.sharePercentage ?? 100,
        is_benevolent_nominee: h.isBenevolentNominee ?? true,
        rule_17a_candidate: h.rule17ACandidate ?? false,
      }))
    );
  }

  if (payload.academicRecords?.length) {
    await supabase.from('academic_records').insert(
      payload.academicRecords.map((a) => ({
        employee_id: empId,
        degree_title: a.degreeTitle,
        major_subjects: a.majorSubjects,
        board_or_university: a.boardOrUniversity,
        passing_year: a.passingYear,
        grade_or_division: a.gradeOrDivision,
        verification_status: a.verificationStatus || 'Verified',
      }))
    );
  }

  if (payload.leaveRecords?.length) {
    await supabase.from('leave_records').insert(
      payload.leaveRecords.map((l) => ({
        employee_id: empId,
        leave_type: l.leaveType,
        start_date: l.startDate,
        end_date: l.endDate,
        total_days: l.totalDays,
        order_no: l.orderNo,
        sanctioned_by: l.sanctionedBy || 'Deputy Commissioner, Jhang',
        status: l.status || 'Approved',
        remarks: l.remarks || '',
      }))
    );
  }

  if (payload.acrRecords?.length) {
    await supabase.from('acr_records').insert(
      payload.acrRecords.map((r) => ({
        employee_id: empId,
        assessment_year: r.assessmentYear,
        post_held: r.postHeld,
        reporting_officer: r.reportingOfficer,
        countersigning_officer: r.countersigningOfficer,
        overall_grading: r.overallGrading,
        integrity: r.integrity || 'Beyond Doubt',
        fitness_for_promotion: r.fitnessForPromotion || 'Fit for Promotion',
        dossier_status: r.dossierStatus || 'Completed & Placed in Dossier',
        pen_picture_remarks: r.penPictureRemarks || '',
      }))
    );
  }

  if (payload.serviceHistory?.length) {
    await supabase.from('service_history').insert(
      payload.serviceHistory.map((s) => ({
        employee_id: empId,
        event_type: s.eventType,
        from_branch_or_post: s.fromBranchOrPost,
        to_branch_or_post: s.toBranchOrPost,
        effective_date: s.effectiveDate,
        order_number: s.orderNumber,
        remarks: s.remarks || '',
      }))
    );
  }

  const { data: fullRow } = await supabase
    .from('employees')
    .select(
      `*, legal_heirs(*), academic_records(*), leave_records(*), acr_records(*), service_history(*)`
    )
    .eq('id', empId)
    .single();

  return mapSupabaseRowToEmployee(fullRow || empRow);
}

export async function fetchAllEmployeesFromSupabase(): Promise<{
  employees: Employee[];
  needsTableSetup: boolean;
}> {
  try {
    const { data, error } = await supabase
      .from('employees')
      .select(
        `*, legal_heirs(*), academic_records(*), leave_records(*), acr_records(*), service_history(*)`
      )
      .order('id', { ascending: false });

    if (error) {
      // If table does not exist yet in Supabase project qjoflyaxwffwzoodehod
      return {
        employees: getLocalFallbackEmployees(),
        needsTableSetup: true,
      };
    }

    if (!data || data.length === 0) {
      // Seed initial District Jhang HR records into Supabase tables automatically
      const seededList: Employee[] = [];
      for (const seedItem of INITIAL_DISTRICT_JHANG_EMPLOYEES) {
        try {
          const created = await insertEmployeeToSupabase(seedItem);
          seededList.push(created);
        } catch {
          // Ignore duplicate seed conflicts
        }
      }
      if (seededList.length > 0) {
        saveLocalFallbackEmployees(seededList);
        return { employees: seededList, needsTableSetup: false };
      }
    }

    const mapped = (data || []).map(mapSupabaseRowToEmployee);
    saveLocalFallbackEmployees(mapped);
    return { employees: mapped, needsTableSetup: false };
  } catch {
    return {
      employees: getLocalFallbackEmployees(),
      needsTableSetup: true,
    };
  }
}

export async function saveEmployeeToSupabaseOrFallback(
  payload: Omit<Employee, 'id'>,
  id?: number
): Promise<Employee[]> {
  try {
    if (!id) {
      await insertEmployeeToSupabase(payload);
    } else {
      const { error: updErr } = await supabase
        .from('employees')
        .update({
          personnel_number: payload.personnelNumber,
          name: payload.name,
          father_name: payload.fatherName,
          husband_name: payload.husbandName || null,
          gender: payload.gender,
          marital_status: payload.maritalStatus || 'Married',
          cnic: payload.cnic,
          date_of_birth: payload.dateOfBirth,
          blood_group: payload.bloodGroup || 'B+',
          religion: payload.religion || 'Islam',
          domicile: payload.domicile || 'Jhang',
          phone: payload.phone,
          email: payload.email || null,
          permanent_address: payload.permanentAddress,
          present_address: payload.presentAddress || payload.permanentAddress,
          designation: payload.designation,
          bps: payload.bps,
          cadre: payload.cadre || 'Ministerial / District Cadre',
          branch: payload.branch,
          tehsil: payload.tehsil || 'Jhang',
          date_of_recruitment: payload.dateOfRecruitment,
          employment_status: payload.employmentStatus,
          date_of_regularization: payload.dateOfRegularization || null,
          job_status: payload.jobStatus,
          date_of_retirement: payload.dateOfRetirement || null,
          date_of_death: payload.dateOfDeath || null,
          cause_of_death_or_remarks: payload.causeOfDeathOrRemarks || null,
          osd_order_no: payload.osdOrderNo || null,
          seniority_no: payload.seniorityNo || null,
          ddo_code: payload.ddoCode || 'JH-4012',
          gpf_number: payload.gpfNumber || null,
          pension_status: payload.pensionStatus || 'In-Service',
          casual_leave_balance: payload.casualLeaveBalance ?? 25,
          earned_leave_balance: payload.earnedLeaveBalance ?? 120,
          medical_leave_balance: payload.medicalLeaveBalance ?? 90,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (updErr) throw updErr;

      await supabase.from('legal_heirs').delete().eq('employee_id', id);
      if (payload.legalHeirs?.length) {
        await supabase.from('legal_heirs').insert(
          payload.legalHeirs.map((h) => ({
            employee_id: id,
            name: h.name,
            relation: h.relation,
            cnic_or_bform: h.cnicOrBForm || '',
            date_of_birth: h.dateOfBirth || '',
            contact_info: h.contactInfo,
            address: h.address || payload.permanentAddress,
            share_percentage: h.sharePercentage ?? 100,
            is_benevolent_nominee: h.isBenevolentNominee ?? true,
            rule_17a_candidate: h.rule17ACandidate ?? false,
          }))
        );
      }

      await supabase.from('academic_records').delete().eq('employee_id', id);
      if (payload.academicRecords?.length) {
        await supabase.from('academic_records').insert(
          payload.academicRecords.map((a) => ({
            employee_id: id,
            degree_title: a.degreeTitle,
            major_subjects: a.majorSubjects,
            board_or_university: a.boardOrUniversity,
            passing_year: a.passingYear,
            grade_or_division: a.gradeOrDivision,
            verification_status: a.verificationStatus || 'Verified',
          }))
        );
      }

      await supabase.from('leave_records').delete().eq('employee_id', id);
      if (payload.leaveRecords?.length) {
        await supabase.from('leave_records').insert(
          payload.leaveRecords.map((l) => ({
            employee_id: id,
            leave_type: l.leaveType,
            start_date: l.startDate,
            end_date: l.endDate,
            total_days: l.totalDays,
            order_no: l.orderNo,
            sanctioned_by: l.sanctionedBy || 'Deputy Commissioner, Jhang',
            status: l.status || 'Approved',
            remarks: l.remarks || '',
          }))
        );
      }

      await supabase.from('acr_records').delete().eq('employee_id', id);
      if (payload.acrRecords?.length) {
        await supabase.from('acr_records').insert(
          payload.acrRecords.map((r) => ({
            employee_id: id,
            assessment_year: r.assessmentYear,
            post_held: r.postHeld,
            reporting_officer: r.reportingOfficer,
            countersigning_officer: r.countersigningOfficer,
            overall_grading: r.overallGrading,
            integrity: r.integrity || 'Beyond Doubt',
            fitness_for_promotion: r.fitnessForPromotion || 'Fit for Promotion',
            dossier_status: r.dossierStatus || 'Completed & Placed in Dossier',
            pen_picture_remarks: r.penPictureRemarks || '',
          }))
        );
      }

      await supabase.from('service_history').delete().eq('employee_id', id);
      if (payload.serviceHistory?.length) {
        await supabase.from('service_history').insert(
          payload.serviceHistory.map((s) => ({
            employee_id: id,
            event_type: s.eventType,
            from_branch_or_post: s.fromBranchOrPost,
            to_branch_or_post: s.toBranchOrPost,
            effective_date: s.effectiveDate,
            order_number: s.orderNumber,
            remarks: s.remarks || '',
          }))
        );
      }
    }

    const refreshed = await fetchAllEmployeesFromSupabase();
    return refreshed.employees;
  } catch {
    // Fallback to local state persistence if Supabase tables are not yet initialized
    const current = getLocalFallbackEmployees();
    if (!id) {
      const nextId = current.reduce((max, e) => Math.max(max, e.id), 0) + 1;
      const updated = [{ ...payload, id: nextId }, ...current];
      saveLocalFallbackEmployees(updated);
      return updated;
    } else {
      const updated = current.map((e) => (e.id === id ? { ...payload, id } : e));
      saveLocalFallbackEmployees(updated);
      return updated;
    }
  }
}

export async function deleteEmployeeFromSupabaseOrFallback(id: number): Promise<Employee[]> {
  try {
    const { error } = await supabase.from('employees').delete().eq('id', id);
    if (error) throw error;
    const refreshed = await fetchAllEmployeesFromSupabase();
    return refreshed.employees;
  } catch {
    const current = getLocalFallbackEmployees().filter((e) => e.id !== id);
    saveLocalFallbackEmployees(current);
    return current;
  }
}
