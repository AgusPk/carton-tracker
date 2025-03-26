import styles from './styles.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link';
type ButtonSize = 'small' | 'large';
type ButtonType = 'button' | 'submit' | 'reset';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: ButtonType;
}

export default function Button(
  { className, variant = 'primary', size, type = 'button', children, ...props }: Props,
) {
  const buttonClasses = [
    styles.button,
    styles[variant],
    size && styles[size],
    className,
    ]
      .filter(Boolean)
      .join(' ');

  return (
    <button className={buttonClasses} type={type} {...props}>
      {children}
    </button>
  );
}
