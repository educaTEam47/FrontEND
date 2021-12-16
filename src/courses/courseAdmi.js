import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import { Card, InputGroup, FormControl, Button, DropdownButton, Dropdown, Table, Alert, AlertDismissibleExample } from 'react-bootstrap';
import { FcInfo } from 'react-icons/fc'
import { AiFillEdit } from 'react-icons/ai'
import { FiDelete } from 'react-icons/fi'
import { validateql, addTeacherql, delTeacherql,delCourse1l } from '../mutations/mutation'
import { getProjects } from '../queries/queries'
import { useQuery, useMutation } from '@apollo/client'
import Cookies from "universal-cookie";
import './courseAdmi.css'

function GetCoursesAdmi() {
    const [tittle, settittle] = useState('')
    const { data } = useQuery(getProjects)
    const [show, setShow] = useState(true);

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

    const observar = async (idProject) => {
        let filtro = data.getProjects.filter(p => p._id == idProject)
        //console.log(filtro)
        //console.log(filtro[0].tittle)
        //console.log(data.getProjects)
        Swal.fire({
            title: filtro[0].tittle,
            text: filtro[0].description
        })
    }
    const editar = async (idProject) => {
        const cookies = new Cookies();
        cookies.set('edit-Course', idProject, { maxAge: 10 * 60 }, { path: '/' })
        window.location.replace('./editProject')
    }

    const [delCourseForm] = useMutation(delCourse1l)
    const delCourse = (idProject) => {
        Swal.fire({
            title: '¿Esta seguro?',
            text: "El curso se eliminara",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, quiero borrar el curso!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await delCourseForm(
                    {
                        variables: { idProject }
                    }
                )
                Swal.fire(
                    'Borrado!',
                    'El curso ha sido borrada exitosamente.',
                    'success'
                )
                window.location.href = './getProjectsAdmi'
            }
        })
    }

    //console.log(data)
    return (

        <div className="container">
            <Table striped bordered hover variant="dark" className="text-center">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre del Proyecto</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.getProjects.map((val, key) => {
                        return (
                            <tr>
                                <td>{key + 1}</td>
                                <td>{val.tittle}</td>
                                <td>
                                    <Button className="Observar" onClick={() => observar(val._id)}><FcInfo className="Observar" size="2rem"></FcInfo></Button>
                                    {console.log(val._id)}
                                    <Button className="Editar" onClick={() => editar(val._id)}><AiFillEdit size="2rem" color="rgb(22, 148, 232)" /></Button>
                                    <Button className="Eliminar" onClick={() => delCourse(val._id)}><FiDelete size="2rem" color="red" /></Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}
export default GetCoursesAdmi;