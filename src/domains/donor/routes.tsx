import React from 'react';
import { Route } from 'react-router-dom';
import { AuthGuard } from '../core/components/AuthGuard';
import { DonorLayout } from './components/DonorLayout';

const DonorProjects = React.lazy(() => import('./components/DonorProjects').then(m => ({ default: m.DonorProjects })));
const DonorDonations = React.lazy(() => import('./components/DonorDonations').then(m => ({ default: m.DonorDonations })));
const DonorImpact = React.lazy(() => import('./components/DonorImpact').then(m => ({ default: m.DonorImpact })));
const DonorVolunteer = React.lazy(() => import('./components/DonorVolunteer').then(m => ({ default: m.DonorVolunteer })));
const DonorPartners = React.lazy(() => import('./components/DonorPartners').then(m => ({ default: m.DonorPartners })));
const DonorAlerts = React.lazy(() => import('./components/DonorAlerts').then(m => ({ default: m.DonorAlerts })));
const DonorSupport = React.lazy(() => import('./components/DonorSupport').then(m => ({ default: m.DonorSupport })));
const DonorSettings = React.lazy(() => import('./components/DonorSettings').then(m => ({ default: m.DonorSettings })));
const DonorProfile = React.lazy(() => import('./components/DonorProfile').then(m => ({ default: m.DonorProfile })));

export const donorRoutes = (
  <Route element={<AuthGuard requireRole={['donor']}><DonorLayout /></AuthGuard>}>
    <Route path="/donor/projects" element={<React.Suspense fallback={<div>Loading...</div>}><DonorProjects /></React.Suspense>} />
    <Route path="/donor/donations" element={<React.Suspense fallback={<div>Loading...</div>}><DonorDonations /></React.Suspense>} />
    <Route path="/donor/impact" element={<React.Suspense fallback={<div>Loading...</div>}><DonorImpact /></React.Suspense>} />
    <Route path="/donor/volunteer" element={<React.Suspense fallback={<div>Loading...</div>}><DonorVolunteer /></React.Suspense>} />
    <Route path="/donor/partners" element={<React.Suspense fallback={<div>Loading...</div>}><DonorPartners /></React.Suspense>} />
    <Route path="/donor/alerts" element={<React.Suspense fallback={<div>Loading...</div>}><DonorAlerts /></React.Suspense>} />
    <Route path="/donor/support" element={<React.Suspense fallback={<div>Loading...</div>}><DonorSupport /></React.Suspense>} />
    <Route path="/donor/settings" element={<React.Suspense fallback={<div>Loading...</div>}><DonorSettings /></React.Suspense>} />
    <Route path="/donor/profile" element={<React.Suspense fallback={<div>Loading...</div>}><DonorProfile /></React.Suspense>} />
  </Route>
);
