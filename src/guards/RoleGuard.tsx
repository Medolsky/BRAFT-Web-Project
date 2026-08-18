import React from 'react';
import { UserRole } from '../types';

export interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ children }) => {
  return <>{children}</>;
};

