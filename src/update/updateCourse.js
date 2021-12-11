import React from "react";
import { useState, useEffect } from 'react'
import { updateUserql, delTeacherql, addTeacherql } from '../mutations/mutation';
import { getCourseql } from '../queries/queries'
import Swal from 'sweetalert2'
import { useMutation, useQuery } from '@apollo/client'
import { Card, InputGroup, FormControl, Button, DropdownButton, Dropdown, Table } from 'react-bootstrap';
import { FcInfo } from 'react-icons/fc'
import { AiFillEdit } from 'react-icons/ai'
import { FiDelete } from 'react-icons/fi'
import Cookies from "universal-cookie";
import '../courses/courseAdmi.css'

import 'bootstrap/dist/css/bootstrap.min.css';

function UpdateCourse() {
    const [tittle, settittle] = useState('')
    const [description, setdescription] = useState('')
    const [Horas, setHoras] = useState('')
    const [lider, setlider] = useState([])
    const [people, setpeople] = useState([])
    const cookies = new Cookies();
    const id = cookies.get('edit-Course')
    console.log(id)
    const { data } = useQuery(getCourseql,
        {
            variables: { id }
        });
    useEffect(() => {
        if (id) {
            if (data) {
                if (data.getProject) {
                    settittle(data.getProject.tittle)
                    setdescription(data.getProject.description)
                    setHoras(data.getProject.Horas)
                    setlider(data.getProject.lider)
                    setpeople(data.getProject.people)
                }
            }
        }
    }, [data])
    const enviar = () => {
        console.log(id)
    }
    const [delForm] = useMutation(delTeacherql)
    const [addTeacherForm] = useMutation(addTeacherql)

    const reemplazar = async (idTeacher) => {
        console.log("Reemplazar")
        const { value: newId } = await Swal.fire({
            title: 'Escriba el ID del nuevo profesor',
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
            console.log(idTeacher)
            console.log(newId)
            if (newId.length != 24) {
                Swal.fire("El ID introducido no es valido")
            }
            else {
                if (newId == idTeacher) {
                    Swal.fire("No puede introducir un ID registrado")
                }
                else {
                    const response2 = await addTeacherForm(
                        {
                            variables: { idTeacher: newId, idProject: id }
                        }
                    )

                    console.log(response2.data.addTeacher.add)
                    if (response2.data.addTeacher.add) {
                        const response = await delForm(
                            {
                                variables: { idTeacher, idCourse: id }
                            }
                        )
                        //console.log(response)
                        Swal.fire({
                            icon: 'success',
                            title: "Cambio Realizado",
                            text: "Se ha realizado el cambio de profesor",
                        })
                    }
                    else {
                        let error = response2.data.addTeacher.error
                        let message = error.map(p => p.message)
                        Swal.fire({
                            icon: 'error',
                            title: "Error",
                            text: message,
                        })
                    }
                }
            }
        }
    }
    return (
        <div className="container">
            <Card className="text-center" style={{ width: '18rem' }}>
                <Card.Body className="card-body">
                    <Card.Title className="tittle">Informacion del Curso</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">EducaTEam</Card.Subtitle>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Id Course"
                            disabled value={id}
                            aria-label="Id Course"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Titulo"
                            value={tittle}
                            onChange={e => settittle(e.target.value)}
                            aria-label="Titulo"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Descripcion"
                            value={description}
                            onChange={e => setdescription(e.target.value)}
                            aria-label="Descripcion"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Horas"
                            type="number"
                            value={Horas}
                            onChange={e => setHoras(e.target.value)}
                            aria-label="Horas"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </Card.Body>
            </Card>
            <Table striped bordered hover variant="dark" className="text-center">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.getProject.lider.map((val, key) => {
                        return (
                            <tr>
                                <td>{key + 1}</td>
                                <td>{val.nombres}</td>
                                <td>{val.apellidos}</td>
                                <td>{val.email}</td>
                                <td>{val.rol}</td>
                                <td>
                                    <Button className="Observar"><FcInfo className="Observar" size="1.5rem"></FcInfo></Button>
                                    <Button className="Editar" onClick={() => reemplazar(val._id)}><AiFillEdit size="1.5rem" color="rgb(22, 148, 232)" /></Button>
                                    <Button className="Eliminar"><FiDelete size="1.5rem" color="red" /></Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <Table striped bordered hover variant="dark" className="text-center">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.getProject.people.map((val, key) => {
                        return (
                            <tr>
                                <td>{key + 1}</td>
                                <td>{val.nombres}</td>
                                <td>{val.apellidos}</td>
                                <td>{val.email}</td>
                                <td>{val.rol}</td>
                                <td>
                                    <Button className="Observar"><FcInfo className="Observar" size="1.5rem"></FcInfo></Button>
                                    <Button className="Eliminar"><FiDelete size="1.5rem" color="red" /></Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <Button onClick={enviar}>Actualizar Datos</Button>
        </div>
    )
}
export default UpdateCourse;