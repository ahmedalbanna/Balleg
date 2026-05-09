import React from 'react';
import { Route } from 'react-router-dom';
import { AuthGuard } from '../core/components/AuthGuard';
import { HumanitarianLayout } from './components/HumanitarianLayout';

const HumanitarianShelters = React.lazy(() => import('./components/HumanitarianShelters').then(m => ({ default: m.HumanitarianShelters })));
const HumanitarianFieldSurvey = React.lazy(() => import('./components/HumanitarianFieldSurvey').then(m => ({ default: m.HumanitarianFieldSurvey })));
const HumanitarianCases = React.lazy(() => import('./components/HumanitarianCases').then(m => ({ default: m.HumanitarianCases })));
const HumanitarianMedical = React.lazy(() => import('./components/HumanitarianMedical').then(m => ({ default: m.HumanitarianMedical })));
const HumanitarianImpact = React.lazy(() => import('./components/HumanitarianImpact').then(m => ({ default: m.HumanitarianImpact })));
const HumanitarianAidLog = React.lazy(() => import('./components/HumanitarianAidLog').then(m => ({ default: m.HumanitarianAidLog })));
const HumanitarianActiveReports = React.lazy(() => import('./components/HumanitarianActiveReports').then(m => ({ default: m.HumanitarianActiveReports })));
const HumanitarianSettings = React.lazy(() => import('./components/HumanitarianSettings').then(m => ({ default: m.HumanitarianSettings })));
const HumanitarianProfile = React.lazy(() => import('./components/HumanitarianProfile').then(m => ({ default: m.HumanitarianProfile })));

export const humanitarianRoutes = (
  <Route element={<AuthGuard requireRole={['humanitarian']}><HumanitarianLayout /></AuthGuard>}>
    <Route path="/humanitarian/shelters" element={<React.Suspense fallback={<div>Loading...</div>}><HumanitarianShelters /></React.Suspense>} />
    <Route path="/humanitarian/field-survey" element={<React.Suspense fallback={<div>Loading...</div>}><HumanitarianFieldSurvey /></React.Suspense>} />
    <Route path="/humanitarian/cases" element={<React.Suspense fallback={<div>Loading...</div>}><HumanitarianCases /></React.Suspense>} />
    <Route path="/humanitarian/medical" element={<React.Suspense fallback={<div>Loading...</div>}><HumanitarianMedical /></React.Suspense>} />
    <Route path="/humanitarian/impact" element={<React.Suspense fallback={<div>Loading...</div>}><HumanitarianImpact /></React.Suspense>} />
    <Route path="/humanitarian/aid-log" element={<React.Suspense fallback={<div>Loading...</div>}><HumanitarianAidLog /></React.Suspense>} />
    <Route path="/humanitarian/active-reports" element={<React.Suspense fallback={<div>Loading...</div>}><HumanitarianActiveReports /></React.Suspense>} />
    <Route path="/humanitarian/settings" element={<React.Suspense fallback={<div>Loading...</div>}><HumanitarianSettings /></React.Suspense>} />
    <Route path="/humanitarian/profile" element={<React.Suspense fallback={<div>Loading...</div>}><HumanitarianProfile /></React.Suspense>} />
  </Route>
);
