import React from 'react';
import { Route } from 'react-router-dom';
import { AuthGuard } from '../core/components/AuthGuard';
import { HandymanLayout } from './components/HandymanLayout';

const HandymanWorkSites = React.lazy(() => import('./components/HandymanWorkSites').then(m => ({ default: m.HandymanWorkSites })));
const HandymanMaintenance = React.lazy(() => import('./components/HandymanMaintenance').then(m => ({ default: m.HandymanMaintenance })));
const HandymanReports = React.lazy(() => import('./components/HandymanReports').then(m => ({ default: m.HandymanReports })));
const HandymanLogistics = React.lazy(() => import('./components/HandymanLogistics').then(m => ({ default: m.HandymanLogistics })));
const HandymanOpsLog = React.lazy(() => import('./components/HandymanOpsLog').then(m => ({ default: m.HandymanOpsLog })));
const HandymanAlerts = React.lazy(() => import('./components/HandymanAlerts').then(m => ({ default: m.HandymanAlerts })));
const HandymanSafety = React.lazy(() => import('./components/HandymanSafety').then(m => ({ default: m.HandymanSafety })));
const HandymanSettings = React.lazy(() => import('./components/HandymanSettings').then(m => ({ default: m.HandymanSettings })));
const HandymanProfile = React.lazy(() => import('./components/HandymanProfile').then(m => ({ default: m.HandymanProfile })));

export const handymanRoutes = (
  <Route element={<AuthGuard requireRole={['handyman']}><HandymanLayout /></AuthGuard>}>
    <Route path="/handyman/work-sites" element={<React.Suspense fallback={<div>Loading...</div>}><HandymanWorkSites /></React.Suspense>} />
    <Route path="/handyman/maintenance" element={<React.Suspense fallback={<div>Loading...</div>}><HandymanMaintenance /></React.Suspense>} />
    <Route path="/handyman/reports" element={<React.Suspense fallback={<div>Loading...</div>}><HandymanReports /></React.Suspense>} />
    <Route path="/handyman/logistics" element={<React.Suspense fallback={<div>Loading...</div>}><HandymanLogistics /></React.Suspense>} />
    <Route path="/handyman/ops-log" element={<React.Suspense fallback={<div>Loading...</div>}><HandymanOpsLog /></React.Suspense>} />
    <Route path="/handyman/alerts" element={<React.Suspense fallback={<div>Loading...</div>}><HandymanAlerts /></React.Suspense>} />
    <Route path="/handyman/safety" element={<React.Suspense fallback={<div>Loading...</div>}><HandymanSafety /></React.Suspense>} />
    <Route path="/handyman/settings" element={<React.Suspense fallback={<div>Loading...</div>}><HandymanSettings /></React.Suspense>} />
    <Route path="/handyman/profile" element={<React.Suspense fallback={<div>Loading...</div>}><HandymanProfile /></React.Suspense>} />
  </Route>
);
