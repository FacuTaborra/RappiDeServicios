import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import '../Inicio/InicioCliente.css';

export function NuevaSolicitud() {
  const [showModal, setShowModal] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [fotos, setFotos] = useState([]);
  const [errorTitulo, setErrorTitulo] = useState(false);
  const [errorDescripcion, setErrorDescripcion] = useState(false);
  const [errorEspecialidad, setErrorEspecialidad] = useState(false);
  const [errorUbicacion, setErrorUbicacion] = useState(false);
  const [errorFotos, setErrorFotos] = useState([]);

  const handleClose = () => {
    setShowModal(false);
    setErrorTitulo(false);
    setErrorDescripcion(false);
    setErrorEspecialidad(false);
    // Limpiar los campos del formulario
    setTitulo('');
    setDescripcion('');
    setEspecialidad('');
    setUbicacion('');
    setFotos([]);
  };

  const handleShow = () => setShowModal(true);

  const handleSubmit = () => {
    if (!titulo || !descripcion || !especialidad || !ubicacion || fotos.length === 0) {
      if (!titulo) setErrorTitulo(true);
      if (!descripcion) setErrorDescripcion(true);
      if (!especialidad) setErrorEspecialidad(true);
      if (!ubicacion) setErrorUbicacion(true);
      if (fotos.length === 0) setErrorFotos(true);
      return;
    }

    console.log('Título:', titulo);
    console.log('Descripción:', descripcion);
    console.log('Especialidad:', especialidad);
    console.log('Ubicación:', ubicacion);
    console.log('Fotos:', fotos);

    alert('Solicitud guardada con éxito.');

    handleClose();
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFotos(selectedFiles);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <div >
      <Button  variant='primary' className="floating-button"  onClick={handleShow} onMouseEnter={toggleMenu} >
        +
      </Button>
    </div>
      {isMenuOpen && (
        <div className="modal-alert">
          Nueva Solicitud
        </div>
      )}

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nueva Solicitud</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>Título</label>
            <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
            {errorTitulo && <span className="error-message">Ingrese un título</span>}
          </div>
          <div className="form-group">
            <label>Descripción</label>
            <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
            {errorDescripcion && <span className="error-message">Ingrese una descripción</span>}
          </div>
          <div className="form-group">
            <label>Especialidad</label>
            <select value={especialidad} onChange={(e) => setEspecialidad(e.target.value)}>
              <option value="">Elija una especialidad</option>
              <option value="Carpintería">Carpintería</option>
              <option value="Electricidad">Electricidad</option>
              <option value="Plomería">Plomería</option>
              {/* Agrega más opciones según tus necesidades */}
            </select>
            {errorEspecialidad && <span className="error-message">Seleccione una especialidad</span>}
          </div>
          <div className="form-group">
            <label>Ubicación</label>
            <input type="text" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} />
            {errorUbicacion && <span className="error-message">Ingrese una ubicacion valida</span>}
          </div>
          <div className="form-group">
            <label>Fotos</label>
            <input type="file" multiple onChange={handleFileChange} />
            {errorFotos && <span className="error-message">Ingrese al menos una foto</span>}

          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className='btn-cls'>
          <Button variant="secondary"  onClick={handleClose}>
            Cerrar
          </Button>
          </div>
          <Button variant="primary"  onClick={handleSubmit}>
            Enviar solicitud
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default NuevaSolicitud;
