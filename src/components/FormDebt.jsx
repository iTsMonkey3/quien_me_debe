import { useState, useEffect } from 'react'

export function FormDebt({ onSaveDebt }) {
    const [isPersonal, setIsPersonal] = useState(false);
    const [contactMode, setContactMode] = useState('saved');

    const misContactosGuardados = [
        { id: "1", nombre: "Pedro" },
        { id: "2", nombre: "Sofía" }
    ];

    const initialValues = {
        contact_id: "", 
        name: "",
        phone_number: "",
        amount: "",
        pay_method: "cash",
        credit_card: "",
        in_installments: false,
        installments_amount: 1, 
        payday: 15,
        due_date: "",
        amount_per_month: 0
    };

    const [values, setValues] = useState(initialValues);

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        setValues({
            ...values,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handlePersonalReset = () => {
        // Ya no necesitamos limpiar el nombre aquí porque todo se maneja en el mismo componente de contactos
        setValues({ ...values, contact_id: '', name: '', phone_number: '' });
    };

    const handleForm = (event) => {
        event.preventDefault();
        
        // 1. Aseguramos que los valores sean números reales
        const montoTotal = parseFloat(values.amount) || 0;
        const cantidadMeses = parseInt(values.installments_amount) || 1;

        // 2. Calculamos el pago mensual redondeado a 2 decimales (ej. 333.33)
        // Usamos values.in_installments (con "values.")
        const pagoMensual = values.in_installments 
            ? parseFloat((montoTotal / cantidadMeses).toFixed(2)) 
            : 0;
        
        const finalData = {
            ...values,
            type_debt: isPersonal ? "yo_debo" : "me_deben",
            
            ...(contactMode === 'saved' 
                ? { name: "", phone_number: "" } 
                : { contact_id: "" }),

            // 3. Asignamos la variable ya calculada y limpiecita
            amount_per_month: pagoMensual 
        };

        // Verás en tu consola que el amount_per_month sale perfecto
        onSaveDebt(finalData);
        setValues(initialValues);
        setContactMode('saved');
    };

    useEffect(() => {
        console.log("Objeto listo para la BD:", values);
    }, [values]);

    return (
        <div className='backM'>
            <h1>Agrega una deuda</h1>

            {/* --- SWITCH PRINCIPAL --- */}
            <button
                type="button"
                onClick={() => {
                    setIsPersonal(!isPersonal);
                    handlePersonalReset();
                }}
                style={{ 
                    background: !isPersonal ? '#000000' : '#002c8b', 
                    color: 'white', padding: '10px', borderRadius: '5px', cursor: 'pointer' 
                }}
            >
                {isPersonal ? 'Es personal (Yo debo)' : 'Es externa (Me deben)'}
            </button>
            <br /> <br />

            <div>
                <form id="debtForm" onSubmit={handleForm}>

                    {/* --- SECCIÓN ÚNICA DE CONTACTOS --- */}
                    <div>
                        
                        {/* El título cambia mágicamente dependiendo de lo que elijas */}
                        <p>
                            {isPersonal ? '¿A quién le debes?' : '¿Quién te debe?'}
                        </p>
                        
                        <div>
                            <button 
                                type="button" 
                                onClick={() => setContactMode('saved')}
                                
                            >
                                Contacto guardado
                            </button>
                            <button 
                                type="button" 
                                onClick={() => setContactMode('new')}
                            
                            >
                                + Nuevo contacto
                            </button>
                        </div>

                        {/* VISTA: CONTACTO GUARDADO */}
                        {contactMode === 'saved' && (
                            <>
                                <label htmlFor="contact_id">Selecciona de tu lista: </label>
                                <select 
                                    id="contact_id" name="contact_id"
                                    value={values.contact_id} onChange={handleInputChange}
                                    required={contactMode === 'saved'}
                                >
                                    <option value="" disabled>-- Elige un contacto --</option>
                                    {misContactosGuardados.map(contacto => (
                                        <option key={contacto.id} value={contacto.id}>
                                            {contacto.nombre}
                                        </option>
                                    ))}
                                </select>
                            </>
                        )}

                        {/* VISTA: NUEVO CONTACTO */}
                        {contactMode === 'new' && (
                            <>
                                <label htmlFor="name">Nombre: </label> 
                                <input 
                                    type="text" name="name" id="name" 
                                    placeholder={isPersonal ? "Ej. Banco, Liverpool, Logan..." : "Ej. Logan, Juan..."}
                                    value={values.name} onChange={handleInputChange}
                                    required={contactMode === 'new'}
                                />
                                <br/>
                                <label htmlFor="phone_number">Número de WhatsApp (Opcional): </label>
                                <input
                                    type="number" name="phone_number" id="phone_number" placeholder='3311223344'
                                    value={values.phone_number} onChange={handleInputChange}
                                />
                            </>
                        )}
                    </div>

                    {/* --- MONTO DE LA DEUDA --- */}
                    <label htmlFor="amount">Monto total de la deuda: </label>
                    <input
                        type="number" name="amount" id="amount" placeholder='1250'
                        value={values.amount} onChange={handleInputChange}
                        required
                    />
                    <br/><br/>

                    {/* --- MESES VS FECHA LÍMITE --- */}
                    <label htmlFor="in_installments">
                        <input 
                            type="checkbox" name="in_installments" id="in_installments"
                            checked={values.in_installments} onChange={handleInputChange}
                        />
                        ¿Es a meses sin intereses / fraccionado?
                    </label>
                    <br/>

                    {values.in_installments ? (
                        <div>
                            <label htmlFor="installments_amount">¿A cuántos meses? </label>
                            <input
                                type="number" name="installments_amount" id="installments_amount"
                                min="2" max="72" value={values.installments_amount} onChange={handleInputChange}
                            />
                            <br/>
                            <label htmlFor="payday">Día de pago (1-31): </label>
                            <input
                                type="number" name="payday" id="payday"
                                min="1" max="31" value={values.payday} onChange={handleInputChange}
                            />
                        </div>
                    ) : (
                        <div >
                            <label htmlFor="due_date">Fecha límite de pago (Opcional): </label>
                            <input
                                type="date" name="due_date" id="due_date"
                                value={values.due_date} onChange={handleInputChange}
                            />
                        </div>
                    )}

                    {/* --- MÉTODO DE PAGO --- */}
                    <label htmlFor="pay_method">Método de pago: </label>
                    <select 
                        id="pay_method" name="pay_method"
                        value={values.pay_method} onChange={handleInputChange}
                    >
                        <option value="cash">Efectivo</option>
                        <option value="credit">Crédito</option>
                        <option value="debit">Débito</option>
                    </select>
                    <br />

                    {values.pay_method != "cash" && (
                        <div>
                            <strong>Es tarjetazo 💳</strong><br/>
                            <label htmlFor="credit_card">Últimos 4 dígitos de la tarjeta: </label>
                            <input
                                type="text" 
                                name="credit_card" 
                                id="credit_card" 
                                placeholder='2030'
                                maxLength="4" 
                                value={values.credit_card} onChange={handleInputChange}
                            />
                        </div>
                    )}

                    <br /><br />
                    <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                        Guardar deuda
                    </button>
                    
                </form>
            </div>
        </div>
    )
}