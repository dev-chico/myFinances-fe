import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { PageLoading } from "../components/PageLoading";

const Home = lazy(() =>
  import("../pages/Authenticated/Home").then(({ Home }) => ({
    default: Home,
  }))
);

const Profile = lazy(() =>
  import("../pages/Authenticated/Profile").then(({ Profile }) => ({
    default: Profile,
  }))
);

const NotFound = lazy(() =>
  import("../pages/Authenticated/NotFound").then(({ NotFound }) => ({
    default: NotFound,
  }))
);

export const AuthenticatedRoutes: React.FC = () => {
  return (
    <Suspense fallback={<PageLoading />}>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/profile"} element={<Profile />} />
        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};
