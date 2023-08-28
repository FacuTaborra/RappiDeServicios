import React /*, {useEffect, useState}*/ from 'react';

import Home from './components/home/Home.jsx';
import Header from './components/header/Header.jsx';
import InicioCliente from './components/cliente/Inicio/InicioCliente.jsx';
import Error from './components/error/Error.jsx';
import Solicitudes from './components/cliente/solicitudes/Solicitudes.jsx';
import Evaluaciones from './components/evaluaciones/Evaluaciones.js';
import Footer from './components/footer/Footer.jsx';


import { Route, Routes } from 'react-router-dom';
import './App.css';


function App() {

  /*const [backendData, setBackendData] = useState([{}]);
  
  useEffect(() => {
    fetch("http://localhost:5000/api/tasks")
      .then(
        response => response.json()
      )
      .then(
        data => {
          setBackendData(data)
        })
      .catch(
        error => {
        console.error('Error al obtener los datos:', error);
      });
  }, []);*/

  return (
    <div className="App">
      <div className='content'>
        <Header/>
        <Routes>
          <Route path='/'  element={ <Home/>} />
          <Route path='/client/home'  element={ <InicioCliente/>}>
            <Route path='requests'  element={ <Solicitudes estado = "pendiente"/>} />
            <Route path='finished'  element={ <Solicitudes estado = "terminado"/>} />
          </Route>
          <Route path='/evaluations'  element={ <Evaluaciones/>} />
          <Route path='*'  element={ <Error/>} />
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
