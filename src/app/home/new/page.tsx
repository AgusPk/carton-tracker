"use client"

import { useState, useEffect } from "react"
import type { Card as CardAPI } from "pokemon-tcg-sdk-typescript/dist/sdk"
import { useUser } from "@auth0/nextjs-auth0/client"
import { toast } from "react-toastify"

import CardSearch from "@/app/components/CardSearch"
import type { CardCount } from "@/types/types"
import { createTransfer } from "./actions"
import Select from "@/app/components/Select"
import CardListMin from "@/app/components/CardListMin"
import Button from "@/app/components/Button"

import styles from "./styles.module.css"

interface User {
  email: string
  name: string
  picture?: string
}

type TransferDirection = "to" | "from"

export default function NewTransfer() {
  const { user } = useUser()
  const [cardCounter, setCardCounter] = useState<Record<string, CardCount>>({})
  const [selectedUser, setSelectedUser] = useState("")
  const [createLoading, setCreateLoading] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  const [loadingUsers, setLoadingUsers] = useState(true)
  const [direction, setDirection] = useState<TransferDirection>("to")

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users")
        if (response.ok) {
          const data = await response.json()
          const filteredUsers = data.filter((u: User) => u.email !== user?.email)
          setUsers(filteredUsers)
        }
      } catch (error) {
        console.error("Error fetching users:", error)
        toast.error("Error al cargar usuarios")
      } finally {
        setLoadingUsers(false)
      }
    }

    if (user?.email) {
      fetchUsers()
    }
  }, [user?.email])

  const onCounterChange = (card: CardAPI, newCount: number) => {
    if (newCount === 0) {
      const newCardCounter = { ...cardCounter }
      delete newCardCounter[card.id]
      setCardCounter(newCardCounter)
    } else {
      setCardCounter({
        ...cardCounter,
        [card.id]: { ...card, count: newCount, comment: cardCounter[card.id]?.comment }
      })
    }
  }

  const onCommentChange = (card: CardAPI, comment: string) => {
    if (card.id in cardCounter) {
      setCardCounter({
        ...cardCounter,
        [card.id]: { ...cardCounter[card.id], comment }
      })
    }
  }

  const handleSubmit = async () => {
    if (!selectedUser || Object.keys(cardCounter).length === 0) {
      toast.error("Por favor selecciona un usuario y al menos una carta")
      return
    }

    setCreateLoading(true)
    try {
      const success = await createTransfer(
        direction === "to" ? user?.email || "" : selectedUser,
        direction === "to" ? selectedUser : user?.email || "",
        cardCounter
      )

      if (success) {
        toast.success("Prestamo creado exitosamente")
        setCardCounter({})
        setSelectedUser("")
      } else {
        toast.error("Error al crear el prestamo")
      }
    } catch (error) {
      console.error("Error creating transfer:", error)
      toast.error("Error al crear el prestamo")
    } finally {
      setCreateLoading(false)
    }
  }

  return (
    <>
      <h1 className={styles.title}>Nuevo prestamo</h1>
      <div className={styles.newTransferContainer}>
        <div className={styles.newTransferForm}>
          <div className={styles.directionSelector}>
            <Button
              type="button"
              onClick={() => setDirection("to")}
              className={`${styles.directionButton} ${direction === "to" ? styles.selected : ""}`}
            >
              Presto a
            </Button>
            <Button
              type="button"
              onClick={() => setDirection("from")}
              className={`${styles.directionButton} ${direction === "from" ? styles.selected : ""}`}
            >
              Me prestan
            </Button>
          </div>
          <Select
            placeholder={direction === "to" ? "A quien le prestas?" : "Quien te presta?"}
            value={selectedUser}
            onChange={setSelectedUser}
            options={users.map((user) => ({
              value: user.email,
              label: user.name,
              icon: user.picture,
            }))}
            isLoading={loadingUsers}
            className={styles.nameInput}
          />
          <Button type="button" onClick={handleSubmit} isLoading={createLoading} disabled={!selectedUser || Object.keys(cardCounter).length === 0}>
            Confirmar
          </Button>
        </div>
        <div className={styles.cardListContainer}>
          <div>
            <h3 className={styles.sectionTitle}>Cartas seleccionadas</h3>
            <CardListMin cardCounter={cardCounter} removeCard={(card) => onCounterChange(card, 0)} />
          </div>
          <div className={styles.cardSearchSection}>
            <CardSearch 
              cardCounter={cardCounter} 
              handleCounterChange={onCounterChange}
              handleCommentChange={onCommentChange}
            />
          </div>
        </div>
      </div>
    </>
  )
}

