import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import {  Button,Table} from 'react-bootstrap';
import { validateql, addTeacherql } from '../mutations/mutation'
import { FcInfo } from 'react-icons/fc'
import { AiFillEye } from 'react-icons/ai'
import { FiDelete } from 'react-icons/fi'
import { getUserql } from '../queries/queries'
import Cookies from "universal-cookie";
import { useMutation, useQuery } from '@apollo/client'

function CourseStudent() {
    const [email, setEmail] = useState("")
    const [auto, setAuto] = useState("")
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
    const [addTeacher] = useMutation(addTeacherql)
    const response = async () => {
        const response1 = await validateForm(
            {
                variables: { token: tokenStorage }
            }
        )
        //console.log(response1)
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
                if (response1.data.validate.rol === "Estudiante") {
                    //console.log(response1.data.validate)
                    setAuto(response1.data.validate.Estado)
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
        }
    )
    useEffect(() => {
        if (auto === "Activar") {
            if (data) {
                if (data.getUser.search) {
                    setCursos(data.getUser.user.cursos)
                }
            }
        }
    }, [data])

    const irCurso = (idProject) => {
        //console.log(idProject)
        const cookies = new Cookies();
        cookies.set('obs-course', idProject, { maxAge: 10 * 60 }, { path: '/' })
        window.location.href = './insideCourse'
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
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {cursos.map((val, key) => {
                        return (
                            <tr>
                                <td>{key + 1}</td>
                                <td>{val.tittle}</td>
                                <td>{val.description}</td>
                                <td>{val.Horas}</td>
                                <td>
                                    <Button className="Observar"><FcInfo className="Observar" size="1.5rem"></FcInfo></Button>
                                    <Button className="Ir" onClick={() => irCurso(val._id)}><AiFillEye size="1.5rem" color="rgb(22, 148, 232)" /></Button>
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
export default CourseStudent;