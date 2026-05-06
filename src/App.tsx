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

function HomeSwitcher() {
  const { currentRole } = useRole();
  if (currentRole?.slug === 'official') return <OfficialDashboard />;
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

