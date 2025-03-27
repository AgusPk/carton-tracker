import { Transfer } from "@/types/types";
import Card from "../Card";
import ReturnButton from "../ReturnButton";

import styles from "./styles.module.css";
import { returnTransfer } from "@/app/serverActions/returnTransfer";
import { toast } from "react-toastify";

type Props = {
	user: string;
	transfers: Transfer[];
  onReturn: () => void;
}

export default function TransferList({
	user,
	transfers,
  onReturn,
}: Props) {

  const handleReturn = async (transferId: string) => {
    try {
      await returnTransfer(transferId);
      toast.success('Prestamo devuelto correctamente');
      onReturn();
    } catch (error) {
      console.error('Error al devolver el prestamo:', error);
    }
  };

	return (
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
	);
}