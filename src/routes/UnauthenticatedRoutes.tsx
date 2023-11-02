import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { PageLoading } from "../components/PageLoading";

const Login = lazy(() =>
  import("../pages/Unauthenticated/Login").then(({ Login }) => ({
    default: Login,
  }))
);

const Register = lazy(() =>
  import("../pages/Unauthenticated/Register").then(({ Register }) => ({
    default: Register,
  }))
);

export const UnauthenticatedRoutes: React.FC = () => {
  return (
    <Suspense fallback={<PageLoading />}>
      <Routes>
        <Route path={"/"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Suspense>
  );
};
