import { useState, useRef, useEffect } from "react";
import Image from "next/image";

import styles from "./styles.module.css";

interface Option {
  value: string;
  label: string;
  icon?: string;
}

type Props = {
  id?: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  options: Option[];
  isLoading?: boolean;
}

export default function Select({ 
  label, 
  value, 
  onChange, 
  id, 
  placeholder, 
  className, 
  options,
  isLoading = false 
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(option => option.value === value);

  return (
    <div className={styles.selectWrapper}>
      {label && <label htmlFor={id}>{label}</label>}
      <div className={styles.selectContainer} ref={selectRef}>
        <div 
          className={`${styles.select} ${className} ${isOpen ? styles.open : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isLoading ? (
            <div className={styles.spinner} />
          ) : selectedOption ? (
            <>
              {selectedOption.icon && (
                <Image 
                  src={selectedOption.icon} 
                  alt={selectedOption.label} 
                  width={20} 
                  height={20} 
                  className={styles.optionIcon}
                />
              )}
              <span>{selectedOption.label}</span>
            </>
          ) : (
            <span className={styles.placeholder}>{placeholder}</span>
          )}
        </div>
        {isOpen && (
          <div className={styles.optionsContainer}>
            {options.map((option) => (
              <div
                key={option.value}
                className={`${styles.option} ${option.value === value ? styles.selected : ''}`}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.icon && (
                  <Image 
                    src={option.icon} 
                    alt={option.label} 
                    width={20} 
                    height={20} 
                    className={styles.optionIcon}
                  />
                )}
                <span>{option.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 