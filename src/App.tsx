/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Search,
  Plus,
  Eye,
  Edit3,
  Trash2,
  Download,
  Users,
  UserCheck,
  Award,
  HeartCrack,
  Briefcase,
  Building2,
  RefreshCw,
  Database,
  GitBranch,
} from 'lucide-react';
import {
  Employee,
  calculateAgeYears,
  calculateServiceLength,
} from './types/hr';
import {
  fetchAllEmployeesFromSupabase,
  saveEmployeeToSupabaseOrFallback,
  deleteEmployeeFromSupabaseOrFallback,
} from './services/supabaseHrService';
import { EmployeeProfileModal } from './components/EmployeeProfileModal';
import { EmployeeFormModal } from './components/EmployeeFormModal';
import { SupabaseSchemaModal } from './components/SupabaseSchemaModal';
import { GitHubPagesModal } from './components/GitHubPagesModal';
import {
  AcrMatrixView,
  LeaveAccountsView,
  WelfareAndSpecialCellView,
} from './components/SecondaryViews';

type NavView = 'dashboard' | 'employees' | 'acr' | 'leaves' | 'welfare';

export default function App() {
  const [activeView, setActiveView] = useState<NavView>('dashboard');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [needsTableSetup, setNeedsTableSetup] = useState<boolean>(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [jobStatusFilter, setJobStatusFilter] = useState<string>('ALL');
  const [empStatusFilter, setEmpStatusFilter] = useState<string>('ALL');
  const [tehsilFilter, setTehsilFilter] = useState<string>('ALL');
  const [genderFilter, setGenderFilter] = useState<string>('ALL');

  const [previewEmployee, setPreviewEmployee] = useState<Employee | null>(null);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [deleteTarget, setDeleteTarget] = useState<Employee | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [isSchemaModalOpen, setIsSchemaModalOpen] = useState<boolean>(false);
  const [isGhModalOpen, setIsGhModalOpen] = useState<boolean>(false);

  const loadData = useCallback(async () => {
    setLoadingData(true);
    try {
      const result = await fetchAllEmployeesFromSupabase();
      setEmployees(result.employees);
      setNeedsTableSetup(result.needsTableSetup);
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSaveEmployee = async (payload: any, id?: number) => {
    const updatedList = await saveEmployeeToSupabaseOrFallback(payload, id);
    setEmployees(updatedList);
    if (previewEmployee && id) {
      const updatedEmp = updatedList.find((e) => e.id === id);
      if (updatedEmp) setPreviewEmployee(updatedEmp);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const updatedList = await deleteEmployeeFromSupabaseOrFallback(deleteTarget.id);
      setEmployees(updatedList);
      if (previewEmployee?.id === deleteTarget.id) setPreviewEmployee(null);
      setDeleteTarget(null);
    } finally {
      setDeleting(false);
    }
  };

  const stats = useMemo(() => {
    const total = employees.length;
    const active = employees.filter((e) => e.jobStatus === 'Active').length;
    const retired60 = employees.filter(
      (e) => e.jobStatus === 'Retired (After 60 Years)'
    ).length;
    const diedInService = employees.filter(
      (e) => e.jobStatus === 'Died During Service'
    ).length;
    const osd = employees.filter((e) => e.jobStatus === 'OSD').length;
    const regular = employees.filter((e) => e.employmentStatus === 'Regular').length;
    const contract = employees.filter((e) => e.employmentStatus === 'Contract').length;
    const dailyWages = employees.filter(
      (e) => e.employmentStatus === 'Daily Wages'
    ).length;
    const femaleStaff = employees.filter((e) => e.gender === 'Female').length;
    const totalHeirs = employees.reduce(
      (acc, e) => acc + (e.legalHeirs?.length || 0),
      0
    );
    const totalAcrs = employees.reduce(
      (acc, e) => acc + (e.acrRecords?.length || 0),
      0
    );
    return {
      total,
      active,
      retired60,
      diedInService,
      osd,
      regular,
      contract,
      dailyWages,
      femaleStaff,
      totalHeirs,
      totalAcrs,
    };
  }, [employees]);

  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      if (jobStatusFilter !== 'ALL' && emp.jobStatus !== jobStatusFilter) return false;
      if (empStatusFilter !== 'ALL' && emp.employmentStatus !== empStatusFilter)
        return false;
      if (tehsilFilter !== 'ALL' && emp.tehsil !== tehsilFilter) return false;
      if (genderFilter !== 'ALL' && emp.gender !== genderFilter) return false;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const match =
          emp.name.toLowerCase().includes(q) ||
          emp.fatherName.toLowerCase().includes(q) ||
          (emp.husbandName || '').toLowerCase().includes(q) ||
          emp.cnic.toLowerCase().includes(q) ||
          emp.personnelNumber.toLowerCase().includes(q) ||
          emp.designation.toLowerCase().includes(q) ||
          emp.branch.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [employees, jobStatusFilter, empStatusFilter, tehsilFilter, genderFilter, searchQuery]);

  const handleExportCsv = () => {
    const headers = [
      'Personnel No',
      'Name',
      'Father Name',
      'Husband Name',
      'Gender',
      'CNIC',
      'DOB',
      'Designation',
      'BPS',
      'Branch',
      'Tehsil',
      'Recruitment Date',
      'Employment Status',
      'Regularization Date',
      'Job Status',
      'Retirement Date (60 Yrs)',
      'Date of Death',
    ];
    const rows = filteredEmployees.map((e) => [
      e.personnelNumber,
      `"${e.name}"`,
      `"${e.fatherName}"`,
      `"${e.husbandName || ''}"`,
      e.gender,
      e.cnic,
      e.dateOfBirth,
      `"${e.designation}"`,
      e.bps,
      `"${e.branch}"`,
      e.tehsil,
      e.dateOfRecruitment,
      e.employmentStatus,
      e.dateOfRegularization || '',
      e.jobStatus,
      e.dateOfRetirement || '',
      e.dateOfDeath || '',
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', 'DC_Office_Jhang_HR_Roster.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isFormOpen) {
    return (
      <EmployeeFormModal
        initialEmployee={editingEmployee}
        onClose={() => {
          setIsFormOpen(false);
          setEditingEmployee(null);
        }}
        onSave={handleSaveEmployee}
      />
    );
  }

  if (previewEmployee) {
    return (
      <EmployeeProfileModal
        employee={previewEmployee}
        onClose={() => setPreviewEmployee(null)}
        onEdit={(emp) => {
          setPreviewEmployee(null);
          setEditingEmployee(emp);
          setIsFormOpen(true);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* 3-Zone Top Bar Contract */}
      <header className="flex items-center justify-between gap-8 px-6 py-3.5 bg-white border-b border-slate-200 no-print">
        <a
          href="#dashboard"
          onClick={(e) => {
            e.preventDefault();
            setActiveView('dashboard');
          }}
          className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
        >
          DC Office Jhang HRMS
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          {[
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'employees', label: 'Employee Roster' },
            { id: 'acr', label: 'ACR / PERs' },
            { id: 'leaves', label: 'Leave Accounts' },
            { id: 'welfare', label: 'Retirement & Welfare' },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveView(item.id as NavView);
              }}
              className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeView === item.id
                  ? 'text-emerald-800 border-emerald-700 font-semibold'
                  : 'text-slate-600 border-transparent hover:text-slate-900'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              setEditingEmployee(null);
              setIsFormOpen(true);
            }}
            className="px-4 py-2 text-xs font-medium text-white bg-emerald-800 rounded-lg hover:bg-emerald-700 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Employee
          </button>
        </div>
      </header>

      {/* Workspace Sub-Toolbar */}
      <div className="bg-slate-100 border-b border-slate-200 px-6 py-2.5 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600 no-print">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-slate-800">
            Office of the Deputy Commissioner, District Jhang
          </span>
          <span aria-hidden="true">·</span>
          <span>Establishment, Revenue &amp; Ministerial Cadre</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono tabular-nums">Supabase Project: qjoflyaxwffwzoodehod</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsGhModalOpen(true)}
            className="px-2.5 py-1 text-xs font-medium text-slate-800 bg-white border border-slate-300 rounded-md hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
          >
            <GitBranch className="w-3.5 h-3.5 text-slate-700" />
            <span>GitHub Pages Auto-Deploy</span>
          </button>
          <button
            type="button"
            onClick={() => setIsSchemaModalOpen(true)}
            className="px-2.5 py-1 text-xs font-medium text-slate-800 bg-white border border-slate-300 rounded-md hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
          >
            <Database className="w-3.5 h-3.5 text-emerald-700" />
            <span>Supabase SQL Tables</span>
          </button>
          <button
            type="button"
            onClick={loadData}
            disabled={loadingData}
            className="text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingData ? 'animate-spin' : ''}`} />
            <span>Sync</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-6 py-6 space-y-6">
        {activeView === 'acr' && (
          <AcrMatrixView
            employees={employees}
            onPreview={(emp) => setPreviewEmployee(emp)}
            onEdit={(emp) => {
              setEditingEmployee(emp);
              setIsFormOpen(true);
            }}
          />
        )}

        {activeView === 'leaves' && (
          <LeaveAccountsView
            employees={employees}
            onPreview={(emp) => setPreviewEmployee(emp)}
            onEdit={(emp) => {
              setEditingEmployee(emp);
              setIsFormOpen(true);
            }}
          />
        )}

        {activeView === 'welfare' && (
          <WelfareAndSpecialCellView
            employees={employees}
            onPreview={(emp) => setPreviewEmployee(emp)}
            onEdit={(emp) => {
              setEditingEmployee(emp);
              setIsFormOpen(true);
            }}
          />
        )}

        {(activeView === 'dashboard' || activeView === 'employees') && (
          <>
            {activeView === 'dashboard' && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                      District Establishment Overview
                    </h1>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Live sanctioned strength, active deployment, superannuation (60 years age), in-service demise, and OSD roster across District Jhang.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setJobStatusFilter('ALL');
                        setActiveView('employees');
                      }}
                      className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer"
                    >
                      Open Full Directory
                    </button>
                    <button
                      type="button"
                      onClick={handleExportCsv}
                      className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Export CSV Roster
                    </button>
                  </div>
                </div>

                {/* 5 Mandatory Executive Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setJobStatusFilter('ALL');
                      setActiveView('employees');
                    }}
                    className="text-left bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-400 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-slate-500">
                      <span className="text-xs font-medium">Total Employees</span>
                      <Users className="w-4 h-4 text-slate-400" />
                    </div>
                    <div className="text-3xl font-bold font-mono tabular-nums text-slate-900 mt-3">
                      {stats.total}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      {stats.regular} Regular · {stats.contract} Contract · {stats.dailyWages} DW
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setJobStatusFilter('Active');
                      setActiveView('employees');
                    }}
                    className="text-left bg-white border border-slate-200 rounded-xl p-5 hover:border-emerald-600 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-slate-500">
                      <span className="text-xs font-medium">Active Employees</span>
                      <UserCheck className="w-4 h-4 text-emerald-700" />
                    </div>
                    <div className="text-3xl font-bold font-mono tabular-nums text-emerald-700 mt-3">
                      {stats.active}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Serving across DC Complex &amp; 4 Tehsils
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setJobStatusFilter('Retired (After 60 Years)');
                      setActiveView('employees');
                    }}
                    className="text-left bg-white border border-slate-200 rounded-xl p-5 hover:border-amber-600 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-slate-500">
                      <span className="text-xs font-medium">
                        Retired (After 60 Years)
                      </span>
                      <Award className="w-4 h-4 text-amber-600" />
                    </div>
                    <div className="text-3xl font-bold font-mono tabular-nums text-amber-700 mt-3">
                      {stats.retired60}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Superannuated at 60 years age
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setJobStatusFilter('Died During Service');
                      setActiveView('employees');
                    }}
                    className="text-left bg-white border border-slate-200 rounded-xl p-5 hover:border-red-600 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-slate-500">
                      <span className="text-xs font-medium">Died During Service</span>
                      <HeartCrack className="w-4 h-4 text-red-600" />
                    </div>
                    <div className="text-3xl font-bold font-mono tabular-nums text-red-700 mt-3">
                      {stats.diedInService}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Family Pension &amp; Rule 17-A Cases
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setJobStatusFilter('OSD');
                      setActiveView('employees');
                    }}
                    className="text-left bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-600 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-slate-500">
                      <span className="text-xs font-medium">OSD Officers / Staff</span>
                      <Briefcase className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="text-3xl font-bold font-mono tabular-nums text-blue-700 mt-3">
                      {stats.osd}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Establishment Pool / Awaiting Posting
                    </div>
                  </button>
                </div>

                {/* Tehsil & Cadre Breakdown */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <div>
                        <h2 className="text-base font-semibold text-slate-900">
                          Tehsil &amp; Branch Deployment Matrix
                        </h2>
                        <p className="text-xs text-slate-500">
                          Staff across DC Office Jhang Headquarters and Tehsil AC Offices
                        </p>
                      </div>
                      <Building2 className="w-4 h-4 text-slate-400" />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {(['Jhang', 'Shorkot', 'Ahmadpur Sial', 'Athara Hazari'] as const).map(
                        (teh) => {
                          const count = employees.filter((e) => e.tehsil === teh).length;
                          return (
                            <button
                              key={teh}
                              type="button"
                              onClick={() => {
                                setTehsilFilter(teh);
                                setActiveView('employees');
                              }}
                              className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-left hover:border-slate-400 cursor-pointer"
                            >
                              <div className="text-xs font-medium text-slate-600">
                                Tehsil {teh}
                              </div>
                              <div className="text-xl font-bold font-mono tabular-nums text-slate-900 mt-1">
                                {count}
                              </div>
                            </button>
                          );
                        }
                      )}
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 space-y-3 text-xs">
                    <h2 className="text-base font-semibold text-slate-900 border-b border-slate-200 pb-3">
                      Service Terms &amp; Dossier Summary
                    </h2>
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-600">
                        Regular Staff (With Regularization Date)
                      </span>
                      <span className="font-mono tabular-nums font-semibold">
                        {stats.regular}
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-600">Contract Staff</span>
                      <span className="font-mono tabular-nums font-semibold">
                        {stats.contract}
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-600">Daily Wages / Contingent</span>
                      <span className="font-mono tabular-nums font-semibold">
                        {stats.dailyWages}
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-600">
                        Female Staff (With Husband/Father Name)
                      </span>
                      <span className="font-mono tabular-nums font-semibold">
                        {stats.femaleStaff}
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-slate-600">
                        Legal Heirs &amp; ACR Reports Logged
                      </span>
                      <span className="font-mono tabular-nums font-semibold text-emerald-800">
                        {stats.totalHeirs} Heirs · {stats.totalAcrs} ACRs
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Employee Roster & Filter Bar */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-slate-200 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg overflow-x-auto">
                    {[
                      { value: 'ALL', label: `All (${employees.length})` },
                      { value: 'Active', label: `Active (${stats.active})` },
                      {
                        value: 'Retired (After 60 Years)',
                        label: `Retired 60 Yrs (${stats.retired60})`,
                      },
                      {
                        value: 'Died During Service',
                        label: `Died in Service (${stats.diedInService})`,
                      },
                      { value: 'OSD', label: `OSD (${stats.osd})` },
                    ].map((tab) => (
                      <button
                        key={tab.value}
                        type="button"
                        onClick={() => setJobStatusFilter(tab.value)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          jobStatusFilter === tab.value
                            ? 'bg-white text-slate-900 shadow-xs font-semibold'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search Name, Father/Husband, CNIC, Post..."
                        className="pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg w-64"
                      />
                    </div>
                    <select
                      value={empStatusFilter}
                      onChange={(e) => setEmpStatusFilter(e.target.value)}
                      className="px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                    >
                      <option value="ALL">All Recruitment Modes</option>
                      <option value="Regular">Regular</option>
                      <option value="Contract">Contract</option>
                      <option value="Daily Wages">Daily Wages</option>
                    </select>
                    <select
                      value={genderFilter}
                      onChange={(e) => setGenderFilter(e.target.value)}
                      className="px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                    >
                      <option value="ALL">All Genders</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                      <th className="py-3 px-4 font-semibold">
                        Employee Name, Father / Husband &amp; CNIC
                      </th>
                      <th className="py-3 px-4 font-semibold">Designation &amp; Branch</th>
                      <th className="py-3 px-4 font-semibold">
                        Recruitment &amp; Regularization
                      </th>
                      <th className="py-3 px-4 font-semibold">
                        Job Status, Retirement (60Y) / Death Date
                      </th>
                      <th className="py-3 px-4 font-semibold">
                        Heirs, Academics, Leave &amp; ACRs
                      </th>
                      <th className="py-3 px-4 font-semibold text-right">
                        Preview / Edit / Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredEmployees.map((emp) => (
                      <tr key={emp.id} className="hover:bg-slate-50/90">
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-slate-900 text-sm">
                            {emp.name}
                          </div>
                          <div className="text-slate-600 mt-0.5">
                            Father: <span className="font-medium">{emp.fatherName}</span>
                            {emp.gender === 'Female' &&
                            emp.husbandName &&
                            emp.husbandName.trim() !== '' ? (
                              <>
                                {' '}
                                · Husband:{' '}
                                <span className="font-medium text-emerald-800">
                                  {emp.husbandName}
                                </span>
                              </>
                            ) : null}
                          </div>
                          <div className="text-slate-500 font-mono tabular-nums mt-0.5">
                            {emp.personnelNumber} · {emp.cnic} · {emp.gender} ·{' '}
                            {calculateAgeYears(emp.dateOfBirth)} yrs
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-slate-900">
                            {emp.designation} ({emp.bps})
                          </div>
                          <div className="text-slate-600 mt-0.5">{emp.branch}</div>
                          <div className="text-slate-500 mt-0.5">
                            Tehsil {emp.tehsil} · {emp.phone}
                          </div>
                        </td>

                        <td className="py-3.5 px-4 font-mono tabular-nums">
                          <div className="font-semibold text-slate-900">
                            {emp.employmentStatus}
                          </div>
                          <div className="text-slate-600 mt-0.5">
                            Recruited: {emp.dateOfRecruitment}
                          </div>
                          <div className="text-slate-500 mt-0.5">
                            {emp.employmentStatus === 'Regular'
                              ? `Regularized: ${
                                  emp.dateOfRegularization || emp.dateOfRecruitment
                                }`
                              : `Service: ${calculateServiceLength(emp.dateOfRecruitment)}`}
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div
                            className={`font-semibold ${
                              emp.jobStatus === 'Active'
                                ? 'text-emerald-700'
                                : emp.jobStatus === 'Retired (After 60 Years)'
                                ? 'text-amber-700'
                                : emp.jobStatus === 'Died During Service'
                                ? 'text-red-700'
                                : 'text-blue-700'
                            }`}
                          >
                            {emp.jobStatus}
                          </div>
                          <div className="text-slate-600 font-mono tabular-nums mt-0.5">
                            {emp.jobStatus === 'Died During Service'
                              ? `Date of Death: ${emp.dateOfDeath || 'Recorded'}`
                              : `Retirement (60y): ${emp.dateOfRetirement || '—'}`}
                          </div>
                          <div className="text-slate-500 mt-0.5">
                            {emp.pensionStatus || 'In-Service'}
                          </div>
                        </td>

                        <td className="py-3.5 px-4 font-mono tabular-nums text-slate-600">
                          <div>
                            Heirs: {emp.legalHeirs?.length || 0} · Degrees:{' '}
                            {emp.academicRecords?.length || 0}
                          </div>
                          <div className="mt-0.5">
                            CL: {emp.casualLeaveBalance}d · EL: {emp.earnedLeaveBalance}d
                          </div>
                          <div className="mt-0.5">
                            ACR/PERs: {emp.acrRecords?.length || 0}
                          </div>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => setPreviewEmployee(emp)}
                              className="px-3 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              Profile Preview
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingEmployee(emp);
                                setIsFormOpen(true);
                              }}
                              className="px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteTarget(emp)}
                              className="px-2.5 py-1.5 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-lg flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </main>

      <footer className="px-6 py-4 bg-white border-t border-slate-200 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-4 no-print mt-auto">
        <div>
          Office of the Deputy Commissioner, District Jhang · Human Resource &amp; Service Book Management System
        </div>
        <div>
          Establishment Branch · HRA Branch · Revenue Wing · Tehsils Jhang, Shorkot, Ahmadpur Sial &amp; 18-Hazari
        </div>
      </footer>

      {isSchemaModalOpen && (
        <SupabaseSchemaModal
          needsTableSetup={needsTableSetup}
          onClose={() => setIsSchemaModalOpen(false)}
          onRefreshConnection={loadData}
        />
      )}

      {isGhModalOpen && (
        <GitHubPagesModal onClose={() => setIsGhModalOpen(false)} />
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="bg-white border border-slate-200 rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-slate-900">
              Confirm Deletion of Service Dossier
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to permanently remove the personnel record for{' '}
              <span className="font-semibold text-slate-900">{deleteTarget.name}</span> (
              <span className="font-mono tabular-nums">
                {deleteTarget.personnelNumber}
              </span>
              )?
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={deleting}
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={handleConfirmDelete}
                className="px-4 py-2 text-xs font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 rounded-lg cursor-pointer"
              >
                {deleting ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
