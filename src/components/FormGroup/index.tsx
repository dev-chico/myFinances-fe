import { InputHTMLAttributes } from "react";
import styles from "./formGroup.module.css";

interface IFormGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function FormGroup({ label, ...props }: IFormGroupProps) {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={props.type}>{label}</label>
      <input {...props} />
    </div>
  );
}
