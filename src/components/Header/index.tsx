import { FaDollarSign, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./header.module.css";

export function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className={styles.container}>
      <h2>
        <FaDollarSign /> MyFinances
      </h2>

      <nav className={styles.links}>
        <Link to="/">Home</Link>
        <Link to="/profile">Perfil</Link>
        <button onClick={handleLogout} className={styles.logout}>
          <FaSignOutAlt />
        </button>
      </nav>
    </header>
  );
}
