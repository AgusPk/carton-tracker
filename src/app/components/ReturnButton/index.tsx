'use client';

import { useState } from 'react';
import styles from './styles.module.css';

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
    <button 
      className={styles.returnButton}
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <span className={styles.spinner} />
          <span>Devolviendo...</span>
        </>
      ) : (
        'Devolver'
      )}
    </button>
  );
} 