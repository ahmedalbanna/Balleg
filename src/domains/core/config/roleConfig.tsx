import React from 'react';
import { Layout } from '../components/Layout';
import { ProfilePage } from '../components/ProfilePage';

// Lazy load domain layouts and profiles
const AdminLayout = React.lazy(() => import('../../admin/components/AdminLayout').then(m => ({ default: m.AdminLayout })));
const AdminProfile = React.lazy(() => import('../../admin/components/AdminProfile').then(m => ({ default: m.AdminProfile })));
const OfficialLayout = React.lazy(() => import('../../official/components/OfficialLayout').then(m => ({ default: m.OfficialLayout })));
const OfficialProfile = React.lazy(() => import('../../official/components/OfficialProfile').then(m => ({ default: m.OfficialProfile })));
const OperatorLayout = React.lazy(() => import('../../operator/components/OperatorLayout').then(m => ({ default: m.OperatorLayout })));
const OperatorProfile = React.lazy(() => import('../../operator/components/OperatorProfile').then(m => ({ default: m.OperatorProfile })));
const SpecialistLayout = React.lazy(() => import('../../specialist/components/SpecialistLayout').then(m => ({ default: m.SpecialistLayout })));
const SpecialistProfile = React.lazy(() => import('../../specialist/components/SpecialistProfile').then(m => ({ default: m.SpecialistProfile })));
const CitizenLayout = React.lazy(() => import('../../citizen/components/CitizenLayout').then(m => ({ default: m.CitizenLayout })));
const CitizenProfile = React.lazy(() => import('../../citizen/components/CitizenProfile').then(m => ({ default: m.CitizenProfile })));
const DisplacedLayout = React.lazy(() => import('../../displaced/components/DisplacedLayout').then(m => ({ default: m.DisplacedLayout })));
const DisplacedProfile = React.lazy(() => import('../../displaced/components/DisplacedProfile').then(m => ({ default: m.DisplacedProfile })));
const MerchantLayout = React.lazy(() => import('../../merchant/components/MerchantLayout').then(m => ({ default: m.MerchantLayout })));
const MerchantProfile = React.lazy(() => import('../../merchant/components/MerchantProfile').then(m => ({ default: m.MerchantProfile })));
const DriverLayout = React.lazy(() => import('../../driver/components/DriverLayout').then(m => ({ default: m.DriverLayout })));
const DriverProfile = React.lazy(() => import('../../driver/components/DriverProfile').then(m => ({ default: m.DriverProfile })));
const CouncilLayout = React.lazy(() => import('../../council/components/CouncilLayout').then(m => ({ default: m.CouncilLayout })));
const CouncilProfile = React.lazy(() => import('../../council/components/CouncilProfile').then(m => ({ default: m.CouncilProfile })));
const ContractorLayout = React.lazy(() => import('../../contractor/components/ContractorLayout').then(m => ({ default: m.ContractorLayout })));
const ContractorProfile = React.lazy(() => import('../../contractor/components/ContractorProfile').then(m => ({ default: m.ContractorProfile })));
const DeveloperLayout = React.lazy(() => import('../../developer/components/DeveloperLayout').then(m => ({ default: m.DeveloperLayout })));
const DeveloperProfile = React.lazy(() => import('../../developer/components/DeveloperProfile').then(m => ({ default: m.DeveloperProfile })));
const DonorLayout = React.lazy(() => import('../../donor/components/DonorLayout').then(m => ({ default: m.DonorLayout })));
const DonorProfile = React.lazy(() => import('../../donor/components/DonorProfile').then(m => ({ default: m.DonorProfile })));
const HandymanLayout = React.lazy(() => import('../../handyman/components/HandymanLayout').then(m => ({ default: m.HandymanLayout })));
const HandymanProfile = React.lazy(() => import('../../handyman/components/HandymanProfile').then(m => ({ default: m.HandymanProfile })));
const HumanitarianLayout = React.lazy(() => import('../../humanitarian/components/HumanitarianLayout').then(m => ({ default: m.HumanitarianLayout })));
const HumanitarianProfile = React.lazy(() => import('../../humanitarian/components/HumanitarianProfile').then(m => ({ default: m.HumanitarianProfile })));
const JournalistLayout = React.lazy(() => import('../../journalist/components/JournalistLayout').then(m => ({ default: m.JournalistLayout })));
const JournalistProfile = React.lazy(() => import('../../journalist/components/JournalistProfile').then(m => ({ default: m.JournalistProfile })));
const NeighborhoodLayout = React.lazy(() => import('../../neighborhood/components/NeighborhoodLayout').then(m => ({ default: m.NeighborhoodLayout })));
const NeighborhoodProfile = React.lazy(() => import('../../neighborhood/components/NeighborhoodProfile').then(m => ({ default: m.NeighborhoodProfile })));
const TelecomLayout = React.lazy(() => import('../../telecom/components/TelecomLayout').then(m => ({ default: m.TelecomLayout })));
const TelecomProfile = React.lazy(() => import('../../telecom/components/TelecomProfile').then(m => ({ default: m.TelecomProfile })));
const VerifierLayout = React.lazy(() => import('../../verifier/components/VerifierLayout').then(m => ({ default: m.VerifierLayout })));
const VerifierProfile = React.lazy(() => import('../../verifier/components/VerifierProfile').then(m => ({ default: m.VerifierProfile })));
const VerifierSettings = React.lazy(() => import('../../verifier/components/VerifierSettings').then(m => ({ default: m.VerifierSettings })));
const TelecomSettings = React.lazy(() => import('../../telecom/components/TelecomSettings').then(m => ({ default: m.TelecomSettings })));
const NeighborhoodSettings = React.lazy(() => import('../../neighborhood/components/NeighborhoodSettings').then(m => ({ default: m.NeighborhoodSettings })));
const JournalistSettings = React.lazy(() => import('../../journalist/components/JournalistSettings').then(m => ({ default: m.JournalistSettings })));
const HumanitarianSettings = React.lazy(() => import('../../humanitarian/components/HumanitarianSettings').then(m => ({ default: m.HumanitarianSettings })));
const HandymanSettings = React.lazy(() => import('../../handyman/components/HandymanSettings').then(m => ({ default: m.HandymanSettings })));
const DonorSettings = React.lazy(() => import('../../donor/components/DonorSettings').then(m => ({ default: m.DonorSettings })));
const DisplacedSettings = React.lazy(() => import('../../displaced/components/DisplacedAccountSettings').then(m => ({ default: m.DisplacedAccountSettings })));
const MerchantSettings = React.lazy(() => import('../../merchant/components/MerchantSettings').then(m => ({ default: m.MerchantSettings })));
const OperatorSettings = React.lazy(() => import('../../operator/components/OperatorSettings').then(m => ({ default: m.OperatorSettings })));
const SpecialistSettings = React.lazy(() => import('../../specialist/components/SpecialistSettings').then(m => ({ default: m.SpecialistSettings })));
const DriverSettings = React.lazy(() => import('../../driver/components/DriverSettings').then(m => ({ default: m.DriverSettings })));
const CouncilSettings = React.lazy(() => import('../../council/components/CouncilSettings').then(m => ({ default: m.CouncilSettings })));
const ContractorSettings = React.lazy(() => import('../../contractor/components/ContractorSettings').then(m => ({ default: m.ContractorSettings })));
const DeveloperSettings = React.lazy(() => import('../../developer/components/DeveloperSettings').then(m => ({ default: m.DeveloperSettings })));
const AdminSettings = React.lazy(() => import('../../admin/components/AdminSettings').then(m => ({ default: m.AdminSettings })));
const OfficialSettings = React.lazy(() => import('../../official/components/OfficialDashboard').then(m => ({ default: m.OfficialDashboard }))); // Fallback for official

