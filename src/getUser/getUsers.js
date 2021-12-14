import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from '@apollo/client'
import Swal from 'sweetalert2'
import { validateql, addTeacherql, delTeacherql, updateUserql } from '../mutations/mutation'
import 'bootstrap/dist/css/bootstrap.min.css';
import { getUsersql } from '../queries/queries'
import { Button, Table, FormControl, DropdownButton, Dropdown, InputGroup } from 'react-bootstrap';
import { FcInfo } from 'react-icons/fc'
import { AiFillEdit, AiOutlineUserAdd } from 'react-icons/ai'
import { FiDelete } from 'react-icons/fi'
import Cookies from "universal-cookie";
import './getUsers.css'
function GetUsers() {
    const { data } = useQuery(getUsersql)
    const [estado, setEstado] = useState("")
    //----------------------------------------------------------------------------------------------------------------
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
                window.location.replace('./')
            }
            else {
                if (response1.data.validate.rol === "Admi") {
                    setAuth(response1.data.validate.validacion)
                }
                else {
                    Swal.fire({
                        title: "Error",
                        text: "No tiene acceso permitido",
                        icon: "error"
                    })
                    window.location.replace('./')
                }
            }
        }
    }
    //################################################################################################################

    const observar = (idUser) => {
        let filtro = data.getUsers.filter(p => p.email === idUser)
        console.log(filtro)
        Swal.fire({
            title: filtro[0].nombres + " " + filtro[0].apellidos,
            text: filtro[0].rol,
            icon: 'info'
        })
    }


    const editar = (emailUser) => {
        const cookies = new Cookies();
        cookies.set('edit-User', emailUser, { maxAge: 10 * 60 }, { path: '/' })
        window.location.replace('./updateUser')
    }

    const [updateForm] = useMutation(updateUserql)
    const Changeestado = async (email, estadoBooelano, rol) => {
        let Estado
        if (rol === "Admi") {
            Swal.fire({
                title:"Error",
                text:"No puede modificar el estado de un Administrador",
                icon:"error"
            })
        }
        else {
            Swal.fire({
                title: '¿Esta seguro de cambiar el estado?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    if (estadoBooelano) {
                        Estado = "Activar"
                    }
                    else {
                        Estado = "Desactivar"
                    }
                    const response = await updateForm(
                        {
                            variables: { email, Estado }
                        }
                    )
                    console.log(response)
                    if (response.data.updateUser.update) {
                        Swal.fire(
                            'Estado',
                            'Cambio realizado',
                            'success'
                        )
                        window.location.replace('./allUsers')
                    }
                    else {
                        Swal.fire(
                            'Error!',
                            'No se ha cambiado el estado',
                            'error'
                        )
                    }
                }
            })

        }
    }

    const deluser = (emailUser) => {

    }


    return (
        <div className="container">
            <Table striped bordered hover variant="dark" className="text-center">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Estado</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.getUsers.map((val, key) => {
                        return (
                            <tr>
                                <td>{key + 1}</td>
                                <td>{val.nombres}</td>
                                <td>{val.apellidos}</td>
                                <td>{val.email}</td>
                                <td>{val.rol}</td>
                                <td>
                                    <InputGroup className="mb-3">
                                        <FormControl
                                            style={{ width: '5rem' }}
                                            aria-label="Text input with dropdown button"
                                            disabled value={val.Estado}
                                        />
                                        <DropdownButton
                                            variant="outline-secondary"
                                            id="input-group-dropdown-2"
                                            align="end"
                                        >
                                            <Dropdown.Item onClick={() => Changeestado(val.email, true, val.rol)}>Activar</Dropdown.Item>
                                            <Dropdown.Item onClick={() => Changeestado(val.email, false, val.rol)}>Desactivar</Dropdown.Item>
                                        </DropdownButton>
                                    </InputGroup>
                                </td>
                                <td>
                                    <Button className="Observar" onClick={() => observar(val.email)}><FcInfo className="Observar" size="1.5rem"></FcInfo></Button>
                                    <Button className="Editar" onClick={() => editar(val.email)}><AiFillEdit size="1.5rem" color="rgb(22, 148, 232)" /></Button>
                                    <Button className="Eliminar" ><FiDelete size="1.5rem" color="red" /></Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}
export default GetUsers;