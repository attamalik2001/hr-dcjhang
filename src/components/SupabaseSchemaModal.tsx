import React, { useState } from 'react';
import { X, Copy, Check, Database, RefreshCw } from 'lucide-react';
import { SUPABASE_SQL_SCHEMA, SUPABASE_URL } from '../lib/supabase';

interface SupabaseSchemaModalProps {
  needsTableSetup: boolean;
  onClose: () => void;
  onRefreshConnection: () => Promise<void>;
}

export const SupabaseSchemaModal: React.FC<SupabaseSchemaModalProps> = ({
  needsTableSetup,
  onClose,
  onRefreshConnection,
}) => {
  const [copied, setCopied] = useState(false);
  const [checking, setChecking] = useState(false);

  const handleCopySql = async () => {
    try {
      await navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleVerify = async () => {
    setChecking(true);
    try {
      await onRefreshConnection();
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-xl">
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <Database className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="text-base font-bold tracking-tight">
                Supabase Database Tables &amp; Connection Configuration
              </h2>
              <p className="text-xs text-slate-300 font-mono">
                Connected Project: {SUPABASE_URL}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          <div
            className={`p-4 rounded-lg border ${
              needsTableSetup
                ? 'bg-amber-50 border-amber-200 text-amber-900'
                : 'bg-emerald-50 border-emerald-200 text-emerald-900'
            }`}
          >
            <div className="font-semibold text-sm">
              {needsTableSetup
                ? 'Initialize Tables in Your Supabase SQL Editor'
                : 'Supabase Tables Connected & Synchronized'}
            </div>
            <p className="mt-1 leading-relaxed">
              {needsTableSetup
                ? 'Because the Supabase public Anon Key cannot execute raw CREATE TABLE DDL statements over REST by default, copy the SQL script below and run it once in your Supabase Dashboard SQL Editor (https://supabase.com/dashboard/project/qjoflyaxwffwzoodehod/sql). Once executed, click "Verify & Sync Tables" below to automatically seed all District Jhang HR records into your Supabase tables.'
                : 'Your Supabase tables (employees, legal_heirs, academic_records, leave_records, acr_records, service_history) are active and syncing live with this application.'}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-800">
              PostgreSQL Table Creation &amp; RLS Policy Script (6 Tables)
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopySql}
                className="px-3 py-1.5 font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    Copied SQL to Clipboard
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy SQL Script
                  </>
                )}
              </button>
              <button
                type="button"
                disabled={checking}
                onClick={handleVerify}
                className="px-3 py-1.5 font-medium text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${checking ? 'animate-spin' : ''}`} />
                {checking ? 'Checking...' : 'Verify & Sync Tables'}
              </button>
            </div>
          </div>

          <pre className="p-4 bg-slate-950 text-slate-100 rounded-lg font-mono text-[11px] leading-relaxed overflow-x-auto max-h-96">
            {SUPABASE_SQL_SCHEMA}
          </pre>
        </div>
      </div>
    </div>
  );
};
