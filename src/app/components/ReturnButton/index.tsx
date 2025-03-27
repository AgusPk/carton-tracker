'use client';

import { useState } from 'react';
import styles from './styles.module.css';
import Button from '../Button';

interface Props {
  transferId: string;
  onReturn: (transferId: string) => Promise<void>;
}

export default function ReturnButton({ transferId, onReturn }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await onReturn(transferId);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      className={styles.returnButton}
      onClick={handleClick}
      disabled={isLoading}
      type="button"
      variant="primary"
      isLoading={isLoading}
    >
      Devolver
    </Button>
  );
} 