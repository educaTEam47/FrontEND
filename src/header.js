import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import { validateql, addTeacherql, delTeacherql } from './mutations/mutation'
import { useQuery, useMutation } from '@apollo/client'
import { Button, Navbar, Nav, NavItem, NavDropdown, MenuItem, Container } from 'react-bootstrap';
function Header() {

    //----------------------------------------------------------------------------------------------------------------
    let tokenStorage = localStorage.getItem('token')
    useEffect(() => {
        if (!tokenStorage) {
            tokenStorage = ""
        }
    }, [])
    const [auth, setAuth] = useState(false);
    const [teacher,setTeacher] = useState(false);
    const [student,setStudent] = useState(false);
    const [admin,setAdmin] = useState(false);
    const [name,setName]=useState("");
    var [logs,setLogs]=useState("");
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
        console.log(response1)
        if (response1)
            if (response1.data.validate.rol !== "") {
                console.log("Rol: "+response1.data.validate.rol);
                setLogs(response1.data.validate.rol);
                setAuth(response1.data.validate.validacion)
                setName(response1.data.validate.nombres);
                if(response1.data.validate.rol === "Lider"){
                    setTeacher(true);
                }
                else if(response1.data.validate.rol==="Estudiante"){
                    setStudent(true);
                } else if(response1.data.validate.rol==="Admi"){
                    setAdmin(true);
                }
            }
    }
//################################################################################################################

var isLogged=false;
console.log("Muestra "+logs);
if(!!logs){
    isLogged=true;
}
console.log(name);
return (
    <Navbar bg="light" expand="lg">
        <Container>
            {!isLogged && <Navbar.Brand href="/">EducaTEam</Navbar.Brand>}
            {isLogged &&<Navbar.Brand href="/profile">EducaTEam</Navbar.Brand>}
            {isLogged && <Navbar.Text>Bienvenid@ {name}</Navbar.Text>}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                   {!isLogged && <Nav.Link href="/login">Inicia</Nav.Link>}
                    {teacher && <Nav.Link href="/courseteacher">Mis cursos</Nav.Link>}
                    {admin && <Nav.Link href="/allUsers">Todos los usuarios</Nav.Link>}
                    {admin && <Nav.Link href="/getProjectsAdmi">Todos los Proyectos</Nav.Link>}
                    {(admin || teacher)  && <Nav.Link href="/user">Busca un usuario</Nav.Link>}
                    {!isLogged && <Nav.Link href="/register">Registrate</Nav.Link>}
                   
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
)
}
export default Header;
