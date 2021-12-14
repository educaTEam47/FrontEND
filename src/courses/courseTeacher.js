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
import './courseAdmi.css'
import jwt from 'jsonwebtoken'

function CourseTeacher() {
    //console.log(token)
    const [id, setId] = useState("")
    const [email,setEmail] = useState("")
    const [cursos, setCursos] = useState([])

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
                if (response1.data.validate.rol === "Lider") {
                    setId(response1.data.validate.id)
                    setEmail(response1.data.validate.email)
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

    const { data } = useQuery(getUserql,
        {
            variables: { email }
        })
    useEffect(() => {
        if (auth === true) {
            if (id) {
                if (data) {
                    if (data.getUser) {
                        setCursos(data.getUser.user.cursos)
                    }
                }
            }
        }
    }, [data])
    console.log(data)


    const [addTeacher] = useMutation(addTeacherql)
    const addCourse = async () => {
        const { value: newId } = await Swal.fire({
            title: 'Escriba el ID del proyecto',
            input: 'text',
            inputLabel: 'La nueva ID',
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return 'Necesita escribir un ID!'
                }
            }
        })
        if (newId) {
            if (newId.length !== 24) {
                Swal.fire("El ID introducido no es valido")
            }
            else {
                let filtro = cursos.filter(p => p._id == newId)
                if (filtro[0]) {
                    if (newId == filtro[0]._id) {
                        Swal.fire({
                            icon: "error",
                            text: "No puede introducir un ID que ya esta agregado"
                        })
                    }
                }
                else {
                    const response = await addTeacher(
                        {
                            variables: { idTeacher: id, idProject: newId }
                        }
                    )
                    if (response.data.addTeacher.add) {
                        Swal.fire({
                            icon: 'success',
                            title: "Proyecto Agregado",
                            text: "Se ha insertado el grupo",
                        })
                        window.location.replace('./courseteacher')
                    }
                }
            }
        }
    }

    const envio = (idProject) => {
        const cookies = new Cookies();
        cookies.set('edit-Course', idProject, { maxAge: 10 * 60 }, { path: '/' })
        window.location.replace('./editProjectTeacher')
    }

    return (
        <div className="container">
            <Table striped bordered hover variant="dark" className="text-center">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Titulo</th>
                        <th>Descripcion</th>
                        <th>Horas</th>
                    </tr>
                </thead>
                <tbody>
                    {cursos.map((val, key) => {
                        return (
                            <tr onClick={() => envio(val._id)}>
                                <td>{key + 1}</td>
                                <td>{val.tittle}</td>
                                <td>{val.description}</td>
                                <td>{val.Horas}</td>
                            </tr>
                        )
                    })}
                </tbody>

            </Table>
        </div>
    )
}
export default CourseTeacher