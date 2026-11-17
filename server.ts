import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { requireAuth, AuthRequest } from './src/middleware/auth.ts';
import { getOrCreateUser } from './src/db/users.ts';
import {
  getAllEmployeesWithDetails,
  getEmployeeByIdWithDetails,
  createFullEmployee,
  updateFullEmployee,
  deleteEmployeeRecord,
} from './src/db/repository.ts';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '5mb' }));

  // Authenticated profile sync endpoint
  app.get('/api/me', requireAuth, async (req: AuthRequest, res) => {
    try {
      const uid = req.user!.uid;
      const email = req.user!.email || 'officer@dcojhang.punjab.gov.pk';
      const name = req.user!.name || email.split('@')[0];
      const userRecord = await getOrCreateUser(uid, email, name);
      res.json({ user: userRecord });
    } catch (error: any) {
      console.error('Failed to synchronize user profile:', error);
      res.status(500).json({ error: error.message || 'Failed to synchronize user profile' });
    }
  });

  // Get all employees with nested Legal Heirs, Academics, Leave Account, ACRs, and Service History
  app.get('/api/employees', requireAuth, async (req: AuthRequest, res) => {
    try {
      const uid = req.user!.uid;
      const email = req.user!.email || 'officer@dcojhang.punjab.gov.pk';
      await getOrCreateUser(uid, email, req.user!.name);
      const list = await getAllEmployeesWithDetails();
      res.json({ employees: list });
    } catch (error: any) {
      console.error('Failed to fetch employees:', error);
      res.status(500).json({ error: error.message || 'Failed to fetch employees' });
    }
  });

  // Get single employee profile with all sub-records
  app.get('/api/employees/:id', requireAuth, async (req: AuthRequest, res) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid employee ID' });
      }
      const record = await getEmployeeByIdWithDetails(id);
      if (!record) {
        return res.status(404).json({ error: 'Employee not found' });
      }
      res.json({ employee: record });
    } catch (error: any) {
      console.error('Failed to fetch employee details:', error);
      res.status(500).json({ error: error.message || 'Failed to fetch employee details' });
    }
  });

  // Create new employee with nested sub-records
  app.post('/api/employees', requireAuth, async (req: AuthRequest, res) => {
    try {
      const payload = {
        ...req.body,
        createdByUid: req.user?.uid,
      };
      const created = await createFullEmployee(payload);
      res.status(201).json({ employee: created });
    } catch (error: any) {
      console.error('Failed to create employee:', error);
      res.status(500).json({ error: error.message || 'Failed to create employee record' });
    }
  });

  // Update existing employee with nested sub-records
  app.put('/api/employees/:id', requireAuth, async (req: AuthRequest, res) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid employee ID' });
      }
      const updated = await updateFullEmployee(id, req.body);
      res.json({ employee: updated });
    } catch (error: any) {
      console.error('Failed to update employee:', error);
      res.status(500).json({ error: error.message || 'Failed to update employee record' });
    }
  });

  // Delete employee record
  app.delete('/api/employees/:id', requireAuth, async (req: AuthRequest, res) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid employee ID' });
      }
      const result = await deleteEmployeeRecord(id);
      res.json(result);
    } catch (error: any) {
      console.error('Failed to delete employee:', error);
      res.status(500).json({ error: error.message || 'Failed to delete employee record' });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`DC Office Jhang HRMS Server running on http://localhost:${PORT}`);
  });
}

startServer();
