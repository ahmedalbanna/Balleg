import React from 'react';
import { Route } from 'react-router-dom';
import { AuthGuard } from '../core/components/AuthGuard';
import { TelecomLayout } from './components/TelecomLayout';

const TelecomOperationsCenter = React.lazy(() => import('./components/TelecomOperationsCenter').then(m => ({ default: m.TelecomOperationsCenter })));
const TelecomCoverageMap = React.lazy(() => import('./components/TelecomCoverageMap').then(m => ({ default: m.TelecomCoverageMap })));
const TelecomSitesManagement = React.lazy(() => import('./components/TelecomSitesManagement').then(m => ({ default: m.TelecomSitesManagement })));
const TelecomKPIs = React.lazy(() => import('./components/TelecomKPIs').then(m => ({ default: m.TelecomKPIs })));
const TelecomCoreNetwork = React.lazy(() => import('./components/TelecomCoreNetwork').then(m => ({ default: m.TelecomCoreNetwork })));
const TelecomMaintenance = React.lazy(() => import('./components/TelecomCoreNetwork').then(m => ({ default: m.TelecomMaintenance })));
const TelecomFaultTickets = React.lazy(() => import('./components/TelecomFaultTickets').then(m => ({ default: m.TelecomFaultTickets })));
const TelecomInterconnect = React.lazy(() => import('./components/TelecomInterconnect').then(m => ({ default: m.TelecomInterconnect })));
const TelecomCapacityReports = React.lazy(() => import('./components/TelecomInterconnect').then(m => ({ default: m.TelecomCapacityReports })));
const TelecomAlerts = React.lazy(() => import('./components/TelecomInterconnect').then(m => ({ default: m.TelecomAlerts })));
const TelecomSettings = React.lazy(() => import('./components/TelecomInterconnect').then(m => ({ default: m.TelecomSettings })));
const TelecomProfile = React.lazy(() => import('./components/TelecomProfile').then(m => ({ default: m.TelecomProfile })));

export const telecomRoutes = (
  <Route element={<AuthGuard requireRole={['telecom']}><TelecomLayout /></AuthGuard>}>
    <Route path="/telecom/operations" element={<React.Suspense fallback={<div>Loading...</div>}><TelecomOperationsCenter /></React.Suspense>} />
    <Route path="/telecom/coverage" element={<React.Suspense fallback={<div>Loading...</div>}><TelecomCoverageMap /></React.Suspense>} />
    <Route path="/telecom/sites" element={<React.Suspense fallback={<div>Loading...</div>}><TelecomSitesManagement /></React.Suspense>} />
    <Route path="/telecom/kpis" element={<React.Suspense fallback={<div>Loading...</div>}><TelecomKPIs /></React.Suspense>} />
    <Route path="/telecom/core" element={<React.Suspense fallback={<div>Loading...</div>}><TelecomCoreNetwork /></React.Suspense>} />
    <Route path="/telecom/maintenance" element={<React.Suspense fallback={<div>Loading...</div>}><TelecomMaintenance /></React.Suspense>} />
    <Route path="/telecom/faults" element={<React.Suspense fallback={<div>Loading...</div>}><TelecomFaultTickets /></React.Suspense>} />
    <Route path="/telecom/interconnect" element={<React.Suspense fallback={<div>Loading...</div>}><TelecomInterconnect /></React.Suspense>} />
    <Route path="/telecom/capacity" element={<React.Suspense fallback={<div>Loading...</div>}><TelecomCapacityReports /></React.Suspense>} />
    <Route path="/telecom/alerts" element={<React.Suspense fallback={<div>Loading...</div>}><TelecomAlerts /></React.Suspense>} />
    <Route path="/telecom/settings" element={<React.Suspense fallback={<div>Loading...</div>}><TelecomSettings /></React.Suspense>} />
    <Route path="/telecom/profile" element={<React.Suspense fallback={<div>Loading...</div>}><TelecomProfile /></React.Suspense>} />
  </Route>
);
