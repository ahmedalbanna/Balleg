/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./domains/core/components/Layout";
import { ReportHome } from "./domains/report/components/ReportHome";
import { NewReport } from "./domains/report/components/NewReport";
import { TrackReport } from "./domains/report/components/TrackReport";
import { RoleProvider, useRole } from "./domains/core/context/RoleContext";
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

function HomeSwitcher() {
  const { currentRole } = useRole();
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
  return <ReportHome />;
}

export default function App() {
  return (
    <RoleProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomeSwitcher />} />
            <Route path="/new" element={<NewReport />} />
            <Route path="/track" element={<TrackReport />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </RoleProvider>
  );
}

