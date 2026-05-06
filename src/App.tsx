/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./domains/core/components/Layout";
import { ReportHome } from "./domains/report/components/ReportHome";
import { NewReport } from "./domains/report/components/NewReport";
import { TrackReport } from "./domains/report/components/TrackReport";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<ReportHome />} />
          <Route path="/new" element={<NewReport />} />
          <Route path="/track" element={<TrackReport />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

