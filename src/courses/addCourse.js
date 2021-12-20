import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import { Table, InputGroup, FormControl, Button } from 'react-bootstrap';
import { createProjectql, validateql, solicitud } from '../mutations/mutation'
import { getProjects } from '../queries/queries'
import { FcInfo } from 'react-icons/fc'
import { AiFillFileAdd } from 'react-icons/ai'
import { FiDelete } from 'react-icons/fi'
import { useMutation, useQuery } from '@apollo/client'

function AddCourse() {

    const [description, setDescription] = useState('')
    const [tittle, setTittle] = useState('')
    const [Horas, setHoras] = useState('')
    const [ProyectForm] = useMutation(createProjectql)
    const [idProject, setidProject] = useState("")
    const [email, setEmail] = useState("")
    const [auto, setAuto] = useState("")

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
                if (response1.data.validate.rol === "Estudiante") {
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

    const { data } = useQuery(getProjects)
    const [projects, setProjects] = useState([])
    useEffect(() => {
        if (data) {
            if (data.getProjects) {
                setProjects(data.getProjects)
            }
        }
    }, [data])
    console.log(projects)

    const [solicitudForm] = useMutation(solicitud)
    const solicitudFun = async (idProject) => {
        if (auto === "Activar") {
            const response = await solicitudForm(
                {
                    variables: { email, idProject }
                }
            )
            console.log(response)
            if (response.data.solicitudes.error) {
                let error=response.data.solicitudes.error
                let message =error.map(p=>p.message)
                Swal.fire({
                    title:"Error",
                    text:message,
                    icon:"error"
                })
            }
            else{
                Swal.fire({
                    title:"Enviado",
                    text:"La solicitud ha sido enviada",
                    icon:"success"
                })
            }
        }
        else {
            Swal.fire({
                title: "Error!",
                text: "No tiene autorizacion",
                icon: "error"
            })
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
                        <th>Opcion</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((val, key) => {
                        return (
                            <tr>
                                <td>{key + 1}</td>
                                <td>{val.tittle}</td>
                                <td>{val.description}</td>
                                <td>{val.Horas}</td>
                                <td>
                                    <Button className="Agregar" onClick={() => solicitudFun(val._id)}><AiFillFileAdd className="Agregar" size="1.5rem" color="rgb(0,150,150)" /></Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )

}
export default AddCourse;