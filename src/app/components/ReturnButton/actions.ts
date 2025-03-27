'use server';

export async function returnTransfer(cardId: string) {
  const response = await fetch(`${process.env.BASE_URL}/api/transfers/${cardId}`, {
    method: 'DELETE',
  });

	return response.json();
}

