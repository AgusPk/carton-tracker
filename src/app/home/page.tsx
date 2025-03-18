import CardList from "@/app/components/CardList";
import { Transfer } from "@/types/types";

export default async function Owned() {
  const response = await fetch(`http:localhost:3000/api/transfers?from=martin.callegari94@gmail.com`);
  const transfers: Transfer[] = await (response.json());

	return (
    <div>
      <input type="text" placeholder="Buscar carta por nombre" />
      <div>
        <h1>Mis prestamos</h1>
				{transfers.map((transfer) =>
					<div key={transfer._id}>
						<h3>
							{transfer.to}
						</h3>
						{/* <CardList cards={transfer.cards} /> */}
					</div>)
				}
      </div>
    </div>
  )
}
