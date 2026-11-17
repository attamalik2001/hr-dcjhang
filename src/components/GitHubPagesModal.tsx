import React, { useState } from 'react';
import { X, Copy, Check, GitBranch } from 'lucide-react';

interface GitHubPagesModalProps {
  onClose: () => void;
}

const WORKFLOW_YAML = `name: Deploy DC Office Jhang HRMS to GitHub Pages

on:
  push:
    branches:
      - main
      - master
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'npm'

      - name: Install dependencies
        run: npm install --legacy-peer-deps

      - name: Build static production bundle for GitHub Pages
        env:
          VITE_SUPABASE_URL: \${{ vars.VITE_SUPABASE_URL || 'https://qjoflyaxwffwzoodehod.supabase.co' }}
          VITE_SUPABASE_ANON_KEY: \${{ secrets.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqb2ZseWF4d2Zmd3pvb2RlaG9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ4OTMwMzMsImV4cCI6MjExMDQ2OTAzM30.mT3aPGZW9rArT6tJLWIYBjzun-EhGhQTZARPw2nCLes' }}
        run: npm run build

      - name: Setup GitHub Pages
        uses: actions/configure-pages@v5

      - name: Upload build artifact (dist)
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4`;

export const GitHubPagesModal: React.FC<GitHubPagesModalProps> = ({ onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(WORKFLOW_YAML);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-xl">
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <GitBranch className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="text-base font-bold tracking-tight">
                GitHub Pages Automatic Deployment (CI/CD Configured)
              </h2>
              <p className="text-xs text-slate-300 font-mono">
                Workflow File: .github/workflows/deploy.yml · Base Path: ./
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

        <div className="p-6 overflow-y-auto space-y-5 flex-1 text-xs">
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg space-y-2 text-slate-800">
            <div className="font-semibold text-sm text-emerald-950">
              How Automatic GitHub Pages Updates Work
            </div>
            <ol className="list-decimal list-inside space-y-1.5 leading-relaxed">
              <li>
                <strong>Workflow Included:</strong> The file{' '}
                <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-emerald-200">
                  .github/workflows/deploy.yml
                </code>{' '}
                and relative asset paths (<code className="font-mono">base: &apos;./&apos;</code> + SPA <code className="font-mono">404.html</code> + <code className="font-mono">.nojekyll</code>) are already configured in this project.
              </li>
              <li>
                <strong>Connect / Push to GitHub:</strong> Export or push this repository to your GitHub account (<code className="font-mono">main</code> or <code className="font-mono">master</code> branch).
              </li>
              <li>
                <strong>Enable GitHub Actions Source (One-Time):</strong> In your GitHub repository, open{' '}
                <strong>Settings &rarr; Pages &rarr; Build and deployment</strong> and set{' '}
                <strong>Source</strong> to <strong>GitHub Actions</strong>.
              </li>
              <li>
                <strong>Auto-Publish on Every Push:</strong> Every time you push new changes to <code className="font-mono">main</code>/<code className="font-mono">master</code>, GitHub Actions will automatically compile the Vite app with your Supabase connection and publish the updated site to your GitHub Pages URL.
              </li>
            </ol>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-800 font-mono">
              .github/workflows/deploy.yml
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="px-3 py-1.5 font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Copied Workflow YAML
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy Workflow YAML
                </>
              )}
            </button>
          </div>

          <pre className="p-4 bg-slate-950 text-slate-100 rounded-lg font-mono text-[11px] leading-relaxed overflow-x-auto max-h-80">
            {WORKFLOW_YAML}
          </pre>
        </div>
      </div>
    </div>
  );
};
