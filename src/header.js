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
    const [auth, setAuth] = useState(false)
    const [teacher,setTeacher] = useState(false)
    const [student,setStudent] = useState(false)
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
                setAuth(response1.data.validate.validacion)
                if(response1.data.validate.rol === "Lider"){
                    setTeacher(response1.data.validate.rol)
                }
                else if(response1.data.validate.rol==="Estudiante"){
                    setStudent(response1.data.validate.rol)
                }
            }
    }
//################################################################################################################


return (
    <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="/">EducaTEam</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/login">Inicia</Nav.Link>
                    {teacher &&
                        <Nav.Link href="/courseteacher">Mis cursos</Nav.Link>
                    }
                    <Nav.Link href="/register">Registrate</Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
)
}
export default Header;
