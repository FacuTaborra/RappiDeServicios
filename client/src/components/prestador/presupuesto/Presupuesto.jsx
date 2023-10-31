import './Presupuesto.css'
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from "../../../auth/constants.js";
import { useAuth } from "../../../auth/authProvider.jsx";

function Presupuesto(props) {
   const [anuncio, setAnuncio] = useState(null);
  const [datetimeValue, setDatetimeValue] = useState('');
  const [selectedDates, setSelectedDates] = useState([]);
  const [materiales, setMateriales] = useState('');
  const [costoMateriales, setCostoMateriales] = useState(0);
  const [tiempo, setTiempo] = useState(0);
  const [costoxHora, setCostoxHora] = useState(0);
  const currentDate = new Date().toISOString().slice(0, 16);
  const { id } = useParams();
  const history = useNavigate();
  const auth = useAuth();
  const user = auth.getUser();

  useEffect(() => {
    // Realiza la consulta a la base de datos para obtener los detalles del anuncio usando el ID
    fetch(`${API_URL}/solicitud/nuevas/prestador/presupuestar/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setAnuncio(data); // Almacena los detalles del anuncio en el estado
      })
      .catch((error) => {
        console.error('Error al cargar los detalles del anuncio:', error);
      });
  }, [id]);
  const handleDatetimeChange = (event) => {
    // Obtener el valor seleccionado por el usuario del input datetime-local
    const newValue = event.target.value;
    setDatetimeValue(newValue);
  };

  const handleAddDate = () => {
    if (datetimeValue.trim() !== '') {
      // Agregar la fecha y hora seleccionada al array de fechas seleccionadas
      setSelectedDates([...selectedDates, datetimeValue]);
      // Limpiar el valor del input datetime-local
      setDatetimeValue('');
    }
  };

  const handleRemoveDate = (index) => {
    // Eliminar la fecha y hora seleccionada del array de fechas seleccionadas
    const newDates = [...selectedDates];
    newDates.splice(index, 1);
    setSelectedDates(newDates);
  };


  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Crea un objeto con los datos del presupuesto
    const presupuestoData = {
      idSolicitud: anuncio.idSolicitud,
      idUsuario: user.id,
      materiales: materiales,
      costoMateriales: costoMateriales,
      tiempo: tiempo,
      costoxHora: costoxHora,
      fechasSeleccionadas: selectedDates,
    };

    // Realiza una solicitud POST para enviar el presupuesto a la base de datos
    fetch(`${API_URL}/solicitud/nuevas/prestador/presupuestar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(presupuestoData),
    })
      .then((res) => res.json())
      .then((data) => {
        // Si la solicitud es exitosa, puedes redirigir al usuario a otra página, por ejemplo, la página de inicio
        history.push('/inicio');
      })
      .catch((error) => {
        console.error('Error al enviar el presupuesto:', error);
      });
  };
  return (
    <>
      <div className="anuncio-Content">
        {anuncio ? (
          <>
            <div className='datos'>
              <p><h2>Detalles:</h2></p>
              <p>Número de anuncio: {anuncio.idSolicitud}</p>
              <p>Título: {anuncio.titulo}</p>
              <p>Fecha de publicacion: {new Date(anuncio.fechaHora).toLocaleString()}</p>
              <p>Ubicacion: {anuncio.direccion.codPostal} (Ver de modificar por ciudad y prov)</p> 
            </div>
            <div className='descripcion'><h3><p>Descripcion:</p></h3> {anuncio.descripcion}</div>
          </>
        ) : (
          <p>Cargando detalles del anuncio...</p>
        )}
      </div>
    <form className='presupuesto-Content'  onSubmit={handleFormSubmit}>
      <div className='campos'>
        <div className='listaMat'>
          <p>Lista Materiales:</p> 
          <textarea name="materiales" id="1" cols="60" rows="10" required></textarea>
        </div>
        <div className='textoCampos'>
          <p>Costo total en materiales aproximado</p>
          <p>Tiempo(En horas) aproximado</p> 
          <p>Costo por hora </p>
        </div>
        <div className='entradasCampos'>
            <input type="number" name="costo-materiales" min={1} required/>
            <input name='tiempo' type="number" min={1} required/>
            <input type="number" name='costoxHora' min={1} required/>
        </div>
      </div>
      <div className='horarios'>
        <p htmlFor="datetimePicker">Selecciona una fecha y hora:</p>
        <input 
          id="datetimePicker" 
          type="datetime-local"  
          value={datetimeValue} 
          onChange={handleDatetimeChange}
          min={currentDate}
        />
        <button type='button' onClick={handleAddDate}>+</button>
        <div>
          <h2>Fechas y Horas Seleccionadas:</h2>
          <ul>
          {selectedDates.map((date , index) => (
            <li key={index}>
              {new Date(date).toLocaleString()}
              <button type='button' onClick={() => handleRemoveDate(index)}>-</button>
            </li>
          ))}
        </ul>
        </div>
      </div>
      <button type='button'>Atrás</button>
      <button type="submit">Enviar presupuesto</button>
    </form>
  </>
  )
}

export default Presupuesto;