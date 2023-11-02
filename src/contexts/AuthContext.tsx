import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { api } from "../services/api";

interface IAuthContextData {
  user: IUserData | null;
  userToken: string;
  signed: boolean;
  movementsList: IMovement[]
  login: (email: string, pwd: string) => void;
  logout: () => void;
  updateUser: (user: IUserData) => void;
  loadUserData: () => void;
  loadMovements: () => void;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

interface IMovement {
  id: string;
  movementtype: string;
  movementdate: string;
  movementvalue: string;
}

interface IAuthProvider {
  children: ReactNode;
}

interface IUserAccount {
  id: string;
  numero: string;
  saldo: string;
}

interface IUserData {
  id: string;
  email: string;
  name: string;
  document: string;
  account: IUserAccount;
}

export const AuthProvider = ({ children }: IAuthProvider) => {
  const storedToken = localStorage.getItem("my-finances-token");
  const storedUserString = localStorage.getItem("my-finances-user");
  const storedUser = storedUserString ? JSON.parse(storedUserString) : null;

  const [user, setUser] = useState<IUserData | null>({
    id: storedUser?.id || "",
    name: storedUser?.name || "",
    email: storedUser?.email || "",
    document: storedUser?.document || "",
    account: {
      id: storedUser?.account.id || "",
      numero: storedUser?.account.numero || "",
      saldo: storedUser?.account.saldo || "",
    },
  });
  const [userToken, setUserToken] = useState(storedToken || "");
  const [movementsList, setMovementsList] = useState<IMovement[]>([]);

  useEffect(() => {
    localStorage.setItem("my-finances-token", userToken);

    if (user?.id) {
      localStorage.setItem("my-finances-user", JSON.stringify(user));
    }
  }, [userToken, user]);

  function updateUser(user: IUserData) {
    setUser(user);
    localStorage.setItem("my-finances-user", JSON.stringify(user));
  }

  const login = (email: string, password: string) => {
    api
      .post("/login", { email, password })
      .then((res) => {
        console.log("RES: ", res.data);

        const { token, email, document, id, name, account } = res.data;
        setUserToken(token);
        setUser({ email, document, id, name, account });

        localStorage.setItem("my-finances-token", token);
        localStorage.setItem(
          "my-finances-user",
          JSON.stringify({ email, document, id, name, account, token })
        );
      })
      .catch((err) => {
        console.log("ERROR: ", err);
      });
  };

  const logout = () => {
    setUser(null);
    setUserToken("");
    localStorage.setItem("my-finances-token", "");
    localStorage.setItem("my-finances-user", "");
  };

  function loadUserData() {
    if (user?.id) {
      api
        .get(`/users/${user.id}`)
        .then((res) => {
          console.log("USER: ", res);
          setUser(res.data);
        })
        .catch((err) => {
          console.log("ERROR: ", err);
        });
    }
  }

  async function loadMovements() {
    api
      .get(`/movements/${user?.account.id}`)
      .then((res) => {
        console.log("MOVEMENTS: ", res.data);
        if (res.data) {
          setMovementsList(res.data);
        }
      })
      .catch((err) => {
        console.log("ERROR: ", err);
      });
  }

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signed: Boolean(user?.id),
        userToken,
        user,
        movementsList,
        login,
        logout,
        updateUser,
        loadUserData,
        loadMovements
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
