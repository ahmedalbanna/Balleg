import React from 'react';
import { Route } from 'react-router-dom';
import { AuthGuard } from '../core/components/AuthGuard';
import { ContractorLayout } from './components/ContractorLayout';

const ContractorContracts = React.lazy(() => import('./components/ContractorContracts').then(m => ({ default: m.ContractorContracts })));
const ContractorTeams = React.lazy(() => import('./components/ContractorTeams').then(m => ({ default: m.ContractorTeams })));
const ContractorInventory = React.lazy(() => import('./components/ContractorInventory').then(m => ({ default: m.ContractorInventory })));
const ContractorEquipment = React.lazy(() => import('./components/ContractorEquipment').then(m => ({ default: m.ContractorEquipment })));
const ContractorQuality = React.lazy(() => import('./components/ContractorQuality').then(m => ({ default: m.ContractorQuality })));
const ContractorAlerts = React.lazy(() => import('./components/ContractorAlerts').then(m => ({ default: m.ContractorAlerts })));
const ContractorSupport = React.lazy(() => import('./components/ContractorSupport').then(m => ({ default: m.ContractorSupport })));
const ContractorSettings = React.lazy(() => import('./components/ContractorSettings').then(m => ({ default: m.ContractorSettings })));
const ContractorProfile = React.lazy(() => import('./components/ContractorProfile').then(m => ({ default: m.ContractorProfile })));

export const contractorRoutes = (
  <Route element={<AuthGuard requireRole={['contractor']}><ContractorLayout /></AuthGuard>}>
    <Route path="/contractor/contracts" element={<React.Suspense fallback={<div>Loading...</div>}><ContractorContracts /></React.Suspense>} />
    <Route path="/contractor/teams" element={<React.Suspense fallback={<div>Loading...</div>}><ContractorTeams /></React.Suspense>} />
    <Route path="/contractor/inventory" element={<React.Suspense fallback={<div>Loading...</div>}><ContractorInventory /></React.Suspense>} />
    <Route path="/contractor/equipment" element={<React.Suspense fallback={<div>Loading...</div>}><ContractorEquipment /></React.Suspense>} />
    <Route path="/contractor/quality" element={<React.Suspense fallback={<div>Loading...</div>}><ContractorQuality /></React.Suspense>} />
    <Route path="/contractor/alerts" element={<React.Suspense fallback={<div>Loading...</div>}><ContractorAlerts /></React.Suspense>} />
    <Route path="/contractor/support" element={<React.Suspense fallback={<div>Loading...</div>}><ContractorSupport /></React.Suspense>} />
    <Route path="/contractor/settings" element={<React.Suspense fallback={<div>Loading...</div>}><ContractorSettings /></React.Suspense>} />
    <Route path="/contractor/profile" element={<React.Suspense fallback={<div>Loading...</div>}><ContractorProfile /></React.Suspense>} />
  </Route>
);
