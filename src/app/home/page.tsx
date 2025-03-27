'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { toast } from "react-toastify";

import { getTransfers, returnTransfer } from "./actions";
import { Transfer } from "@/types/types";
import Card from "../components/Card";
import ReturnButton from "../components/ReturnButton";
import Button from "../components/Button";

import styles from "./styles.module.css";

type Tab = 'lent' | 'borrowed';

export default function Home() {
	const { user } = useUser();
	const [activeTab, setActiveTab] = useState<Tab>('lent');
	const [transfers, setTransfers] = useState<Transfer[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchTransfers = async () => {
			if (user?.email) {
				const data = await getTransfers(user.email, activeTab);
				setTransfers(data);
			}
			setLoading(false);
		};

		fetchTransfers();
	}, [user?.email, activeTab]);

	const handleReturn = async (transferId: string) => {
		try {
			console.log('Attempting to return transfer:', transferId);
			const toastId = toast.loading('Devolviendo prestamo...');
			await returnTransfer(transferId);
			setTransfers(prevTransfers => prevTransfers.filter(t => t._id !== transferId));
			toast.dismiss(toastId);
			toast.success('Prestamo devuelto correctamente');
		} catch (error) {
			console.error('Error returning transfer:', error);
			toast.error('Error al devolver el prestamo');
		}
	};

	const transfersByUser = (transfers: Transfer[]) => {
		return transfers.reduce((acc: Record<string, Transfer[]>, transfer: Transfer) => {
			const key = activeTab === 'lent' ? transfer.to : transfer.from;
			acc[key] = acc[key] || [];
			acc[key].push(transfer);
			return acc;
		}, {} as Record<string, Transfer[]>);
	};

	const groupedTransfers = transfersByUser(transfers);

	if (loading) {
		return <div className={styles.loading}>Loading...</div>;
	}

	return (
		<>
			<h1 className={styles.title}>Mis prestamos</h1>
			<div className={styles.tabContainer}>
				<Button 
					type="button"
					onClick={() => setActiveTab('lent')}
					className={`${styles.tabButton} ${activeTab === 'lent' ? styles.selected : ''}`}
				>
					Prestados
				</Button>
				<Button 
					type="button"
					onClick={() => setActiveTab('borrowed')}
					className={`${styles.tabButton} ${activeTab === 'borrowed' ? styles.selected : ''}`}
				>
					Prestados a mi
				</Button>
			</div>
			{transfers.length > 0 ? (
				Object.entries(groupedTransfers).map(([user, transfers]) => (
					<div key={user} className={styles.transferContainer}>
						<h3 className={styles.userName}>{user}</h3>
						<div className={styles.cardList}>
							{transfers.map((transfer: Transfer, index: number) => (
								<Card key={index} card={transfer} cardType="transfer">
									<div className={styles.transferInfo}>
										<ReturnButton transferId={transfer._id} onReturn={handleReturn} />
										<p className={styles.amount}>{transfer.amount}</p>
									</div>
								</Card>
							))}
						</div>
					</div>
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
