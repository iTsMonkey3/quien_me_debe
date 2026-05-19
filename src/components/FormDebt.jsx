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
        due_date: ""
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
        
        const finalData = {
            ...values,
            type_debt: isPersonal ? "yo_debo" : "me_deben",
            
            // La limpieza ahora es universal: 
            // Si es guardado quitamos texto manual. Si es nuevo quitamos el ID.
            ...(contactMode === 'saved' 
                ? { name: "", phone_number: "" } 
                : { contact_id: "" })
        };

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
                    <div style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '15px' }}>
                        
                        {/* El título cambia mágicamente dependiendo de lo que elijas */}
                        <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>
                            {isPersonal ? '¿A quién le debes?' : '¿Quién te debe?'}
                        </p>
                        
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                            <button 
                                type="button" 
                                onClick={() => setContactMode('saved')}
                                style={{ background: contactMode === 'saved' ? '#002c8b' : '#ccc', color: contactMode === 'saved' ? 'white' : 'black', padding: '5px 10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                            >
                                Contacto guardado
                            </button>
                            <button 
                                type="button" 
                                onClick={() => setContactMode('new')}
                                style={{ background: contactMode === 'new' ? '#002c8b' : '#ccc', color: contactMode === 'new' ? 'white' : 'black', padding: '5px 10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
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
                    <label htmlFor="in_installments" style={{ fontWeight: 'bold' }}>
                        <input 
                            type="checkbox" name="in_installments" id="in_installments"
                            checked={values.in_installments} onChange={handleInputChange}
                        />
                        ¿Es a meses sin intereses / fraccionado?
                    </label>
                    <br/>

                    {values.in_installments ? (
                        <div style={{ padding: '10px', background: '#f0f0f0', color: 'black', borderRadius: '5px', marginTop: '5px', marginBottom: '15px' }}>
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
                        <div style={{ padding: '10px', borderLeft: '3px solid #002c8b', marginTop: '5px', marginBottom: '15px' }}>
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

                    {values.pay_method === "credit" && (
                        <div style={{ marginTop: '10px' }}>
                            <strong>Es tarjetazo 💳</strong><br/>
                            <label htmlFor="credit_card">Últimos 4 dígitos de la tarjeta: </label>
                            <input
                                type="text" name="credit_card" id="credit_card" placeholder='2030'
                                maxLength="4" value={values.credit_card} onChange={handleInputChange}
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