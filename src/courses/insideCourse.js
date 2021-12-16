import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import { Card, InputGroup, Form, Button, FloatingLabel, Row, Col, Navbar } from 'react-bootstrap';
import { createProjectql, validateql, addTeacherql } from '../mutations/mutation'
import { FcInfo } from 'react-icons/fc'
import { AiFillEdit, AiOutlineUserAdd, AiFillEye, AiOutlineSend } from 'react-icons/ai'
import { FiDelete } from 'react-icons/fi'
import { getUserql, getNoteql } from '../queries/queries'
import Cookies from "universal-cookie";
import { useMutation, useQuery } from '@apollo/client'

function InsideCourse() {
    const [email, setEmail] = useState("")
    const [auto, setAuto] = useState("")
    const [rol,setRol] =useState("")
    const [tittle, setTittle] = useState("")
    const [notes, setNotes] = useState([])
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
                if (response1.data.validate.rol === "Estudiante") {
                    //console.log(response1.data.validate)
                    setRol(response1.data.validate.rol)
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

    const editar = (idNote) =>{
        //console.log(idNote)
        if(rol==="Lider"){
            console.log(idNote)
        }
        else{
            Swal.fire({
                title:"Advertencia",
                text:"No tiene el permiso de editar",
                icon:"warning"
            })
        }
    }

    const responseNote = (idNote) =>{
        const cookies = new Cookies();
        cookies.set('id-note', idNote, { maxAge: 10 * 60 }, { path: '/' })
        window.location.replace('./resposeNote')
    }

    return (
        <div className="container">
            <Navbar className="justify-content-center">
                <Navbar.Brand>{tittle}</Navbar.Brand>
            </Navbar>
            <Row xs={1} md={3} className="g-20">
                {notes.map((val, key) => {
                    return (
                        <Col>
                            <Card className="text-center" style={{ width: '23rem' }}>
                                <Card.Body className="card-body">
                                    <InputGroup className="justify-content-end">
                                        <Card.Title className="tittle">{val.note}</Card.Title>
                                        <Button className="Editar" align-items="end" onClick={()=> editar(val._id)}><AiFillEdit size="1.5rem" color="rgb(22, 148, 232)" /></Button>
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
                                        <Button className="Responder" align="center" onClick={()=>responseNote(val._id)}><AiOutlineSend size="1.5rem" color="rgb(22, 148, 232)" /></Button>
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