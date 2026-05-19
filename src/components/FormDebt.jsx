import { useState, useEffect } from 'react'


export function FormDebt ({onSaveDebt}) {

    // Este state es para saber si es personal o externa la deuda
    const [isPersonal, setIsPersonal] = useState(false)

    const [values, setValues] = useState({
        name: "",
        phone_number: "",
        amount: "",
        pay_method: ""
    });

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handlePersonalReset = () => {
        setValues({
            ...values,
            name: '',
            phone_number: '',
        });
    };

    const handleForm = (event) => {
        event.preventDefault();
        onSaveDebt(values);
        setValues({
            name: "",
            phone_number: "",
            amount: "",
            pay_method: ""
        })
        document.getElementById("debtForm").reset()
    }

    useEffect(() => {
        console.log("Valores actualizados:", values);
    }, [values]);

    return(
        <div className='backM'>
            <h1>Agrega una deuda</h1>

            {/* Este boton cambia el estado de si es personal */}
            <button
                type = "button"
                onClick={() => {
                    setIsPersonal(!isPersonal)
                    handlePersonalReset()}}
                style={{background: !isPersonal ? '#000000' : '#002c8b'}}
            >
                Es personal
            </button>
            <br />

            <div>
                <form id="debtForm" onSubmit={handleForm}>

                    {/* Esta parte solo se muestra si no es personal */}
                    {!isPersonal && (
                        <>
                            {/* Se usa el htmlFor porque en react el for es para bucles */}
                            <label htmlFor = "name">Nombre del deudor </label> 
                            <input 
                                type ="text"
                                name = "name"
                                id = "name"
                                placeholder = "Logan"
                                onChange={handleInputChange}
                            />
                            <br/>

                            <label htmlFor = "phone_number">Numero de contacto </label>
                            <input
                                type = "number"
                                name = "phone_number"
                                id = "phone_number"
                                placeholder = '3311223344'
                                onChange={handleInputChange}
                            />
                            <br/>
                        </>
                    )}


                    <label htmlFor = "amount">Monto de la deuda </label>
                    <input
                        type = "number"
                        name = "amount"
                        id = "amount"
                        placeholder= '1250'
                        onChange={handleInputChange}
                    />
                    <br/>

                    <label htmlFor = "pay_method">Metodo de pago </label>
                    <select 
                        id = "pay_method" 
                        name = "pay_method"
                        value = {values.pay_method}
                        onChange={handleInputChange}>
                        <option value = "credit">Credito</option>
                        <option value = "debit">Debito</option>
                        <option value = "cash">Efectivo</option>
                    </select>
                    <br />

                    <button>Agregar deuda</button>
                    
                </form>
            </div>

        </div>
    )
}