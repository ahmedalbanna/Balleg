import React from 'react';
import { Route } from 'react-router-dom';
import { AuthGuard } from '../core/components/AuthGuard';
import { OfficialLayout } from './components/OfficialLayout';

const OfficialDashboard = React.lazy(() => import('./components/OfficialDashboard').then(m => ({ default: m.OfficialDashboard })));
const OfficialApproval = React.lazy(() => import('./components/OfficialApproval').then(m => ({ default: m.OfficialApproval })));
const OfficialCirculars = React.lazy(() => import('./components/OfficialCirculars').then(m => ({ default: m.OfficialCirculars })));
const OfficialAchievementStats = React.lazy(() => import('./components/OfficialAchievementStats').then(m => ({ default: m.OfficialAchievementStats })));
const OfficialJurisdictionMap = React.lazy(() => import('./components/OfficialJurisdictionMap').then(m => ({ default: m.OfficialJurisdictionMap })));
const OfficialSectorDistribution = React.lazy(() => import('./components/OfficialSectorDistribution').then(m => ({ default: m.OfficialSectorDistribution })));
const OfficialArchive = React.lazy(() => import('./components/OfficialArchive').then(m => ({ default: m.OfficialArchive })));
const OfficialPerformanceReports = React.lazy(() => import('./components/OfficialPerformanceReports').then(m => ({ default: m.OfficialPerformanceReports })));
const OfficialUrgentReports = React.lazy(() => import('./components/OfficialUrgentReports').then(m => ({ default: m.OfficialUrgentReports })));

export const officialRoutes = (
  <Route element={<AuthGuard requireRole={['official']}><OfficialLayout /></AuthGuard>}>
    <Route path="/official/dashboard" element={<React.Suspense fallback={<div>Loading...</div>}><OfficialDashboard /></React.Suspense>} />
    <Route path="/official/approval" element={<React.Suspense fallback={<div>Loading...</div>}><OfficialApproval /></React.Suspense>} />
    <Route path="/official/circulars" element={<React.Suspense fallback={<div>Loading...</div>}><OfficialCirculars /></React.Suspense>} />
    <Route path="/official/stats" element={<React.Suspense fallback={<div>Loading...</div>}><OfficialAchievementStats /></React.Suspense>} />
    <Route path="/official/map" element={<React.Suspense fallback={<div>Loading...</div>}><OfficialJurisdictionMap /></React.Suspense>} />
    <Route path="/official/sectors" element={<React.Suspense fallback={<div>Loading...</div>}><OfficialSectorDistribution /></React.Suspense>} />
    <Route path="/official/archive" element={<React.Suspense fallback={<div>Loading...</div>}><OfficialArchive /></React.Suspense>} />
    <Route path="/official/performance" element={<React.Suspense fallback={<div>Loading...</div>}><OfficialPerformanceReports /></React.Suspense>} />
    <Route path="/official/urgent" element={<React.Suspense fallback={<div>Loading...</div>}><OfficialUrgentReports /></React.Suspense>} />
  </Route>
);
