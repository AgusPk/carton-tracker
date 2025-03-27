'use client'

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Transfer } from "@/types/types";
import TransferList from "../components/TransferList";
import TabSystem from "../components/TabSystem";

import { getTransfers } from "../serverActions/getTransfers";

import styles from "./styles.module.css";

type Tab = 'lent' | 'borrowed';

type Props = {
  initialLentTransfers: Transfer[];
  initialBorrowedTransfers: Transfer[];
  user: {
    email: string;
  };
}

export default function HomeClient({ 
  initialLentTransfers, 
  initialBorrowedTransfers,
  user,
}: Props) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('lent');
  const [lentTransfers, setLentTransfers] = useState(initialLentTransfers);
  const [borrowedTransfers, setBorrowedTransfers] = useState(initialBorrowedTransfers);

  const refreshTransfers = async () => {
    if (!user?.email) return;
    const [newLentTransfers, newBorrowedTransfers] = await Promise.all([
      getTransfers(user.email, 'lent'),
      getTransfers(user.email, 'borrowed')
    ]);
    setLentTransfers(newLentTransfers);
    setBorrowedTransfers(newBorrowedTransfers);
  };

  const transfersByUser = (transfers: Transfer[]) => {
    return transfers.reduce((acc: Record<string, Transfer[]>, transfer: Transfer) => {
      const key = activeTab === 'lent' ? transfer.to : transfer.from;
      acc[key] = acc[key] || [];
      acc[key].push(transfer);
      return acc;
    }, {} as Record<string, Transfer[]>);
  };

  const currentTransfers = activeTab === 'lent' ? lentTransfers : borrowedTransfers;
  const groupedTransfers = transfersByUser(currentTransfers);

  const handleRefresh = async () => {
    await refreshTransfers();
    router.refresh();
  };

  return (
    <>
      <TabSystem activeTab={activeTab} onTabChange={setActiveTab} />
      {currentTransfers.length > 0 ? (
        Object.entries(groupedTransfers).map(([user, transfers]) => (
          <TransferList key={user} user={user} transfers={transfers} onReturn={handleRefresh} />
        ))
      ) : (
        <div className={styles.emptyState}>
          <span>No tenes prestamos {activeTab === 'lent' ? 'prestados' : 'prestados a ti'}</span>
          <Link className={styles.link} href="/home/new">Crea un nuevo prestamo</Link>
        </div>
      )}
    </>
  );
} 