import React from 'react';
import { Employee, calculateServiceLength } from '../types/hr';

interface SecondaryViewProps {
  employees: Employee[];
  onPreview: (emp: Employee) => void;
  onEdit: (emp: Employee) => void;
}

export const AcrMatrixView: React.FC<SecondaryViewProps> = ({
  employees,
  onPreview,
  onEdit,
}) => {
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white p-6 border border-emerald-800/40 shadow-md">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          ACR / PER Character Roll &amp; DPC Synopsis Matrix
        </h1>
        <p className="text-xs text-emerald-100/80 mt-1 max-w-3xl">
          Annual Confidential Reports / Performance Evaluation Reports across all Deputy Commissioner Office Jhang staff for Departmental Promotion Committee (DPC) scrutiny.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/90 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300">
                <th className="py-3.5 px-4 font-semibold">Employee &amp; Post</th>
                <th className="py-3.5 px-4 font-semibold">Latest Assessment Year</th>
                <th className="py-3.5 px-4 font-semibold">Reporting &amp; Countersigning</th>
                <th className="py-3.5 px-4 font-semibold">Grading &amp; Integrity</th>
                <th className="py-3.5 px-4 font-semibold">Promotion Fitness &amp; Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {employees.map((emp) => {
                const latestAcr = emp.acrRecords?.[0];
                return (
                  <tr
                    key={emp.id}
                    className="hover:bg-slate-50/90 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900 dark:text-slate-100">
                        {emp.name}
                      </div>
                      <div className="text-slate-500 dark:text-slate-400 mt-0.5">
                        {emp.designation} ({emp.bps}) · {emp.branch}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono tabular-nums">
                      {latestAcr ? (
                        <div>
                          <div className="font-semibold text-slate-900 dark:text-slate-100">
                            {latestAcr.assessmentYear}
                          </div>
                          <div className="text-slate-500 dark:text-slate-400">
                            Reports on File: {emp.acrRecords.length}
                          </div>
                        </div>
                      ) : (
                        <span className="text-amber-700 dark:text-amber-400 font-medium">
                          No ACR Recorded Yet
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                      {latestAcr ? (
                        <div>
                          <div>RO: {latestAcr.reportingOfficer}</div>
                          <div className="text-slate-500 dark:text-slate-400">
                            CO: {latestAcr.countersigningOfficer}
                          </div>
                        </div>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      {latestAcr ? (
                        <div>
                          <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                            {latestAcr.overallGrading}
                          </span>
                          <div className="text-slate-500 dark:text-slate-400">
                            Integrity: {latestAcr.integrity}
                          </div>
                        </div>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      {latestAcr ? (
                        <div>
                          <div className="font-medium text-slate-900 dark:text-slate-100">
                            {latestAcr.fitnessForPromotion}
                          </div>
                          <div className="text-slate-500 dark:text-slate-400">
                            {latestAcr.dossierStatus}
                          </div>
                        </div>
                      ) : (
                        <span className="text-slate-400">Awaiting Submission</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onPreview(emp)}
                          className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg cursor-pointer transition-colors"
                        >
                          View Synopsis
                        </button>
                        <button
                          type="button"
                          onClick={() => onEdit(emp)}
                          className="px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-lg cursor-pointer transition-all"
                        >
                          Add / Edit ACR
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const LeaveAccountsView: React.FC<SecondaryViewProps> = ({
  employees,
  onEdit,
}) => {
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-teal-950 via-emerald-900 to-slate-900 text-white p-6 border border-teal-800/40 shadow-md">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          District Establishment Leave Account Ledger
        </h1>
        <p className="text-xs text-teal-100/80 mt-1 max-w-3xl">
          Track Casual Leave (25 days annual quota), Earned Leave (Full Pay), Medical Leave, Maternity Leave, and LPR balances under Revised Leave Rules 1981.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/90 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300">
                <th className="py-3.5 px-4 font-semibold">Employee &amp; Branch</th>
                <th className="py-3.5 px-4 font-semibold text-right">Casual Leave Bal</th>
                <th className="py-3.5 px-4 font-semibold text-right">Earned Leave Bal</th>
                <th className="py-3.5 px-4 font-semibold text-right">Medical Leave Bal</th>
                <th className="py-3.5 px-4 font-semibold">Recent Sanctioned Leave Order</th>
                <th className="py-3.5 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {employees.map((emp) => {
                const latestLeave = emp.leaveRecords?.[0];
                return (
                  <tr
                    key={emp.id}
                    className="hover:bg-slate-50/90 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900 dark:text-slate-100">
                        {emp.name}
                      </div>
                      <div className="text-slate-500 dark:text-slate-400 mt-0.5">
                        {emp.designation} ({emp.bps}) · {emp.branch}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono tabular-nums text-right font-semibold text-slate-900 dark:text-slate-100">
                      {emp.casualLeaveBalance} / 25 d
                    </td>
                    <td className="py-3.5 px-4 font-mono tabular-nums text-right font-semibold text-emerald-700 dark:text-emerald-400">
                      {emp.earnedLeaveBalance} d
                    </td>
                    <td className="py-3.5 px-4 font-mono tabular-nums text-right font-semibold text-slate-900 dark:text-slate-100">
                      {emp.medicalLeaveBalance} d
                    </td>
                    <td className="py-3.5 px-4">
                      {latestLeave ? (
                        <div>
                          <span className="font-medium text-slate-900 dark:text-slate-100">
                            {latestLeave.leaveType} ({latestLeave.totalDays}d)
                          </span>{' '}
                          ·{' '}
                          <span className="font-mono tabular-nums text-slate-600 dark:text-slate-300">
                            {latestLeave.startDate} to {latestLeave.endDate}
                          </span>
                          <div className="text-slate-500 dark:text-slate-400 font-mono tabular-nums">
                            Order: {latestLeave.orderNo} · {latestLeave.status}
                          </div>
                        </div>
                      ) : (
                        <span className="text-slate-400">No recent leave availed</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => onEdit(emp)}
                        className="px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-lg cursor-pointer transition-all"
                      >
                        Sanction / Update Leave
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const WelfareAndSpecialCellView: React.FC<SecondaryViewProps> = ({
  employees,
  onPreview,
  onEdit,
}) => {
  const diedList = employees.filter((e) => e.jobStatus === 'Died During Service');
  const retiredList = employees.filter(
    (e) => e.jobStatus === 'Retired (After 60 Years)'
  );
  const osdList = employees.filter((e) => e.jobStatus === 'OSD');

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-emerald-950 text-white p-6 border border-indigo-800/40 shadow-md">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Superannuation (60 Yrs), In-Service Demise &amp; OSD Cell
        </h1>
        <p className="text-xs text-slate-300 mt-1 max-w-3xl">
          Dedicated registry for employees retired after 60 years of age, employees who died during service (Legal Heirs, Family Pension &amp; Rule 17-A), and OSD officers.
        </p>
      </div>

      {/* Died During Service */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div>
            <h2 className="text-base font-semibold text-rose-700 dark:text-rose-400">
              01. Died During Service — Family Pension, Benevolent Fund &amp; Rule 17-A Cases
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Complete record of date of death, widow/children legal heirs, contact numbers, and financial assistance package status.
            </p>
          </div>
          <span className="text-xs font-mono tabular-nums font-semibold text-rose-700 dark:text-rose-400">
            {diedList.length} Case(s)
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {diedList.map((emp) => (
            <div
              key={emp.id}
              className="p-4 bg-gradient-to-r from-rose-50/50 via-white to-slate-50 dark:from-rose-950/20 dark:via-slate-900 dark:to-slate-800/60 border border-rose-200/70 dark:border-rose-900/50 rounded-xl space-y-3"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    {emp.name} (S/O {emp.fatherName})
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                    {emp.designation} ({emp.bps}) · {emp.branch} · Recruited:{' '}
                    <span className="font-mono tabular-nums">
                      {emp.dateOfRecruitment}
                    </span>
                  </div>
                </div>
                <div className="text-right font-mono tabular-nums text-xs">
                  <div className="font-semibold text-rose-700 dark:text-rose-400">
                    Date of Death: {emp.dateOfDeath || 'Recorded'}
                  </div>
                  <div className="text-slate-600 dark:text-slate-400">
                    Package Status: {emp.pensionStatus}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {emp.legalHeirs?.map((heir, i) => (
                  <div
                    key={i}
                    className="p-2.5 bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
                  >
                    <div className="font-semibold text-slate-900 dark:text-slate-100">
                      {heir.name} ({heir.relation})
                    </div>
                    <div className="font-mono tabular-nums text-slate-600 dark:text-slate-300 mt-0.5">
                      CNIC: {heir.cnicOrBForm || '—'} · Share:{' '}
                      {heir.sharePercentage ?? 100}%
                    </div>
                    <div className="font-mono tabular-nums text-slate-600 dark:text-slate-400">
                      Contact: {heir.contactInfo}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => onPreview(emp)}
                  className="px-3.5 py-1.5 text-xs font-medium text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors"
                >
                  Open Complete Dossier
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Retired After 60 Years */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div>
            <h2 className="text-base font-semibold text-amber-700 dark:text-amber-400">
              02. Retired from Service After 60 Years of Age (Superannuation Roll)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Officers and officials who retired upon attaining the age of 60 years.
            </p>
          </div>
          <span className="text-xs font-mono tabular-nums font-semibold text-amber-700 dark:text-amber-400">
            {retiredList.length} Officer(s)
          </span>
        </div>

        <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300">
                <th className="py-2.5 px-3 font-semibold">Retired Official</th>
                <th className="py-2.5 px-3 font-semibold">Last Post &amp; Branch</th>
                <th className="py-2.5 px-3 font-semibold">Date of Birth</th>
                <th className="py-2.5 px-3 font-semibold">Date of Retirement (60 Yrs)</th>
                <th className="py-2.5 px-3 font-semibold">Qualifying Service</th>
                <th className="py-2.5 px-3 font-semibold">PPO Status</th>
                <th className="py-2.5 px-3 font-semibold text-right">Dossier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {retiredList.map((emp) => (
                <tr
                  key={emp.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-slate-100">
                    {emp.name}
                  </td>
                  <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300">
                    {emp.designation} ({emp.bps}) · {emp.branch}
                  </td>
                  <td className="py-2.5 px-3 font-mono tabular-nums text-slate-700 dark:text-slate-300">
                    {emp.dateOfBirth}
                  </td>
                  <td className="py-2.5 px-3 font-mono tabular-nums font-semibold text-amber-700 dark:text-amber-400">
                    {emp.dateOfRetirement}
                  </td>
                  <td className="py-2.5 px-3 font-mono tabular-nums text-slate-700 dark:text-slate-300">
                    {calculateServiceLength(
                      emp.dateOfRecruitment,
                      emp.dateOfRetirement
                    )}
                  </td>
                  <td className="py-2.5 px-3 font-medium text-emerald-700 dark:text-emerald-400">
                    {emp.pensionStatus}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      type="button"
                      onClick={() => onPreview(emp)}
                      className="px-2.5 py-1 text-xs font-medium text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg cursor-pointer"
                    >
                      Preview
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* OSD Officers */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div>
            <h2 className="text-base font-semibold text-sky-700 dark:text-sky-400">
              03. Officers on Special Duty (OSD — Establishment Pool)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Personnel currently placed as OSD in the Deputy Commissioner Office Jhang Establishment Pool.
            </p>
          </div>
          <span className="text-xs font-mono tabular-nums font-semibold text-sky-700 dark:text-sky-400">
            {osdList.length} OSD Personnel
          </span>
        </div>

        <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300">
                <th className="py-2.5 px-3 font-semibold">Officer / Official Name</th>
                <th className="py-2.5 px-3 font-semibold">Substantive Post</th>
                <th className="py-2.5 px-3 font-semibold">OSD Order Number</th>
                <th className="py-2.5 px-3 font-semibold">Remarks</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {osdList.map((emp) => (
                <tr
                  key={emp.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-slate-100">
                    {emp.name}
                  </td>
                  <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300">
                    {emp.designation} ({emp.bps})
                  </td>
                  <td className="py-2.5 px-3 font-mono tabular-nums text-sky-700 dark:text-sky-400 font-medium">
                    {emp.osdOrderNo || 'Establishment Pool Order'}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">
                    {emp.causeOfDeathOrRemarks || 'Awaiting posting order'}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <div className="inline-flex gap-1.5">
                      <button
                        type="button"
                        onClick={() => onPreview(emp)}
                        className="px-2.5 py-1 text-xs font-medium text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg cursor-pointer"
                      >
                        Preview
                      </button>
                      <button
                        type="button"
                        onClick={() => onEdit(emp)}
                        className="px-2.5 py-1 text-xs font-medium text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-lg cursor-pointer"
                      >
                        Assign Posting
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
