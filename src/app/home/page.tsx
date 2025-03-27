import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";

import { getTransfers } from "@/app/serverActions/getTransfers";
import HomeClient from "./HomeClient";

export default async function Home() {
	const session = await getSession();
	const user = session?.user as { email: string } | undefined;

	if (!user?.email) {
		redirect('/api/auth/login');
	}

	const lentTransfers = await getTransfers(user.email, 'lent');
	const borrowedTransfers = await getTransfers(user.email, 'borrowed');

	return (
		<HomeClient
			initialLentTransfers={lentTransfers} 
			initialBorrowedTransfers={borrowedTransfers}
			user={user}
		/>
	);
}
