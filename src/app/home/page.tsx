import Link from "next/link";

import { getTransfers } from "./actions";
import { Transfer } from "@/types/types";
import Card from "../components/Card";
import ReturnButton from "../components/ReturnButton";

import styles from "./styles.module.css";

export const dynamic = 'force-dynamic';

export default async function Home() {
	const transfers = await getTransfers('martin.callegari94@gmail.com') as Transfer[];

	const transfersByUser = transfers.reduce((acc: Record<string, Transfer[]>, transfer: Transfer) => {
		acc[transfer.to] = acc[transfer.to] || [];
		acc[transfer.to].push(transfer);
		return acc;
	}, {} as Record<string, Transfer[]>);

	return (
		<>
			<h1 className={styles.title}>Mis prestamos</h1>
			{transfers?.length ? Object.entries(transfersByUser).map(([user, transfers]: [string, Transfer[]]) => (
				<div key={user} className={styles.transferContainer}>
					<h3 className={styles.userName}>{user}</h3>
					<div className={styles.cardList}>
						{transfers.map((transfer: Transfer, index: number) => (
							<Card key={index} card={transfer} cardType="transfer">
								<div className={styles.transferInfo}>
									<ReturnButton transferId={transfer._id} />
									<p className={styles.amount}>{transfer.amount}</p>
								</div>
							</Card>
						))}
					</div>
				</div>
				)) :
				<>
					<span>No tenes prestamos</span>
					<Link className={styles.link} href="/home/new">Crea un nuevo prestamo</Link>
				</>
			}
		</>
	)
}
