import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Personal from "./pages/Personal";
import Business from "./pages/Business";
import Investing from "./pages/Investing";
import Rates from "./pages/Rates";
import Support from "./pages/Support";
import OpenAccount from "./pages/OpenAccount";
import SignIn from "./pages/SignIn";
import Layout from "./components/layout/Layout";
import NotFound from "./pages/NotFound";
import ErrorPage from "./pages/ErrorPage";
import AuthProvider from "./state/auth";
import "./styles/global.css";
import AdminCases from "./pages/admin/Cases";
import AdminCaseDetail from "./pages/admin/CaseDetail";
import Portal from "./pages/portal/Portal";
import PortalCase from "./pages/portal/PortalCase";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />, // Error boundary for handling routing errors
    children: [
      { index: true, element: <Home /> },
      { path: "personal", element: <Personal /> },
      { path: "business", element: <Business /> },
      { path: "investing", element: <Investing /> },
      { path: "rates", element: <Rates /> },
      { path: "support", element: <Support /> },
      { path: "open-account", element: <OpenAccount /> },
      { path: "signin", element: <SignIn /> },
      { path: "*", element: <NotFound /> },
      { path: "admin/cases", element: <AdminCases /> },
      { path: "admin/cases/:id", element: <AdminCaseDetail /> },
      { path: "portal", element: <Portal /> },
      { path: "portal/cases/:id", element: <PortalCase /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
