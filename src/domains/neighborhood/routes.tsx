import React from 'react';
import { Route } from 'react-router-dom';
import { AuthGuard } from '../core/components/AuthGuard';
import { NeighborhoodLayout } from './components/NeighborhoodLayout';

const NeighborhoodCouncil = React.lazy(() => import('./components/NeighborhoodCouncil').then(m => ({ default: m.NeighborhoodCouncil })));
const NeighborhoodDistricts = React.lazy(() => import('./components/NeighborhoodDistricts').then(m => ({ default: m.NeighborhoodDistricts })));
const NeighborhoodResidents = React.lazy(() => import('./components/NeighborhoodResidents').then(m => ({ default: m.NeighborhoodResidents })));
const NeighborhoodBuildings = React.lazy(() => import('./components/NeighborhoodBuildings').then(m => ({ default: m.NeighborhoodBuildings })));
const NeighborhoodSocialStats = React.lazy(() => import('./components/NeighborhoodSocialStats').then(m => ({ default: m.NeighborhoodSocialStats })));
const NeighborhoodResidentReports = React.lazy(() => import('./components/NeighborhoodResidentReports').then(m => ({ default: m.NeighborhoodResidentReports })));
const NeighborhoodConflictResolution = React.lazy(() => import('./components/NeighborhoodConflictResolution').then(m => ({ default: m.NeighborhoodConflictResolution })));
const NeighborhoodEvents = React.lazy(() => import('./components/NeighborhoodEvents').then(m => ({ default: m.NeighborhoodEvents })));
const NeighborhoodArchive = React.lazy(() => import('./components/NeighborhoodArchive').then(m => ({ default: m.NeighborhoodArchive })));
const NeighborhoodAlerts = React.lazy(() => import('./components/NeighborhoodAlerts').then(m => ({ default: m.NeighborhoodAlerts })));
const NeighborhoodSettings = React.lazy(() => import('./components/NeighborhoodSettings').then(m => ({ default: m.NeighborhoodSettings })));
const NeighborhoodProfile = React.lazy(() => import('./components/NeighborhoodProfile').then(m => ({ default: m.NeighborhoodProfile })));

export const neighborhoodRoutes = (
  <Route element={<AuthGuard requireRole={['neighborhood', 'neighborhood_council']}><NeighborhoodLayout /></AuthGuard>}>
    <Route path="/neighborhood/council" element={<React.Suspense fallback={<div>Loading...</div>}><NeighborhoodCouncil /></React.Suspense>} />
    <Route path="/neighborhood/districts" element={<React.Suspense fallback={<div>Loading...</div>}><NeighborhoodDistricts /></React.Suspense>} />
    <Route path="/neighborhood/residents" element={<React.Suspense fallback={<div>Loading...</div>}><NeighborhoodResidents /></React.Suspense>} />
    <Route path="/neighborhood/buildings" element={<React.Suspense fallback={<div>Loading...</div>}><NeighborhoodBuildings /></React.Suspense>} />
    <Route path="/neighborhood/social-stats" element={<React.Suspense fallback={<div>Loading...</div>}><NeighborhoodSocialStats /></React.Suspense>} />
    <Route path="/neighborhood/resident-reports" element={<React.Suspense fallback={<div>Loading...</div>}><NeighborhoodResidentReports /></React.Suspense>} />
    <Route path="/neighborhood/conflict-resolution" element={<React.Suspense fallback={<div>Loading...</div>}><NeighborhoodConflictResolution /></React.Suspense>} />
    <Route path="/neighborhood/events" element={<React.Suspense fallback={<div>Loading...</div>}><NeighborhoodEvents /></React.Suspense>} />
    <Route path="/neighborhood/archive" element={<React.Suspense fallback={<div>Loading...</div>}><NeighborhoodArchive /></React.Suspense>} />
    <Route path="/neighborhood/alerts" element={<React.Suspense fallback={<div>Loading...</div>}><NeighborhoodAlerts /></React.Suspense>} />
    <Route path="/neighborhood/settings" element={<React.Suspense fallback={<div>Loading...</div>}><NeighborhoodSettings /></React.Suspense>} />
    <Route path="/neighborhood/profile" element={<React.Suspense fallback={<div>Loading...</div>}><NeighborhoodProfile /></React.Suspense>} />
  </Route>
);
