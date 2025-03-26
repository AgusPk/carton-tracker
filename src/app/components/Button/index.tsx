import styles from './styles.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link';
type ButtonSize = 'small' | 'large';
type ButtonType = 'button' | 'submit' | 'reset';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: ButtonType;
  isLoading?: boolean;
}

export default function Button(
  { className, variant = 'primary', size, type = 'button', isLoading, children, ...props }: Props,
) {
  const buttonClasses = [
    styles.button,
    styles[variant],
    size && styles[size],
    isLoading && styles.loading,
    className,
    ]
      .filter(Boolean)
      .join(' ');

  return (
    <button className={buttonClasses} type={type} disabled={isLoading} {...props}>
      {isLoading && <span className={styles.spinner} />}
      {children}
    </button>
  );
}
