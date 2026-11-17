import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://qjoflyaxwffwzoodehod.supabase.co';

export const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqb2ZseWF4d2Zmd3pvb2RlaG9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ4OTMwMzMsImV4cCI6MjExMDQ2OTAzM30.mT3aPGZW9rArT6tJLWIYBjzun-EhGhQTZARPw2nCLes';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const SUPABASE_SQL_SCHEMA = `-- Run this SQL in your Supabase SQL Editor (Project: qjoflyaxwffwzoodehod)
-- Creates all tables and enables public anon access policies for DC Office Jhang HRMS

CREATE TABLE IF NOT EXISTS public.employees (
  id BIGSERIAL PRIMARY KEY,
  personnel_number TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  father_name TEXT NOT NULL,
  husband_name TEXT,
  gender TEXT NOT NULL,
  marital_status TEXT NOT NULL DEFAULT 'Married',
  cnic TEXT NOT NULL,
  date_of_birth TEXT NOT NULL,
  blood_group TEXT DEFAULT 'B+',
  religion TEXT DEFAULT 'Islam',
  domicile TEXT NOT NULL DEFAULT 'Jhang',
  phone TEXT NOT NULL,
  email TEXT,
  permanent_address TEXT NOT NULL,
  present_address TEXT,
  designation TEXT NOT NULL,
  bps TEXT NOT NULL,
  cadre TEXT NOT NULL DEFAULT 'Ministerial / District Cadre',
  branch TEXT NOT NULL,
  tehsil TEXT NOT NULL DEFAULT 'Jhang',
  date_of_recruitment TEXT NOT NULL,
  employment_status TEXT NOT NULL,
  date_of_regularization TEXT,
  job_status TEXT NOT NULL,
  date_of_retirement TEXT,
  date_of_death TEXT,
  cause_of_death_or_remarks TEXT,
  osd_order_no TEXT,
  seniority_no TEXT,
  ddo_code TEXT DEFAULT 'JH-4012',
  gpf_number TEXT,
  pension_status TEXT DEFAULT 'In-Service',
  casual_leave_balance INTEGER NOT NULL DEFAULT 25,
  earned_leave_balance INTEGER NOT NULL DEFAULT 120,
  medical_leave_balance INTEGER NOT NULL DEFAULT 90,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.legal_heirs (
  id BIGSERIAL PRIMARY KEY,
  employee_id BIGINT NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  relation TEXT NOT NULL,
  cnic_or_bform TEXT,
  date_of_birth TEXT,
  contact_info TEXT NOT NULL,
  address TEXT,
  share_percentage INTEGER DEFAULT 100,
  is_benevolent_nominee BOOLEAN DEFAULT TRUE,
  rule_17a_candidate BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.academic_records (
  id BIGSERIAL PRIMARY KEY,
  employee_id BIGINT NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
  degree_title TEXT NOT NULL,
  major_subjects TEXT NOT NULL,
  board_or_university TEXT NOT NULL,
  passing_year TEXT NOT NULL,
  grade_or_division TEXT NOT NULL,
  verification_status TEXT NOT NULL DEFAULT 'Verified',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.leave_records (
  id BIGSERIAL PRIMARY KEY,
  employee_id BIGINT NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
  leave_type TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  total_days INTEGER NOT NULL,
  order_no TEXT NOT NULL,
  sanctioned_by TEXT NOT NULL DEFAULT 'Deputy Commissioner, Jhang',
  status TEXT NOT NULL DEFAULT 'Approved',
  remarks TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.acr_records (
  id BIGSERIAL PRIMARY KEY,
  employee_id BIGINT NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
  assessment_year TEXT NOT NULL,
  post_held TEXT NOT NULL,
  reporting_officer TEXT NOT NULL,
  countersigning_officer TEXT NOT NULL,
  overall_grading TEXT NOT NULL,
  integrity TEXT NOT NULL DEFAULT 'Beyond Doubt',
  fitness_for_promotion TEXT NOT NULL DEFAULT 'Fit for Promotion',
  dossier_status TEXT NOT NULL DEFAULT 'Completed & Placed in Dossier',
  pen_picture_remarks TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.service_history (
  id BIGSERIAL PRIMARY KEY,
  employee_id BIGINT NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  from_branch_or_post TEXT NOT NULL,
  to_branch_or_post TEXT NOT NULL,
  effective_date TEXT NOT NULL,
  order_number TEXT NOT NULL,
  remarks TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security & Policies for Anon Key Access
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.legal_heirs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leave_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.acr_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_history ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow full access to employees" ON public.employees;
CREATE POLICY "Allow full access to employees" ON public.employees FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow full access to legal_heirs" ON public.legal_heirs;
CREATE POLICY "Allow full access to legal_heirs" ON public.legal_heirs FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow full access to academic_records" ON public.academic_records;
CREATE POLICY "Allow full access to academic_records" ON public.academic_records FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow full access to leave_records" ON public.leave_records;
CREATE POLICY "Allow full access to leave_records" ON public.leave_records FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow full access to acr_records" ON public.acr_records;
CREATE POLICY "Allow full access to acr_records" ON public.acr_records FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow full access to service_history" ON public.service_history;
CREATE POLICY "Allow full access to service_history" ON public.service_history FOR ALL USING (true) WITH CHECK (true);
`;
