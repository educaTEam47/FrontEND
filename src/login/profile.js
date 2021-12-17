

import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import { Card, InputGroup, FormControl, Button, DropdownButton, Dropdown, Table, Alert, AlertDismissibleExample } from 'react-bootstrap';
import { FcInfo } from 'react-icons/fc'
import { validateql, addTeacherql, delTeacherql } from '../mutations/mutation'
import { getUserql, getNotql } from '../queries/queries'
import { useQuery, useMutation } from '@apollo/client'
import { AiFillEdit, AiOutlineUserAdd } from 'react-icons/ai'
import { FiDelete } from 'react-icons/fi'
import Cookies from "universal-cookie";
import jwt from 'jsonwebtoken'
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css'

function Profile() {

    const [idNoteArray, setIdNote] = useState([])
    const [email, setEmail] = useState("")

    //---------------VALIDATE LOGIN     -------------------------------------------------------------------
    const [name, setName] = useState("");
    const [role, setRole] = useState("");

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
                    setEmail(response1.data.validate.email)
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
        console.log(email)
        console.log(role);
        console.log(name);
    }
    const datauser = useQuery(getUserql,
        {
            variables: { email },
        });
    console.log(datauser.data)
    useEffect(() => {
        if (datauser.data) {
            if (datauser.data.getUser.user) {
                if (datauser.data.getUser.user.EstadoNote) {
                    setIdNote(datauser.data.getUser.user.EstadoNote[datauser.data.getUser.user.EstadoNote.length - 1])
                }
            }
        }
    }, [datauser])
    //console.log(idNoteArray.note)

    const { data } = useQuery(getNotql, {
        variables: { idNote: idNoteArray.note }
    })
    //console.log(data)

    return (
        <div className="container">
            {
                !idNoteArray.estado && <div>
                    <Card className="text-center">
                        <Card.Header></Card.Header>
                        <Card.Body>
                            <Card.Title>Bienvenid@ {name}</Card.Title>
                            <Card.Text>
                                Pagina PlaceHolder para login Exitoso
                            </Card.Text>
                            <Button onClick={testInfo} variant="primary" >Pruebame</Button>
                        </Card.Body>
                        <Card.Footer className="text-muted">EducaTEam, de la academia a tu mesa</Card.Footer>
                    </Card>
                </div>
            }
            {console.log(idNoteArray.estado)}
            <Card className="text-center">
                <Card.Header></Card.Header>
                <Card.Body>
                    <Card.Title>Bienvenid@ {name}</Card.Title>
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