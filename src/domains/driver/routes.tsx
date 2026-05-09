import React from 'react';
import { Route } from 'react-router-dom';
import { AuthGuard } from '../core/components/AuthGuard';
import { DriverLayout } from './components/DriverLayout';

const DriverRoutes = React.lazy(() => import('./components/DriverRoutes').then(m => ({ default: m.DriverRoutes })));
const DriverTripHistory = React.lazy(() => import('./components/DriverTripHistory').then(m => ({ default: m.DriverTripHistory })));
const DriverFuel = React.lazy(() => import('./components/DriverFuel').then(m => ({ default: m.DriverFuel })));
const DriverKPIs = React.lazy(() => import('./components/DriverKPIs').then(m => ({ default: m.DriverKPIs })));
const DriverTrafficAlerts = React.lazy(() => import('./components/DriverTrafficAlerts').then(m => ({ default: m.DriverTrafficAlerts })));
const DriverSupport = React.lazy(() => import('./components/DriverSupport').then(m => ({ default: m.DriverSupport })));
const DriverSettings = React.lazy(() => import('./components/DriverSettings').then(m => ({ default: m.DriverSettings })));
const DriverProfile = React.lazy(() => import('./components/DriverProfile').then(m => ({ default: m.DriverProfile })));

export const driverRoutes = (
  <Route element={<AuthGuard requireRole={['driver']}><DriverLayout /></AuthGuard>}>
    <Route path="/driver/routes" element={<React.Suspense fallback={<div>Loading...</div>}><DriverRoutes /></React.Suspense>} />
    <Route path="/driver/trips" element={<React.Suspense fallback={<div>Loading...</div>}><DriverTripHistory /></React.Suspense>} />
    <Route path="/driver/fuel" element={<React.Suspense fallback={<div>Loading...</div>}><DriverFuel /></React.Suspense>} />
    <Route path="/driver/kpi" element={<React.Suspense fallback={<div>Loading...</div>}><DriverKPIs /></React.Suspense>} />
    <Route path="/driver/traffic" element={<React.Suspense fallback={<div>Loading...</div>}><DriverTrafficAlerts /></React.Suspense>} />
    <Route path="/driver/support" element={<React.Suspense fallback={<div>Loading...</div>}><DriverSupport /></React.Suspense>} />
    <Route path="/driver/settings" element={<React.Suspense fallback={<div>Loading...</div>}><DriverSettings /></React.Suspense>} />
    <Route path="/driver/profile" element={<React.Suspense fallback={<div>Loading...</div>}><DriverProfile /></React.Suspense>} />
  </Route>
);
