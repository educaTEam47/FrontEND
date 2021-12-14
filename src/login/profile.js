

import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import { Card, InputGroup, FormControl, Button, DropdownButton, Dropdown, Table, Alert, AlertDismissibleExample } from 'react-bootstrap';
import { FcInfo } from 'react-icons/fc'
import { validateql, addTeacherql, delTeacherql } from '../mutations/mutation'
import { getUserql } from '../queries/queries'
import { useQuery, useMutation } from '@apollo/client'
import { AiFillEdit, AiOutlineUserAdd } from 'react-icons/ai'
import { FiDelete } from 'react-icons/fi'
import Cookies from "universal-cookie";
import jwt from 'jsonwebtoken'
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css'

function Profile() {

    //---------------VALIDATE LOGIN     -------------------------------------------------------------------
    const [name,setName]=useState("");
    const [role,setRole]=useState("");

    let tokenStorage = localStorage.getItem('token')
    useEffect(() => {
        if (!tokenStorage) {
            tokenStorage = ""
        }
    }, [])
    const [auth, setAuth] = useState(false)
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
        if (response1) {
            if (response1.data.validate.error) {
                let message = response1.data.validate.error.map(p => p.message)
                Swal.fire({
                    title: "Error",
                    text: message,
                    icon: "warning"
                })
            }
            else {
                if (response1.data.validate.rol !== "") {
                    setRole(response1.data.validate.rol);
                    setName(response1.data.validate.nombres);
                  
                    setAuth(response1.data.validate.validacion)
                }
                else {
                    Swal.fire({
                        title: "Error",
                        text: "No tiene acceso permitido",
                        icon: "error"
                    })
                }
            }
        }
    }
    //###############################LOGIN VALIDATE###############################################################

















    const testInfo = () => {
        
        console.log(role);
        console.log(name);
    }

    return (
        <div className="container">
            <Card className="text-center">
                <Card.Header>Bienvenido Usuario</Card.Header>
                <Card.Body>
                    <Card.Title>Bienvenidos a EducaTEam</Card.Title>
                    <Card.Text>
                        Pagina PlaceHolder para login Exitoso
                    </Card.Text>
                    <Button onClick={testInfo} variant="primary" >Pruebame</Button>
                </Card.Body>
                <Card.Footer className="text-muted">EducaTEam, de la academia a tu mesa</Card.Footer>
            </Card>
        </div>
    )
}

export default Profile;