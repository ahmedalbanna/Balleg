import React from 'react';
import { Route } from 'react-router-dom';
import { LoginPage } from '../auth/components/LoginPage';
import { RegisterPage } from '../auth/components/RegisterPage';
import { DataSeeder } from '../admin/components/DataSeeder';
import { AuthGuard } from './components/AuthGuard';
import { useRole } from './context/RoleContext';
import { roleLayouts, roleHomeComponents, roleProfiles, roleSettings } from './config/roleConfig';
import { Layout } from './components/Layout';
import { ProfilePage } from './components/ProfilePage';

const MainLayoutSwitcher = () => {
  const { currentRole } = useRole();
  const LayoutComponent = roleLayouts[currentRole?.slug || 'citizen'] || Layout;
  return <LayoutComponent />;
};

const HomeSwitcher = () => {
  const { currentRole } = useRole();
  const HomeComponent = roleHomeComponents[currentRole?.slug || 'citizen'] || roleHomeComponents.citizen;
  return <React.Suspense fallback={<div>Loading...</div>}><HomeComponent /></React.Suspense>;
};

const ProfileSwitcher = () => {
  const { currentRole } = useRole();
  const ProfileComponent = roleProfiles[currentRole?.slug || 'citizen'] || ProfilePage;
  return <React.Suspense fallback={<div>Loading...</div>}><ProfileComponent /></React.Suspense>;
};

const SettingsSwitcher = () => {
  const { currentRole } = useRole();
  const SettingsComponent = roleSettings[currentRole?.slug || 'citizen'] || ProfilePage;
  return <React.Suspense fallback={<div>Loading...</div>}><SettingsComponent /></React.Suspense>;
};

export const coreRoutes = (
  <>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/demo-seed" element={<DataSeeder />} />

    <Route element={<AuthGuard><MainLayoutSwitcher /></AuthGuard>}>
      <Route path="/" element={<HomeSwitcher />} />
      <Route path="/settings" element={<SettingsSwitcher />} />
      <Route path="/profile" element={<ProfileSwitcher />} />
    </Route>
  </>
);