export const roleLayouts: Record<string, React.ComponentType<any>> = {
  admin: AdminLayout,
  official: OfficialLayout,
  operator: OperatorLayout,
  specialist: SpecialistLayout,
  citizen: CitizenLayout,
  displaced: DisplacedLayout,
  merchant: MerchantLayout,
  driver: DriverLayout,
  council: CouncilLayout,
  contractor: ContractorLayout,
  developer: DeveloperLayout,
  donor: DonorLayout,
  handyman: HandymanLayout,
  humanitarian: HumanitarianLayout,
  journalist: JournalistLayout,
  neighborhood: NeighborhoodLayout,
  neighborhood_council: NeighborhoodLayout,
  telecom: TelecomLayout,
  verifier: VerifierLayout,
};

export const roleProfiles: Record<string, React.ComponentType<any>> = {
  admin: AdminProfile,
  official: OfficialProfile,
  operator: OperatorProfile,
  specialist: SpecialistProfile,
  citizen: CitizenProfile,
  displaced: DisplacedProfile,
  merchant: MerchantProfile,
  driver: DriverProfile,
  council: CouncilProfile,
  contractor: ContractorProfile,
  developer: DeveloperProfile,
  donor: DonorProfile,
  handyman: HandymanProfile,
  humanitarian: HumanitarianProfile,
  journalist: JournalistProfile,
  neighborhood: NeighborhoodProfile,
  neighborhood_council: NeighborhoodProfile,
  telecom: TelecomProfile,
  verifier: VerifierProfile,
};

