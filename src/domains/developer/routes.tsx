import React from 'react';
import { Route } from 'react-router-dom';
import { AuthGuard } from '../core/components/AuthGuard';
import { DeveloperLayout } from './components/DeveloperLayout';

const DeveloperEdgeTools = React.lazy(() => import('./components/DeveloperEdgeTools').then(m => ({ default: m.DeveloperEdgeTools })));
const DeveloperArchitecture = React.lazy(() => import('./components/DeveloperArchitecture').then(m => ({ default: m.DeveloperArchitecture })));
const DeveloperDatabases = React.lazy(() => import('./components/DeveloperDatabases').then(m => ({ default: m.DeveloperDatabases })));
const DeveloperPerformance = React.lazy(() => import('./components/DeveloperPerformance').then(m => ({ default: m.DeveloperPerformance })));
const DeveloperLayers = React.lazy(() => import('./components/DeveloperLayers').then(m => ({ default: m.DeveloperLayers })));
const DeveloperAlerts = React.lazy(() => import('./components/DeveloperAlerts').then(m => ({ default: m.DeveloperAlerts })));
const DeveloperCenter = React.lazy(() => import('./components/DeveloperCenter').then(m => ({ default: m.DeveloperCenter })));
const DeveloperSettings = React.lazy(() => import('./components/DeveloperSettings').then(m => ({ default: m.DeveloperSettings })));
const DeveloperProfile = React.lazy(() => import('./components/DeveloperProfile').then(m => ({ default: m.DeveloperProfile })));

export const developerRoutes = (
  <Route element={<AuthGuard requireRole={['developer']}><DeveloperLayout /></AuthGuard>}>
    <Route path="/developer/edge-tools" element={<React.Suspense fallback={<div>Loading...</div>}><DeveloperEdgeTools /></React.Suspense>} />
    <Route path="/developer/architecture" element={<React.Suspense fallback={<div>Loading...</div>}><DeveloperArchitecture /></React.Suspense>} />
    <Route path="/developer/databases" element={<React.Suspense fallback={<div>Loading...</div>}><DeveloperDatabases /></React.Suspense>} />
    <Route path="/developer/performance" element={<React.Suspense fallback={<div>Loading...</div>}><DeveloperPerformance /></React.Suspense>} />
    <Route path="/developer/layers" element={<React.Suspense fallback={<div>Loading...</div>}><DeveloperLayers /></React.Suspense>} />
    <Route path="/developer/alerts" element={<React.Suspense fallback={<div>Loading...</div>}><DeveloperAlerts /></React.Suspense>} />
    <Route path="/developer/center" element={<React.Suspense fallback={<div>Loading...</div>}><DeveloperCenter /></React.Suspense>} />
    <Route path="/developer/settings" element={<React.Suspense fallback={<div>Loading...</div>}><DeveloperSettings /></React.Suspense>} />
    <Route path="/developer/profile" element={<React.Suspense fallback={<div>Loading...</div>}><DeveloperProfile /></React.Suspense>} />
  </Route>
);
