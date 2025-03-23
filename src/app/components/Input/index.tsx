import styles from "./styles.module.css";

type Props = {
	label?: string;
	value: string;
	onChange: (value: string) => void;
	id: string;
	placeholder?: string;
}

export default function Input({ label, value, onChange, id, placeholder }: Props) {
  return (
    <div>
			{label && <label htmlFor={id}>{label}</label>}
      <input
				id={id}
				type="text"
				placeholder={placeholder}
				className={styles.input}
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
    </div>
  )
}
