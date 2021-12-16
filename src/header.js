import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import { validateql, addTeacherql, delTeacherql } from './mutations/mutation'
import { useQuery, useMutation } from '@apollo/client'
import { Button, Navbar, Nav, NavItem, NavDropdown, MenuItem, Container } from 'react-bootstrap';
import logoBuho from './logo_mamaloncito.png';
import Cookies from "universal-cookie";
import './header.css'
function Header() {
    const cookies = new Cookies();
    //----------------------------------------------------------------------------------------------------------------
    let tokenStorage = localStorage.getItem('token')
    useEffect(() => {
        if (!tokenStorage) {
            tokenStorage = ""
        }
    }, [])
    const [auth, setAuth] = useState(false);
    const [teacher, setTeacher] = useState(false);
    const [student, setStudent] = useState(false);
    const [admin, setAdmin] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    var [logs, setLogs] = useState("");
    useEffect(() => {
        response()
    }, [])
    const [validateForm] = useMutation(validateql)
    const response = async () => {
        const response1 = await validateForm(
            {
                variables: { token: tokenStorage }
            }
        )
        //console.log(response1)
        if (response1)
            if (response1.data.validate.rol !== "") {
                //console.log("Rol: " + response1.data.validate.rol);
                setLogs(response1.data.validate.rol);
                setAuth(response1.data.validate.validacion)
                setName(response1.data.validate.nombres);
                setEmail(response1.data.validate.email)
                if (response1.data.validate.rol === "Lider") {
                    setTeacher(true);
                }
                else if (response1.data.validate.rol === "Estudiante") {
                    setStudent(true);
                }
                else if (response1.data.validate.rol === "Admi") {
                    setAdmin(true);
                }
            }
    }
    //################################################################################################################

    var isLogged = false;
    //console.log("Muestra " + logs);
    if (!!logs) {
        isLogged = true;
    }
    //console.log(name);
    const logout = () => {
        localStorage.setItem('token', "")
        cookies.remove("edit-User")
        cookies.remove("obs-course")
        cookies.remove("id-note")
        window.location.replace('./')
    }

    const updateDatos = () => {
        const cookies = new Cookies();
        cookies.set('edit-User', email, { maxAge: 10 * 60 }, { path: '/' })
        window.location.replace('./updateUser')
    }

    return (
        <Navbar className="Header" bg="light" expand="lg">
            <Container>
                <Navbar.Brand><img src={logoBuho} className="logo"></img></Navbar.Brand>
                {!isLogged && <Navbar.Brand href="/">EducaTEam</Navbar.Brand>}
                {isLogged && <Navbar.Brand href="/profile">EducaTEam</Navbar.Brand>}
                {isLogged && <Navbar.Text className="Bienvenida">Bienvenid@ {name}</Navbar.Text>}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {!isLogged && <Nav.Link href="/login">Inicia</Nav.Link>}
                        {student && <Nav.Link href="/courseStudent">Mis cursos</Nav.Link>}
                        {teacher && <Nav.Link href="/courseteacher">Mis cursos</Nav.Link>}
                        {teacher && <Nav.Link href="/createCourse">Curso Nuevo</Nav.Link>}
                        {admin && <Nav.Link href="/allUsers">Todos los usuarios</Nav.Link>}
                        {admin && <Nav.Link href="/getProjectsAdmi">Todos los Proyectos</Nav.Link>}
                        {isLogged && <Nav.Link onClick={updateDatos}>Actualiza tus datos</Nav.Link>}
                        {(admin || teacher) && <Nav.Link href="/user">Busca un usuario</Nav.Link>}
                        {!isLogged && <Nav.Link href="/register">Registrate</Nav.Link>}
                        {isLogged && <Nav.Link className="Logout" onClick={logout}>Cerrar Sesion</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default Header;
