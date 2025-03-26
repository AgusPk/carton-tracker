import { ReactNode } from "react";

import styles from "./styles.module.css";

type Props = {
	id?: string;
	label?: string;
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	className?: string;
	icon?: ReactNode;
}

export default function Input({ label, value, onChange, id, placeholder, className, icon }: Props) {
  return (
    <>
			{label && <label htmlFor={id}>{label}</label>}
      <div className={styles.inputWrapper}>
        <input
				id={id}
				type="text"
				placeholder={placeholder}
				className={`${styles.input} ${className} ${icon ? styles.inputWithIcon : ""}`}
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
        {icon && <span className={styles.icon}>{icon}</span>}
      </div>
    </>
  )
}
