import { supabase } from '../lib/supabase';
import { Employee } from '../types/hr';

const LEGACY_CACHE_KEYS = [
  'dc_jhang_hrms_supabase_cache_v1',
  'dc_jhang_hrms_live_v2',
];
const DEMO_PURGE_FLAG = 'dc_jhang_demo_seed_purged_v1';

const DEMO_SEED_PERSONNEL_NUMBERS = [
  'DCJ-EST-1994-001',
  'DCJ-REV-2014-018',
  'DCJ-REV-1985-004',
  'DCJ-FLD-2006-042',
  'DCJ-OSD-2011-029',
  'DCJ-IT-2023-064',
  'DCJ-NAZ-2024-091',
];

// Always clear legacy localStorage employee caches so stale counts never appear
if (typeof window !== 'undefined') {
  try {
    for (const key of LEGACY_CACHE_KEYS) {
      window.localStorage.removeItem(key);
    }
  } catch {
    // Ignore storage errors
  }
}

function mapSupabaseRowToEmployee(row: any): Employee {
  return {
    id: Number(row.id),
    personnelNumber: row.personnel_number || '',
    name: row.name || '',
    fatherName: row.father_name || '',
    husbandName: row.husband_name || '',
    gender: row.gender || 'Male',
    maritalStatus: row.marital_status || 'Married',
    cnic: row.cnic || '',
    dateOfBirth: row.date_of_birth || '',
    bloodGroup: row.blood_group || 'B+',
    religion: row.religion || 'Islam',
    domicile: row.domicile || 'Jhang',
    phone: row.phone || '',
    email: row.email || '',
    permanentAddress: row.permanent_address || '',
    presentAddress: row.present_address || row.permanent_address || '',
    designation: row.designation || '',
    bps: row.bps || 'BPS-16',
    cadre: row.cadre || 'Ministerial / District Cadre',
    branch: row.branch || '',
    tehsil: row.tehsil || 'Jhang',
    dateOfRecruitment: row.date_of_recruitment || '',
    employmentStatus: row.employment_status || 'Regular',
    dateOfRegularization: row.date_of_regularization || '',
    jobStatus: row.job_status || 'Active',
    dateOfRetirement: row.date_of_retirement || '',
    dateOfDeath: row.date_of_death || '',
    causeOfDeathOrRemarks: row.cause_of_death_or_remarks || '',
    osdOrderNo: row.osd_order_no || '',
    seniorityNo: row.seniority_no || '',
    ddoCode: row.ddo_code || 'JH-4012',
    gpfNumber: row.gpf_number || '',
    pensionStatus: row.pension_status || 'In-Service',
    casualLeaveBalance: Number(row.casual_leave_balance ?? 25),
    earnedLeaveBalance: Number(row.earned_leave_balance ?? 120),
    medicalLeaveBalance: Number(row.medical_leave_balance ?? 90),
    legalHeirs: Array.isArray(row.legal_heirs)
      ? row.legal_heirs.map((h: any) => ({
          id: h.id,
          employeeId: h.employee_id,
          name: h.name || '',
          relation: h.relation || 'Wife',
          cnicOrBForm: h.cnic_or_bform || '',
          dateOfBirth: h.date_of_birth || '',
          contactInfo: h.contact_info || '',
          address: h.address || '',
          sharePercentage: Number(h.share_percentage ?? 100),
          isBenevolentNominee: Boolean(h.is_benevolent_nominee),
          rule17ACandidate: Boolean(h.rule_17a_candidate),
        }))
      : [],
    academicRecords: Array.isArray(row.academic_records)
      ? row.academic_records.map((a: any) => ({
          id: a.id,
          employeeId: a.employee_id,
          degreeTitle: a.degree_title || '',
          majorSubjects: a.major_subjects || '',
          boardOrUniversity: a.board_or_university || '',
          passingYear: a.passing_year || '',
          gradeOrDivision: a.grade_or_division || '',
          verificationStatus: a.verification_status || 'Verified',
        }))
      : [],
    leaveRecords: Array.isArray(row.leave_records)
      ? row.leave_records.map((l: any) => ({
          id: l.id,
          employeeId: l.employee_id,
          leaveType: l.leave_type || 'Casual Leave',
          startDate: l.start_date || '',
          endDate: l.end_date || '',
          totalDays: Number(l.total_days ?? 1),
          orderNo: l.order_no || '',
          sanctionedBy: l.sanctioned_by || '',
          status: l.status || 'Approved',
          remarks: l.remarks || '',
        }))
      : [],
    acrRecords: Array.isArray(row.acr_records)
      ? row.acr_records.map((r: any) => ({
          id: r.id,
          employeeId: r.employee_id,
          assessmentYear: r.assessment_year || '',
          postHeld: r.post_held || '',
          reportingOfficer: r.reporting_officer || '',
          countersigningOfficer: r.countersigning_officer || '',
          overallGrading: r.overall_grading || 'Good',
          integrity: r.integrity || 'Beyond Doubt',
          fitnessForPromotion: r.fitness_for_promotion || 'Fit for Promotion',
          dossierStatus: r.dossier_status || 'Completed & Placed in Dossier',
          penPictureRemarks: r.pen_picture_remarks || '',
        }))
      : [],
    serviceHistory: Array.isArray(row.service_history)
      ? row.service_history.map((s: any) => ({
          id: s.id,
          employeeId: s.employee_id,
          eventType: s.event_type || 'Transfer / Posting',
          fromBranchOrPost: s.from_branch_or_post || '',
          toBranchOrPost: s.to_branch_or_post || '',
          effectiveDate: s.effective_date || '',
          orderNumber: s.order_number || '',
          remarks: s.remarks || '',
        }))
      : [],
  };
}

