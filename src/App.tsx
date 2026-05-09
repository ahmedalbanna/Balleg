/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense } from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import { AuthProvider } from "./domains/core/context/AuthContext";
import { RoleProvider } from "./domains/core/context/RoleContext";
import { coreRoutes } from "./domains/core/routes";
import { adminRoutes } from "./domains/admin/routes";
import { officialRoutes } from "./domains/official/routes";
import { operatorRoutes } from "./domains/operator/routes";
import { specialistRoutes } from "./domains/specialist/routes";
import { displacedRoutes } from "./domains/displaced/routes";
import { merchantRoutes } from "./domains/merchant/routes";
import { driverRoutes } from "./domains/driver/routes";
import { councilRoutes } from "./domains/council/routes";
import { contractorRoutes } from "./domains/contractor/routes";
import { developerRoutes } from "./domains/developer/routes";
import { donorRoutes } from "./domains/donor/routes";
import { handymanRoutes } from "./domains/handyman/routes";
import { humanitarianRoutes } from "./domains/humanitarian/routes";
import { journalistRoutes } from "./domains/journalist/routes";
import { neighborhoodRoutes } from "./domains/neighborhood/routes";
import { telecomRoutes } from "./domains/telecom/routes";
import { verifierRoutes } from "./domains/verifier/routes";
import { citizenRoutes } from "./domains/citizen/routes";

export default function App() {
  return (
    <AuthProvider>
      <RoleProvider>
        <BrowserRouter>
          <Suspense fallback={
            <div className="flex h-screen w-full items-center justify-center bg-gray-50">
              <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
            </div>
          }>
            <Routes>
              {coreRoutes}
              {citizenRoutes}
              {adminRoutes}
              {officialRoutes}
              {operatorRoutes}
              {specialistRoutes}
              {displacedRoutes}
              {merchantRoutes}
              {driverRoutes}
              {councilRoutes}
              {contractorRoutes}
              {developerRoutes}
              {donorRoutes}
              {handymanRoutes}
              {humanitarianRoutes}
              {journalistRoutes}
              {neighborhoodRoutes}
              {telecomRoutes}
              {verifierRoutes}
            </Routes>
          </Suspense>
        </BrowserRouter>
      </RoleProvider>
    </AuthProvider>
  );
}


