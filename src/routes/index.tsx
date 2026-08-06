import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from '../components/layout/PublicLayout';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { SellerLayout } from '../components/layout/SellerLayout';
import { AdminLayout } from '../components/layout/AdminLayout';

import { HomePage } from '../pages/public/HomePage';
import { ServicesPage } from '../pages/public/ServicesPage';
import { TemplatesPage } from '../pages/public/TemplatesPage';
import { PortfolioPage } from '../pages/public/PortfolioPage';
import { PricingPage } from '../pages/public/PricingPage';
import { AboutPage } from '../pages/public/AboutPage';
import { ContactPage } from '../pages/public/ContactPage';
import { FAQPage } from '../pages/public/FAQPage';
import { TermsPage } from '../pages/public/TermsPage';
import { PrivacyPage } from '../pages/public/PrivacyPage';
import { RefundPolicyPage } from '../pages/public/RefundPolicyPage';
import { LicensePolicyPage } from '../pages/public/LicensePolicyPage';

import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';

import { AccountOverviewPage } from '../pages/account/OverviewPage';
import { SellerOverviewPage } from '../pages/seller/OverviewPage';
import { AdminOverviewPage } from '../pages/admin/OverviewPage';

import { AuthGuard } from '../guards/AuthGuard';
import { RoleGuard } from '../guards/RoleGuard';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/templates" element={<TemplatesPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/refund-policy" element={<RefundPolicyPage />} />
        <Route path="/license-policy" element={<LicensePolicyPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* User Dashboard */}
      <Route
        path="/account"
        element={
          <AuthGuard>
            <DashboardLayout />
          </AuthGuard>
        }
      >
        <Route index element={<AccountOverviewPage />} />
        <Route path="*" element={<Navigate to="/account" replace />} />
      </Route>

      {/* Seller Dashboard */}
      <Route
        path="/seller"
        element={
          <RoleGuard allowedRoles={['seller', 'admin', 'super_admin']}>
            <SellerLayout />
          </RoleGuard>
        }
      >
        <Route index element={<SellerOverviewPage />} />
        <Route path="*" element={<Navigate to="/seller" replace />} />
      </Route>

      {/* Admin Panel */}
      <Route
        path="/admin"
        element={
          <RoleGuard allowedRoles={['admin', 'super_admin']}>
            <AdminLayout />
          </RoleGuard>
        }
      >
        <Route index element={<AdminOverviewPage />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
