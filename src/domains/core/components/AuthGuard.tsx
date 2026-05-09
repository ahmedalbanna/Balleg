import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useRole } from '../context/RoleContext';
import { Loader2 } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
  requireRole?: string[];
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children, requireRole }) => {
  const { user, profile, loading } = useAuth();
  const { currentRole } = useRole();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Determine the effective role for checking permissions
  // 1. If it's an admin, they can switch roles for preview purposes
  // 2. If it's an anonymous user, they are guests (citizen by default)
  // 3. Otherwise, use the assigned profile role
  const effectiveRole = profile?.role === 'admin' ? currentRole?.slug : (user.isAnonymous ? 'citizen' : profile?.role);

  if (requireRole && effectiveRole && !requireRole.includes(effectiveRole)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
