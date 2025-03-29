import { Transfer } from "@/types/types";
import styles from "./styles.module.css";

interface Props {
  transfer: Transfer;
  onClose: () => void;
}

export default function TransferModal({ transfer, onClose }: Props) {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <div className={styles.transferDetails}>
          <h2>{transfer.cardName}</h2>
          <div className={styles.imageContainer}>
            <img src={transfer.cardImage} alt={transfer.cardName} className={styles.cardImage} />
          </div>
          <div className={styles.infoContainer}>
            <p><strong>Cantidad:</strong> {transfer.amount}</p>
            <p><strong>De:</strong> {transfer.from}</p>
            <p><strong>Para:</strong> {transfer.to}</p>
            <p><strong>Fecha:</strong> {new Date(transfer.date).toLocaleDateString()}</p>
            {transfer.comment && (
              <div className={styles.commentSection}>
                <h3>Comentario:</h3>
                <p>{transfer.comment}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 