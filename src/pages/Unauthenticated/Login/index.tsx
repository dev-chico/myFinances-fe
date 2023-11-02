import { useState, FormEvent } from "react";
import { FaDollarSign } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FormGroup } from "../../../components/FormGroup";
import styles from "./login.module.css";
import { useAuth } from "../../../contexts/AuthContext";

export function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!email || !password) {
      alert("Informe os dados corretamente");
    }

    login(email, password);
  }

  return (
    <div className={styles.container}>
      <header>
        <h1>
          <FaDollarSign />
          MyFinances
        </h1>
      </header>

      <form onSubmit={handleSubmit}>
        <FormGroup
          label="E-mail"
          type="email"
          placeholder="example@mail.com"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <FormGroup
          label="Senha"
          type="password"
          placeholder="***********"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className={styles.btnSubmit}>
          Entrar
        </button>

        <footer>
          <span>
            Não possui uma conta? <Link to="/register">Cadastre-se</Link>
          </span>
        </footer>
      </form>
    </div>
  );
}
