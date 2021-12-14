import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from '@apollo/client'
import Swal from 'sweetalert2'
import { validateql, addTeacherql, delTeacherql } from '../mutations/mutation'
import 'bootstrap/dist/css/bootstrap.min.css';
import { getUsersql } from '../queries/queries'
import { Button, Table } from 'react-bootstrap';
import './getUsers.css'
function GetUsers() {
    const { data } = useQuery(getUsersql)
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

    return (
        <div className="container">
            <Table striped bordered hover variant="dark" className="text-center">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Email</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.getUsers.map((val, key) => {
                        return (
                            <tr>
                                <td>{key+1}</td>
                                <td>{val.nombres}</td>
                                <td>{val.apellidos}</td>
                                <td>{val.email}</td>
                                <td>
                                    <Button className="opciones">Ob</Button>
                                    <Button className="opciones">Not</Button>
                                    <Button className="opciones">Del</Button>
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