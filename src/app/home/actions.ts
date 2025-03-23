'use server'

export async function getTransfers(email: string) {
  const response = await fetch(`${process.env.BASE_URL}/api/transfers?from=${email}`);
  return response.json();
}
