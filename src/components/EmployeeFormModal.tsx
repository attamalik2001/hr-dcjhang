import React, { useState } from 'react';
import {
  ArrowLeft,
  Plus,
  Trash2,
  Save,
  User,
  Briefcase,
  Users,
  GraduationCap,
  Calendar,
  FileCheck,
  History,
  Sun,
  Moon,
} from 'lucide-react';
import {
  Employee,
  LegalHeir,
  AcademicRecord,
  LeaveRecord,
  AcrRecord,
  ServiceHistoryItem,
  DC_JHANG_BRANCHES,
  DC_JHANG_DESIGNATIONS,
  BPS_SCALES,
  calculateSuperannuationDate,
} from '../types/hr';

interface EmployeeFormModalProps {
  initialEmployee?: Employee | null;
  onClose: () => void;
  onSave: (payload: any, id?: number) => Promise<void>;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

type FormTab =
  | 'basic'
  | 'service'
  | 'heirs'
  | 'academics'
  | 'leaves'
  | 'acr'
  | 'history';

export const EmployeeFormModal: React.FC<EmployeeFormModalProps> = ({
  initialEmployee,
  onClose,
  onSave,
  theme = 'light',
  onToggleTheme,
}) => {
  const isEditing = Boolean(initialEmployee?.id);
  const [activeTab, setActiveTab] = useState<FormTab>('basic');
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Basic Info State
  const [personnelNumber, setPersonnelNumber] = useState(
    initialEmployee?.personnelNumber ||
      `DCJ-EST-2026-${String(Math.floor(100 + Math.random() * 899))}`
  );
  const [name, setName] = useState(initialEmployee?.name || '');
  const [fatherName, setFatherName] = useState(initialEmployee?.fatherName || '');
  const [husbandName, setHusbandName] = useState(
    initialEmployee?.husbandName || ''
  );
  const [gender, setGender] = useState(initialEmployee?.gender || 'Male');
  const [maritalStatus, setMaritalStatus] = useState(
    initialEmployee?.maritalStatus || 'Married'
  );
  const [cnic, setCnic] = useState(initialEmployee?.cnic || '');
  const [dateOfBirth, setDateOfBirth] = useState(
    initialEmployee?.dateOfBirth || '1985-01-15'
  );
  const [bloodGroup, setBloodGroup] = useState(
    initialEmployee?.bloodGroup || 'B+'
  );
  const [religion, setReligion] = useState(
    initialEmployee?.religion || 'Islam'
  );
  const [domicile, setDomicile] = useState(
    initialEmployee?.domicile || 'Jhang'
  );
  const [phone, setPhone] = useState(initialEmployee?.phone || '');
  const [email, setEmail] = useState(initialEmployee?.email || '');
  const [permanentAddress, setPermanentAddress] = useState(
    initialEmployee?.permanentAddress || ''
  );
  const [presentAddress, setPresentAddress] = useState(
    initialEmployee?.presentAddress || ''
  );

  // Service Info State
  const [designation, setDesignation] = useState(
    initialEmployee?.designation || DC_JHANG_DESIGNATIONS[6]
  );
  const [bps, setBps] = useState(initialEmployee?.bps || 'BPS-16');
  const [cadre, setCadre] = useState(
    initialEmployee?.cadre || 'Ministerial / District Cadre'
  );
  const [branch, setBranch] = useState(
    initialEmployee?.branch || DC_JHANG_BRANCHES[0]
  );
  const [tehsil, setTehsil] = useState(initialEmployee?.tehsil || 'Jhang');
  const [dateOfRecruitment, setDateOfRecruitment] = useState(
    initialEmployee?.dateOfRecruitment || '2015-06-01'
  );
  const [employmentStatus, setEmploymentStatus] = useState(
    initialEmployee?.employmentStatus || 'Regular'
  );
  const [dateOfRegularization, setDateOfRegularization] = useState(
    initialEmployee?.dateOfRegularization || '2018-06-01'
  );
  const [jobStatus, setJobStatus] = useState(
    initialEmployee?.jobStatus || 'Active'
  );
  const [dateOfRetirement, setDateOfRetirement] = useState(
    initialEmployee?.dateOfRetirement ||
      calculateSuperannuationDate(initialEmployee?.dateOfBirth || '1985-01-15')
  );
  const [dateOfDeath, setDateOfDeath] = useState(
    initialEmployee?.dateOfDeath || ''
  );
  const [causeOfDeathOrRemarks, setCauseOfDeathOrRemarks] = useState(
    initialEmployee?.causeOfDeathOrRemarks || ''
  );
  const [osdOrderNo, setOsdOrderNo] = useState(
    initialEmployee?.osdOrderNo || ''
  );
  const [seniorityNo, setSeniorityNo] = useState(
    initialEmployee?.seniorityNo || ''
  );
  const [ddoCode, setDdoCode] = useState(
    initialEmployee?.ddoCode || 'JH-4012'
  );
  const [gpfNumber, setGpfNumber] = useState(
    initialEmployee?.gpfNumber || ''
  );
  const [pensionStatus, setPensionStatus] = useState(
    initialEmployee?.pensionStatus || 'In-Service'
  );

  // Leave Balances
  const [casualLeaveBalance, setCasualLeaveBalance] = useState(
    initialEmployee?.casualLeaveBalance ?? 25
  );
  const [earnedLeaveBalance, setEarnedLeaveBalance] = useState(
    initialEmployee?.earnedLeaveBalance ?? 120
  );
  const [medicalLeaveBalance, setMedicalLeaveBalance] = useState(
    initialEmployee?.medicalLeaveBalance ?? 90
  );

  // Nested Arrays
  const [legalHeirs, setLegalHeirs] = useState<LegalHeir[]>(
    initialEmployee?.legalHeirs || []
  );
  const [academicRecords, setAcademicRecords] = useState<AcademicRecord[]>(
    initialEmployee?.academicRecords || []
  );
  const [leaveRecords, setLeaveRecords] = useState<LeaveRecord[]>(
    initialEmployee?.leaveRecords || []
  );
  const [acrRecords, setAcrRecords] = useState<AcrRecord[]>(
    initialEmployee?.acrRecords || []
  );
  const [serviceHistory, setServiceHistory] = useState<ServiceHistoryItem[]>(
    initialEmployee?.serviceHistory || []
  );

  const handleDobChange = (newDob: string) => {
    setDateOfBirth(newDob);
    const autoRetire = calculateSuperannuationDate(newDob);
    if (autoRetire) {
      setDateOfRetirement(autoRetire);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!name.trim() || !fatherName.trim() || !cnic.trim() || !phone.trim() || !permanentAddress.trim()) {
      setFormError(
        'Please complete all required Basic Information fields (Name, Father Name, CNIC, Phone, Permanent Address).'
      );
      setActiveTab('basic');
      return;
    }

    if (jobStatus === 'Died During Service' && !dateOfDeath) {
      setFormError(
        'Please specify the Date of Death for an employee marked as Died During Service.'
      );
      setActiveTab('service');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        personnelNumber: personnelNumber.trim(),
        name: name.trim(),
        fatherName: fatherName.trim(),
        husbandName: gender === 'Female' ? husbandName.trim() : null,
        gender,
        maritalStatus,
        cnic: cnic.trim(),
        dateOfBirth,
        bloodGroup,
        religion,
        domicile: domicile.trim(),
        phone: phone.trim(),
        email: email.trim() || null,
        permanentAddress: permanentAddress.trim(),
        presentAddress: presentAddress.trim() || permanentAddress.trim(),
        designation,
        bps,
        cadre,
        branch,
        tehsil,
        dateOfRecruitment,
        employmentStatus,
        dateOfRegularization:
          employmentStatus === 'Regular'
            ? dateOfRegularization || dateOfRecruitment
            : null,
        jobStatus,
        dateOfRetirement,
        dateOfDeath: jobStatus === 'Died During Service' ? dateOfDeath : null,
        causeOfDeathOrRemarks: causeOfDeathOrRemarks.trim() || null,
        osdOrderNo: jobStatus === 'OSD' ? osdOrderNo.trim() : null,
        seniorityNo: seniorityNo.trim() || null,
        ddoCode: ddoCode.trim() || 'JH-4012',
        gpfNumber: gpfNumber.trim() || null,
        pensionStatus,
        casualLeaveBalance: Number(casualLeaveBalance) || 0,
        earnedLeaveBalance: Number(earnedLeaveBalance) || 0,
        medicalLeaveBalance: Number(medicalLeaveBalance) || 0,
        legalHeirs,
        academicRecords,
        leaveRecords,
        acrRecords,
        serviceHistory,
      };

      await onSave(payload, initialEmployee?.id);
      onClose();
    } catch (err: any) {
      setFormError(err?.message || 'Failed to save employee record.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 flex flex-col">
      <form onSubmit={handleSubmit} className="min-h-screen w-full flex flex-col">
        {/* Full-Screen Sticky Gradient Header */}
        <header className="sticky top-0 z-30 px-8 py-4 bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white flex flex-wrap items-center justify-between gap-4 border-b border-emerald-800/40 shadow-md">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-medium text-white bg-white/10 hover:bg-white/20 border border-white/15 rounded-lg flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Roster
            </button>
            <div>
              <span className="text-xs text-emerald-300 font-mono tabular-nums block">
                DEPUTY COMMISSIONER OFFICE JHANG · FULL-SCREEN SERVICE BOOK EDITOR
              </span>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight mt-0.5 text-white">
                {isEditing
                  ? `Edit Employee Service Dossier — ${initialEmployee?.name}`
                  : 'Add New District Establishment Employee'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {onToggleTheme && (
              <button
                type="button"
                onClick={onToggleTheme}
                className="px-3 py-2 text-xs font-medium text-white bg-white/10 hover:bg-white/20 border border-white/15 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Switch Light / Dark Theme"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-300" />
                    <span>Light</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-emerald-200" />
                    <span>Dark</span>
                  </>
                )}
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-white bg-white/10 hover:bg-white/20 border border-white/15 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-50 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              {saving
                ? 'Saving Record...'
                : isEditing
                ? 'Update Employee Record'
                : 'Save Employee Record'}
            </button>
          </div>
        </header>

        {/* Full-Screen Section Tabs */}
        <div className="sticky top-[73px] z-20 px-8 pt-2 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center gap-1 overflow-x-auto">
          {[
            { id: 'basic', label: '1. Basic Information', icon: User },
            { id: 'service', label: '2. Service & Status', icon: Briefcase },
            {
              id: 'heirs',
              label: `3. Legal Heirs (${legalHeirs.length})`,
              icon: Users,
            },
            {
              id: 'academics',
              label: `4. Academic Info (${academicRecords.length})`,
              icon: GraduationCap,
            },
            {
              id: 'leaves',
              label: `5. Leave Account (${leaveRecords.length})`,
              icon: Calendar,
            },
            {
              id: 'acr',
              label: `6. ACR / PERs (${acrRecords.length})`,
              icon: FileCheck,
            },
            {
              id: 'history',
              label: `7. Posting History (${serviceHistory.length})`,
              icon: History,
            },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as FormTab)}
                className={`px-4 py-3 text-xs font-medium border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'border-emerald-700 text-emerald-800 bg-emerald-50/40 font-semibold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Full-Screen Form Body */}
        <div className="flex-1 w-full max-w-[1440px] mx-auto px-8 py-8 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
            {formError && (
              <div className="p-3.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800 font-medium">
                {formError}
              </div>
            )}

          {/* TAB 1: BASIC INFORMATION */}
          {activeTab === 'basic' && (
            <div className="space-y-5">
              <div className="border-b border-slate-200 pb-2">
                <h3 className="text-sm font-semibold text-slate-900">
                  Personal & Bio-Data Particulars
                </h3>
                <p className="text-xs text-slate-500">
                  Enter official bio-data as recorded on CNIC and Service Book Part-I. If Gender is Female, Husband&apos;s Name field is enabled automatically.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Personnel / File Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={personnelNumber}
                    onChange={(e) => setPersonnelNumber(e.target.value)}
                    placeholder="DCJ-EST-2026-001"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg font-mono focus:outline-none focus:border-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Employee Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Muhammad Tariq Mahmood"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Father&apos;s Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fatherName}
                    onChange={(e) => setFatherName(e.target.value)}
                    placeholder="e.g. Haji Ghulam Muhammad"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Gender *
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:border-emerald-700"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Marital Status *
                  </label>
                  <select
                    value={maritalStatus}
                    onChange={(e) => setMaritalStatus(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:border-emerald-700"
                  >
                    <option value="Married">Married</option>
                    <option value="Single">Single</option>
                    <option value="Widowed">Widowed</option>
                    <option value="Divorced">Divorced</option>
                  </select>
                </div>

                {gender === 'Female' && (
                  <div>
                    <label className="block text-xs font-medium text-emerald-800 mb-1">
                      Husband&apos;s Name (For Female Employees)
                    </label>
                    <input
                      type="text"
                      value={husbandName}
                      onChange={(e) => setHusbandName(e.target.value)}
                      placeholder={
                        maritalStatus === 'Single'
                          ? 'Leave blank if unmarried'
                          : 'Enter Husband Name'
                      }
                      className="w-full px-3 py-2 text-sm border border-emerald-400 bg-emerald-50/30 rounded-lg focus:outline-none focus:border-emerald-700"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    CNIC Number (With Dashes) *
                  </label>
                  <input
                    type="text"
                    required
                    value={cnic}
                    onChange={(e) => setCnic(e.target.value)}
                    placeholder="33202-1234567-1"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg font-mono focus:outline-none focus:border-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Date of Birth (Auto-computes 60Yr Retirement) *
                  </label>
                  <input
                    type="date"
                    required
                    value={dateOfBirth}
                    onChange={(e) => handleDobChange(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg font-mono focus:outline-none focus:border-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Domicile District *
                  </label>
                  <input
                    type="text"
                    required
                    value={domicile}
                    onChange={(e) => setDomicile(e.target.value)}
                    placeholder="Jhang"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Blood Group
                  </label>
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:border-emerald-700"
                  >
                    {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Religion
                  </label>
                  <input
                    type="text"
                    value={religion}
                    onChange={(e) => setReligion(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Mobile / Contact Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0300-6501234"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg font-mono focus:outline-none focus:border-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Official / Personal Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="officer@dcojhang.punjab.gov.pk"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-700"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Permanent Home Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={permanentAddress}
                    onChange={(e) => setPermanentAddress(e.target.value)}
                    placeholder="House / Street / Mouza / Tehsil, District Jhang"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-700"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Present Residential Address
                  </label>
                  <input
                    type="text"
                    value={presentAddress}
                    onChange={(e) => setPresentAddress(e.target.value)}
                    placeholder="Leave blank if same as Permanent Address"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-700"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SERVICE INFORMATION */}
          {activeTab === 'service' && (
            <div className="space-y-5">
              <div className="border-b border-slate-200 pb-2">
                <h3 className="text-sm font-semibold text-slate-900">
                  Service Book, Recruitment, Regularization & Job Status
                </h3>
                <p className="text-xs text-slate-500">
                  Configure appointment nature (Regular, Contract, Daily Wages), Date of Regularization, and Job Status (Active, Retired after 60 years, Died during service, OSD).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Designation / Post *
                  </label>
                  <input
                    list="dc-designations"
                    required
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-700"
                  />
                  <datalist id="dc-designations">
                    {DC_JHANG_DESIGNATIONS.map((d) => (
                      <option key={d} value={d} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Basic Pay Scale (BPS) *
                  </label>
                  <select
                    value={bps}
                    onChange={(e) => setBps(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white font-mono focus:outline-none focus:border-emerald-700"
                  >
                    {BPS_SCALES.map((scale) => (
                      <option key={scale} value={scale}>
                        {scale}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Service Cadre
                  </label>
                  <input
                    type="text"
                    value={cadre}
                    onChange={(e) => setCadre(e.target.value)}
                    placeholder="Ministerial / District Cadre"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-700"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Branch / Wing / Office of Posting *
                  </label>
                  <input
                    list="dc-branches"
                    required
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-700"
                  />
                  <datalist id="dc-branches">
                    {DC_JHANG_BRANCHES.map((b) => (
                      <option key={b} value={b} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Tehsil Posting *
                  </label>
                  <select
                    value={tehsil}
                    onChange={(e) => setTehsil(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:border-emerald-700"
                  >
                    <option value="Jhang">Jhang</option>
                    <option value="Shorkot">Shorkot</option>
                    <option value="Ahmadpur Sial">Ahmadpur Sial</option>
                    <option value="Athara Hazari">Athara Hazari (18-Hazari)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Date of Recruitment (First Joining) *
                  </label>
                  <input
                    type="date"
                    required
                    value={dateOfRecruitment}
                    onChange={(e) => setDateOfRecruitment(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg font-mono focus:outline-none focus:border-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Employment Status (Recruitment Mode) *
                  </label>
                  <select
                    value={employmentStatus}
                    onChange={(e) => setEmploymentStatus(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:border-emerald-700"
                  >
                    <option value="Regular">Regular</option>
                    <option value="Contract">Contract</option>
                    <option value="Daily Wages">Daily Wages</option>
                    <option value="Deputation">Deputation</option>
                    <option value="Contingent">Contingent Staff</option>
                  </select>
                </div>

                {employmentStatus === 'Regular' && (
                  <div>
                    <label className="block text-xs font-medium text-emerald-800 mb-1">
                      Date of Regularization (For Regular Staff) *
                    </label>
                    <input
                      type="date"
                      value={dateOfRegularization}
                      onChange={(e) => setDateOfRegularization(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-emerald-400 bg-emerald-50/30 rounded-lg font-mono focus:outline-none focus:border-emerald-700"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Status of Job *
                  </label>
                  <select
                    value={jobStatus}
                    onChange={(e) => setJobStatus(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white font-semibold focus:outline-none focus:border-emerald-700"
                  >
                    <option value="Active">Active</option>
                    <option value="Retired (After 60 Years)">
                      Retired (After 60 Years)
                    </option>
                    <option value="Died During Service">
                      Died During Service
                    </option>
                    <option value="OSD">OSD (Officer on Special Duty)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Date of Retirement (60 Years Superannuation)
                  </label>
                  <input
                    type="date"
                    value={dateOfRetirement}
                    onChange={(e) => setDateOfRetirement(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg font-mono focus:outline-none focus:border-emerald-700"
                  />
                </div>

                {jobStatus === 'Died During Service' && (
                  <div>
                    <label className="block text-xs font-medium text-red-700 mb-1">
                      Date of Death (Died During Service) *
                    </label>
                    <input
                      type="date"
                      required
                      value={dateOfDeath}
                      onChange={(e) => setDateOfDeath(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-red-400 bg-red-50/30 rounded-lg font-mono focus:outline-none focus:border-red-700"
                    />
                  </div>
                )}

                {jobStatus === 'OSD' && (
                  <div>
                    <label className="block text-xs font-medium text-blue-800 mb-1">
                      OSD Notification / Order No.
                    </label>
                    <input
                      type="text"
                      value={osdOrderNo}
                      onChange={(e) => setOsdOrderNo(e.target.value)}
                      placeholder="Order No. Estt/DCJ/2026-..."
                      className="w-full px-3 py-2 text-sm border border-blue-400 bg-blue-50/30 rounded-lg font-mono focus:outline-none focus:border-blue-700"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Seniority Number
                  </label>
                  <input
                    type="text"
                    value={seniorityNo}
                    onChange={(e) => setSeniorityNo(e.target.value)}
                    placeholder="SN-12 / Estt"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg font-mono focus:outline-none focus:border-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    DDO Cost Center Code
                  </label>
                  <input
                    type="text"
                    value={ddoCode}
                    onChange={(e) => setDdoCode(e.target.value)}
                    placeholder="JH-4012"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg font-mono focus:outline-none focus:border-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    GP Fund Account No.
                  </label>
                  <input
                    type="text"
                    value={gpfNumber}
                    onChange={(e) => setGpfNumber(e.target.value)}
                    placeholder="JH-GA-19204"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg font-mono focus:outline-none focus:border-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Pension / Financial Package Status
                  </label>
                  <select
                    value={pensionStatus}
                    onChange={(e) => setPensionStatus(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:border-emerald-700"
                  >
                    <option value="In-Service">In-Service</option>
                    <option value="PPO Issued">PPO Issued (Superannuation)</option>
                    <option value="Family Pension Active">
                      Family Pension Active (Deceased Staff)
                    </option>
                    <option value="Rule 17-A Processed">
                      Rule 17-A Package Processed
                    </option>
                    <option value="Under Process">Pension Papers Under Process</option>
                  </select>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Service Remarks / Cause of Death / OSD Justification / Notes
                  </label>
                  <textarea
                    rows={2}
                    value={causeOfDeathOrRemarks}
                    onChange={(e) => setCauseOfDeathOrRemarks(e.target.value)}
                    placeholder="Enter official remarks regarding recruitment, regularization, retirement, OSD attachment, or in-service demise..."
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-700"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LEGAL HEIRS */}
          {activeTab === 'heirs' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    Legal Heirs, Family Members & Benevolent Fund / Group Insurance Nominees
                  </h3>
                  <p className="text-xs text-slate-500">
                    Maintain verified family tree for Family Pension, Group Insurance, and Rule 17-A appointment eligibility.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setLegalHeirs([
                      ...legalHeirs,
                      {
                        name: '',
                        relation: 'Wife',
                        cnicOrBForm: '',
                        dateOfBirth: '',
                        contactInfo: phone || '',
                        address: permanentAddress || '',
                        sharePercentage: 100,
                        isBenevolentNominee: true,
                        rule17ACandidate: false,
                      },
                    ])
                  }
                  className="px-3 py-1.5 text-xs font-medium text-white bg-emerald-700 hover:bg-emerald-600 rounded-lg flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Legal Heir
                </button>
              </div>

              {legalHeirs.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-500">
                  No legal heirs listed. Click &ldquo;Add Legal Heir&rdquo; above to add spouse, children, or parents.
                </div>
              ) : (
                <div className="space-y-3">
                  {legalHeirs.map((heir, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-slate-50 border border-slate-200 rounded-lg grid grid-cols-1 sm:grid-cols-6 gap-3 items-end"
                    >
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Heir Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={heir.name}
                          onChange={(e) => {
                            const next = [...legalHeirs];
                            next[idx].name = e.target.value;
                            setLegalHeirs(next);
                          }}
                          placeholder="Name of legal heir"
                          className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-md"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Relation *
                        </label>
                        <select
                          value={heir.relation}
                          onChange={(e) => {
                            const next = [...legalHeirs];
                            next[idx].relation = e.target.value;
                            setLegalHeirs(next);
                          }}
                          className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-md"
                        >
                          {[
                            'Wife',
                            'Husband',
                            'Widow',
                            'Son',
                            'Daughter',
                            'Father',
                            'Mother',
                            'Brother',
                            'Sister',
                          ].map((r) => (
                            <option key={r} value={r}>
                              {r}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          CNIC / B-Form No
                        </label>
                        <input
                          type="text"
                          value={heir.cnicOrBForm || ''}
                          onChange={(e) => {
                            const next = [...legalHeirs];
                            next[idx].cnicOrBForm = e.target.value;
                            setLegalHeirs(next);
                          }}
                          placeholder="33202-..."
                          className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-md font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Contact Phone *
                        </label>
                        <input
                          type="text"
                          required
                          value={heir.contactInfo}
                          onChange={(e) => {
                            const next = [...legalHeirs];
                            next[idx].contactInfo = e.target.value;
                            setLegalHeirs(next);
                          }}
                          placeholder="0300-..."
                          className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-md font-mono"
                        />
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <div className="flex-1">
                          <label className="block text-xs font-medium text-slate-700 mb-1">
                            Share %
                          </label>
                          <input
                            type="number"
                            min={1}
                            max={100}
                            value={heir.sharePercentage ?? 100}
                            onChange={(e) => {
                              const next = [...legalHeirs];
                              next[idx].sharePercentage = Number(e.target.value);
                              setLegalHeirs(next);
                            }}
                            className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-md font-mono"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setLegalHeirs(legalHeirs.filter((_, i) => i !== idx))
                          }
                          className="p-2 text-red-600 hover:bg-red-50 rounded-md cursor-pointer"
                          title="Remove Legal Heir"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="sm:col-span-6 flex flex-wrap items-center gap-6 pt-1 text-xs text-slate-700">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={Boolean(heir.isBenevolentNominee)}
                            onChange={(e) => {
                              const next = [...legalHeirs];
                              next[idx].isBenevolentNominee = e.target.checked;
                              setLegalHeirs(next);
                            }}
                          />
                          <span>Nominee for Benevolent Fund & Group Insurance</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={Boolean(heir.rule17ACandidate)}
                            onChange={(e) => {
                              const next = [...legalHeirs];
                              next[idx].rule17ACandidate = e.target.checked;
                              setLegalHeirs(next);
                            }}
                          />
                          <span>Nominated for Rule 17-A Deceased Civil Servant Quota Job</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: ACADEMIC INFORMATION */}
          {activeTab === 'academics' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    Academic Qualifications & Degree Verifications
                  </h3>
                  <p className="text-xs text-slate-500">
                    Record Matriculation, Intermediate, Bachelor, Master, or Professional certifications.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setAcademicRecords([
                      ...academicRecords,
                      {
                        degreeTitle: 'B.A / B.Sc',
                        majorSubjects: 'Economics, Political Science',
                        boardOrUniversity: 'University of the Punjab',
                        passingYear: '2014',
                        gradeOrDivision: '1st Division',
                        verificationStatus: 'Verified',
                      },
                    ])
                  }
                  className="px-3 py-1.5 text-xs font-medium text-white bg-emerald-700 hover:bg-emerald-600 rounded-lg flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Qualification
                </button>
              </div>

              {academicRecords.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-500">
                  No academic qualifications listed yet. Click &ldquo;Add Qualification&rdquo; above.
                </div>
              ) : (
                <div className="space-y-3">
                  {academicRecords.map((acad, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-slate-50 border border-slate-200 rounded-lg grid grid-cols-1 sm:grid-cols-6 gap-3 items-end"
                    >
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Degree / Certificate *
                        </label>
                        <input
                          type="text"
                          required
                          value={acad.degreeTitle}
                          onChange={(e) => {
                            const next = [...academicRecords];
                            next[idx].degreeTitle = e.target.value;
                            setAcademicRecords(next);
                          }}
                          placeholder="e.g. M.A / BS CS"
                          className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-md"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Major Subjects *
                        </label>
                        <input
                          type="text"
                          required
                          value={acad.majorSubjects}
                          onChange={(e) => {
                            const next = [...academicRecords];
                            next[idx].majorSubjects = e.target.value;
                            setAcademicRecords(next);
                          }}
                          className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-md"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Board / University *
                        </label>
                        <input
                          type="text"
                          required
                          value={acad.boardOrUniversity}
                          onChange={(e) => {
                            const next = [...academicRecords];
                            next[idx].boardOrUniversity = e.target.value;
                            setAcademicRecords(next);
                          }}
                          placeholder="BISE Faisalabad / GCUF / Punjab University"
                          className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-md"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Year & Division *
                        </label>
                        <div className="flex gap-1.5">
                          <input
                            type="text"
                            required
                            value={acad.passingYear}
                            onChange={(e) => {
                              const next = [...academicRecords];
                              next[idx].passingYear = e.target.value;
                              setAcademicRecords(next);
                            }}
                            placeholder="Year"
                            className="w-16 px-2 py-1.5 text-xs bg-white border border-slate-300 rounded-md font-mono"
                          />
                          <input
                            type="text"
                            required
                            value={acad.gradeOrDivision}
                            onChange={(e) => {
                              const next = [...academicRecords];
                              next[idx].gradeOrDivision = e.target.value;
                              setAcademicRecords(next);
                            }}
                            placeholder="1st Div"
                            className="flex-1 px-2 py-1.5 text-xs bg-white border border-slate-300 rounded-md"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={acad.verificationStatus || 'Verified'}
                          onChange={(e) => {
                            const next = [...academicRecords];
                            next[idx].verificationStatus = e.target.value;
                            setAcademicRecords(next);
                          }}
                          className="flex-1 px-2 py-1.5 text-xs bg-white border border-slate-300 rounded-md"
                        >
                          <option value="Verified">Verified</option>
                          <option value="Pending Verification">Pending</option>
                          <option value="Sent to Board/HEC">Sent to Board</option>
                        </select>
                        <button
                          type="button"
                          onClick={() =>
                            setAcademicRecords(
                              academicRecords.filter((_, i) => i !== idx)
                            )
                          }
                          className="p-2 text-red-600 hover:bg-red-50 rounded-md cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: LEAVE ACCOUNT */}
          {activeTab === 'leaves' && (
            <div className="space-y-5">
              <div className="border-b border-slate-200 pb-2">
                <h3 className="text-sm font-semibold text-slate-900">
                  Leave Account Balances & Sanctioned Leave Ledger
                </h3>
                <p className="text-xs text-slate-500">
                  Manage credit balance under Punjab Revised Leave Rules 1981 and log sanctioned leaves.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 border border-slate-200 rounded-lg">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Casual Leave Balance (Days / 25 Annual)
                  </label>
                  <input
                    type="number"
                    value={casualLeaveBalance}
                    onChange={(e) => setCasualLeaveBalance(Number(e.target.value))}
                    className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Earned Leave Balance (Full Pay Days)
                  </label>
                  <input
                    type="number"
                    value={earnedLeaveBalance}
                    onChange={(e) => setEarnedLeaveBalance(Number(e.target.value))}
                    className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Medical / Special Leave Balance (Days)
                  </label>
                  <input
                    type="number"
                    value={medicalLeaveBalance}
                    onChange={(e) => setMedicalLeaveBalance(Number(e.target.value))}
                    className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-slate-700">
                  Sanctioned / Availed Leave Entries
                </h4>
                <button
                  type="button"
                  onClick={() =>
                    setLeaveRecords([
                      ...leaveRecords,
                      {
                        leaveType: 'Casual Leave',
                        startDate: '2026-05-01',
                        endDate: '2026-05-05',
                        totalDays: 5,
                        orderNo: 'No. Estt/DCJ/2026-501',
                        sanctionedBy: 'Additional Deputy Commissioner (General), Jhang',
                        status: 'Approved',
                        remarks: 'Personal affairs',
                      },
                    ])
                  }
                  className="px-3 py-1.5 text-xs font-medium text-white bg-emerald-700 hover:bg-emerald-600 rounded-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Leave Entry
                </button>
              </div>

              {leaveRecords.length > 0 && (
                <div className="space-y-3">
                  {leaveRecords.map((lv, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-slate-50 border border-slate-200 rounded-lg grid grid-cols-1 sm:grid-cols-6 gap-3 items-end"
                    >
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Leave Type
                        </label>
                        <select
                          value={lv.leaveType}
                          onChange={(e) => {
                            const next = [...leaveRecords];
                            next[idx].leaveType = e.target.value;
                            setLeaveRecords(next);
                          }}
                          className="w-full px-2 py-1.5 text-xs bg-white border border-slate-300 rounded-md"
                        >
                          <option value="Casual Leave">Casual Leave</option>
                          <option value="Earned Leave (Full Pay)">
                            Earned Leave (Full Pay)
                          </option>
                          <option value="Medical Leave">Medical Leave</option>
                          <option value="Maternity Leave">Maternity Leave</option>
                          <option value="LPR (Leave Preparatory to Retirement)">
                            LPR (Pre-Retirement)
                          </option>
                          <option value="Ex-Pakistan Leave">Ex-Pakistan Leave</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Start Date
                        </label>
                        <input
                          type="date"
                          value={lv.startDate}
                          onChange={(e) => {
                            const next = [...leaveRecords];
                            next[idx].startDate = e.target.value;
                            setLeaveRecords(next);
                          }}
                          className="w-full px-2 py-1.5 text-xs bg-white border border-slate-300 rounded-md font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          End Date
                        </label>
                        <input
                          type="date"
                          value={lv.endDate}
                          onChange={(e) => {
                            const next = [...leaveRecords];
                            next[idx].endDate = e.target.value;
                            setLeaveRecords(next);
                          }}
                          className="w-full px-2 py-1.5 text-xs bg-white border border-slate-300 rounded-md font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Days & Order No
                        </label>
                        <div className="flex gap-1.5">
                          <input
                            type="number"
                            min={1}
                            value={lv.totalDays}
                            onChange={(e) => {
                              const next = [...leaveRecords];
                              next[idx].totalDays = Number(e.target.value);
                              setLeaveRecords(next);
                            }}
                            className="w-14 px-2 py-1.5 text-xs bg-white border border-slate-300 rounded-md font-mono"
                          />
                          <input
                            type="text"
                            value={lv.orderNo}
                            onChange={(e) => {
                              const next = [...leaveRecords];
                              next[idx].orderNo = e.target.value;
                              setLeaveRecords(next);
                            }}
                            placeholder="Order No"
                            className="flex-1 px-2 py-1.5 text-xs bg-white border border-slate-300 rounded-md font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Remarks / Reason
                        </label>
                        <input
                          type="text"
                          value={lv.remarks || ''}
                          onChange={(e) => {
                            const next = [...leaveRecords];
                            next[idx].remarks = e.target.value;
                            setLeaveRecords(next);
                          }}
                          className="w-full px-2 py-1.5 text-xs bg-white border border-slate-300 rounded-md"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={lv.status || 'Approved'}
                          onChange={(e) => {
                            const next = [...leaveRecords];
                            next[idx].status = e.target.value;
                            setLeaveRecords(next);
                          }}
                          className="flex-1 px-2 py-1.5 text-xs bg-white border border-slate-300 rounded-md"
                        >
                          <option value="Approved">Approved</option>
                          <option value="Availed">Availed</option>
                          <option value="Pending">Pending</option>
                        </select>
                        <button
                          type="button"
                          onClick={() =>
                            setLeaveRecords(leaveRecords.filter((_, i) => i !== idx))
                          }
                          className="p-2 text-red-600 hover:bg-red-50 rounded-md cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: ACR / PERs */}
          {activeTab === 'acr' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    Annual Confidential Reports (ACR) / Performance Evaluation Reports (PER)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Maintain annual evaluation synopses for Departmental Promotion Committee (DPC) scrutiny.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setAcrRecords([
                      ...acrRecords,
                      {
                        assessmentYear: '2025 (01-01-2025 to 31-12-2025)',
                        postHeld: `${designation} (${bps})`,
                        reportingOfficer: 'Additional Deputy Commissioner (General), Jhang',
                        countersigningOfficer: 'Deputy Commissioner, Jhang',
                        overallGrading: 'Very Good',
                        integrity: 'Beyond Doubt',
                        fitnessForPromotion: 'Fit for Promotion',
                        dossierStatus: 'Completed & Placed in Dossier',
                        penPictureRemarks: 'Punctual, reliable, and well-versed in official rules.',
                      },
                    ])
                  }
                  className="px-3 py-1.5 text-xs font-medium text-white bg-emerald-700 hover:bg-emerald-600 rounded-lg flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add ACR / PER Report
                </button>
              </div>

              {acrRecords.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-500">
                  No ACR / PER entries added yet. Click &ldquo;Add ACR / PER Report&rdquo; above.
                </div>
              ) : (
                <div className="space-y-3">
                  {acrRecords.map((acr, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-slate-50 border border-slate-200 rounded-lg grid grid-cols-1 sm:grid-cols-3 gap-3"
                    >
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Assessment Year / Period
                        </label>
                        <input
                          type="text"
                          value={acr.assessmentYear}
                          onChange={(e) => {
                            const next = [...acrRecords];
                            next[idx].assessmentYear = e.target.value;
                            setAcrRecords(next);
                          }}
                          className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-md font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Post Held During Year
                        </label>
                        <input
                          type="text"
                          value={acr.postHeld}
                          onChange={(e) => {
                            const next = [...acrRecords];
                            next[idx].postHeld = e.target.value;
                            setAcrRecords(next);
                          }}
                          className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-md"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Overall Grading
                        </label>
                        <select
                          value={acr.overallGrading}
                          onChange={(e) => {
                            const next = [...acrRecords];
                            next[idx].overallGrading = e.target.value;
                            setAcrRecords(next);
                          }}
                          className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-md font-semibold"
                        >
                          <option value="Outstanding">Outstanding</option>
                          <option value="Very Good">Very Good</option>
                          <option value="Good">Good</option>
                          <option value="Average">Average</option>
                          <option value="Below Average">Below Average</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Reporting Officer
                        </label>
                        <input
                          type="text"
                          value={acr.reportingOfficer}
                          onChange={(e) => {
                            const next = [...acrRecords];
                            next[idx].reportingOfficer = e.target.value;
                            setAcrRecords(next);
                          }}
                          className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-md"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Countersigning Officer
                        </label>
                        <input
                          type="text"
                          value={acr.countersigningOfficer}
                          onChange={(e) => {
                            const next = [...acrRecords];
                            next[idx].countersigningOfficer = e.target.value;
                            setAcrRecords(next);
                          }}
                          className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-md"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Fitness for Promotion & Integrity
                        </label>
                        <select
                          value={acr.fitnessForPromotion}
                          onChange={(e) => {
                            const next = [...acrRecords];
                            next[idx].fitnessForPromotion = e.target.value;
                            setAcrRecords(next);
                          }}
                          className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-md"
                        >
                          <option value="Fit for Accelerated Promotion">
                            Fit for Accelerated Promotion
                          </option>
                          <option value="Fit for Promotion">Fit for Promotion</option>
                          <option value="Not Yet Fit">Not Yet Fit</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Pen Picture / Remarks
                        </label>
                        <input
                          type="text"
                          value={acr.penPictureRemarks || ''}
                          onChange={(e) => {
                            const next = [...acrRecords];
                            next[idx].penPictureRemarks = e.target.value;
                            setAcrRecords(next);
                          }}
                          className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-md"
                        />
                      </div>

                      <div className="flex items-end gap-2">
                        <div className="flex-1">
                          <label className="block text-xs font-medium text-slate-700 mb-1">
                            Dossier Status
                          </label>
                          <select
                            value={acr.dossierStatus || 'Completed & Placed in Dossier'}
                            onChange={(e) => {
                              const next = [...acrRecords];
                              next[idx].dossierStatus = e.target.value;
                              setAcrRecords(next);
                            }}
                            className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-md"
                          >
                            <option value="Completed & Placed in Dossier">
                              Completed & Placed in Dossier
                            </option>
                            <option value="Awaiting Countersignature">
                              Awaiting Countersignature
                            </option>
                            <option value="Awaiting Reporting Officer">
                              Awaiting Reporting Officer
                            </option>
                          </select>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setAcrRecords(acrRecords.filter((_, i) => i !== idx))
                          }
                          className="p-2 text-red-600 hover:bg-red-50 rounded-md cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 7: POSTING & SERVICE HISTORY */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    Posting, Transfer, Promotion & OSD Order History
                  </h3>
                  <p className="text-xs text-slate-500">
                    Track inter-branch transfers across DC Office Jhang and Tehsil AC Offices (Jhang, Shorkot, Ahmadpur Sial, 18-Hazari).
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setServiceHistory([
                      ...serviceHistory,
                      {
                        eventType: 'Transfer / Posting',
                        fromBranchOrPost: 'General Branch (DC Office)',
                        toBranchOrPost: `${designation} — ${branch}`,
                        effectiveDate: '2026-01-15',
                        orderNumber: 'Order No. Estt/DCJ/2026-104',
                        remarks: 'Posted in public interest',
                      },
                    ])
                  }
                  className="px-3 py-1.5 text-xs font-medium text-white bg-emerald-700 hover:bg-emerald-600 rounded-lg flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Posting Event
                </button>
              </div>

              {serviceHistory.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-500">
                  No posting history events added yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {serviceHistory.map((sh, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-slate-50 border border-slate-200 rounded-lg grid grid-cols-1 sm:grid-cols-5 gap-3 items-end"
                    >
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Event Type
                        </label>
                        <select
                          value={sh.eventType}
                          onChange={(e) => {
                            const next = [...serviceHistory];
                            next[idx].eventType = e.target.value;
                            setServiceHistory(next);
                          }}
                          className="w-full px-2 py-1.5 text-xs bg-white border border-slate-300 rounded-md"
                        >
                          <option value="Initial Appointment">
                            Initial Appointment
                          </option>
                          <option value="Regularization">Regularization</option>
                          <option value="Transfer / Posting">
                            Transfer / Posting
                          </option>
                          <option value="Promotion / Upgradation">
                            Promotion / Upgradation
                          </option>
                          <option value="OSD Attachment">OSD Attachment</option>
                          <option value="Retirement">Retirement (60 Yrs)</option>
                          <option value="Demise in Service">
                            Demise in Service
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          From Branch / Post
                        </label>
                        <input
                          type="text"
                          value={sh.fromBranchOrPost}
                          onChange={(e) => {
                            const next = [...serviceHistory];
                            next[idx].fromBranchOrPost = e.target.value;
                            setServiceHistory(next);
                          }}
                          className="w-full px-2 py-1.5 text-xs bg-white border border-slate-300 rounded-md"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          To Branch / Post
                        </label>
                        <input
                          type="text"
                          value={sh.toBranchOrPost}
                          onChange={(e) => {
                            const next = [...serviceHistory];
                            next[idx].toBranchOrPost = e.target.value;
                            setServiceHistory(next);
                          }}
                          className="w-full px-2 py-1.5 text-xs bg-white border border-slate-300 rounded-md"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Date & Order No
                        </label>
                        <div className="flex gap-1">
                          <input
                            type="date"
                            value={sh.effectiveDate}
                            onChange={(e) => {
                              const next = [...serviceHistory];
                              next[idx].effectiveDate = e.target.value;
                              setServiceHistory(next);
                            }}
                            className="w-28 px-1.5 py-1.5 text-xs bg-white border border-slate-300 rounded-md font-mono"
                          />
                          <input
                            type="text"
                            value={sh.orderNumber}
                            onChange={(e) => {
                              const next = [...serviceHistory];
                              next[idx].orderNumber = e.target.value;
                              setServiceHistory(next);
                            }}
                            placeholder="Order No"
                            className="flex-1 px-2 py-1.5 text-xs bg-white border border-slate-300 rounded-md font-mono"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={sh.remarks || ''}
                          onChange={(e) => {
                            const next = [...serviceHistory];
                            next[idx].remarks = e.target.value;
                            setServiceHistory(next);
                          }}
                          placeholder="Remarks"
                          className="flex-1 px-2 py-1.5 text-xs bg-white border border-slate-300 rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setServiceHistory(
                              serviceHistory.filter((_, i) => i !== idx)
                            )
                          }
                          className="p-2 text-red-600 hover:bg-red-50 rounded-md cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

            {/* Full-Screen Footer Actions */}
            <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-slate-500">
                All changes are saved directly to the District Establishment Database (Supabase).
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  Back to Roster
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-700 disabled:opacity-50 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  {saving
                    ? 'Saving Record...'
                    : isEditing
                    ? 'Update Employee Record'
                    : 'Save Employee Record'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
