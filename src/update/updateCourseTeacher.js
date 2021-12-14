import React from "react";
import { useState, useEffect } from 'react'
import { updateProjectql, delTeacherql, validateql, addStudentql, delStudentql } from '../mutations/mutation';
import { getCourseql } from '../queries/queries'
import Swal from 'sweetalert2'
import { useMutation, useQuery } from '@apollo/client'
import { Card, InputGroup, FormControl, Button, FloatingLabel, Form, Dropdown, Table } from 'react-bootstrap';
import { FcInfo } from 'react-icons/fc'
import { AiFillEdit, AiOutlineUserAdd } from 'react-icons/ai'
import { FiDelete } from 'react-icons/fi'
import Cookies from "universal-cookie";
import '../courses/courseAdmi.css'

function EditProjectTeacher() {

    const cookies = new Cookies();
    const id = cookies.get('edit-Course')


    //console.log(id)
    const [idTeacher, setId] = useState("")
    const { data } = useQuery(getCourseql, {
        variables: { id }
    })
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

    const [tittle, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [Horas, setHoras] = useState('')
    const [people, setPeople] = useState([])
    useEffect(() => {
        if (auth === true) {
            if (data) {
                if (data.getProject) {
                    setTitle(data.getProject.tittle)
                    setDescription(data.getProject.description)
                    setHoras(data.getProject.Horas)
                    setPeople(data.getProject.people)
                }
            }
        }
    }, [data])
    //console.log(data)
    const ObserStudent = (idStudent) => {
        let filtro = data.getProject.people.filter(p => p._id == idStudent)
        let nombre = filtro[0].nombres + " " + filtro[0].apellidos
        Swal.fire({
            title: nombre,
            text: filtro[0].rol,
            icon: 'info'
        })
    }

    const [delStudentForm] = useMutation(delStudentql)
    const delStudent = async (newId) => {
        console.log(newId)
        if (newId) {
            Swal.fire({
                title: '¿Esta seguro?',
                text: "El estudiante sera eliminado con todos sus datos del curso",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, quiero eliminar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const response = await delStudentForm(
                        {
                            variables: { idProject: id, email: newId }
                        }
                    )
                    Swal.fire(
                        'Eliminado!',
                        'El estudiante ha sido eliminado',
                        'success'
                    )
                    window.location.replace('./editProjectTeacher')
                }
            })
        }
    }

    const [addStudentForm] = useMutation(addStudentql)
    const addStudent = async () => {
        const { value: newId } = await Swal.fire({
            title: 'Escriba el ID del estudiante a agregar',
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
            const response = await addStudentForm(
                {
                    variables: { idProject: id, email: newId }
                }
            )
            if (response.data.addStudent.error) {
                let error = response.data.addStudent.error
                let message = error.map(p => p.message)
                Swal.fire({
                    icon: 'error',
                    title: "Error",
                    text: message
                })
            }
            else {
                Swal.fire({
                    icon: 'success',
                    title: "Agregado Exitosamente",
                    text: "El estudiante ha sido agregado"
                })
                window.location.replace('./editProjectTeacher')
            }
        }
    }

    const [updateForm] = useMutation(updateProjectql)
    const enviar = async () => {
        const response = await updateForm(
            {
                variables: { id, tittle, description, Horas }
            }
        )
        let error = response.data.updateProject.error
        if (error) {
            let message = error.map(p => p.message)
            Swal.fire({
                icon: 'error',
                title: "Error",
                text: message,
                timer: 2500
            })
        }
        else {
            Swal.fire({
                icon: 'success',
                title: 'Actualizacion',
                text: 'Se han actualizado los datos satisfactoriamente',
                showConfirmButton: false,
                timer: 2500
            })
            window.location.replace('./editProjectTeacher')
        }
    }

    return (
        <div className="container">
            <Card className="text-center" style={{ width: '25rem' }}>
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
                            onChange={e => setTitle(e.target.value)}
                            aria-label="Titulo"
                            aria-describedby="basic-addon1"
                        />
                        <FloatingLabel controlId="floatingTextarea2" label="Descripcion">
                            <Form.Control
                                as="textarea"
                                value={description}
                                placeholder="Leave a comment here"
                                onChange={e => setDescription(e.target.value)}
                                style={{ height: '100px' }}
                            />
                        </FloatingLabel>
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
                    <Button onClick={enviar}>Actualizar Datos</Button>
                </Card.Body>
            </Card>
            <hr></hr>
            <Table striped bordered hover variant="dark" className="text-center">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Opciones</th>
                        <th><Button className="Add" onClick={addStudent}><AiOutlineUserAdd size="1rem" /></Button></th>
                    </tr>
                </thead>
                <tbody>
                    {people.map((val, key) => {
                        return (
                            <tr>
                                <td>{key + 1}</td>
                                <td>{val.nombres}</td>
                                <td>{val.apellidos}</td>
                                <td>{val.email}</td>
                                <td>{val.rol}</td>
                                <td>
                                    <Button className="Observar" onClick={() => ObserStudent(val._id)}><FcInfo className="Observar" size="1.5rem"></FcInfo></Button>
                                    <Button className="Eliminar" onClick={() => delStudent(val.email)}><FiDelete size="1.5rem" color="red" /></Button>
                                </td>
                                <td></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}
export default EditProjectTeacher