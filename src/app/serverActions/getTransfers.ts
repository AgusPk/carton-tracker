'use server'

export async function getTransfers(email: string, direction: 'lent' | 'borrowed') {
  console.log('Fetching transfers for email:', email, 'direction:', direction);
  const queryParams = direction === 'lent' ? `from=${email}` : `to=${email}`;
  const response = await fetch(`${process.env.BASE_URL}/api/transfers?${queryParams}`);
  const data = await response.json();
  console.log('Transfers response:', data);
  return data;
}
