import React from 'react';
import { Route } from 'react-router-dom';
import { AuthGuard } from '../core/components/AuthGuard';
import { CitizenLayout } from './components/CitizenLayout';

// Lazy load citizen components
const CitizenDashboard = React.lazy(() => import('./components/CitizenDashboard').then(m => ({ default: m.CitizenDashboard })));
const CitizenRegionMap = React.lazy(() => import('./components/CitizenRegionMap').then(m => ({ default: m.CitizenRegionMap })));
const CitizenNotifications = React.lazy(() => import('./components/CitizenNotifications').then(m => ({ default: m.CitizenNotifications })));
const CitizenSupport = React.lazy(() => import('./components/CitizenSupport').then(m => ({ default: m.CitizenSupport })));
const CitizenAbout = React.lazy(() => import('./components/CitizenAbout').then(m => ({ default: m.CitizenAbout })));
const CitizenSettings = React.lazy(() => import('./components/CitizenSettings').then(m => ({ default: m.CitizenSettings })));
const CitizenProfile = React.lazy(() => import('./components/CitizenProfile').then(m => ({ default: m.CitizenProfile })));

// Core components used by citizen
const NewReport = React.lazy(() => import('../core/components/NewReport').then(m => ({ default: m.NewReport })));
const EditReport = React.lazy(() => import('../core/components/EditReport').then(m => ({ default: m.EditReport })));
const TrackReport = React.lazy(() => import('../core/components/TrackReport').then(m => ({ default: m.TrackReport })));
const MyReports = React.lazy(() => import('../core/components/MyReports').then(m => ({ default: m.MyReports })));

export const citizenRoutes = (
  <Route element={<AuthGuard requireRole={['citizen']}><CitizenLayout /></AuthGuard>}>
    <Route path="/citizen" element={<React.Suspense fallback={<div>Loading...</div>}><CitizenDashboard /></React.Suspense>} />
    <Route path="/citizen/new" element={<React.Suspense fallback={<div>Loading...</div>}><NewReport /></React.Suspense>} />
    <Route path="/citizen/edit" element={<React.Suspense fallback={<div>Loading...</div>}><EditReport /></React.Suspense>} />
    <Route path="/citizen/track" element={<React.Suspense fallback={<div>Loading...</div>}><TrackReport /></React.Suspense>} />
    <Route path="/citizen/reports/my" element={<React.Suspense fallback={<div>Loading...</div>}><MyReports /></React.Suspense>} />
    <Route path="/citizen/map" element={<React.Suspense fallback={<div>Loading...</div>}><CitizenRegionMap /></React.Suspense>} />
    <Route path="/citizen/notifications" element={<React.Suspense fallback={<div>Loading...</div>}><CitizenNotifications /></React.Suspense>} />
    <Route path="/citizen/support" element={<React.Suspense fallback={<div>Loading...</div>}><CitizenSupport /></React.Suspense>} />
    <Route path="/citizen/about" element={<React.Suspense fallback={<div>Loading...</div>}><CitizenAbout /></React.Suspense>} />
    <Route path="/citizen/settings" element={<React.Suspense fallback={<div>Loading...</div>}><CitizenSettings /></React.Suspense>} />
    <Route path="/citizen/profile" element={<React.Suspense fallback={<div>Loading...</div>}><CitizenProfile /></React.Suspense>} />
  </Route>
);
