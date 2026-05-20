import { DebtCard } from "./DebtCard"

export function DebtList ({ allDebts }) {
  return (
    <>
        <h2>Listado</h2>
        {/* Usamos un div en lugar de un ul/li para que sea más fácil darle estilos de tarjeta después */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {allDebts.map((debt, index) => (
                // Mandamos a llamar al componente como etiqueta JSX
                <DebtCard key={index} debt={debt} />
            ))}
        </div>
    </>
  )
}