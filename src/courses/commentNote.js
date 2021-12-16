import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import { Card, InputGroup, Form, Button, FormControl, Row, Col, FloatingLabel } from 'react-bootstrap';
import { createProjectql, validateql, addResponseql } from '../mutations/mutation'
import { FcInfo } from 'react-icons/fc'
import { AiFillEdit, AiOutlineUserAdd, AiFillEye, AiOutlineSend } from 'react-icons/ai'
import { FiDelete } from 'react-icons/fi'
import { getUserql, getNotql } from '../queries/queries'
import Cookies from "universal-cookie";
import { useMutation, useQuery } from '@apollo/client'

function CommentNote() {

    const [email, setEmail] = useState("")
    const [auto, setAuto] = useState("")
    const [note, setNote] = useState("")
    const [description, setDescription] = useState("")
    const [student, setStudent] = useState("")
    const [fecha, setFecha] = useState("")
    const [respuestas, setRespuestas] = useState([])

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
                if (response1.data.validate.rol === "Lider") {
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



    const cookies = new Cookies();
    let idNote = cookies.get('id-note')
    //console.log(idNote)

    const { data } = useQuery(getNotql, {
        variables: { idNote }
    })
    console.log(data)
    useEffect(() => {
        if (data) {
            if (data.getNot) {
                if (data.getNot.notes) {
                    setNote(data.getNot.notes.note)
                    setDescription(data.getNot.notes.description)
                    if (data.getNot.notes.response !== null) {
                        setRespuestas(data.getNot.notes.response)
                    }
                }
            }
        }
    }, [data])
    console.log(data)

    return (
        <div className="container">
            <Card className="text-center" style={{ width: '40rem' }}>
                <Card.Body className="card-body">
                    <Card.Title className="tittle">Proyecto</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">EducaTEam</Card.Subtitle>
                    <InputGroup className="mb-3" style={{ width: '36rem' }}>
                        <FormControl
                            placeholder="Nombre del Proyecto"
                            disabled value={note}
                            aria-label="project"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Descripcion"
                            disabled value={description}
                            aria-label="tittle"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    {respuestas.map((val, key) => {
                        return (
                            <InputGroup className="mb-3">

                                <FloatingLabel style={{ width: '36rem' }} controlId="floatingTextarea2" label={"Estudiante " + val.student}>
                                    <Form.Control
                                        as="textarea"
                                        disabled value={val.response}
                                        placeholder="Leave a comment here"
                                        style={{ height: '100px' }}
                                    />
                                </FloatingLabel>
                            </InputGroup>
                        )
                    })}
                </Card.Body>
            </Card>
        </div>
    )
}
export default CommentNote;