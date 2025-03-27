import styles from "./styles.module.css";

type Tab = 'lent' | 'borrowed';

type Props = {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export default function TabSystem({ activeTab, onTabChange }: Props) {
  return (
    <div className={styles.tabContainer}>
      <button
        type="button"
        onClick={() => onTabChange('lent')}
        className={`${styles.tabButton} ${activeTab === 'lent' ? styles.selected : ''}`}
      >
        Prestados
      </button>
      <button
        type="button"
        onClick={() => onTabChange('borrowed')}
        className={`${styles.tabButton} ${activeTab === 'borrowed' ? styles.selected : ''}`}
      >
        Prestados a mi
      </button>
    </div>
  );
} 