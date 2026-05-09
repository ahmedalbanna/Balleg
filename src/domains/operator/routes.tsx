import React from 'react';
import { Route } from 'react-router-dom';
import { AuthGuard } from '../core/components/AuthGuard';
import { OperatorLayout } from './components/OperatorLayout';

const OperatorCallCenter = React.lazy(() => import('./components/OperatorCallCenter').then(m => ({ default: m.OperatorCallCenter })));
const OperatorCurrentReports = React.lazy(() => import('./components/OperatorCurrentReports').then(m => ({ default: m.OperatorCurrentReports })));
const OperatorCitizenMessages = React.lazy(() => import('./components/OperatorCitizenMessages').then(m => ({ default: m.OperatorCitizenMessages })));
const OperatorReportsMap = React.lazy(() => import('./components/OperatorReportsMap').then(m => ({ default: m.OperatorReportsMap })));
const OperatorOperationsHistory = React.lazy(() => import('./components/OperatorOperationsHistory').then(m => ({ default: m.OperatorOperationsHistory })));
const OperatorHelpSupport = React.lazy(() => import('./components/OperatorHelpSupport').then(m => ({ default: m.OperatorHelpSupport })));
const OperatorSettings = React.lazy(() => import('./components/OperatorSettings').then(m => ({ default: m.OperatorSettings })));

export const operatorRoutes = (
  <Route element={<AuthGuard requireRole={['operator']}><OperatorLayout /></AuthGuard>}>
    <Route path="/operator/calls" element={<React.Suspense fallback={<div>Loading...</div>}><OperatorCallCenter /></React.Suspense>} />
    <Route path="/operator/reports" element={<React.Suspense fallback={<div>Loading...</div>}><OperatorCurrentReports /></React.Suspense>} />
    <Route path="/operator/messages" element={<React.Suspense fallback={<div>Loading...</div>}><OperatorCitizenMessages /></React.Suspense>} />
    <Route path="/operator/map" element={<React.Suspense fallback={<div>Loading...</div>}><OperatorReportsMap /></React.Suspense>} />
    <Route path="/operator/history" element={<React.Suspense fallback={<div>Loading...</div>}><OperatorOperationsHistory /></React.Suspense>} />
    <Route path="/operator/help" element={<React.Suspense fallback={<div>Loading...</div>}><OperatorHelpSupport /></React.Suspense>} />
    <Route path="/operator/settings" element={<React.Suspense fallback={<div>Loading...</div>}><OperatorSettings /></React.Suspense>} />
  </Route>
);
