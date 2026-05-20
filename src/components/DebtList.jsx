import { DebtCard } from "./DebtCard"

export function DebtList ({allDebts}) {
  return (
    <>
        <h2>Listado</h2>
        <ul>
            {allDebts.map((debt,index) => (
                <li key={index}>{DebtCard({debt})}</li>
            ))}
        </ul>
    </>
  )
}