async function purgeAutoSeededDemoRecordsOnce(): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    if (window.localStorage.getItem(DEMO_PURGE_FLAG) === 'true') {
      return;
    }
    const { data: demoRows } = await supabase
      .from('employees')
      .select('id, personnel_number')
      .in('personnel_number', DEMO_SEED_PERSONNEL_NUMBERS);

    if (demoRows && demoRows.length > 0) {
      const demoIds = demoRows.map((r: any) => Number(r.id));
      await Promise.all([
        supabase.from('legal_heirs').delete().in('employee_id', demoIds),
        supabase.from('academic_records').delete().in('employee_id', demoIds),
        supabase.from('leave_records').delete().in('employee_id', demoIds),
        supabase.from('acr_records').delete().in('employee_id', demoIds),
        supabase.from('service_history').delete().in('employee_id', demoIds),
      ]);
      await supabase.from('employees').delete().in('id', demoIds);
    }
    window.localStorage.setItem(DEMO_PURGE_FLAG, 'true');
  } catch {
    // Ignore errors if table is not created yet
  }
}

export async function insertEmployeeToSupabase(
  payload: Omit<Employee, 'id'>
): Promise<Employee> {
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
    await purgeAutoSeededDemoRecordsOnce();

    // Primary query with all 5 related child tables
    const { data, error } = await supabase
      .from('employees')
      .select(
        `*, legal_heirs(*), academic_records(*), leave_records(*), acr_records(*), service_history(*)`
      )
      .order('id', { ascending: false });

    if (!error && Array.isArray(data)) {
      return {
        employees: data.map(mapSupabaseRowToEmployee),
        needsTableSetup: false,
      };
    }

    // Fallback if foreign-key relationships in PostgREST schema cache are not refreshed yet:
    const { data: baseRows, error: baseError } = await supabase
      .from('employees')
      .select('*')
      .order('id', { ascending: false });

    if (baseError) {
      return {
        employees: [],
        needsTableSetup: true,
      };
    }

    if (!baseRows || baseRows.length === 0) {
      return { employees: [], needsTableSetup: false };
    }

    const [heirsRes, acadRes, leavesRes, acrRes, histRes] = await Promise.all([
      supabase.from('legal_heirs').select('*'),
      supabase.from('academic_records').select('*'),
      supabase.from('leave_records').select('*'),
      supabase.from('acr_records').select('*'),
      supabase.from('service_history').select('*'),
    ]);

    const heirs = heirsRes.data || [];
    const acads = acadRes.data || [];
    const leaves = leavesRes.data || [];
    const acrs = acrRes.data || [];
    const hists = histRes.data || [];

    const combined = baseRows.map((emp: any) =>
      mapSupabaseRowToEmployee({
        ...emp,
        legal_heirs: heirs.filter((h: any) => Number(h.employee_id) === Number(emp.id)),
        academic_records: acads.filter(
          (a: any) => Number(a.employee_id) === Number(emp.id)
        ),
        leave_records: leaves.filter(
          (l: any) => Number(l.employee_id) === Number(emp.id)
        ),
        acr_records: acrs.filter((r: any) => Number(r.employee_id) === Number(emp.id)),
        service_history: hists.filter(
          (s: any) => Number(s.employee_id) === Number(emp.id)
        ),
      })
    );

    return { employees: combined, needsTableSetup: false };
  } catch {
    return {
      employees: [],
      needsTableSetup: true,
    };
  }
}

export async function saveEmployeeToSupabaseOrFallback(
  payload: Omit<Employee, 'id'>,
  id?: number
): Promise<Employee[]> {
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

    await Promise.all([
      supabase.from('legal_heirs').delete().eq('employee_id', id),
      supabase.from('academic_records').delete().eq('employee_id', id),
      supabase.from('leave_records').delete().eq('employee_id', id),
      supabase.from('acr_records').delete().eq('employee_id', id),
      supabase.from('service_history').delete().eq('employee_id', id),
    ]);

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
}

export async function deleteEmployeeFromSupabaseOrFallback(
  id: number
): Promise<Employee[]> {
  // 1. Delete all related child records for this employee across all 5 tables
  await Promise.all([
    supabase.from('legal_heirs').delete().eq('employee_id', id),
    supabase.from('academic_records').delete().eq('employee_id', id),
    supabase.from('leave_records').delete().eq('employee_id', id),
    supabase.from('acr_records').delete().eq('employee_id', id),
    supabase.from('service_history').delete().eq('employee_id', id),
  ]);

  // 2. Delete the parent employee record from `employees`
  const { error } = await supabase.from('employees').delete().eq('id', id);
  if (error) throw error;

  // 3. Re-query live Supabase rows so KPI cards and roster reflect exact database count
  const refreshed = await fetchAllEmployeesFromSupabase();
  return refreshed.employees;
}
