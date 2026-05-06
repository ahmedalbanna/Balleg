/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./domains/core/context/AuthContext";
import { RoleProvider, useRole } from "./domains/core/context/RoleContext";
import { Layout } from "./domains/core/components/Layout";
import { AuthGuard } from "./domains/core/components/AuthGuard";
import { LoginPage } from "./domains/auth/components/LoginPage";
import { RegisterPage } from "./domains/auth/components/RegisterPage";
import { ReportHome } from "./domains/report/components/ReportHome";
import { NewReport } from "./domains/report/components/NewReport";
import { TrackReport } from "./domains/report/components/TrackReport";
import { MyReports } from "./domains/report/components/MyReports";
import { OfficialDashboard } from "./domains/official/components/OfficialDashboard";
import { MerchantDashboard } from "./domains/merchant/components/MerchantDashboard";
import { DriverDashboard } from "./domains/driver/components/DriverDashboard";
import { DisplacedDashboard } from "./domains/displaced/components/DisplacedDashboard";
import { OperatorDashboard } from "./domains/operator/components/OperatorDashboard";
import { SpecialistDashboard } from "./domains/specialist/components/SpecialistDashboard";
import { ManagerDashboard } from "./domains/manager/components/ManagerDashboard";
import { AdminDashboard } from "./domains/admin/components/AdminDashboard";
import { CouncilDashboard } from "./domains/council/components/CouncilDashboard";
import { NeighborhoodDashboard } from "./domains/neighborhood/components/NeighborhoodDashboard";
import { HumanitarianDashboard } from "./domains/humanitarian/components/HumanitarianDashboard";
import { JournalistDashboard } from "./domains/journalist/components/JournalistDashboard";
import { TelecomDashboard } from "./domains/telecom/components/TelecomDashboard";
import { ContractorDashboard } from "./domains/contractor/components/ContractorDashboard";
import { HandymanDashboard } from "./domains/handyman/components/HandymanDashboard";
import { VerifierDashboard } from "./domains/verifier/components/VerifierDashboard";
import { DeveloperDashboard } from "./domains/developer/components/DeveloperDashboard";
import { DonorDashboard } from "./domains/donor/components/DonorDashboard";

import { ProfilePage } from "./domains/core/components/ProfilePage";

function HomeSwitcher() {
  const { currentRole } = useRole();
  const { profile } = useAuth();
  
  if (currentRole?.slug === 'admin') return <AdminDashboard />;
  if (currentRole?.slug === 'official') return <OfficialDashboard />;
  if (currentRole?.slug === 'merchant') return <MerchantDashboard />;
  if (currentRole?.slug === 'driver') return <DriverDashboard />;
  if (currentRole?.slug === 'displaced') return <DisplacedDashboard />;
  if (currentRole?.slug === 'operator') return <OperatorDashboard />;
  if (currentRole?.slug === 'specialist') return <SpecialistDashboard />;
  if (currentRole?.slug === 'manager') return <ManagerDashboard />;
  if (currentRole?.slug === 'admin') return <AdminDashboard />;
  if (currentRole?.slug === 'council') return <CouncilDashboard />;
  if (currentRole?.slug === 'neighborhood_council') return <NeighborhoodDashboard />;
  if (currentRole?.slug === 'humanitarian') return <HumanitarianDashboard />;
  if (currentRole?.slug === 'journalist') return <JournalistDashboard />;
  if (currentRole?.slug === 'telecom') return <TelecomDashboard />;
  if (currentRole?.slug === 'contractor') return <ContractorDashboard />;
  if (currentRole?.slug === 'handyman') return <HandymanDashboard />;
  if (currentRole?.slug === 'verifier') return <VerifierDashboard />;
  if (currentRole?.slug === 'developer') return <DeveloperDashboard />;
  if (currentRole?.slug === 'donor') return <DonorDashboard />;
  
  return <ReportHome />;
}

export default function App() {
  return (
    <AuthProvider>
      <RoleProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            <Route element={<AuthGuard><Layout /></AuthGuard>}>
              <Route path="/" element={<HomeSwitcher />} />
              <Route path="/new" element={<NewReport />} />
              <Route path="/track" element={<TrackReport />} />
              <Route path="/reports/my" element={<MyReports />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </RoleProvider>
    </AuthProvider>
  );
}

