import React from 'react';
import { Route } from 'react-router-dom';
import { AuthGuard } from '../core/components/AuthGuard';
import { MerchantLayout } from './components/MerchantLayout';

const MerchantProducts = React.lazy(() => import('./components/MerchantProducts').then(m => ({ default: m.MerchantProducts })));
const MerchantOrders = React.lazy(() => import('./components/MerchantOrders').then(m => ({ default: m.MerchantOrders })));
const MerchantShipping = React.lazy(() => import('./components/MerchantShipping').then(m => ({ default: m.MerchantShipping })));
const MerchantFinancials = React.lazy(() => import('./components/MerchantFinancials').then(m => ({ default: m.MerchantFinancials })));
const MerchantPayments = React.lazy(() => import('./components/MerchantPayments').then(m => ({ default: m.MerchantPayments })));
const MerchantNotifications = React.lazy(() => import('./components/MerchantNotifications').then(m => ({ default: m.MerchantNotifications })));
const MerchantSupport = React.lazy(() => import('./components/MerchantSupport').then(m => ({ default: m.MerchantSupport })));
const MerchantSettings = React.lazy(() => import('./components/MerchantSettings').then(m => ({ default: m.MerchantSettings })));
const MerchantProfile = React.lazy(() => import('./components/MerchantProfile').then(m => ({ default: m.MerchantProfile })));

export const merchantRoutes = (
  <Route element={<AuthGuard requireRole={['merchant']}><MerchantLayout /></AuthGuard>}>
    <Route path="/merchant/products" element={<React.Suspense fallback={<div>Loading...</div>}><MerchantProducts /></React.Suspense>} />
    <Route path="/merchant/orders" element={<React.Suspense fallback={<div>Loading...</div>}><MerchantOrders /></React.Suspense>} />
    <Route path="/merchant/shipping" element={<React.Suspense fallback={<div>Loading...</div>}><MerchantShipping /></React.Suspense>} />
    <Route path="/merchant/financials" element={<React.Suspense fallback={<div>Loading...</div>}><MerchantFinancials /></React.Suspense>} />
    <Route path="/merchant/payments" element={<React.Suspense fallback={<div>Loading...</div>}><MerchantPayments /></React.Suspense>} />
    <Route path="/merchant/notifications" element={<React.Suspense fallback={<div>Loading...</div>}><MerchantNotifications /></React.Suspense>} />
    <Route path="/merchant/support" element={<React.Suspense fallback={<div>Loading...</div>}><MerchantSupport /></React.Suspense>} />
    <Route path="/merchant/settings" element={<React.Suspense fallback={<div>Loading...</div>}><MerchantSettings /></React.Suspense>} />
    <Route path="/merchant/profile" element={<React.Suspense fallback={<div>Loading...</div>}><MerchantProfile /></React.Suspense>} />
  </Route>
);
