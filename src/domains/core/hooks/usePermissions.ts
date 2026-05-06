import { useAuth } from '../context/AuthContext';
import { checkPermission, Permission } from '../utils/rbac';
import { useMemo } from 'react';

export function usePermissions() {
  const { profile } = useAuth();

  const permissions = useMemo(() => {
    return {
      hasPermission: (permission: Permission) => {
        return checkPermission(profile?.role, permission);
      },
      isGuestMode: false, // We'll handle this in Layout, but we can expose it here if needed
      realRole: profile?.role,
    };
  }, [profile]);

  return permissions;
}
