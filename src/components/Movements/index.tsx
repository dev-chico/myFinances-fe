import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./movements.module.css";

export function Movements() {
  const { movementsList, loadMovements } = useAuth();

  useEffect(() => {
    loadMovements();
  }, []);

  return (
    <div className={styles.movements}>
      <header>
        <span>Tipo</span>
        <span>Data</span>
        <span>Valor (R$)</span>
      </header>

      <main>
        {movementsList.length > 0 ? (
          movementsList.reverse().map((m) => (
            <div
              key={m.id}
              className={`${styles.item} ${
                m.movementtype === "deposit" ? styles.green : styles.red
              }`}
            >
              <span>
                {m.movementtype === "deposit" ? "Depósito" : "Retirada"}
              </span>
              <span>{m.movementdate}</span>
              <span>R${m.movementvalue}</span>
            </div>
          ))
        ) : (
          <h3 className={styles.noData}>Sem histórico de movimentações.</h3>
        )}
      </main>
    </div>
  );
}
