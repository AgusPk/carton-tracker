import CardList from "@/app/components/CardList";
import { Transfer } from "@/types/types";

export const dynamic = 'force-dynamic';

export default async function Home() {
	const response = await fetch(`http:localhost:3000/api/transfers?${new URLSearchParams({ from: "" })}`);
	if (!response) return <></>;

	const transfers: Transfer[] = await (response.json());

	return (
    <div>
      <input type="text" placeholder="Buscar carta por nombre" />
      <div>
        <h1>Mis prestamos</h1>
				{transfers?.length ? transfers.map((transfer) =>
					<div key={transfer._id}>
						<h3>
							{transfer.to}
						</h3>
						{/* <CardList cards={transfer.cards} /> */}
					</div>)
					: <span>No tenes prestamos</span>
				}
      </div>
    </div>
  )
}
