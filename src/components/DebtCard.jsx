
export function DebtCard({debt}) {
  return (
    <>  
        <div style={{ border: '8px dotted #3B8CA4' }}>
            <p>{debt.amount}</p>
            <p>{debt.name}</p>
            <p>{debt.pay_method}</p>
        </div>

    </>
  )
}
