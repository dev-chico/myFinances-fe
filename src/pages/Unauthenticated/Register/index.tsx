import { useState, FormEvent, useEffect } from "react";
import { FaDollarSign } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FormGroup } from "../../../components/FormGroup";
import { api } from "../../../services/api";
import styles from "./register.module.css";

interface IInvestment {
  id: string;
  investmenttype: string;
  rescue_time: number;
  yield: string;
}

export function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [document, setDocument] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [investmentId, setInvestmentId] = useState<string>("");
  const [investmentsList, setInvestmentsList] = useState<IInvestment[]>([]);

  useEffect(() => {
    api
      .get("/investments")
      .then((res) => {
        setInvestmentsList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!email || !password || !name || !document || !investmentId) {
      alert("Informe os dados corretamente");
      return;
    }

    const result = await api.post("/users", {
      name,
      document,
      email,
      password,
      investmentId,
    });

    if (result.status === 200) {
      navigate("/");
    } else {
      alert("Erro ao cadastrar o usuário");
    }
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
          label="Nome"
          type="name"
          placeholder="Jhon Doe"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <FormGroup
          label="CPF"
          type="text"
          placeholder="999.999.999.-99"
          id="cpf"
          value={document}
          onChange={(e) => setDocument(e.target.value)}
        />

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

        <div className={styles.formGroup}>
          <label htmlFor="investment">Tipo de investimento</label>
          <select
            id="investment"
            onChange={(e) => setInvestmentId(e.target.value)}
          >
            <option value="">Selecionar</option>
            {investmentsList.map((i: IInvestment) => (
              <option key={i.id} value={i.id}>
                {i.investmenttype}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className={styles.btnSubmit}>
          Cadastrar
        </button>

        <footer>
          <span>
            Já possui uma conta? <Link to="/">Entrar</Link>
          </span>
        </footer>
      </form>
    </div>
  );
}
