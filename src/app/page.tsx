'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import { PokemonCard, PokemonAPIResponse } from '@/types/types';

const teamMembers = ['Figo', 'Gas', 'Tincho', 'Pk'];

export default function Home() {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [view, setView] = useState<'lent' | 'borrowed'>('lent');
  const [cards, setCards] = useState<PokemonCard[]>([]);

  useEffect(() => {
    async function fetchCards() {
      try {
        const response = await fetch('https://api.pokemontcg.io/v2/cards');
        const data = await response.json();
        const mappedCards = data.data.slice(0, 10).map((card: PokemonAPIResponse) => ({
          id: card.id,
          name: card.name,
          imageUrl: card.images.small,
          owner: teamMembers[Math.floor(Math.random() * teamMembers.length)], // Asignar dueño aleatorio
          holder: teamMembers[Math.floor(Math.random() * teamMembers.length)], // Asignar poseedor aleatorio
        }));
        setCards(mappedCards);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    }
    fetchCards();
  }, []);

  const filteredCards = cards.filter((card) =>
      view === 'lent' ? card.owner === selectedMember : card.holder === selectedMember
  );

  return (
      <div className={styles.page}>
        {!selectedMember ? (
            <main className={styles.main}>
              <h1>Pokémon Card Tracker</h1>
              <div className={styles.grid}>
                {teamMembers.map((member) => (
                    <div key={member} className={styles.card} onClick={() => setSelectedMember(member)}>
                      <Image src={`https://ui-avatars.com/api/?name=${member}&size=100`} alt={member} width={100} height={100} />
                      <h3>{member}</h3>
                    </div>
                ))}
              </div>
            </main>
        ) : (
            <main className={styles.main}>
              <h2>{selectedMember}'s Profile</h2>
              <div className={styles.buttons}>
                <button
                    className={view === 'lent' ? styles.activeButton : ''}
                    onClick={() => setView('lent')}
                >
                  Lent
                </button>
                <button
                    className={view === 'borrowed' ? styles.activeButton : ''}
                    onClick={() => setView('borrowed')}
                >
                  Borrowed
                </button>
              </div>
              <h3>{view === 'lent' ? 'Cards Lent' : 'Cards Borrowed'}</h3>
              <div className={styles.gallery}>
                {filteredCards.length > 0 ? (
                    filteredCards.map((card) => (
                        <div key={card.id} className={styles.card}>
                          <h3 style={{ marginBottom: '10px' }}>{card.name}</h3>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Image src={card.imageUrl} alt={card.name} width={150} height={200} />
                            <p>Owner: Dios</p>
                          </div>
                        </div>
                    ))
                ) : (
                    <p>No cards found.</p>
                )}
              </div>
              <button onClick={() => setSelectedMember(null)}>Back</button>
            </main>
        )}
      </div>
  );
}
