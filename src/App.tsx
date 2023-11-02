import { BrowserRouter } from "react-router-dom";
import { UnauthenticatedRoutes } from "./routes/UnauthenticatedRoutes";
import { AuthenticatedRoutes } from "./routes/AuthenticatedRoutes";
import { useAuth } from "./contexts/AuthContext";
import { Header } from "./components/Header";

export function App() {
  const { signed } = useAuth();

  return (
    <BrowserRouter>
      {signed ? (
        <>
          <Header />
          <AuthenticatedRoutes />
        </>
      ) : (
        <UnauthenticatedRoutes />
      )}
    </BrowserRouter>
  );
}
