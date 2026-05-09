import React from 'react';
import { Route } from 'react-router-dom';
import { AuthGuard } from '../core/components/AuthGuard';
import { DisplacedLayout } from './components/DisplacedLayout';

const DisplacedShelterMap = React.lazy(() => import('./components/DisplacedShelterMap').then(m => ({ default: m.DisplacedShelterMap })));
const DisplacedNeedsTracking = React.lazy(() => import('./components/DisplacedNeedsTracking').then(m => ({ default: m.DisplacedNeedsTracking })));
const DisplacedAidRequests = React.lazy(() => import('./components/DisplacedAidRequests').then(m => ({ default: m.DisplacedAidRequests })));
const DisplacedHealthGuidelines = React.lazy(() => import('./components/DisplacedHealthGuidelines').then(m => ({ default: m.DisplacedHealthGuidelines })));
const DisplacedUrgentAlerts = React.lazy(() => import('./components/DisplacedUrgentAlerts').then(m => ({ default: m.DisplacedUrgentAlerts })));
const DisplacedHelpCenter = React.lazy(() => import('./components/DisplacedHelpCenter').then(m => ({ default: m.DisplacedHelpCenter })));
const DisplacedAccountSettings = React.lazy(() => import('./components/DisplacedAccountSettings').then(m => ({ default: m.DisplacedAccountSettings })));
const DisplacedProfile = React.lazy(() => import('./components/DisplacedProfile').then(m => ({ default: m.DisplacedProfile })));

export const displacedRoutes = (
  <Route element={<AuthGuard requireRole={['displaced']}><DisplacedLayout /></AuthGuard>}>
    <Route path="/displaced/shelters" element={<React.Suspense fallback={<div>Loading...</div>}><DisplacedShelterMap /></React.Suspense>} />
    <Route path="/displaced/needs" element={<React.Suspense fallback={<div>Loading...</div>}><DisplacedNeedsTracking /></React.Suspense>} />
    <Route path="/displaced/aid" element={<React.Suspense fallback={<div>Loading...</div>}><DisplacedAidRequests /></React.Suspense>} />
    <Route path="/displaced/health" element={<React.Suspense fallback={<div>Loading...</div>}><DisplacedHealthGuidelines /></React.Suspense>} />
    <Route path="/displaced/alerts" element={<React.Suspense fallback={<div>Loading...</div>}><DisplacedUrgentAlerts /></React.Suspense>} />
    <Route path="/displaced/help" element={<React.Suspense fallback={<div>Loading...</div>}><DisplacedHelpCenter /></React.Suspense>} />
    <Route path="/displaced/settings" element={<React.Suspense fallback={<div>Loading...</div>}><DisplacedAccountSettings /></React.Suspense>} />
    <Route path="/displaced/profile" element={<React.Suspense fallback={<div>Loading...</div>}><DisplacedProfile /></React.Suspense>} />
  </Route>
);
