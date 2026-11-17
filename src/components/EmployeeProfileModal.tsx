import React, { useState } from 'react';
import {
  ArrowLeft,
  Printer,
  Edit3,
  User,
  Briefcase,
  Users,
  GraduationCap,
  Calendar,
  FileCheck,
  History,
} from 'lucide-react';
import {
  Employee,
  calculateAgeYears,
  calculateServiceLength,
} from '../types/hr';

interface EmployeeProfileModalProps {
  employee: Employee;
  onClose: () => void;
  onEdit: (emp: Employee) => void;
}

type ProfileSection =
  | 'overview'
  | 'heirs'
  | 'academics'
  | 'leaves'
  | 'acr'
  | 'history';

export const EmployeeProfileModal: React.FC<EmployeeProfileModalProps> = ({
  employee,
  onClose,
  onEdit,
}) => {
  const [activeTab, setActiveTab] = useState<ProfileSection>('overview');

  const endServiceRef =
    employee.jobStatus === 'Died During Service'
      ? employee.dateOfDeath
      : employee.jobStatus === 'Retired (After 60 Years)'
      ? employee.dateOfRetirement
      : null;

  const ageYears = calculateAgeYears(
    employee.dateOfBirth,
    endServiceRef || undefined
  );
  const serviceLength = calculateServiceLength(
    employee.dateOfRecruitment,
    endServiceRef
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col">
      <div className="w-full flex-1 flex flex-col">
        {/* Full-Screen Sticky Header */}
        <header className="sticky top-0 z-30 px-8 py-4 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer no-print"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Roster
            </button>
            <div>
              <div className="text-xs text-emerald-400 font-mono tabular-nums">
                OFFICE OF THE DEPUTY COMMISSIONER, JHANG · SERVICE BOOK DOSSIER ·{' '}
                {employee.personnelNumber}
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-0.5">
                {employee.name}
              </h1>
              <div className="text-xs text-slate-300 mt-1 flex flex-wrap items-center gap-2">
                <span>{employee.designation}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">{employee.bps}</span>
                <span aria-hidden="true">·</span>
                <span>{employee.branch}</span>
                <span aria-hidden="true">·</span>
                <span>Tehsil {employee.tehsil}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 no-print shrink-0">
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              Print Service Sheet
            </button>
            <button
              type="button"
              onClick={() => onEdit(employee)}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Edit Employee in Full Screen
            </button>
          </div>
        </header>

        {/* Summary Strip */}
        <div className="px-8 py-3.5 bg-white border-b border-slate-200 grid grid-cols-2 sm:grid-cols-5 gap-4 text-xs shrink-0">
          <div>
            <span className="text-slate-500 block">Status of Job</span>
            <span
              className={`font-semibold mt-0.5 block ${
                employee.jobStatus === 'Active'
                  ? 'text-emerald-700'
                  : employee.jobStatus === 'Retired (After 60 Years)'
                  ? 'text-amber-700'
                  : employee.jobStatus === 'Died During Service'
                  ? 'text-red-700'
                  : 'text-blue-700'
              }`}
            >
              {employee.jobStatus}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block">Recruitment Mode</span>
            <span className="font-semibold text-slate-900 mt-0.5 block">
              {employee.employmentStatus}
              {employee.employmentStatus === 'Regular' &&
              employee.dateOfRegularization
                ? ` (Reg: ${employee.dateOfRegularization})`
                : ''}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block">CNIC & Age</span>
            <span className="font-mono tabular-nums font-medium text-slate-900 mt-0.5 block">
              {employee.cnic} · {ageYears} yrs
            </span>
          </div>
          <div>
            <span className="text-slate-500 block">Qualifying Service</span>
            <span className="font-mono tabular-nums font-medium text-slate-900 mt-0.5 block">
              {serviceLength} (Since {employee.dateOfRecruitment})
            </span>
          </div>
          <div>
            <span className="text-slate-500 block">
              {employee.jobStatus === 'Died During Service'
                ? 'Date of Demise in Service'
                : 'Superannuation (60 Yrs)'}
            </span>
            <span className="font-mono tabular-nums font-medium text-slate-900 mt-0.5 block">
              {employee.jobStatus === 'Died During Service'
                ? employee.dateOfDeath || 'Recorded'
                : employee.dateOfRetirement || '—'}
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-8 pt-2 bg-white border-b border-slate-200 flex items-center gap-1 overflow-x-auto no-print shrink-0">
          {[
            { id: 'overview', label: 'Basic & Service Info', icon: User },
            {
              id: 'heirs',
              label: `Legal Heirs (${employee.legalHeirs?.length || 0})`,
              icon: Users,
            },
            {
              id: 'academics',
              label: `Academic Info (${employee.academicRecords?.length || 0})`,
              icon: GraduationCap,
            },
            {
              id: 'leaves',
              label: `Leave Account (${employee.leaveRecords?.length || 0})`,
              icon: Calendar,
            },
            {
              id: 'acr',
              label: `ACR / PERs (${employee.acrRecords?.length || 0})`,
              icon: FileCheck,
            },
            {
              id: 'history',
              label: `Posting History (${employee.serviceHistory?.length || 0})`,
              icon: History,
            },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ProfileSection)}
                className={`px-3.5 py-2.5 text-xs font-medium border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'border-emerald-700 text-emerald-800 font-semibold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Full-Screen Content Area */}
        <div className="w-full max-w-[1440px] mx-auto px-8 py-8 space-y-8 flex-1">
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-8">
            {(activeTab === 'overview' || typeof window !== 'undefined') && (
            <div className={activeTab === 'overview' ? 'space-y-8' : 'hidden print:block space-y-8'}>
              {/* Section 1: Basic Personal Information */}
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                    <User className="w-4 h-4 text-slate-500" />
                    01. Employee Basic Information
                  </h3>
                  <span className="text-xs text-slate-500 font-mono tabular-nums">
                    Domicile: District {employee.domicile}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 mt-4 text-sm">
                  <div>
                    <span className="text-xs text-slate-500 block">Full Name</span>
                    <span className="font-medium text-slate-900">{employee.name}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Father&apos;s Name</span>
                    <span className="font-medium text-slate-900">{employee.fatherName}</span>
                  </div>
                  {employee.gender === 'Female' && (
                    <div>
                      <span className="text-xs text-slate-500 block">
                        Husband&apos;s Name (Female Employee)
                      </span>
                      <span className="font-medium text-slate-900">
                        {employee.husbandName && employee.husbandName.trim() !== ''
                          ? employee.husbandName
                          : 'Not Applicable (Unmarried / D/O)'}
                      </span>
                    </div>
                  )}
                  <div>
                    <span className="text-xs text-slate-500 block">Gender & Marital Status</span>
                    <span className="font-medium text-slate-900">
                      {employee.gender} · {employee.maritalStatus}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">CNIC Number</span>
                    <span className="font-mono tabular-nums font-medium text-slate-900">
                      {employee.cnic}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Date of Birth</span>
                    <span className="font-mono tabular-nums font-medium text-slate-900">
                      {employee.dateOfBirth} ({ageYears} Years)
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Religion & Blood Group</span>
                    <span className="font-medium text-slate-900">
                      {employee.religion || 'Islam'} · Blood Group {employee.bloodGroup || 'B+'}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Contact Phone</span>
                    <span className="font-mono tabular-nums font-medium text-slate-900">
                      {employee.phone}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Official Email</span>
                    <span className="font-medium text-slate-900">
                      {employee.email || 'Not Recorded'}
                    </span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-xs text-slate-500 block">Permanent Address</span>
                    <span className="font-medium text-slate-900">
                      {employee.permanentAddress}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Present Address</span>
                    <span className="font-medium text-slate-900">
                      {employee.presentAddress || employee.permanentAddress}
                    </span>
                  </div>
                </div>
              </div>

              {/* Section 2: Service Information */}
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-slate-500" />
                    02. Service & Establishment Information
                  </h3>
                  <span className="text-xs text-slate-500 font-mono tabular-nums">
                    DDO Code: {employee.ddoCode || 'JH-4012'} · GPF: {employee.gpfNumber || 'N/A'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 mt-4 text-sm">
                  <div>
                    <span className="text-xs text-slate-500 block">Post / Designation & BPS</span>
                    <span className="font-medium text-slate-900">
                      {employee.designation} ({employee.bps})
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Branch / Place of Posting</span>
                    <span className="font-medium text-slate-900">
                      {employee.branch} (Tehsil {employee.tehsil})
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Service Cadre & Seniority</span>
                    <span className="font-medium text-slate-900">
                      {employee.cadre} · {employee.seniorityNo || 'Unassigned'}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Date of Recruitment</span>
                    <span className="font-mono tabular-nums font-medium text-slate-900">
                      {employee.dateOfRecruitment}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">
                      Nature of Appointment (Status)
                    </span>
                    <span className="font-medium text-slate-900">
                      {employee.employmentStatus}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">
                      Date of Regularization (If Regular)
                    </span>
                    <span className="font-mono tabular-nums font-medium text-slate-900">
                      {employee.employmentStatus === 'Regular'
                        ? employee.dateOfRegularization || employee.dateOfRecruitment
                        : `Not Regularized (${employee.employmentStatus})`}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Current Status of Job</span>
                    <span className="font-semibold text-slate-900">
                      {employee.jobStatus}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">
                      Date of Retirement (At 60 Years Age)
                    </span>
                    <span className="font-mono tabular-nums font-medium text-slate-900">
                      {employee.dateOfRetirement || '—'}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">
                      Date of Death (If Died During Service)
                    </span>
                    <span className="font-mono tabular-nums font-medium text-slate-900">
                      {employee.jobStatus === 'Died During Service'
                        ? employee.dateOfDeath || 'Recorded'
                        : 'Not Applicable (Alive)'}
                    </span>
                  </div>
                  {employee.jobStatus === 'OSD' && (
                    <div className="sm:col-span-2">
                      <span className="text-xs text-slate-500 block">
                        OSD Notification / Order Number
                      </span>
                      <span className="font-mono tabular-nums font-medium text-blue-800">
                        {employee.osdOrderNo || 'Attached with DC Office Establishment Pool'}
                      </span>
                    </div>
                  )}
                  <div>
                    <span className="text-xs text-slate-500 block">
                      Pension / Welfare Case Status
                    </span>
                    <span className="font-medium text-slate-900">
                      {employee.pensionStatus || 'In-Service'}
                    </span>
                  </div>
                  {employee.causeOfDeathOrRemarks && (
                    <div className="sm:col-span-3 pt-2">
                      <span className="text-xs text-slate-500 block">
                        Official Establishment Remarks / Case Summary
                      </span>
                      <p className="text-sm text-slate-800 mt-1 bg-slate-50 border border-slate-200 rounded-lg p-3">
                        {employee.causeOfDeathOrRemarks}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Section 3: Legal Heirs / Family Details */}
          {(activeTab === 'heirs' || activeTab === 'overview') && (
            <div className={activeTab === 'heirs' ? 'space-y-4' : 'pt-4 border-t border-slate-200 space-y-4'}>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <Users className="w-4 h-4 text-slate-500" />
                  03. Legal Heirs, Family & Benevolent Fund Nominees
                </h3>
                <span className="text-xs text-slate-500">
                  {employee.legalHeirs?.length || 0} registered family member(s)
                </span>
              </div>

              {employee.legalHeirs && employee.legalHeirs.length > 0 ? (
                <div className="overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                        <th className="py-2.5 px-3 font-semibold">Legal Heir Name</th>
                        <th className="py-2.5 px-3 font-semibold">Relation</th>
                        <th className="py-2.5 px-3 font-semibold">CNIC / B-Form No</th>
                        <th className="py-2.5 px-3 font-semibold">Date of Birth</th>
                        <th className="py-2.5 px-3 font-semibold">Contact Info</th>
                        <th className="py-2.5 px-3 font-semibold text-right">Share %</th>
                        <th className="py-2.5 px-3 font-semibold">Nominee / Rule 17-A</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {employee.legalHeirs.map((heir, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/80">
                          <td className="py-2.5 px-3 font-medium text-slate-900">
                            {heir.name}
                          </td>
                          <td className="py-2.5 px-3 text-slate-700">{heir.relation}</td>
                          <td className="py-2.5 px-3 font-mono tabular-nums text-slate-700">
                            {heir.cnicOrBForm || '—'}
                          </td>
                          <td className="py-2.5 px-3 font-mono tabular-nums text-slate-700">
                            {heir.dateOfBirth || '—'}
                          </td>
                          <td className="py-2.5 px-3 font-mono tabular-nums text-slate-700">
                            {heir.contactInfo}
                          </td>
                          <td className="py-2.5 px-3 font-mono tabular-nums text-right font-medium text-slate-900">
                            {heir.sharePercentage ?? 100}%
                          </td>
                          <td className="py-2.5 px-3 text-slate-700">
                            {heir.isBenevolentNominee ? 'BF & GI Nominee' : 'Legal Heir'}
                            {heir.rule17ACandidate ? ' · Rule 17-A Applicant' : ''}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-6 text-center bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-500">
                  No legal heirs recorded yet. Click &ldquo;Edit Dossier&rdquo; to add legal heirs and family nominees.
                </div>
              )}
            </div>
          )}

          {/* Section 4: Academic Information */}
          {(activeTab === 'academics' || activeTab === 'overview') && (
            <div className={activeTab === 'academics' ? 'space-y-4' : 'pt-4 border-t border-slate-200 space-y-4'}>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-slate-500" />
                  04. Academic Qualifications & Board/HEC Verification
                </h3>
                <span className="text-xs text-slate-500">
                  {employee.academicRecords?.length || 0} qualification(s)
                </span>
              </div>

              {employee.academicRecords && employee.academicRecords.length > 0 ? (
                <div className="overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                        <th className="py-2.5 px-3 font-semibold">Degree / Certificate</th>
                        <th className="py-2.5 px-3 font-semibold">Major Subjects</th>
                        <th className="py-2.5 px-3 font-semibold">Board / University</th>
                        <th className="py-2.5 px-3 font-semibold">Passing Year</th>
                        <th className="py-2.5 px-3 font-semibold">Grade / Division</th>
                        <th className="py-2.5 px-3 font-semibold">Verification Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {employee.academicRecords.map((acad, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/80">
                          <td className="py-2.5 px-3 font-medium text-slate-900">
                            {acad.degreeTitle}
                          </td>
                          <td className="py-2.5 px-3 text-slate-700">{acad.majorSubjects}</td>
                          <td className="py-2.5 px-3 text-slate-700">
                            {acad.boardOrUniversity}
                          </td>
                          <td className="py-2.5 px-3 font-mono tabular-nums text-slate-700">
                            {acad.passingYear}
                          </td>
                          <td className="py-2.5 px-3 font-mono tabular-nums text-slate-900">
                            {acad.gradeOrDivision}
                          </td>
                          <td className="py-2.5 px-3 text-emerald-700 font-medium">
                            {acad.verificationStatus || 'Verified'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-6 text-center bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-500">
                  No academic qualifications recorded for this employee.
                </div>
              )}
            </div>
          )}

          {/* Section 5: Leave Account */}
          {(activeTab === 'leaves' || activeTab === 'overview') && (
            <div className={activeTab === 'leaves' ? 'space-y-4' : 'pt-4 border-t border-slate-200 space-y-4'}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  05. Leave Account Ledger (Revised Leave Rules 1981)
                </h3>
                <div className="flex items-center gap-4 text-xs font-mono tabular-nums text-slate-700">
                  <span>Casual Leave Bal: {employee.casualLeaveBalance}d / 25d</span>
                  <span aria-hidden="true">·</span>
                  <span>Earned Leave Bal: {employee.earnedLeaveBalance}d</span>
                  <span aria-hidden="true">·</span>
                  <span>Medical Leave Bal: {employee.medicalLeaveBalance}d</span>
                </div>
              </div>

              {employee.leaveRecords && employee.leaveRecords.length > 0 ? (
                <div className="overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                        <th className="py-2.5 px-3 font-semibold">Leave Type</th>
                        <th className="py-2.5 px-3 font-semibold">Period (From — To)</th>
                        <th className="py-2.5 px-3 font-semibold text-right">Days</th>
                        <th className="py-2.5 px-3 font-semibold">Sanction Order No</th>
                        <th className="py-2.5 px-3 font-semibold">Sanctioning Authority</th>
                        <th className="py-2.5 px-3 font-semibold">Status & Purpose</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {employee.leaveRecords.map((lv, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/80">
                          <td className="py-2.5 px-3 font-medium text-slate-900">
                            {lv.leaveType}
                          </td>
                          <td className="py-2.5 px-3 font-mono tabular-nums text-slate-700">
                            {lv.startDate} to {lv.endDate}
                          </td>
                          <td className="py-2.5 px-3 font-mono tabular-nums text-right font-semibold text-slate-900">
                            {lv.totalDays}
                          </td>
                          <td className="py-2.5 px-3 font-mono tabular-nums text-slate-700">
                            {lv.orderNo}
                          </td>
                          <td className="py-2.5 px-3 text-slate-700">{lv.sanctionedBy}</td>
                          <td className="py-2.5 px-3 text-slate-700">
                            <span className="font-medium text-slate-900">{lv.status}</span>
                            {lv.remarks ? ` · ${lv.remarks}` : ''}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-6 text-center bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-500">
                  No leave applications or availed leaves recorded in ledger.
                </div>
              )}
            </div>
          )}

          {/* Section 6: ACR / PERs */}
          {(activeTab === 'acr' || activeTab === 'overview') && (
            <div className={activeTab === 'acr' ? 'space-y-4' : 'pt-4 border-t border-slate-200 space-y-4'}>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-slate-500" />
                  06. ACR / PER Synopsis (Character Roll & DPC Dossier)
                </h3>
                <span className="text-xs text-slate-500">
                  {employee.acrRecords?.length || 0} annual report(s) on file
                </span>
              </div>

              {employee.acrRecords && employee.acrRecords.length > 0 ? (
                <div className="overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                        <th className="py-2.5 px-3 font-semibold">Assessment Year</th>
                        <th className="py-2.5 px-3 font-semibold">Post Held</th>
                        <th className="py-2.5 px-3 font-semibold">Reporting / Countersigning</th>
                        <th className="py-2.5 px-3 font-semibold">Grading & Integrity</th>
                        <th className="py-2.5 px-3 font-semibold">Fitness for Promotion</th>
                        <th className="py-2.5 px-3 font-semibold">Pen Picture / Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {employee.acrRecords.map((acr, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/80">
                          <td className="py-2.5 px-3 font-mono tabular-nums font-medium text-slate-900">
                            {acr.assessmentYear}
                          </td>
                          <td className="py-2.5 px-3 text-slate-700">{acr.postHeld}</td>
                          <td className="py-2.5 px-3 text-slate-700">
                            <div>RO: {acr.reportingOfficer}</div>
                            <div className="text-slate-500">CO: {acr.countersigningOfficer}</div>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="font-semibold text-emerald-800">
                              {acr.overallGrading}
                            </span>
                            <div className="text-slate-500">Integrity: {acr.integrity}</div>
                          </td>
                          <td className="py-2.5 px-3 text-slate-800 font-medium">
                            {acr.fitnessForPromotion}
                          </td>
                          <td className="py-2.5 px-3 text-slate-600 max-w-xs">
                            <div className="text-slate-900 font-medium">{acr.dossierStatus}</div>
                            {acr.penPictureRemarks && (
                              <div className="mt-0.5 text-slate-500">{acr.penPictureRemarks}</div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-6 text-center bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-500">
                  No ACR / PER evaluation reports recorded in Character Roll yet.
                </div>
              )}
            </div>
          )}

          {/* Section 7: Service & Posting History */}
          {(activeTab === 'history' || activeTab === 'overview') && (
            <div className={activeTab === 'history' ? 'space-y-4' : 'pt-4 border-t border-slate-200 space-y-4'}>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <History className="w-4 h-4 text-slate-500" />
                  07. Posting, Transfer & Career Progression History
                </h3>
                <span className="text-xs text-slate-500">
                  {employee.serviceHistory?.length || 0} service event(s)
                </span>
              </div>

              {employee.serviceHistory && employee.serviceHistory.length > 0 ? (
                <div className="overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                        <th className="py-2.5 px-3 font-semibold">Effective Date</th>
                        <th className="py-2.5 px-3 font-semibold">Event Type</th>
                        <th className="py-2.5 px-3 font-semibold">From Post / Branch</th>
                        <th className="py-2.5 px-3 font-semibold">To Post / Branch</th>
                        <th className="py-2.5 px-3 font-semibold">Order Number</th>
                        <th className="py-2.5 px-3 font-semibold">Remarks</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {employee.serviceHistory.map((sh, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/80">
                          <td className="py-2.5 px-3 font-mono tabular-nums font-medium text-slate-900">
                            {sh.effectiveDate}
                          </td>
                          <td className="py-2.5 px-3 font-medium text-slate-900">
                            {sh.eventType}
                          </td>
                          <td className="py-2.5 px-3 text-slate-700">{sh.fromBranchOrPost}</td>
                          <td className="py-2.5 px-3 text-slate-900 font-medium">
                            {sh.toBranchOrPost}
                          </td>
                          <td className="py-2.5 px-3 font-mono tabular-nums text-slate-700">
                            {sh.orderNumber}
                          </td>
                          <td className="py-2.5 px-3 text-slate-600">{sh.remarks || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-6 text-center bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-500">
                  No historical posting transitions recorded.
                </div>
              )}
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};
