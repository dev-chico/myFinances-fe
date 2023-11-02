import { useEffect, useState } from "react";
import { Modal } from "../../../components/Modal";
import { useAuth } from "../../../contexts/AuthContext";
import { FormGroup } from "../../../components/FormGroup";
import { api } from "../../../services/api";
import { AiFillCloseCircle } from "react-icons/ai";
import styles from "./profile.module.css";

export function Profile() {
  const { user, userToken, updateUser, logout } = useAuth();
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
  const [isVisibleModalDelete, setIsVisibleModalDelete] =
    useState<boolean>(false);
  const [name, setName] = useState<string>(user?.name || "");
  const [document, setDocument] = useState<string>(user?.document || "");
  const [email, setEmail] = useState<string>(user?.email || "");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {}, []);

  async function handleEdit() {
    if (!email || !password || !name || !document) {
      alert("Informe os dados corretamente");
      return;
    }

    api
      .put(
        `/users/${user?.id}`,
        {
          name,
          document,
          email,
          password,
        },
        {
          headers: {
            Authorization: userToken,
          },
        }
      )
      .then((res) => {
        alert("Dados alterados com sucesso!");
        console.log(res.data);
        updateUser(res.data);
        setIsVisibleModal(false);
      })
      .catch((err) => {
        console.log("ERROR: ", err);
        alert("Erro ao alterar os dados!");
      });
  }

  async function handleDelete() {
    api
      .delete(`/users/${user?.id}`, {
        headers: {
          Authorization: userToken,
        },
      })
      .then(() => {
        logout();
      })
      .catch((err) => {
        console.log("ERRO: ", err);
        alert("Erro ao deletar sua conta.");
      });
  }

  return (
    <div className={styles.container}>
      <h1>Perfil</h1>

      <main>
        <div className={styles.info}>
          <h4>Nome:</h4> <span>{user?.name}</span>
        </div>

        <div className={styles.info}>
          <h4>Email:</h4> <span>{user?.email}</span>
        </div>

        <div className={styles.info}>
          <h4>CPF:</h4> <span>{user?.document}</span>
        </div>

        <div className={styles.info}>
          <h4>Conta:</h4> <span>{user?.account.numero}</span>
        </div>

        <div className={styles.info}>
          <h4>Saldo:</h4> <span>R${user?.account.saldo}</span>
        </div>
      </main>

      <footer>
        <button
          className={styles.btnEdit}
          onClick={() => setIsVisibleModal(true)}
        >
          Editar dados
        </button>
        <button
          className={styles.btnDelete}
          onClick={() => setIsVisibleModalDelete(true)}
        >
          Deletar conta
        </button>
      </footer>

      <Modal
        cancelLabel="Cancelar"
        confirmLabel="Editar"
        visible={isVisibleModal}
        onCancel={() => setIsVisibleModal(false)}
        onConfirm={handleEdit}
        title="Editar dados"
      >
        <form className={styles.formEdit}>
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
        </form>
      </Modal>

      <Modal
        cancelLabel="Cancelar"
        confirmLabel="Deletar"
        visible={isVisibleModalDelete}
        onCancel={() => setIsVisibleModalDelete(false)}
        onConfirm={handleDelete}
        title=""
      >
        <div className={styles.modalDelete}>
          <AiFillCloseCircle color="var(--red)" size={56} />
          <h3>Você tem certeza que deseja deletar sua conta?</h3>
        </div>
      </Modal>
    </div>
  );
}
