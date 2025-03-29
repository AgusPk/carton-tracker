'use server'

export async function getTransfers(email: string, direction: 'lent' | 'borrowed') {
  console.log('Fetching transfers for email:', email, 'direction:', direction);
  const queryParams = direction === 'lent' ? `from=${email}` : `to=${email}`;
  const response = await fetch(`${process.env.BASE_URL}/api/transfers?${queryParams}`);
  const data = await response.json();
  console.log('Transfers response:', data);
  return data;
}

export async function returnTransfer(transferId: string) {
  try {
    console.log('Calling returnTransfer with ID:', transferId);
    const response = await fetch(`${process.env.BASE_URL}/api/transfers/${transferId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Transfer deletion failed:', errorData);
      throw new Error('Failed to return transfer');
    }

    return true;
  } catch (error) {
    console.error('Error in returnTransfer:', error);
    throw error;
  }
}
