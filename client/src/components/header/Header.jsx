import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/authProvider';
import { API_URL } from '../../auth/constants';
import { fetchCerrarSesion } from "../../services/DatosPersonales";
import './Header.css';
import logo from "./logoPosta.png";
import userlogo from './user.png';

function Header(props) {
    const [show, setShow] = useState(false);
    const auth = useAuth();

    const userJSON = localStorage.getItem('user');
    const user = userJSON ? JSON.parse(userJSON) : {nombre:""};

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

      // Función para cerrar sesión
    async function handlelogout(e){
        e.preventDefault();
        setShow(false);
        try {
            const response = await fetchCerrarSesion(auth.getRefreshToken());
            if(response.statusCode === 200){
                auth.logout();
            }
        } catch (error) {
        
        }
    }

    return (
        <header className="header-content">
            <div className="logo-content">
                <Link to="/"><img src={logo} alt="No disp" className="logo" /></Link>
            </div>

            <div className="header-links">
                <div className="links">
                    
                    {auth.isAuthenticated ?
                        (<Link onClick={handleShow} ><img src={userlogo} className="userlogo" /></Link>) : 
                        <Link to="/login"><img src={userlogo} className="userlogo" /></Link>}
                    <Offcanvas  show={show} onHide={handleClose} placement="end" {...props} style={{backgraouncolor: '#2a4063'}}>
                        <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Mi Cuenta</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <ul className="ul-offcavas">
                                <li><Link to="/user" onClick={()=> setShow(false)}>Mis Datos</Link></li>
                                {user.esPrestador ? 
                                (<>
                                    <li><Link to="/provider/home/add" onClick={()=> setShow(false)}>Nuevos Anuncios</Link></li>
                                    <li><Link to="/provider/home/budgeted" onClick={()=> setShow(false)}>Mis Presupuestos</Link></li>
                                    <li><Link to="/provider/home/accepted" onClick={()=> setShow(false)}>Mis Servicios</Link></li>
                                    <li><Link to="/provider/home/finished" onClick={()=> setShow(false)}>Servicios Completados</Link></li>
                                </>):
                                <>
                                    <li><Link to="/client/home/active" onClick={()=> setShow(false)}>Mis Solicitudes</Link></li>
                                    <li><Link to="/client/home/progress" onClick={()=> setShow(false)}>Mis Servicios</Link></li>
                                    <li><Link to="/client/home/finished" onClick={()=> setShow(false)}>Reseñas</Link></li>
                                </>}
                            </ul>
                            <Button className="button-cerrarSesion" to="/user"  onClick={handlelogout}>Cerrar Sesion</Button>
                        </Offcanvas.Body>
                    </Offcanvas>

                </div>
            </div>
        </header>
    );
}

export default Header;
