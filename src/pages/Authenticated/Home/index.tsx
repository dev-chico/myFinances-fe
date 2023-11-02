import { useState } from "react";
import { Movements } from "../../../components/Movements";
import { useAuth } from "../../../contexts/AuthContext";
import { Modal } from "../../../components/Modal";
import { InputCurrency } from "../../../components/InputCurrency";
import { api } from "../../../services/api";
import styles from "./home.module.css";

export function Home() {
  const { user, updateUser, loadUserData, loadMovements } = useAuth();
  const [showModalInvest, setShowModalInvest] = useState<boolean>(false);
  const [showModalWithdraw, setShowModalWithdraw] = useState<boolean>(false);
  const [investValue, setInvestValue] = useState("");
  const [withdrawValue, setWithdrawValue] = useState("");

  function handleChangeInvestValue(val: string | number) {
    setInvestValue(`${val}`);
  }

  function handleChangeWithdrawValue(val: string | number) {
    setWithdrawValue(`${val}`);
  }

  async function handleInvest() {
    if (!investValue) {
      alert("Preencha o valor desejado");
      return;
    }

    const formatedValue = Number(user?.account.saldo) + Number(investValue);

    api
      .post("/movements/deposit", {
        accountId: user?.account.id,
        newBalance: formatedValue,
        email: user?.email,
      })
      .then((res) => {
        console.log("Res:", res);
        alert("Sucesso ao depositar!");
        updateUser(res.data.user);
        handleCloseModalInvest();
        loadUserData();
        loadMovements();
      })
      .catch((err) => {
        console.log("ERROR: ", err);
        alert("Erro ao depositar!");
      });
  }

  async function handleWithdrawl() {
    if (!withdrawValue) {
      alert("Preencha o valor desejado");
      return;
    }

    const formatedValue = Number(user?.account.saldo) - Number(withdrawValue);

    if (formatedValue < 0) {
      alert(
        `Dinheiro insuficiente, você possui: R$${user?.account.saldo} disponível para retirada`
      );
      return;
    }

    api
      .post("/movements/withdrawal", {
        accountId: user?.account.id,
        newBalance: formatedValue,
        email: user?.email,
      })
      .then((res) => {
        console.log("Res:", res);
        alert("Sucesso ao retirar!");
        updateUser(res.data.user);
        handleCloseModalWithdraw();
        loadUserData();
        loadMovements();
      })
      .catch((err) => {
        console.log("ERROR: ", err);
        alert("Erro ao retirar!");
      });
  }

  function handleCloseModalWithdraw() {
    setShowModalWithdraw(false);
    setWithdrawValue("");
  }

  function handleCloseModalInvest() {
    setShowModalInvest(false);
    setInvestValue("");
  }

  return (
    <div className={styles.container}>
      <Movements />

      <main>
        <h2>
          Saldo atual: <span>R${user?.account.saldo}</span>
        </h2>

        <div className={styles.buttonsContainer}>
          <button
            className={styles.btnInvest}
            onClick={() => setShowModalInvest(true)}
          >
            Investir
          </button>
          <button
            className={styles.btnWithdraw}
            onClick={() => setShowModalWithdraw(true)}
          >
            Retirar
          </button>
        </div>
      </main>

      <Modal
        visible={showModalInvest}
        title="Investir"
        cancelLabel="Cancelar"
        confirmLabel="Investir"
        onCancel={handleCloseModalInvest}
        onConfirm={handleInvest}
      >
        <div className={styles.formGroup}>
          <label htmlFor="invest">Qual valor você deseja investir (R$)?</label>
          <InputCurrency
            handleChange={handleChangeInvestValue}
            value={Number(investValue)}
            id="invest"
          />
        </div>
      </Modal>

      <Modal
        visible={showModalWithdraw}
        title="Retirar dinheiro"
        cancelLabel="Cancelar"
        confirmLabel="Retirar"
        onCancel={handleCloseModalWithdraw}
        onConfirm={handleWithdrawl}
      >
        <div className={styles.formGroup}>
          <label htmlFor="withdraw">Qual valor você deseja retirar (R$)?</label>
          <InputCurrency
            handleChange={handleChangeWithdrawValue}
            value={Number(withdrawValue)}
            id="withdraw"
          />
        </div>
      </Modal>
    </div>
  );
}
