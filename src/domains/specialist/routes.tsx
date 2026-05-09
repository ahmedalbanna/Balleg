import React from 'react';
import { Route } from 'react-router-dom';
import { AuthGuard } from '../core/components/AuthGuard';
import { SpecialistLayout } from './components/SpecialistLayout';

const SpecialistPendingTasks = React.lazy(() => import('./components/SpecialistPendingTasks').then(m => ({ default: m.SpecialistPendingTasks })));
const SpecialistAIAnalysis = React.lazy(() => import('./components/SpecialistAIAnalysis').then(m => ({ default: m.SpecialistAIAnalysis })));
const SpecialistHeatMaps = React.lazy(() => import('./components/SpecialistHeatMaps').then(m => ({ default: m.SpecialistHeatMaps })));
const SpecialistTechnicalReports = React.lazy(() => import('./components/SpecialistTechnicalReports').then(m => ({ default: m.SpecialistTechnicalReports })));
const SpecialistSectorStats = React.lazy(() => import('./components/SpecialistSectorStats').then(m => ({ default: m.SpecialistSectorStats })));
const SpecialistKnowledgeArchive = React.lazy(() => import('./components/SpecialistKnowledgeArchive').then(m => ({ default: m.SpecialistKnowledgeArchive })));
const SpecialistCaseStudies = React.lazy(() => import('./components/SpecialistCaseStudies').then(m => ({ default: m.SpecialistCaseStudies })));
const SpecialistSettings = React.lazy(() => import('./components/SpecialistSettings').then(m => ({ default: m.SpecialistSettings })));
const SpecialistProfile = React.lazy(() => import('./components/SpecialistProfile').then(m => ({ default: m.SpecialistProfile })));

export const specialistRoutes = (
  <Route element={<AuthGuard requireRole={['specialist']}><SpecialistLayout /></AuthGuard>}>
    <Route path="/specialist/tasks" element={<React.Suspense fallback={<div>Loading...</div>}><SpecialistPendingTasks /></React.Suspense>} />
    <Route path="/specialist/ai" element={<React.Suspense fallback={<div>Loading...</div>}><SpecialistAIAnalysis /></React.Suspense>} />
    <Route path="/specialist/heatmaps" element={<React.Suspense fallback={<div>Loading...</div>}><SpecialistHeatMaps /></React.Suspense>} />
    <Route path="/specialist/reports" element={<React.Suspense fallback={<div>Loading...</div>}><SpecialistTechnicalReports /></React.Suspense>} />
    <Route path="/specialist/stats" element={<React.Suspense fallback={<div>Loading...</div>}><SpecialistSectorStats /></React.Suspense>} />
    <Route path="/specialist/archive" element={<React.Suspense fallback={<div>Loading...</div>}><SpecialistKnowledgeArchive /></React.Suspense>} />
    <Route path="/specialist/cases" element={<React.Suspense fallback={<div>Loading...</div>}><SpecialistCaseStudies /></React.Suspense>} />
    <Route path="/specialist/settings" element={<React.Suspense fallback={<div>Loading...</div>}><SpecialistSettings /></React.Suspense>} />
    <Route path="/specialist/profile" element={<React.Suspense fallback={<div>Loading...</div>}><SpecialistProfile /></React.Suspense>} />
  </Route>
);
