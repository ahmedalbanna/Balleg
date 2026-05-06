import React, { ReactNode } from 'react';
import { usePermissions } from '../hooks/usePermissions';
import { Permission } from '../utils/rbac';

interface RequirePermissionProps {
  permission: Permission;
  children: ReactNode;
  fallback?: ReactNode;
  disableInsteadOfHide?: boolean;
}

export function RequirePermission({ 
  permission, 
  children, 
  fallback = null,
  disableInsteadOfHide = false
}: RequirePermissionProps) {
  const { hasPermission } = usePermissions();
  const allowed = hasPermission(permission);

  if (allowed) {
    return <>{children}</>;
  }

  if (disableInsteadOfHide && React.isValidElement(children)) {
    // Clone the element and inject disabled and title props
    return React.cloneElement(children as React.ReactElement<any>, {
      disabled: true,
      title: "لا تملك الصلاحية الحقيقية لتنفيذ هذا الإجراء",
      className: `${children.props.className || ''} opacity-50 cursor-not-allowed grayscale pointer-events-none`.trim(),
      onClick: undefined,
    });
  }

  return <>{fallback}</>;
}
