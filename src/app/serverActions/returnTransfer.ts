'use server'

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
