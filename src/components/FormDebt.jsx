import { useState, useEffect } from 'react'

export function FormDebt ({onSaveDebt}) {
    const [isPersonal, setIsPersonal] = useState(false)

    const initialValues = {
        name: "",
        phone_number: "",
        amount: "",
        pay_method: "cash",
        credit_card: "",
        in_installments: false,
        installments_amount: 1, 
        payday: 15,
        due_date: "" // Fecha límite para pagos de contado
    };

    const [values, setValues] = useState(initialValues);

    const handleInputChange = (event) => {
        const {name, value, type, checked} = event.target;
        setValues({
            ...values,
            [name]: type === 'checkbox' ? checked : value,
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
        
        const finalData = {
            ...values,
            type_debt: isPersonal ? "yo_debo" : "me_deben"
        };

        onSaveDebt(finalData);
        setValues(initialValues);
    }

    useEffect(() => {
        console.log("Valores actualizados:", values);
    }, [values]);

    return(
        <div className='backM'>
            <h1>Agrega una deuda</h1>

            <button
                type = "button"
                onClick={() => {
                    setIsPersonal(!isPersonal)
                    handlePersonalReset()
                }}
                style={{background: !isPersonal ? '#000000' : '#002c8b'}}
            >
                {isPersonal ? 'Es personal' : 'Es externa'}
            </button>
            <br /> <br />

            <div>
                <form id="debtForm" onSubmit={handleForm}>

                    {!isPersonal && (
                        <>
                            <label htmlFor="name">Nombre del deudor </label> 
                            <input 
                                type="text" name="name" id="name" placeholder="Logan"
                                value={values.name} 
                                onChange={handleInputChange}
                            />
                            <br/>

                            <label htmlFor="phone_number">Numero de contacto </label>
                            <input
                                type="number" name="phone_number" id="phone_number" placeholder='3311223344'
                                value={values.phone_number} 
                                onChange={handleInputChange}
                            />
                            <br/>
                        </>
                    )}

                    {isPersonal && (
                        <>
                            <label htmlFor="name">Nombre de a quien le debes </label> 
                            <input 
                                type="text" name="name" id="name" placeholder="Banco / Persona"
                                value={values.name} 
                                onChange={handleInputChange}
                            />
                            <br/>
                        </>
                    )}


                    <label htmlFor="amount">Monto de la deuda </label>
                    <input
                        type="number" name="amount" id="amount" placeholder='1250'
                        value={values.amount} 
                        onChange={handleInputChange}
                    />
                    <br/><br/>

                    {/* --- SECCIÓN DE MESES O FECHA LÍMITE --- */}
                    <label htmlFor="in_installments">
                        <input 
                            type="checkbox" name="in_installments" id="in_installments"
                            checked={values.in_installments} 
                            onChange={handleInputChange}
                        />
                        ¿Es a meses sin intereses?
                    </label>
                    <br/>

                    {/* Si es a meses, mostramos esto: */}
                    {values.in_installments && (
                        <div>
                            <label htmlFor="installments_amount">¿A cuántos meses? </label>
                            <input
                                type="number" name="installments_amount" id="installments_amount"
                                min="2" max="72"
                                value={values.installments_amount} 
                                onChange={handleInputChange}
                            />
                            <br/>
                            <label htmlFor="payday">Día de pago (1-31): </label>
                            <input
                                type="number" name="payday" id="payday"
                                min="1" max="31"
                                value={values.payday} 
                                onChange={handleInputChange}
                            />
                        </div>
                    )}

                    {/* ¡NUEVO! Si NO es a meses, mostramos la fecha opcional: */}
                    {!values.in_installments && (
                        <div>
                            <label htmlFor="due_date">Fecha estimada de pago (Opcional): </label>
                            <input
                                type="date" name="due_date" id="due_date"
                                value={values.due_date} 
                                onChange={handleInputChange}
                            />
                        </div>
                    )}
                    {/* -------------------------------------- */}

                    <label htmlFor="pay_method">Metodo de pago </label>
                    <select 
                        id="pay_method" name="pay_method"
                        value={values.pay_method}
                        onChange={handleInputChange}
                    >
                        <option value="cash">Efectivo</option>
                        <option value="credit">Credito</option>
                        <option value="debit">Debito</option>
                    </select>
                    <br />

                    {values.pay_method === "credit" && (
                        <>
                            <h3>Es tarjetazo</h3>
                            <label htmlFor="credit_card">Ingresa los ultimos 4 digitos: </label>
                            <input
                                type="text" name="credit_card" id="credit_card" placeholder='2030'
                                maxLength="4"
                                value={values.credit_card} 
                                onChange={handleInputChange}
                            />
                            <br />
                        </>
                    )}

                    <br />
                    <button type="submit">Agregar deuda</button>
                    
                </form>
            </div>
        </div>
    )
}