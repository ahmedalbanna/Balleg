import React from 'react';
import { Route } from 'react-router-dom';
import { AuthGuard } from '../core/components/AuthGuard';
import { CouncilLayout } from './components/CouncilLayout';

const CouncilReports = React.lazy(() => import('./components/CouncilReports').then(m => ({ default: m.CouncilReports })));
const CouncilFieldMonitoring = React.lazy(() => import('./components/CouncilFieldMonitoring').then(m => ({ default: m.CouncilFieldMonitoring })));
const CouncilStats = React.lazy(() => import('./components/CouncilStats').then(m => ({ default: m.CouncilStats })));
const CouncilProjects = React.lazy(() => import('./components/CouncilProjects').then(m => ({ default: m.CouncilProjects })));
const CouncilArchive = React.lazy(() => import('./components/CouncilArchive').then(m => ({ default: m.CouncilArchive })));
const CouncilAlerts = React.lazy(() => import('./components/CouncilAlerts').then(m => ({ default: m.CouncilAlerts })));
const CouncilSupport = React.lazy(() => import('./components/CouncilSupport').then(m => ({ default: m.CouncilSupport })));
const CouncilSettings = React.lazy(() => import('./components/CouncilSettings').then(m => ({ default: m.CouncilSettings })));
const CouncilProfile = React.lazy(() => import('./components/CouncilProfile').then(m => ({ default: m.CouncilProfile })));

export const councilRoutes = (
  <Route element={<AuthGuard requireRole={['council']}><CouncilLayout /></AuthGuard>}>
    <Route path="/council/reports" element={<React.Suspense fallback={<div>Loading...</div>}><CouncilReports /></React.Suspense>} />
    <Route path="/council/monitoring" element={<React.Suspense fallback={<div>Loading...</div>}><CouncilFieldMonitoring /></React.Suspense>} />
    <Route path="/council/stats" element={<React.Suspense fallback={<div>Loading...</div>}><CouncilStats /></React.Suspense>} />
    <Route path="/council/projects" element={<React.Suspense fallback={<div>Loading...</div>}><CouncilProjects /></React.Suspense>} />
    <Route path="/council/archive" element={<React.Suspense fallback={<div>Loading...</div>}><CouncilArchive /></React.Suspense>} />
    <Route path="/council/alerts" element={<React.Suspense fallback={<div>Loading...</div>}><CouncilAlerts /></React.Suspense>} />
    <Route path="/council/support" element={<React.Suspense fallback={<div>Loading...</div>}><CouncilSupport /></React.Suspense>} />
    <Route path="/council/settings" element={<React.Suspense fallback={<div>Loading...</div>}><CouncilSettings /></React.Suspense>} />
    <Route path="/council/profile" element={<React.Suspense fallback={<div>Loading...</div>}><CouncilProfile /></React.Suspense>} />
  </Route>
);
