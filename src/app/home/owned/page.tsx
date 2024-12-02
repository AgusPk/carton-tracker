import CardList from "@/app/components/CardList";

export default async function Owned() {
  // const response = await fetch("/api/transfers");
  // const transfers = response.json();

  const transfers = [
    {id:1, to:"tincho", cards:[
      "swsh4-25","swsh4-26","swsh4-23","swsh4-27","swsh4-15",
      "swsh4-2","swsh4-6","swsh4-3","swsh4-7","swsh4-18"
    ]}
  ]

  return (
    <div>
      <input type="text" placeholder="Buscar carta por nombre" />
      <div>
        <h1>Mis prestamos</h1>
          {transfers.map((transfer) =>
            <div key={transfer.id}>
              <h3>
                {transfer.to}
              </h3>
              <CardList cards={transfer.cards} />
            </div>
          )}
      </div>
    </div>
  )
}
