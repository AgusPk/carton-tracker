'use client'

import { useState, useEffect } from "react";
import { Card as CardAPI } from "pokemon-tcg-sdk-typescript/dist/sdk";
import { useUser } from "@auth0/nextjs-auth0/client";
import { toast } from "react-toastify";

import CardSearch from "@/app/components/CardSearch";
import { CardCount } from "@/types/types";
import { createTransfer } from "./actions";
import Select from "@/app/components/Select";

import styles from "./styles.module.css";
import CardListMin from "@/app/components/CardListMin";
import Button from "@/app/components/Button";

interface User {
  email: string;
  name: string;
  picture?: string;
}

type TransferDirection = 'to' | 'from';

export default function NewTransfer() {
  const { user } = useUser();
  const [cardCounter, setCardCounter] = useState<Record<string, CardCount>>({});
  const [selectedUser, setSelectedUser] = useState(''); 
  const [createLoading, setCreateLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [direction, setDirection] = useState<TransferDirection>('to');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        if (response.ok) {
          const data = await response.json();
          const filteredUsers = data.filter((u: User) => u.email !== user?.email);
          setUsers(filteredUsers);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Error al cargar usuarios');
      } finally {
        setLoadingUsers(false);
      }
    };

    if (user?.email) {
      fetchUsers();
    }
  }, [user?.email]);

  const onCounterChange = (card: CardAPI, newCount: number) => {
    if (newCount === 0) {
      const newCardCounter = { ...cardCounter };
      delete newCardCounter[card.id];
      setCardCounter(newCardCounter);
    } else {
      setCardCounter({ ...cardCounter, [card.id]: { ...card, count: newCount } });
    }
  }

  const handleSubmit = async () => {
    if (user?.email && Object.values(cardCounter).length > 0) {
      setCreateLoading(true);
      const toastId = toast.loading('Creando prestamo...');
      try {
        const from = direction === 'to' ? user.email : selectedUser;
        const to = direction === 'to' ? selectedUser : user.email;
        const response = await createTransfer(from, to, cardCounter);
        toast.dismiss(toastId);
        if (response) {
          toast.success('Prestamo creado correctamente');
        }
      } catch (error) {
        console.log({error})
        toast.dismiss(toastId);
        toast.error('Error al crear prestamo');
      } finally {
        setCreateLoading(false);
      }
    }
  }

  const hasCards = Object.values(cardCounter).length > 0;
  const isFormValid = hasCards && selectedUser && user?.email;

  return (
    <>
      <h1 className={styles.title}>Nuevo prestamo</h1>
      <div className={styles.newTransferContainer}>
        <div className={styles.newTransferForm}>
          <div className={styles.directionSelector}>
            <Button 
              type="button" 
              onClick={() => setDirection('to')}
              className={`${styles.directionButton} ${direction === 'to' ? styles.selected : ''}`}
            >
              Presto a
            </Button>
            <Button 
              type="button" 
              onClick={() => setDirection('from')}
              className={`${styles.directionButton} ${direction === 'from' ? styles.selected : ''}`}
            >
              Me prestan
            </Button>
          </div>
          <Select
            placeholder={direction === 'to' ? "A quien le prestas?" : "Quien te presta?"}
            value={selectedUser}
            onChange={setSelectedUser}
            options={users.map(user => ({
              value: user.email,
              label: user.name,
              icon: user.picture
            }))}
            isLoading={loadingUsers}
            className={styles.nameInput}
          />
          <Button 
            type="button" 
            onClick={handleSubmit} 
            isLoading={createLoading}
            disabled={!isFormValid}
          >
            Confirmar
          </Button>
        </div>
        <div className={styles.cardListContainer}>
          <CardListMin cardCounter={cardCounter} removeCard={(cardId) => onCounterChange(cardId, 0)} />
          <CardSearch cardCounter={cardCounter} handleCounterChange={onCounterChange}/>
        </div>
      </div>
    </>
  )
}
