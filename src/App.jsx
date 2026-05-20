import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { FormDebt } from './components/FormDebt'

function App() {

  const [debts, setDebts] = useState([]);

  const saveDebt = (newDebt) => {
    setDebts([...debts, newDebt]);
  }

  return (
    <>
      <FormDebt onSaveDebt={saveDebt}/>
      <h1>
        Golas
      </h1>
      <div>
        {debts.map((element, index) => (
          <p key={index}>Cantidad: {element.amount_per_month}</p>
        ))}
      </div>
    </>
  )
}

export default App
