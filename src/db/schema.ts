import { relations } from 'drizzle-orm';
import { boolean, integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// 1. Users table (linked to Firebase Auth UID)
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(),
  email: text('email').notNull(),
  displayName: text('display_name'),
  role: text('role').default('HR Administrator').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// 2. Employees table (Core Personnel & Service Book Record for DC Office Jhang)
export const employees = pgTable('employees', {
  id: serial('id').primaryKey(),
  personnelNumber: text('personnel_number').notNull().unique(), // e.g. DCJ-EST-2026-001
  name: text('name').notNull(),
  fatherName: text('father_name').notNull(),
  husbandName: text('husband_name'), // Applicable if gender is Female & Married/Widowed
  gender: text('gender').notNull(), // 'Male' | 'Female' | 'Other'
  maritalStatus: text('marital_status').default('Married').notNull(), // 'Single' | 'Married' | 'Widowed' | 'Divorced'
  cnic: text('cnic').notNull(), // e.g. 33202-1234567-1
  dateOfBirth: text('date_of_birth').notNull(), // YYYY-MM-DD
  bloodGroup: text('blood_group').default('B+'),
  religion: text('religion').default('Islam'),
  domicile: text('domicile').default('Jhang').notNull(),
  phone: text('phone').notNull(),
  email: text('email'),
  permanentAddress: text('permanent_address').notNull(),
  presentAddress: text('present_address'),

  // Service Information
  designation: text('designation').notNull(), // e.g., Superintendent, Assistant, Senior Clerk, Junior Clerk, Naib Tehsildar, Patwari, Naib Qasid
  bps: text('bps').notNull(), // e.g., BPS-17, BPS-16, BPS-14, BPS-11, BPS-09, BPS-04, BPS-01
  cadre: text('cadre').default('Ministerial / District Cadre').notNull(),
  branch: text('branch').notNull(), // e.g., Establishment Branch, Revenue Branch, General Branch, AC Office Jhang Saddar, AC Office Shorkot, AC Office Ahmadpur Sial, AC Office 18-Hazari, District Nazarat, Colony Branch, HRA Branch
  tehsil: text('tehsil').default('Jhang').notNull(), // 'Jhang' | 'Shorkot' | 'Ahmadpur Sial' | 'Athara Hazari'
  dateOfRecruitment: text('date_of_recruitment').notNull(), // YYYY-MM-DD
  employmentStatus: text('employment_status').notNull(), // 'Regular' | 'Contract' | 'Daily Wages' | 'Deputation' | 'Contingent'
  dateOfRegularization: text('date_of_regularization'), // YYYY-MM-DD (if Regular)
  jobStatus: text('job_status').notNull(), // 'Active' | 'Retired (After 60 Years)' | 'Died During Service' | 'OSD'
  dateOfRetirement: text('date_of_retirement'), // YYYY-MM-DD (Superannuation at 60 years or actual retirement date)
  dateOfDeath: text('date_of_death'), // YYYY-MM-DD (in case Died During Service)
  causeOfDeathOrRemarks: text('cause_of_death_or_remarks'),
  osdOrderNo: text('osd_order_no'), // Order number/reason if OSD
  seniorityNo: text('seniority_no'),
  ddoCode: text('ddo_code').default('JH-4012'),
  gpfNumber: text('gpf_number'),
  pensionStatus: text('pension_status').default('In-Service'), // 'In-Service' | 'Pension Sanctioned' | 'Family Pension Active' | 'PPO Issued' | 'Under Process' | 'Rule 17-A Processed'

  // Leave Account Balances
  casualLeaveBalance: integer('casual_leave_balance').default(25).notNull(),
  earnedLeaveBalance: integer('earned_leave_balance').default(120).notNull(),
  medicalLeaveBalance: integer('medical_leave_balance').default(90).notNull(),

  createdByUid: text('created_by_uid'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// 3. Legal Heirs / Family & Nominee Information
export const legalHeirs = pgTable('legal_heirs', {
  id: serial('id').primaryKey(),
  employeeId: integer('employee_id')
    .references(() => employees.id, { onDelete: 'cascade' })
    .notNull(),
  name: text('name').notNull(),
  relation: text('relation').notNull(), // 'Widow' | 'Husband' | 'Son' | 'Daughter' | 'Father' | 'Mother' | 'Wife'
  cnicOrBForm: text('cnic_or_bform'),
  dateOfBirth: text('date_of_birth'),
  contactInfo: text('contact_info').notNull(),
  address: text('address'),
  sharePercentage: integer('share_percentage').default(100),
  isBenevolentNominee: boolean('is_benevolent_nominee').default(true),
  rule17ACandidate: boolean('rule_17a_candidate').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

// 4. Academic Qualifications
export const academicRecords = pgTable('academic_records', {
  id: serial('id').primaryKey(),
  employeeId: integer('employee_id')
    .references(() => employees.id, { onDelete: 'cascade' })
    .notNull(),
  degreeTitle: text('degree_title').notNull(), // e.g., Matriculation, F.A / F.Sc, B.A / BS, M.A / MS
  majorSubjects: text('major_subjects').notNull(),
  boardOrUniversity: text('board_or_university').notNull(), // e.g., BISE Faisalabad, University of the Punjab, GCUF
  passingYear: text('passing_year').notNull(),
  gradeOrDivision: text('grade_or_division').notNull(), // e.g., 1st Division (A), CGPA 3.45/4.00
  verificationStatus: text('verification_status').default('Verified').notNull(), // 'Verified' | 'Pending Verification' | 'Sent to Board/HEC'
  createdAt: timestamp('created_at').defaultNow(),
});

// 5. Leave Account Ledger
export const leaveRecords = pgTable('leave_records', {
  id: serial('id').primaryKey(),
  employeeId: integer('employee_id')
    .references(() => employees.id, { onDelete: 'cascade' })
    .notNull(),
  leaveType: text('leave_type').notNull(), // 'Casual Leave' | 'Earned Leave (Full Pay)' | 'Medical Leave' | 'Maternity Leave' | 'LPR (Leave Preparatory to Retirement)' | 'Ex-Pakistan Leave'
  startDate: text('start_date').notNull(),
  endDate: text('end_date').notNull(),
  totalDays: integer('total_days').notNull(),
  orderNo: text('order_no').notNull(), // e.g., Order No. Estt/DCJ/2026-412
  sanctionedBy: text('sanctioned_by').default('Deputy Commissioner, Jhang').notNull(),
  status: text('status').default('Approved').notNull(), // 'Approved' | 'Pending' | 'Availed' | 'Rejected'
  remarks: text('remarks'),
  createdAt: timestamp('created_at').defaultNow(),
});

// 6. ACR / PERs (Annual Confidential Reports / Performance Evaluation Reports)
export const acrRecords = pgTable('acr_records', {
  id: serial('id').primaryKey(),
  employeeId: integer('employee_id')
    .references(() => employees.id, { onDelete: 'cascade' })
    .notNull(),
  assessmentYear: text('assessment_year').notNull(), // e.g., '2025 (01-01-2025 to 31-12-2025)'
  postHeld: text('post_held').notNull(),
  reportingOfficer: text('reporting_officer').notNull(), // e.g., 'ADC (General) Jhang'
  countersigningOfficer: text('countersigning_officer').notNull(), // e.g., 'Deputy Commissioner Jhang'
  overallGrading: text('overall_grading').notNull(), // 'Outstanding' | 'Very Good' | 'Good' | 'Average' | 'Below Average'
  integrity: text('integrity').default('Beyond Doubt').notNull(), // 'Beyond Doubt' | 'Honest' | 'Watchful'
  fitnessForPromotion: text('fitness_for_promotion').default('Fit for Promotion').notNull(), // 'Fit for Accelerated Promotion' | 'Fit for Promotion' | 'Not Yet Fit'
  dossierStatus: text('dossier_status').default('Completed & Placed in Dossier').notNull(), // 'Completed & Placed in Dossier' | 'Awaiting Countersignature' | 'Awaiting Reporting Officer' | 'Deficient'
  penPictureRemarks: text('pen_picture_remarks'),
  createdAt: timestamp('created_at').defaultNow(),
});

// 7. Service & Posting History (Additional HR value-add for District Establishment)
export const serviceHistory = pgTable('service_history', {
  id: serial('id').primaryKey(),
  employeeId: integer('employee_id')
    .references(() => employees.id, { onDelete: 'cascade' })
    .notNull(),
  eventType: text('event_type').notNull(), // 'Initial Appointment' | 'Regularization' | 'Transfer / Posting' | 'Promotion / Upgradation' | 'OSD Attachment' | 'Retirement' | 'Demise in Service'
  fromBranchOrPost: text('from_branch_or_post').notNull(),
  toBranchOrPost: text('to_branch_or_post').notNull(),
  effectiveDate: text('effective_date').notNull(),
  orderNumber: text('order_number').notNull(),
  remarks: text('remarks'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Relations
export const employeesRelations = relations(employees, ({ many }) => ({
  legalHeirs: many(legalHeirs),
  academicRecords: many(academicRecords),
  leaveRecords: many(leaveRecords),
  acrRecords: many(acrRecords),
  serviceHistory: many(serviceHistory),
}));

export const legalHeirsRelations = relations(legalHeirs, ({ one }) => ({
  employee: one(employees, {
    fields: [legalHeirs.employeeId],
    references: [employees.id],
  }),
}));

export const academicRecordsRelations = relations(academicRecords, ({ one }) => ({
  employee: one(employees, {
    fields: [academicRecords.employeeId],
    references: [employees.id],
  }),
}));

export const leaveRecordsRelations = relations(leaveRecords, ({ one }) => ({
  employee: one(employees, {
    fields: [leaveRecords.employeeId],
    references: [employees.id],
  }),
}));

export const acrRecordsRelations = relations(acrRecords, ({ one }) => ({
  employee: one(employees, {
    fields: [acrRecords.employeeId],
    references: [employees.id],
  }),
}));

export const serviceHistoryRelations = relations(serviceHistory, ({ one }) => ({
  employee: one(employees, {
    fields: [serviceHistory.employeeId],
    references: [employees.id],
  }),
}));
