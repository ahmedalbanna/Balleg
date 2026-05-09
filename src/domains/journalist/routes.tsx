import React from 'react';
import { Route } from 'react-router-dom';
import { AuthGuard } from '../core/components/AuthGuard';
import { JournalistLayout } from './components/JournalistLayout';

const JournalistCoverageAreas = React.lazy(() => import('./components/JournalistCoverageAreas').then(m => ({ default: m.JournalistCoverageAreas })));
const JournalistArticles = React.lazy(() => import('./components/JournalistArticles').then(m => ({ default: m.JournalistArticles })));
const JournalistInterviews = React.lazy(() => import('./components/JournalistInterviews').then(m => ({ default: m.JournalistInterviews })));
const JournalistVisualGallery = React.lazy(() => import('./components/JournalistVisualGallery').then(m => ({ default: m.JournalistVisualGallery })));
const JournalistReaderStats = React.lazy(() => import('./components/JournalistReaderStats').then(m => ({ default: m.JournalistReaderStats })));
const JournalistArchive = React.lazy(() => import('./components/JournalistArchive').then(m => ({ default: m.JournalistArchive })));
const JournalistBreakingNews = React.lazy(() => import('./components/JournalistBreakingNews').then(m => ({ default: m.JournalistBreakingNews })));
const JournalistSettings = React.lazy(() => import('./components/JournalistSettings').then(m => ({ default: m.JournalistSettings })));
const JournalistProfile = React.lazy(() => import('./components/JournalistProfile').then(m => ({ default: m.JournalistProfile })));

export const journalistRoutes = (
  <Route element={<AuthGuard requireRole={['journalist']}><JournalistLayout /></AuthGuard>}>
    <Route path="/journalist/coverage-areas" element={<React.Suspense fallback={<div>Loading...</div>}><JournalistCoverageAreas /></React.Suspense>} />
    <Route path="/journalist/articles" element={<React.Suspense fallback={<div>Loading...</div>}><JournalistArticles /></React.Suspense>} />
    <Route path="/journalist/interviews" element={<React.Suspense fallback={<div>Loading...</div>}><JournalistInterviews /></React.Suspense>} />
    <Route path="/journalist/visual-gallery" element={<React.Suspense fallback={<div>Loading...</div>}><JournalistVisualGallery /></React.Suspense>} />
    <Route path="/journalist/reader-stats" element={<React.Suspense fallback={<div>Loading...</div>}><JournalistReaderStats /></React.Suspense>} />
    <Route path="/journalist/archive" element={<React.Suspense fallback={<div>Loading...</div>}><JournalistArchive /></React.Suspense>} />
    <Route path="/journalist/breaking-news" element={<React.Suspense fallback={<div>Loading...</div>}><JournalistBreakingNews /></React.Suspense>} />
    <Route path="/journalist/settings" element={<React.Suspense fallback={<div>Loading...</div>}><JournalistSettings /></React.Suspense>} />
    <Route path="/journalist/profile" element={<React.Suspense fallback={<div>Loading...</div>}><JournalistProfile /></React.Suspense>} />
  </Route>
);
