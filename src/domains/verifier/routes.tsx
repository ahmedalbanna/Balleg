import React from 'react';
import { Route } from 'react-router-dom';
import { AuthGuard } from '../core/components/AuthGuard';
import { VerifierLayout } from './components/VerifierLayout';

const VerifierVerificationBoard = React.lazy(() => import('./components/VerifierVerificationBoard').then(m => ({ default: m.VerifierVerificationBoard })));
const VerifierFieldMap = React.lazy(() => import('./components/VerifierFieldMap').then(m => ({ default: m.VerifierFieldMap })));
const VerifierDocRequests = React.lazy(() => import('./components/VerifierDocRequests').then(m => ({ default: m.VerifierDocRequests })));
const VerifierDataReview = React.lazy(() => import('./components/VerifierDataReview').then(m => ({ default: m.VerifierDataReview })));
const VerifierReportsHistory = React.lazy(() => import('./components/VerifierReportsHistory').then(m => ({ default: m.VerifierReportsHistory })));
const VerifierAuditTransparency = React.lazy(() => import('./components/VerifierAuditTransparency').then(m => ({ default: m.VerifierAuditTransparency })));
const VerifierDocumentedArchive = React.lazy(() => import('./components/VerifierDocumentedArchive').then(m => ({ default: m.VerifierDocumentedArchive })));
const VerifierAnalyticalReports = React.lazy(() => import('./components/VerifierAnalyticalReports').then(m => ({ default: m.VerifierAnalyticalReports })));
const VerifierSecurityNotifs = React.lazy(() => import('./components/VerifierSecurityNotifs').then(m => ({ default: m.VerifierSecurityNotifs })));
const VerifierSystemAlerts = React.lazy(() => import('./components/VerifierSystemAlerts').then(m => ({ default: m.VerifierSystemAlerts })));
const VerifierSettings = React.lazy(() => import('./components/VerifierSettings').then(m => ({ default: m.VerifierSettings })));
const VerifierProfile = React.lazy(() => import('./components/VerifierProfile').then(m => ({ default: m.VerifierProfile })));

export const verifierRoutes = (
  <Route element={<AuthGuard requireRole={['verifier']}><VerifierLayout /></AuthGuard>}>
    <Route path="/verifier/verification-board" element={<React.Suspense fallback={<div>Loading...</div>}><VerifierVerificationBoard /></React.Suspense>} />
    <Route path="/verifier/field-map" element={<React.Suspense fallback={<div>Loading...</div>}><VerifierFieldMap /></React.Suspense>} />
    <Route path="/verifier/doc-requests" element={<React.Suspense fallback={<div>Loading...</div>}><VerifierDocRequests /></React.Suspense>} />
    <Route path="/verifier/data-review" element={<React.Suspense fallback={<div>Loading...</div>}><VerifierDataReview /></React.Suspense>} />
    <Route path="/verifier/reports-history" element={<React.Suspense fallback={<div>Loading...</div>}><VerifierReportsHistory /></React.Suspense>} />
    <Route path="/verifier/audit" element={<React.Suspense fallback={<div>Loading...</div>}><VerifierAuditTransparency /></React.Suspense>} />
    <Route path="/verifier/archive" element={<React.Suspense fallback={<div>Loading...</div>}><VerifierDocumentedArchive /></React.Suspense>} />
    <Route path="/verifier/analytics" element={<React.Suspense fallback={<div>Loading...</div>}><VerifierAnalyticalReports /></React.Suspense>} />
    <Route path="/verifier/security" element={<React.Suspense fallback={<div>Loading...</div>}><VerifierSecurityNotifs /></React.Suspense>} />
    <Route path="/verifier/alerts" element={<React.Suspense fallback={<div>Loading...</div>}><VerifierSystemAlerts /></React.Suspense>} />
    <Route path="/verifier/settings" element={<React.Suspense fallback={<div>Loading...</div>}><VerifierSettings /></React.Suspense>} />
    <Route path="/verifier/profile" element={<React.Suspense fallback={<div>Loading...</div>}><VerifierProfile /></React.Suspense>} />
  </Route>
);
