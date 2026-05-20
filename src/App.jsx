import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { FormDebt } from './components/FormDebt'
import { DebtList } from './components/DebtList'

function App() {

  const [debts, setDebts] = useState([]);

  const saveDebt = (newDebt) => {
    setDebts([...debts, newDebt]);
  }

  return (
    <> 
      <FormDebt onSaveDebt={saveDebt}/>

      <div>
        <h1>Deudas</h1>
        <DebtList allDebts={debts}/>
      </div>
    </>
  )
}

export default App
