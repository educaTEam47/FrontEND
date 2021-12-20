import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import {  Button,Table} from 'react-bootstrap';
import { validateql, addTeacherql,delStudentql } from '../mutations/mutation'
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
    const [estado,setEstado]=useState("")
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
                    setEstado(response1.data.validate.Estado)
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

    const ObserCourse = (idProject) => {
        let filtro = cursos.filter(p => p._id == idProject)
        Swal.fire({
            title: filtro[0].tittle,
            text: filtro[0].description,
            icon: 'info'
        })
    }

    const [delStudentForm] = useMutation(delStudentql)
    const delStudent = async (idProject) => {
        //console.log(idProject)
        if (estado === "Desactivar") {
            Swal.fire({
                title: "Error",
                text: "No puede eliminar los estudiantes, su estado no lo permite",
                icon: "error"
            })
        }
        else {
            if (idProject) {
                Swal.fire({
                    title: '¿Esta seguro?',
                    text: "Saldra del curso y perdera todos sus datos",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, quiero salir del curso'
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        const response = await delStudentForm(
                            {
                                variables: { idProject, email}
                            }
                        )
                        Swal.fire(
                            'Eliminado!',
                            'Ha cancelado el curso',
                            'success'
                        )
                        window.location.replace('./courseStudent')
                    }
                })
            }

        }
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
                                    <Button className="Observar" onClick={()=> ObserCourse(val._id)}><FcInfo className="Observar" size="1.5rem"></FcInfo></Button>
                                    <Button className="Ir" onClick={() => irCurso(val._id)}><AiFillEye size="1.5rem" color="rgb(22, 148, 232)" /></Button>
                                    <Button className="Eliminar" onClick={()=> delStudent(val._id)} ><FiDelete size="1.5rem" color="red" /></Button>
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