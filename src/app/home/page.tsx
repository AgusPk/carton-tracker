import Image from "next/image";

import { getTransfers } from "./actions";
import { Transfer } from "@/types/types";

export const dynamic = 'force-dynamic';

export default async function Home() {
	const transfers: Transfer[] = await getTransfers('martin.callegari94@gmail.com');

	const transferOrderByTo = transfers.reduce((acc, transfer) => {
		acc[transfer.to] = [...(acc[transfer.to] || []), transfer];
		return acc;
	}, {} as Record<string, Transfer[]>);

	return (
		<div>
			{/* <input type="text" placeholder="Buscar carta por nombre" /> */}
			<div>
				<h1>Mis prestamos</h1>
				{transfers?.length ? Object.keys(transferOrderByTo).map((key) =>
					<div key={key}>
						<h3>
							{key}
						</h3>
						{transferOrderByTo[key].map((transfer, index) => (
							<div key={index}>
								{transfer.cardName}
								{transfer.cardImage &&
									<Image src={transfer.cardImage} alt={transfer.cardName} width={100} height={100} />
									}
								<p>{transfer.amount}</p>
							</div>
						))}
					</div>)
					:
					<span>No tenes prestamos</span>
				}
    	</div>
		</div>
	)
}
