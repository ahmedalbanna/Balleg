import React from 'react';
import { Route } from 'react-router-dom';
import { AuthGuard } from '../core/components/AuthGuard';
import { AdminLayout } from './components/AdminLayout';

const AdminDashboard = React.lazy(() => import('./components/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const AdminUsers = React.lazy(() => import('./components/AdminUsers').then(m => ({ default: m.AdminUsers })));
const AdminGeneralReports = React.lazy(() => import('./components/AdminGeneralReports').then(m => ({ default: m.AdminGeneralReports })));
const AdminStats = React.lazy(() => import('./components/AdminStats').then(m => ({ default: m.AdminStats })));
const AdminCentralMap = React.lazy(() => import('./components/AdminCentralMap').then(m => ({ default: m.AdminCentralMap })));
const AdminDatabase = React.lazy(() => import('./components/AdminDatabase').then(m => ({ default: m.AdminDatabase })));
const DepartmentsManager = React.lazy(() => import('./components/DepartmentsManager').then(m => ({ default: m.DepartmentsManager })));
const AdminSettings = React.lazy(() => import('./components/AdminSettings').then(m => ({ default: m.AdminSettings })));

export const adminRoutes = (
  <Route element={<AuthGuard requireRole={['admin']}><AdminLayout /></AuthGuard>}>
    <Route path="/admin/dashboard" element={<React.Suspense fallback={<div>Loading...</div>}><AdminDashboard /></React.Suspense>} />
    <Route path="/admin/users" element={<React.Suspense fallback={<div>Loading...</div>}><AdminUsers /></React.Suspense>} />
    <Route path="/admin/reports" element={<React.Suspense fallback={<div>Loading...</div>}><AdminGeneralReports /></React.Suspense>} />
    <Route path="/admin/stats" element={<React.Suspense fallback={<div>Loading...</div>}><AdminStats /></React.Suspense>} />
    <Route path="/admin/map" element={<React.Suspense fallback={<div>Loading...</div>}><AdminCentralMap /></React.Suspense>} />
    <Route path="/admin/database" element={<React.Suspense fallback={<div>Loading...</div>}><AdminDatabase /></React.Suspense>} />
    <Route path="/admin/departments" element={<React.Suspense fallback={<div>Loading...</div>}><DepartmentsManager /></React.Suspense>} />
    <Route path="/admin/settings" element={<React.Suspense fallback={<div>Loading...</div>}><AdminSettings /></React.Suspense>} />
  </Route>
);
