export type Permission =
  // Reports
  | 'report:create'
  | 'report:read_own'
  | 'report:read_department'
  | 'report:read_all'
  | 'report:update_status_operator'
  | 'report:update_status_specialist'
  | 'report:update_status_verifier'
  | 'report:update_status_official'
  | 'report:update_status_manager'
  | 'report:delete'
  | 'report:reassign'
  
  // Users
  | 'user:read_own'
  | 'user:read_all'
  | 'user:update_own'
  | 'user:update_all'
  
  // Clarifications
  | 'clarification:create'
  | 'clarification:respond'
  
  // Audit Logs
  | 'audit:read_all';

export const RolePermissions: Record<string, Permission[]> = {
  citizen: ['report:create', 'report:read_own', 'user:read_own', 'user:update_own'],
  merchant: ['report:create', 'report:read_own', 'user:read_own', 'user:update_own'],
  driver: ['report:create', 'report:read_own', 'user:read_own', 'user:update_own'],
  displaced: ['report:create', 'report:read_own', 'user:read_own', 'user:update_own'],

  // Admin & Management
  admin: [
    'report:read_all', 'report:delete', 'report:reassign', 'report:update_status_manager',
    'user:read_all', 'user:update_all', 'audit:read_all', 'clarification:respond'
  ],
  developer: [
    'report:read_all', 'report:delete',
    'user:read_all', 'user:update_all', 'audit:read_all'
  ],
  manager: [
    'report:read_department', 'report:update_status_manager', 'report:reassign',
    'user:read_all', 'clarification:respond'
  ],

  // Operations
  operator: [
    'report:read_all', 'report:update_status_operator', 'report:reassign',
    'user:read_all', 'clarification:respond'
  ],
  specialist: [
    'report:read_department', 'report:update_status_specialist',
    'user:read_all'
  ],
  verifier: [
    'report:read_all', 'report:update_status_verifier',
    'user:read_all'
  ],
  official: [
    'report:read_department', 'report:update_status_official',
    'user:read_all', 'clarification:respond'
  ],

  // External / Third-party
  contractor: ['report:read_own', 'user:read_own'],
  handyman: ['report:read_own', 'user:read_own'],
  telecom: ['report:read_own', 'user:read_own'],
  
  // Oversight & NGOs
  humanitarian: ['report:read_all', 'user:read_all'],
  council: ['report:read_all', 'user:read_all', 'clarification:create'],
  journalist: ['report:read_all', 'user:read_all', 'clarification:create'],
  neighborhood_council: ['report:read_all', 'user:read_all', 'clarification:create'],
  donor: ['report:read_all', 'user:read_all'],
};

export function checkPermission(userRoleSlug: string | undefined | null, permission: Permission): boolean {
  if (!userRoleSlug) return false;
  const perms = RolePermissions[userRoleSlug] || [];
  return perms.includes(permission);
}
