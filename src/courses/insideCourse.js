import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import { Card, InputGroup, Form, Button, FloatingLabel, Row, Col, Navbar } from 'react-bootstrap';
import { delNoteql, validateql, addTeacherql } from '../mutations/mutation'
import { AiFillEdit, AiOutlineSend } from 'react-icons/ai'
import { FaBrain } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { IoAddCircle } from 'react-icons/io5'
import {  getNoteql } from '../queries/queries'
import Cookies from "universal-cookie";
import { useMutation, useQuery } from '@apollo/client'

function InsideCourse() {
    const [email, setEmail] = useState("")
    const [auto, setAuto] = useState("")
    const [rol, setRol] = useState("")
    const [tittle, setTittle] = useState("")
    const [notes, setNotes] = useState([])
    const [isTeacher, setTeacher] = useState(false)
    const cookies = new Cookies();
    let idProject = cookies.get('obs-course')
    //console.log(idProject)

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
                if (response1.data.validate.rol === "Estudiante" || response1.data.validate.rol === "Lider") {
                    //console.log(response1.data.validate)
                    setRol(response1.data.validate.rol)
                    setAuto(response1.data.validate.Estado)
                    setEmail(response1.data.validate.email)
                    setAuth(response1.data.validate.validacion)
                    if (response1.data.validate.rol === "Lider") {
                        setTeacher(true)
                    }
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

    const { data } = useQuery(getNoteql, {
        variables: { idProject }
    })
    //console.log(data)
    useEffect(() => {
        if (data) {
            if (data.getNote.notes) {
                setNotes(data.getNote.notes)
            }
        }
    }, [data])
    console.log(notes)

    const revisar = (idNote) => {
        //console.log(idNote)
        if (rol === "Lider") {
            const cookies = new Cookies();
            cookies.set('id-note', idNote, { maxAge: 10 * 60 }, { path: '/' })
            window.location.href = './commentNote';
        }
        else {
            Swal.fire({
                title: "Advertencia",
                text: "No tiene el permiso de editar",
                icon: "warning"
            })
        }
    }

    const responseNote = (idNote) => {
        if (rol === "Lider") {
            Swal.fire({
                title: "Advertencia",
                text: "Solo estudiantes pueden responder",
                icons: "warning"
            })
        }
        else {
            const cookies = new Cookies();
            cookies.set('id-note', idNote, { maxAge: 10 * 60 }, { path: '/' })
            window.location.href ='./resposeNote'
        }
    }

    const addNote = (idProject) => {
        const cookies = new Cookies();
        cookies.set('obs-course', idProject, { maxAge: 10 * 60 }, { path: '/' })
        window.location.href ='./addNote'
    }

    const [delNoteForm] = useMutation(delNoteql)
    const eliminar = async (idNote) => {
        Swal.fire({
            title: '¿Esta seguro?',
            text: "La nota se eliminara",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, quiero borrar esto!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await delNoteForm(
                    {
                        variables: { idNote }
                    }
                )
                Swal.fire(
                    'Borrado!',
                    'La nota ha sido borrada exitosamente.',
                    'success'
                )
                window.location.href = './insideCourse'
            }
        })
    }

    const editar = (idNote)=>{
        const cookies = new Cookies();
        cookies.set('id-note', idNote, { maxAge: 10 * 60 }, { path: '/' })
        window.location.href ='./updateNote'
    }


    return (
        <div className="container">
            <Navbar fixed="bottom">
                <InputGroup className="justify-content-start">
                    {isTeacher && <Button className="addNote" align-items="start" onClick={() => addNote(idProject)}><IoAddCircle size="2rem" color="rgb(100, 200, 200)" /></Button>}
                </InputGroup>
            </Navbar>
            <Row xs={1} md={3} className="g-20">
                {notes.map((val, key) => {
                    return (
                        <Col>
                            <Card className="text-center" style={{ width: '23rem' }}>
                                <Card.Body className="card-body">
                                    <InputGroup className="justify-content-end">
                                        <Card.Title className="tittle">{val.note}</Card.Title>
                                        {isTeacher && <Button className="Revisar" align-items="end" onClick={() => revisar(val._id)}><FaBrain size="1.5rem" color="rgb(22, 148, 232)" /></Button>}
                                        {isTeacher && <Button className="EditarNote" align-items="end" onClick={() => editar(val._id)}><AiFillEdit size="1.5rem" color="rgb(22, 148, 232)" /></Button>}
                                        {isTeacher && <Button className="Eliminar" align-items="end" onClick={() => eliminar(val._id)}><MdDelete size="1.5rem" color="rgb(225, 100  , 100)" /></Button>}
                                    </InputGroup>
                                    <Card.Subtitle className="mb-2 text-muted">EducaTEam</Card.Subtitle>
                                    <InputGroup className="mb-3">
                                        <FloatingLabel style={{ width: '20rem' }} controlId="floatingTextarea2" label="Descripcion">
                                            <Form.Control
                                                as="textarea"
                                                disabled value={val.description}
                                                placeholder="Leave a comment here"
                                                style={{ height: '100px' }}
                                            />
                                        </FloatingLabel>
                                    </InputGroup>
                                    <InputGroup className="justify-content-center">
                                        <Button className="Responder" align="center" onClick={() => responseNote(val._id)}><AiOutlineSend size="1.5rem" color="rgb(22, 148, 232)" /></Button>
                                    </InputGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
}
export default InsideCourse;