export const roleSettings: Record<string, React.ComponentType<any>> = {
  admin: AdminSettings,
  official: OfficialSettings,
  operator: OperatorSettings,
  specialist: SpecialistSettings,
  citizen: CitizenProfile, // Citizen uses profile for settings often or has its own CitizenSettings
  displaced: DisplacedSettings,
  merchant: MerchantSettings,
  driver: DriverSettings,
  council: CouncilSettings,
  contractor: ContractorSettings,
  developer: DeveloperSettings,
  donor: DonorSettings,
  handyman: HandymanSettings,
  humanitarian: HumanitarianSettings,
  journalist: JournalistSettings,
  neighborhood: NeighborhoodSettings,
  neighborhood_council: NeighborhoodSettings,
  telecom: TelecomSettings,
  verifier: VerifierSettings,
};

export const roleHomeComponents: Record<string, React.LazyExoticComponent<any>> = {
  admin: React.lazy(() => import('../../admin/components/AdminDashboard').then(m => ({ default: m.AdminDashboard }))),
  official: React.lazy(() => import('../../official/components/OfficialDashboard').then(m => ({ default: m.OfficialDashboard }))),
  merchant: React.lazy(() => import('../../merchant/components/MerchantDashboard').then(m => ({ default: m.MerchantDashboard }))),
  driver: React.lazy(() => import('../../driver/components/DriverDashboard').then(m => ({ default: m.DriverDashboard }))),
  displaced: React.lazy(() => import('../../displaced/components/DisplacedDashboard').then(m => ({ default: m.DisplacedDashboard }))),
  operator: React.lazy(() => import('../../operator/components/OperatorDashboard').then(m => ({ default: m.OperatorDashboard }))),
  specialist: React.lazy(() => import('../../specialist/components/SpecialistDashboard').then(m => ({ default: m.SpecialistDashboard }))),
  manager: React.lazy(() => import('../../manager/components/ManagerDashboard').then(m => ({ default: m.ManagerDashboard }))),
  council: React.lazy(() => import('../../council/components/CouncilDashboard').then(m => ({ default: m.CouncilDashboard }))),
  neighborhood_council: React.lazy(() => import('../../neighborhood/components/NeighborhoodDashboard').then(m => ({ default: m.NeighborhoodDashboard }))),
  neighborhood: React.lazy(() => import('../../neighborhood/components/NeighborhoodDashboard').then(m => ({ default: m.NeighborhoodDashboard }))),
  humanitarian: React.lazy(() => import('../../humanitarian/components/HumanitarianDashboard').then(m => ({ default: m.HumanitarianDashboard }))),
  journalist: React.lazy(() => import('../../journalist/components/JournalistDashboard').then(m => ({ default: m.JournalistDashboard }))),
  telecom: React.lazy(() => import('../../telecom/components/TelecomDashboard').then(m => ({ default: m.TelecomDashboard }))),
  contractor: React.lazy(() => import('../../contractor/components/ContractorDashboard').then(m => ({ default: m.ContractorDashboard }))),
  handyman: React.lazy(() => import('../../handyman/components/HandymanDashboard').then(m => ({ default: m.HandymanDashboard }))),
  verifier: React.lazy(() => import('../../verifier/components/VerifierDashboard').then(m => ({ default: m.VerifierDashboard }))),
  developer: React.lazy(() => import('../../developer/components/DeveloperDashboard').then(m => ({ default: m.DeveloperDashboard }))),
  donor: React.lazy(() => import('../../donor/components/DonorDashboard').then(m => ({ default: m.DonorDashboard }))),
  citizen: React.lazy(() => import('../../citizen/components/CitizenDashboard').then(m => ({ default: m.CitizenDashboard }))),
};
