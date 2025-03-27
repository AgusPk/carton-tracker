'use server'

export async function getTransfers(email: string) {
  console.log('Fetching transfers for email:', email); // Debug log
  const response = await fetch(`${process.env.BASE_URL}/api/transfers?from=${email}`);
  const data = await response.json();
  console.log('Transfers response:', data); // Debug log
  return data;
}

export async function returnTransfer(transferId: string) {
  try {
    console.log('Calling returnTransfer with ID:', transferId); // Debug log
    const response = await fetch(`${process.env.BASE_URL}/api/transfers/${transferId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Transfer deletion failed:', errorData); // Debug log
      throw new Error('Failed to return transfer');
    }

    return true;
  } catch (error) {
    console.error('Error in returnTransfer:', error);
    throw error;
  }
}
