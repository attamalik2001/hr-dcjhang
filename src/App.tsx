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
  Sun,
  Moon,
  ShieldCheck,
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
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('dc_jhang_theme');
      if (saved === 'dark' || saved === 'light') return saved;
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      window.localStorage.setItem('dc_jhang_theme', theme);
    } catch {
      // Ignore storage errors
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

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
    const targetId = deleteTarget.id;
    try {
      // Optimistically remove deleted employee from state immediately
      setEmployees((prev) => prev.filter((e) => Number(e.id) !== Number(targetId)));
      const updatedList = await deleteEmployeeFromSupabaseOrFallback(targetId);
      setEmployees(updatedList);
      if (previewEmployee?.id === targetId) setPreviewEmployee(null);
      setDeleteTarget(null);
    } finally {
      setDeleting(false);
    }
  };

  const normalizeJobCategory = useCallback((status?: string) => {
    const s = (status || '').trim().toLowerCase();
    if (s.includes('retired')) return 'Retired (After 60 Years)';
    if (s.includes('died') || s.includes('death') || s.includes('deceased'))
      return 'Died During Service';
    if (s === 'osd' || s.includes('special duty') || s.includes('osd')) return 'OSD';
    return 'Active';
  }, []);

  const stats = useMemo(() => {
    const total = employees.length;
    const active = employees.filter(
      (e) => normalizeJobCategory(e.jobStatus) === 'Active'
    ).length;
    const retired60 = employees.filter(
      (e) => normalizeJobCategory(e.jobStatus) === 'Retired (After 60 Years)'
    ).length;
    const diedInService = employees.filter(
      (e) => normalizeJobCategory(e.jobStatus) === 'Died During Service'
    ).length;
    const osd = employees.filter(
      (e) => normalizeJobCategory(e.jobStatus) === 'OSD'
    ).length;
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
  }, [employees, normalizeJobCategory]);

  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      if (
        jobStatusFilter !== 'ALL' &&
        normalizeJobCategory(emp.jobStatus) !== jobStatusFilter
      )
        return false;
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
  }, [
    employees,
    jobStatusFilter,
    empStatusFilter,
    tehsilFilter,
    genderFilter,
    searchQuery,
    normalizeJobCategory,
  ]);

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
        theme={theme}
        onToggleTheme={toggleTheme}
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
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors">
      {/* 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-30 flex items-center justify-between gap-8 px-6 py-3.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 no-print">
        <a
          href="#dashboard"
          onClick={(e) => {
            e.preventDefault();
            setActiveView('dashboard');
          }}
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight whitespace-nowrap shrink-0"
        >
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-600 via-teal-600 to-slate-900 text-white flex items-center justify-center shadow-xs">
            <ShieldCheck className="w-4 h-4" />
          </span>
          <span className="bg-gradient-to-r from-emerald-800 via-teal-700 to-slate-900 dark:from-emerald-400 dark:via-teal-300 dark:to-white bg-clip-text text-transparent">
            DC Office Jhang HRMS
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
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
                  ? 'text-emerald-700 dark:text-emerald-400 border-emerald-600 dark:border-emerald-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle Light or Dark Theme"
            className="px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-slate-700" />
                <span>Dark Mode</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setEditingEmployee(null);
              setIsFormOpen(true);
            }}
            className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 rounded-lg transition-all shadow-xs whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Employee
          </button>
        </div>
      </header>

      {/* Workspace Sub-Toolbar */}
      <div className="bg-gradient-to-r from-slate-100 via-emerald-50/40 to-slate-100 dark:from-slate-900 dark:via-emerald-950/30 dark:to-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-2.5 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600 dark:text-slate-400 no-print">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            Office of the Deputy Commissioner, District Jhang
          </span>
          <span aria-hidden="true">·</span>
          <span>Establishment, Revenue &amp; Ministerial Cadre</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono tabular-nums text-emerald-800 dark:text-emerald-400">
            Supabase DB: qjoflyaxwffwzoodehod
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsGhModalOpen(true)}
            className="px-2.5 py-1 text-xs font-medium text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <GitBranch className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>GitHub Pages Auto-Deploy</span>
          </button>
          <button
            type="button"
            onClick={() => setIsSchemaModalOpen(true)}
            className="px-2.5 py-1 text-xs font-medium text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Database className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Supabase SQL Tables</span>
          </button>
          <button
            type="button"
            onClick={loadData}
            disabled={loadingData}
            className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 cursor-pointer"
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
                {/* Gradient Hero Banner */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white p-6 sm:p-8 border border-emerald-800/40 shadow-md">
                  <div className="relative z-10 flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-emerald-300">
                        District Establishment &amp; Human Resource Directorate · Jhang
                      </div>
                      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
                        Deputy Commissioner Office Jhang — HR Portal
                      </h1>
                      <p className="text-xs sm:text-sm text-emerald-100/85 mt-1.5 max-w-2xl">
                        Real-time sanctioned strength, active deployment, superannuation after 60 years of age, in-service demise &amp; legal heirs, and OSD officers across District Jhang.
                      </p>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => {
                          setJobStatusFilter('ALL');
                          setActiveView('employees');
                        }}
                        className="px-4 py-2 text-xs font-medium text-white bg-white/10 hover:bg-white/20 border border-white/15 rounded-lg transition-colors cursor-pointer"
                      >
                        Open Full Directory
                      </button>
                      <button
                        type="button"
                        onClick={handleExportCsv}
                        className="px-4 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-emerald-300 to-teal-200 hover:from-emerald-200 hover:to-teal-100 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Export CSV Roster
                      </button>
                    </div>
                  </div>
                </div>

                {/* 5 Gradient Executive Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {/* Card 1: Total Employees */}
                  <button
                    type="button"
                    onClick={() => {
                      setJobStatusFilter('ALL');
                      setActiveView('employees');
                    }}
                    className="group relative overflow-hidden text-left bg-gradient-to-br from-white via-slate-50/70 to-indigo-50/50 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:border-indigo-500/60 transition-all shadow-xs cursor-pointer"
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-slate-700 via-indigo-600 to-emerald-600" />
                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                      <span className="text-xs font-semibold">Total Employees</span>
                      <span className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                        <Users className="w-4 h-4" />
                      </span>
                    </div>
                    <div className="text-3xl font-bold font-mono tabular-nums text-slate-900 dark:text-white mt-3">
                      {stats.total}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">
                      {stats.regular} Regular · {stats.contract} Contract · {stats.dailyWages} DW
                    </div>
                  </button>

                  {/* Card 2: Active Employees */}
                  <button
                    type="button"
                    onClick={() => {
                      setJobStatusFilter('Active');
                      setActiveView('employees');
                    }}
                    className="group relative overflow-hidden text-left bg-gradient-to-br from-white via-emerald-50/40 to-teal-50/50 dark:from-slate-900 dark:via-emerald-950/30 dark:to-teal-950/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:border-emerald-500/60 transition-all shadow-xs cursor-pointer"
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                      <span className="text-xs font-semibold">Active Employees</span>
                      <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        <UserCheck className="w-4 h-4" />
                      </span>
                    </div>
                    <div className="text-3xl font-bold font-mono tabular-nums text-emerald-700 dark:text-emerald-400 mt-3">
                      {stats.active}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">
                      Serving across DC Complex &amp; 4 Tehsils
                    </div>
                  </button>

                  {/* Card 3: Retired After 60 Years */}
                  <button
                    type="button"
                    onClick={() => {
                      setJobStatusFilter('Retired (After 60 Years)');
                      setActiveView('employees');
                    }}
                    className="group relative overflow-hidden text-left bg-gradient-to-br from-white via-amber-50/40 to-orange-50/50 dark:from-slate-900 dark:via-amber-950/30 dark:to-orange-950/30 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:border-amber-500/60 transition-all shadow-xs cursor-pointer"
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500" />
                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                      <span className="text-xs font-semibold">
                        Retired (After 60 Years)
                      </span>
                      <span className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                        <Award className="w-4 h-4" />
                      </span>
                    </div>
                    <div className="text-3xl font-bold font-mono tabular-nums text-amber-700 dark:text-amber-400 mt-3">
                      {stats.retired60}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">
                      Superannuated at 60 years age
                    </div>
                  </button>

                  {/* Card 4: Died During Service */}
                  <button
                    type="button"
                    onClick={() => {
                      setJobStatusFilter('Died During Service');
                      setActiveView('employees');
                    }}
                    className="group relative overflow-hidden text-left bg-gradient-to-br from-white via-rose-50/40 to-red-50/50 dark:from-slate-900 dark:via-rose-950/30 dark:to-red-950/30 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:border-rose-500/60 transition-all shadow-xs cursor-pointer"
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-rose-500 to-red-600" />
                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                      <span className="text-xs font-semibold">Died During Service</span>
                      <span className="p-2 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400">
                        <HeartCrack className="w-4 h-4" />
                      </span>
                    </div>
                    <div className="text-3xl font-bold font-mono tabular-nums text-rose-700 dark:text-rose-400 mt-3">
                      {stats.diedInService}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">
                      Family Pension &amp; Rule 17-A Cases
                    </div>
                  </button>

                  {/* Card 5: OSD */}
                  <button
                    type="button"
                    onClick={() => {
                      setJobStatusFilter('OSD');
                      setActiveView('employees');
                    }}
                    className="group relative overflow-hidden text-left bg-gradient-to-br from-white via-sky-50/40 to-indigo-50/50 dark:from-slate-900 dark:via-sky-950/30 dark:to-indigo-950/30 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:border-sky-500/60 transition-all shadow-xs cursor-pointer"
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-500 to-indigo-600" />
                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                      <span className="text-xs font-semibold">OSD Officers / Staff</span>
                      <span className="p-2 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
                        <Briefcase className="w-4 h-4" />
                      </span>
                    </div>
                    <div className="text-3xl font-bold font-mono tabular-nums text-sky-700 dark:text-sky-400 mt-3">
                      {stats.osd}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">
                      Establishment Pool / Awaiting Posting
                    </div>
                  </button>
                </div>

                {/* Tehsil & Cadre Breakdown */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-xs">
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                      <div>
                        <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                          Tehsil &amp; Branch Deployment Matrix
                        </h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Staff across DC Office Jhang Headquarters and Tehsil AC Offices
                        </p>
                      </div>
                      <Building2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
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
                              className="p-4 bg-gradient-to-br from-slate-50 to-emerald-50/40 dark:from-slate-800/80 dark:to-emerald-950/20 border border-slate-200 dark:border-slate-700/80 rounded-xl text-left hover:border-emerald-500 transition-all cursor-pointer"
                            >
                              <div className="text-xs font-medium text-slate-600 dark:text-slate-300">
                                Tehsil {teh}
                              </div>
                              <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white mt-1.5">
                                {count}
                              </div>
                            </button>
                          );
                        }
                      )}
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-3 text-xs shadow-xs">
                    <h2 className="text-base font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3">
                      Service Terms &amp; Dossier Summary
                    </h2>
                    <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-600 dark:text-slate-400">
                        Regular Staff (With Regularization Date)
                      </span>
                      <span className="font-mono tabular-nums font-semibold text-slate-900 dark:text-white">
                        {stats.regular}
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-600 dark:text-slate-400">Contract Staff</span>
                      <span className="font-mono tabular-nums font-semibold text-slate-900 dark:text-white">
                        {stats.contract}
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-600 dark:text-slate-400">
                        Daily Wages / Contingent
                      </span>
                      <span className="font-mono tabular-nums font-semibold text-slate-900 dark:text-white">
                        {stats.dailyWages}
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-600 dark:text-slate-400">
                        Female Staff (With Husband/Father Name)
                      </span>
                      <span className="font-mono tabular-nums font-semibold text-slate-900 dark:text-white">
                        {stats.femaleStaff}
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-slate-600 dark:text-slate-400">
                        Legal Heirs &amp; ACR Reports Logged
                      </span>
                      <span className="font-mono tabular-nums font-semibold text-emerald-700 dark:text-emerald-400">
                        {stats.totalHeirs} Heirs · {stats.totalAcrs} ACRs
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Employee Roster & Filter Bar */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-x-auto">
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
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                          jobStatusFilter === tab.value
                            ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xs font-semibold'
                            : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
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
                        className="pl-8 pr-3 py-1.5 text-xs border border-slate-300 dark:border-slate-700 rounded-lg w-64 bg-white dark:bg-slate-800"
                      />
                    </div>
                    <select
                      value={empStatusFilter}
                      onChange={(e) => setEmpStatusFilter(e.target.value)}
                      className="px-2.5 py-1.5 text-xs border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                    >
                      <option value="ALL">All Recruitment Modes</option>
                      <option value="Regular">Regular</option>
                      <option value="Contract">Contract</option>
                      <option value="Daily Wages">Daily Wages</option>
                    </select>
                    <select
                      value={genderFilter}
                      onChange={(e) => setGenderFilter(e.target.value)}
                      className="px-2.5 py-1.5 text-xs border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
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
                    <tr className="bg-slate-50/90 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300">
                      <th className="py-3.5 px-4 font-semibold">
                        Employee Name, Father / Husband &amp; CNIC
                      </th>
                      <th className="py-3.5 px-4 font-semibold">Designation &amp; Branch</th>
                      <th className="py-3.5 px-4 font-semibold">
                        Recruitment &amp; Regularization
                      </th>
                      <th className="py-3.5 px-4 font-semibold">
                        Job Status, Retirement (60Y) / Death Date
                      </th>
                      <th className="py-3.5 px-4 font-semibold">
                        Heirs, Academics, Leave &amp; ACRs
                      </th>
                      <th className="py-3.5 px-4 font-semibold text-right">
                        Preview / Edit / Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {filteredEmployees.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="py-12 px-6 text-center text-xs text-slate-500 dark:text-slate-400"
                        >
                          {employees.length === 0
                            ? 'No employee records in the database (0 employees). Click "+ Add Employee" in the top bar to register a new employee.'
                            : 'No employees match the selected search or filter criteria.'}
                        </td>
                      </tr>
                    ) : null}
                    {filteredEmployees.map((emp) => (
                      <tr
                        key={emp.id}
                        className="hover:bg-slate-50/90 dark:hover:bg-slate-800/40 transition-colors"
                      >
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-slate-900 dark:text-white text-sm">
                            {emp.name}
                          </div>
                          <div className="text-slate-600 dark:text-slate-300 mt-0.5">
                            Father: <span className="font-medium">{emp.fatherName}</span>
                            {emp.gender === 'Female' &&
                            emp.husbandName &&
                            emp.husbandName.trim() !== '' ? (
                              <>
                                {' '}
                                · Husband:{' '}
                                <span className="font-medium text-emerald-700 dark:text-emerald-400">
                                  {emp.husbandName}
                                </span>
                              </>
                            ) : null}
                          </div>
                          <div className="text-slate-500 dark:text-slate-400 font-mono tabular-nums mt-0.5">
                            {emp.personnelNumber} · {emp.cnic} · {emp.gender} ·{' '}
                            {calculateAgeYears(emp.dateOfBirth)} yrs
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-slate-900 dark:text-white">
                            {emp.designation} ({emp.bps})
                          </div>
                          <div className="text-slate-600 dark:text-slate-300 mt-0.5">
                            {emp.branch}
                          </div>
                          <div className="text-slate-500 dark:text-slate-400 mt-0.5">
                            Tehsil {emp.tehsil} · {emp.phone}
                          </div>
                        </td>

                        <td className="py-3.5 px-4 font-mono tabular-nums">
                          <div className="font-semibold text-slate-900 dark:text-white">
                            {emp.employmentStatus}
                          </div>
                          <div className="text-slate-600 dark:text-slate-300 mt-0.5">
                            Recruited: {emp.dateOfRecruitment}
                          </div>
                          <div className="text-slate-500 dark:text-slate-400 mt-0.5">
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
                                ? 'text-emerald-700 dark:text-emerald-400'
                                : emp.jobStatus === 'Retired (After 60 Years)'
                                ? 'text-amber-700 dark:text-amber-400'
                                : emp.jobStatus === 'Died During Service'
                                ? 'text-rose-700 dark:text-rose-400'
                                : 'text-sky-700 dark:text-sky-400'
                            }`}
                          >
                            {emp.jobStatus}
                          </div>
                          <div className="text-slate-600 dark:text-slate-300 font-mono tabular-nums mt-0.5">
                            {emp.jobStatus === 'Died During Service'
                              ? `Date of Death: ${emp.dateOfDeath || 'Recorded'}`
                              : `Retirement (60y): ${emp.dateOfRetirement || '—'}`}
                          </div>
                          <div className="text-slate-500 dark:text-slate-400 mt-0.5">
                            {emp.pensionStatus || 'In-Service'}
                          </div>
                        </td>

                        <td className="py-3.5 px-4 font-mono tabular-nums text-slate-600 dark:text-slate-300">
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
                              className="px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-lg flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer shadow-xs transition-all"
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
                              className="px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer transition-colors"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteTarget(emp)}
                              className="px-2.5 py-1.5 text-xs font-medium text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/50 rounded-lg flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer transition-colors"
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

      <footer className="px-6 py-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center justify-between gap-4 no-print mt-auto">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Confirm Deletion of Service Dossier
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Are you sure you want to permanently remove the personnel record for{' '}
              <span className="font-semibold text-slate-900 dark:text-white">
                {deleteTarget.name}
              </span>{' '}
              (
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
                className="px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={handleConfirmDelete}
                className="px-4 py-2 text-xs font-medium text-white bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 disabled:opacity-50 rounded-lg cursor-pointer"
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
