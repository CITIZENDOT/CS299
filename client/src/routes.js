import React from "react";
import { Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import MainLayout from "./layouts/MainLayout";
import AccountView from "./views/account/AccountView";
import CustomerListView from "./views/customer/CustomerListView";
import DashboardView from "./views/reports/DashboardView";
import LoginView from "./views/auth/LoginView";
import NotFoundView from "./views/errors/NotFoundView";
import RegisterView from "./views/auth/RegisterView";
import SettingsView from "./views/settings/SettingsView";

const routes = (isAuthenticated) => [
  {
    path: "app",
    element: isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      { path: "account", element: <AccountView /> },
      { path: "customers", element: <CustomerListView /> },
      { path: "dashboard", element: <DashboardView /> },
      { path: "settings", element: <SettingsView /> },
    ],
  },
  {
    path: "/",
    element: !isAuthenticated ? (
      <MainLayout />
    ) : (
      <Navigate to="/app/dashboard" />
    ),
    children: [
      { path: "login", element: <LoginView /> },
      { path: "register", element: <RegisterView /> },
      { path: "/", element: <Navigate to="/login" /> },
    ],
  },
  {
    path: "*",
    element: <NotFoundView />,
  },
];

export default routes;
